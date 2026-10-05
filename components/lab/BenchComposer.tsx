'use client';

import { memo, useCallback, useState } from 'react';
import type { BenchKind, BenchStatus } from '@/lib/labTypes';
import { ALL_KINDS, ALL_STATUSES, KIND_META, STATUS_META } from '@/lib/labTypes';
import type { NewBenchInput } from '@/lib/useLabFeed';

interface Props {
  posting: boolean;
  onSubmit: (input: NewBenchInput) => Promise<boolean>;
}

const MAX_BODY = 8000;

function BenchComposerInner({ posting, onSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [kind, setKind] = useState<BenchKind>('EXPERIMENT');
  const [status, setStatus] = useState<BenchStatus>('HYPOTHESIS');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagsRaw, setTagsRaw] = useState('');
  const [flash, setFlash] = useState<string | null>(null);

  const submit = useCallback(async () => {
    if (!author.trim() || !title.trim() || !body.trim()) {
      setFlash('INCOMPLETE ENTRY — author, title and log body are required.');
      return;
    }
    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim().toUpperCase().replace(/\s+/g, '_'))
      .filter(Boolean)
      .slice(0, 6);

    const ok = await onSubmit({ author, kind, status, title, body, tags });
    if (ok) {
      setTitle('');
      setBody('');
      setTagsRaw('');
      setFlash(null);
      setOpen(false);
    } else {
      setFlash('TRANSMISSION FAILED — check connection / RLS policy, then retry.');
    }
  }, [author, kind, status, title, body, tagsRaw, onSubmit]);

  const remaining = MAX_BODY - body.length;

  return (
    <div className="border border-ink-dark/25 dark:border-paper-100/25 bg-paper-100/50 dark:bg-paper-900/50">
      {/* Header strip */}
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor="COMPOSE"
        className="w-full flex items-center justify-between px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-ink-dark dark:text-paper-100 hover:text-accent transition-colors"
      >
        <span className="flex items-center gap-2">
          <span className={`w-2 h-2 ${open ? 'bg-accent' : 'bg-ink-muted'} inline-block`} />
          NEW BENCH ENTRY // EXPERIMENT · THOUGHT · RESEARCH
        </span>
        <span className="text-accent font-bold">{open ? '− CLOSE' : '+ OPEN LOG'}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4 border-t border-ink-dark/10 dark:border-paper-100/10 pt-4">
          {/* Author + kind/status row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="space-y-1 block">
              <span className="text-[9px] font-mono uppercase tracking-widest text-ink-muted">
                Researcher handle
              </span>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value.slice(0, 40))}
                placeholder="@handle or name"
                className="w-full bg-transparent border border-ink-dark/25 dark:border-paper-100/25 px-2.5 py-1.5 font-mono text-xs focus:border-accent focus:outline-none"
              />
            </label>

            <label className="space-y-1 block">
              <span className="text-[9px] font-mono uppercase tracking-widest text-ink-muted">
                Entry class
              </span>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as BenchKind)}
                className="w-full bg-paper-50 dark:bg-paper-900 border border-ink-dark/25 dark:border-paper-100/25 px-2.5 py-1.5 font-mono text-xs focus:border-accent focus:outline-none"
              >
                {ALL_KINDS.map((k) => (
                  <option key={k} value={k}>
                    {KIND_META[k].glyph} {KIND_META[k].label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 block">
              <span className="text-[9px] font-mono uppercase tracking-widest text-ink-muted">
                Bench status
              </span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BenchStatus)}
                className="w-full bg-paper-50 dark:bg-paper-900 border border-ink-dark/25 dark:border-paper-100/25 px-2.5 py-1.5 font-mono text-xs focus:border-accent focus:outline-none"
              >
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_META[s].label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Title */}
          <label className="block space-y-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-ink-muted">
              Subject line ({title.length}/160)
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 160))}
              placeholder='e.g. "Anti-windup clamp kills breakaway jump on stepper bench"'
              className="w-full bg-transparent border border-ink-dark/25 dark:border-paper-100/25 px-2.5 py-1.5 font-serif text-base focus:border-accent focus:outline-none"
            />
          </label>

          {/* Body */}
          <label className="block space-y-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-ink-muted">
              Lab log — hypothesis, protocol, result ({remaining} chars left)
            </span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value.slice(0, MAX_BODY))}
              rows={6}
              placeholder={'What did you try? What broke? What did the curve say?\nBlank line separated paragraphs render cleanly.'}
              className="w-full bg-transparent border border-ink-dark/25 dark:border-paper-100/25 px-2.5 py-2 font-sans text-sm leading-relaxed focus:border-accent focus:outline-none resize-y"
            />
          </label>

          {/* Tags */}
          <label className="block space-y-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-ink-muted">
              Index tags (comma separated, max 6)
            </span>
            <input
              value={tagsRaw}
              onChange={(e) => setTagsRaw(e.target.value)}
              placeholder="SLM, KV_CACHE, ESP32"
              className="w-full bg-transparent border border-ink-dark/25 dark:border-paper-100/25 px-2.5 py-1.5 font-mono text-xs focus:border-accent focus:outline-none"
            />
          </label>

          {flash && (
            <p className="font-mono text-[10px] text-accent uppercase tracking-wider">{flash}</p>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-[9px] text-ink-muted uppercase">
              Entries are public · signed with your handle only
            </span>
            <button
              onClick={submit}
              disabled={posting}
              data-cursor="SUBMIT"
              className="px-4 py-2 bg-accent text-white font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-accent-hover disabled:opacity-50 transition-colors"
            >
              {posting ? 'LOGGING…' : '⟶ RECORD TO LAB'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(BenchComposerInner);
