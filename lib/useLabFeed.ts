'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getSupabase } from './supabaseClient';
import type { BenchKind, BenchStatus, LabBench, ReactionCounts } from './labTypes';
import { labSeedEntries } from '@/data/labSeeds';

const PAGE_SIZE = 12;
const LS_KEY = 'ch3noff-lab-local-v1';
const VOTE_KEY = 'ch3noff-lab-votes-v1';

export interface NewBenchInput {
  author: string;
  kind: BenchKind;
  status: BenchStatus;
  title: string;
  body: string;
  tags: string[];
}

type ReactionKey = keyof ReactionCounts;

/** localStorage helpers (offline mode keeps the lab usable pre-provisioning). */
function readLocal(): LabBench[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as LabBench[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(rows: LabBench[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(rows));
  } catch {
    /* quota / private mode — ignore */
  }
}

function readVotes(): Record<string, true> {
  try {
    const raw = localStorage.getItem(VOTE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, true>) : {};
  } catch {
    return {};
  }
}

function recordVote(id: string, key: ReactionKey) {
  const votes = readVotes();
  votes[`${id}:${key}`] = true;
  try {
    localStorage.setItem(VOTE_KEY, JSON.stringify(votes));
  } catch {
    /* ignore */
  }
}

export function useLabFeed() {
  const supabase = useMemo(() => getSupabase(), []);
  const online = supabase !== null;

  const [benches, setBenches] = useState<LabBench[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, true>>({});
  const pageRef = useRef(0);

  /** First page load (and refresh). */
  const fetchFirstPage = useCallback(async () => {
    if (!supabase) {
      // Offline scratchpad mode: seeds + anything posted locally.
      const local = readLocal();
      const merged = [...local, ...labSeedEntries];
      merged.sort((a, b) => b.created_at.localeCompare(a.created_at));
      setBenches(merged);
      pageRef.current = 0;
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('lab_benches')
      .select('*')
      .order('created_at', { ascending: false })
      .range(0, PAGE_SIZE - 1);
    if (err) {
      setError(err.message);
    } else {
      setBenches((data as LabBench[]) ?? []);
      pageRef.current = 0;
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    setVotes(readVotes());
    void fetchFirstPage();

    // Realtime: live-incoming benches without polling (zero cost when disabled).
    if (!supabase) return;
    const channel = supabase
      .channel('lab-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'lab_benches' },
        (payload) => {
          const row = payload.new as LabBench;
          setBenches((prev) =>
            prev.some((b) => b.id === row.id) ? prev : [row, ...prev]
          );
        }
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase, fetchFirstPage]);

  const loadMore = useCallback(async () => {
    if (!supabase) return; // offline mode already has everything
    setLoadingMore(true);
    const next = pageRef.current + 1;
    const { data, error: err } = await supabase
      .from('lab_benches')
      .select('*')
      .order('created_at', { ascending: false })
      .range(next * PAGE_SIZE, (next + 1) * PAGE_SIZE - 1);
    if (!err && data) {
      const rows = data as LabBench[];
      setBenches((prev) => {
        const seen = new Set(prev.map((b) => b.id));
        return [...prev, ...rows.filter((r) => !seen.has(r.id))];
      });
      pageRef.current = next;
    }
    setLoadingMore(false);
  }, [supabase]);

  const post = useCallback(
    async (input: NewBenchInput): Promise<boolean> => {
      setPosting(true);
      setError(null);
      const optimistic: LabBench = {
        id: `tmp-${Date.now()}`,
        author: input.author.trim(),
        kind: input.kind,
        status: input.status,
        title: input.title.trim(),
        body: input.body.trim(),
        tags: input.tags,
        reactions: { replicate: 0, insight: 0, question: 0 },
        created_at: new Date().toISOString(),
      };
      setBenches((prev) => [optimistic, ...prev]);

      let ok = false;
      if (supabase) {
        const { data, error: err } = await supabase
          .from('lab_benches')
          .insert({
            author: optimistic.author,
            kind: input.kind,
            status: input.status,
            title: optimistic.title,
            body: optimistic.body,
            tags: input.tags,
          })
          .select('*')
          .single();
        if (err) {
          setError(err.message);
          setBenches((prev) => prev.filter((b) => b.id !== optimistic.id));
        } else {
          setBenches((prev) =>
            prev.map((b) => (b.id === optimistic.id ? (data as LabBench) : b))
          );
          ok = true;
        }
      } else {
        // Offline: persist to localStorage so the entry survives reloads.
        const local = readLocal();
        writeLocal([optimistic, ...local].slice(0, 60));
        ok = true;
      }
      setPosting(false);
      return ok;
    },
    [supabase]
  );

  const react = useCallback(
    (id: string, key: ReactionKey) => {
      const voteTag = `${id}:${key}`;
      if (votes[voteTag]) return; // one bump per visitor per bench per reaction

      setVotes((prev) => ({ ...prev, [voteTag]: true }));
      setBenches((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, reactions: { ...b.reactions, [key]: b.reactions[key] + 1 } } : b
        )
      );
      recordVote(id, key);

      if (supabase && !id.startsWith('tmp-')) {
        void supabase.rpc('bump_reaction', { bench_id: id, which: key });
      }
    },
    [supabase, votes]
  );

  const hasMore = online ? benches.length >= (pageRef.current + 1) * PAGE_SIZE : false;

  return {
    benches,
    loading,
    loadingMore,
    posting,
    error,
    online,
    hasMore,
    votes,
    refresh: fetchFirstPage,
    loadMore,
    post,
    react,
  };
}
