/** Shared domain types for the Research Lab ("lab_benches" table in Supabase). */

export type BenchKind = 'EXPERIMENT' | 'THOUGHT' | 'RESEARCH' | 'PROTOTYPE';

export type BenchStatus = 'HYPOTHESIS' | 'RUNNING' | 'PEER_REVIEW' | 'SETTLED' | 'FAILED';

export interface ReactionCounts {
  replicate: number;
  insight: number;
  question: number;
}

export interface LabBench {
  id: string;
  author: string;
  kind: BenchKind;
  status: BenchStatus;
  title: string;
  body: string;
  tags: string[];
  reactions: ReactionCounts;
  created_at: string;
}

export interface LabReply {
  id: string;
  bench_id: string;
  author: string;
  body: string;
  created_at: string;
}

export const KIND_META: Record<BenchKind, { label: string; glyph: string; accent: string }> = {
  EXPERIMENT: { label: 'EXPERIMENT', glyph: '⚗', accent: 'text-accent' },
  THOUGHT: { label: 'THOUGHT', glyph: '◍', accent: 'text-ink-muted' },
  RESEARCH: { label: 'RESEARCH', glyph: '§', accent: 'text-accent-dark' },
  PROTOTYPE: { label: 'PROTOTYPE', glyph: '⌁', accent: 'text-accent-muted' },
};

export const STATUS_META: Record<BenchStatus, { label: string; dot: string }> = {
  HYPOTHESIS: { label: 'HYPOTHESIS', dot: 'bg-amber-500' },
  RUNNING: { label: 'RUNNING', dot: 'bg-emerald-500 animate-pulse' },
  PEER_REVIEW: { label: 'PEER REVIEW', dot: 'bg-sky-500' },
  SETTLED: { label: 'SETTLED', dot: 'bg-accent' },
  FAILED: { label: 'FAILED / LOGGED', dot: 'bg-ink-muted' },
};

export const ALL_KINDS: BenchKind[] = ['EXPERIMENT', 'THOUGHT', 'RESEARCH', 'PROTOTYPE'];
export const ALL_STATUSES: BenchStatus[] = ['HYPOTHESIS', 'RUNNING', 'PEER_REVIEW', 'SETTLED', 'FAILED'];
