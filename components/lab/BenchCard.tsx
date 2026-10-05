'use client';

import { memo, useMemo } from 'react';
import type { LabBench, ReactionCounts } from '@/lib/labTypes';
import { KIND_META, STATUS_META } from '@/lib/labTypes';

type ReactionKey = keyof ReactionCounts;

interface Props {
  bench: LabBench;
  voted: Record<string, true>;
  onReact: (id: string, key: ReactionKey) => void;
}

const REACTION_DEFS: Array<{ key: ReactionKey; glyph: string; label: string }> = [
  { key: 'replicate', glyph: '⚗', label: 'REPLICATE' },
  { key: 'insight', glyph: '✦', label: 'INSIGHT' },
  { key: 'question', glyph: '?', label: 'QUERY' },
];

/** Compact relative formatter — no date-fns bundle cost. */
function relTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return iso.slice(0, 10);
  const diff = Date.now() - then;
  const m = Math.floor(diff / 60_000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return iso.slice(0, 10);
}

function BenchCardInner({ bench, voted, onReact }: Props) {
  const kindMeta = KIND_META[bench.kind] ?? KIND_META.THOUGHT;
  const statusMeta = STATUS_META[bench.status] ?? STATUS_META.HYPOTHESIS;

  // Split body into paragraphs once per render of this card only.
  const paragraphs = useMemo(
    () => bench.body.split(/\n\s*\n/).filter(Boolean),
    [bench.body]
  );

  return (
    <article className="group border border-ink-dark/20 dark:border-paper-100/20 bg-paper-50/70 dark:bg-paper-950/60 p-5 space-y-4 hover:border-accent/70 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_-3px_rgba(214,69,39,0.18)] transition-all duration-200 will-change-transform">
      {/* Ledger line: class · status · time */}
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest">
        <span className={`flex items-center gap-1.5 font-bold ${kindMeta.accent}`}>
          <span aria-hidden>{kindMeta.glyph}</span>
          {kindMeta.label}
        </span>
        <span className="flex items-center gap-3 text-ink-muted">
          <span className="flex items-center gap-1.5" title={statusMeta.label}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusMeta.dot}`} />
            {statusMeta.label}
          </span>
          <time dateTime={bench.created_at}>{relTime(bench.created_at)}</time>
        </span>
      </div>

      {/* Title + author stamp */}
      <div className="space-y-1">
        <h3 className="font-serif text-xl leading-snug text-ink-dark dark:text-paper-50 group-hover:text-accent transition-colors">
          {bench.title}
        </h3>
        <p className="font-mono text-[10px] text-ink-muted">
          LOGGED BY <span className="text-ink-dark dark:text-paper-100 font-bold">{bench.author}</span>
        </p>
      </div>

      {/* Body paragraphs */}
      <div className="space-y-2.5 text-sm leading-relaxed text-ink-dark/85 dark:text-paper-100/85">
        {paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? 'first-letter:font-serif first-letter:text-accent first-letter:text-lg' : undefined}>
            {p}
          </p>
        ))}
      </div>

      {/* Tags */}
      {bench.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 font-mono text-[9px]">
          {bench.tags.map((t) => (
            <span
              key={t}
              className="px-1.5 py-0.5 bg-paper-200/70 dark:bg-paper-800/70 text-ink-muted border border-ink-dark/10 dark:border-paper-100/10"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Reactions */}
      <div className="flex items-center gap-2 pt-2 border-t border-ink-dark/10 dark:border-paper-100/10">
        {REACTION_DEFS.map(({ key, glyph, label }) => {
          const isVoted = !!voted[`${bench.id}:${key}`];
          return (
            <button
              key={key}
              onClick={() => onReact(bench.id, key)}
              disabled={isVoted}
              title={`${label} this bench entry`}
              className={`flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase border transition-all duration-150 ${
                isVoted
                  ? 'border-accent bg-accent/10 text-accent cursor-default'
                  : 'border-ink-dark/20 dark:border-paper-100/20 text-ink-muted hover:border-accent hover:text-accent active:scale-95'
              }`}
            >
              <span aria-hidden>{glyph}</span>
              <span>{label}</span>
              <span className="font-bold tabular-nums">{bench.reactions[key]}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
}

export default memo(BenchCardInner);
