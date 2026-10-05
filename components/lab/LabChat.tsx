'use client';

import { useCallback, useMemo, useState } from 'react';
import { useLabFeed } from '@/lib/useLabFeed';
import type { LabBench } from '@/lib/labTypes';
import BenchComposer from '@/components/lab/BenchComposer';
import BenchCard from '@/components/lab/BenchCard';

type Filter = 'ALL' | LabBench['kind'];

const FILTERS: Filter[] = ['ALL', 'EXPERIMENT', 'THOUGHT', 'RESEARCH', 'PROTOTYPE'];

export default function LabChat() {
  const {
    benches,
    loading,
    loadingMore,
    posting,
    error,
    online,
    hasMore,
    votes,
    loadMore,
    post,
    react,
  } = useLabFeed();

  const [filter, setFilter] = useState<Filter>('ALL');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    let rows = filter === 'ALL' ? benches : benches.filter((b) => b.kind === filter);
    const q = query.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.body.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return rows;
  }, [benches, filter, query]);

  const stats = useMemo(() => {
    const running = benches.filter((b) => b.status === 'RUNNING').length;
    const settled = benches.filter((b) => b.status === 'SETTLED').length;
    const failed = benches.filter((b) => b.status === 'FAILED').length;
    return { total: benches.length, running, settled, failed };
  }, [benches]);

  const handleSubmit = useCallback(
    (input: Parameters<typeof post>[0]) => post(input),
    [post]
  );

  return (
    <div className="space-y-8">
      {/* Telemetry strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[10px] uppercase tracking-widest">
        {[
          { label: 'TOTAL BENCHES', value: String(stats.total), hot: false },
          { label: 'RUNNING', value: String(stats.running), hot: true },
          { label: 'SETTLED', value: String(stats.settled), hot: false },
          { label: 'FAILED / LOGGED', value: String(stats.failed), hot: false },
        ].map((s) => (
          <div
            key={s.label}
            className="border border-ink-dark/15 dark:border-paper-100/15 px-3 py-2.5 bg-paper-100/40 dark:bg-paper-900/40 flex items-center justify-between"
          >
            <span className="text-ink-muted">{s.label}</span>
            <span className={`font-bold tabular-nums ${s.hot ? 'text-accent' : 'text-ink-dark dark:text-paper-100'}`}>
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {/* Connection status */}
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
        <span className={`w-2 h-2 inline-block ${online ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
        {online
          ? 'SUPABASE LINK ESTABLISHED — SHARED LAB FEED LIVE'
          : 'OFFLINE SCRATCHPAD MODE — SET NEXT_PUBLIC_SUPABASE_URL + ANON KEY TO GO SHARED'}
      </div>

      {/* Composer */}
      <BenchComposer posting={posting} onSubmit={handleSubmit} />

      {error && (
        <p className="font-mono text-[10px] text-accent uppercase tracking-wider border border-accent/40 bg-accent/5 px-3 py-2">
          DB NOTICE: {error}
        </p>
      )}

      {/* Filter ledger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-ink-dark/15 dark:border-paper-100/15 pb-3">
        <div className="flex flex-wrap gap-1 font-mono text-[10px] uppercase tracking-widest">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 border transition-colors ${
                filter === f
                  ? 'border-accent text-accent font-bold bg-accent/5'
                  : 'border-ink-dark/20 dark:border-paper-100/20 text-ink-muted hover:text-accent hover:border-accent'
              }`}
            >
              {f}
              {f !== 'ALL' && (
                <span className="ml-1.5 tabular-nums opacity-70">
                  [{benches.filter((b) => b.kind === f).length}]
                </span>
              )}
            </button>
          ))}
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="grep the lab… title / body / tag / author"
          className="md:w-72 bg-transparent border border-ink-dark/20 dark:border-paper-100/20 px-3 py-1.5 font-mono text-xs focus:border-accent focus:outline-none"
        />
      </div>

      {/* Feed */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-56 border border-ink-dark/10 dark:border-paper-100/10 bg-paper-100/40 dark:bg-paper-900/40 animate-pulse"
            />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="border border-dashed border-ink-dark/25 dark:border-paper-100/25 py-16 text-center space-y-2">
          <p className="font-serif text-2xl text-ink-muted italic">The bench is clean.</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            No entries match this filter — log the first one above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {visible.map((bench) => (
            <BenchCard key={bench.id} bench={bench} voted={votes} onReact={react} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {hasMore && !loading && (
        <div className="flex justify-center pt-2">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="px-5 py-2.5 border border-ink-dark/25 dark:border-paper-100/25 font-mono text-[11px] uppercase tracking-widest hover:border-accent hover:text-accent transition-colors disabled:opacity-50"
          >
            {loadingMore ? 'PULLING ARCHIVE…' : '⟵ LOAD EARLIER BENCHES'}
          </button>
        </div>
      )}
    </div>
  );
}
