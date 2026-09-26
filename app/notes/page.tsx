import React from 'react';
import Link from 'next/link';
import { fieldNotes } from '@/data/notes';
import { personalData } from '@/data/personal';

export default function NotesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b-2 border-ink-dark dark:border-paper-50 pb-8">
        <div className="font-mono text-xs text-accent uppercase tracking-widest flex items-center justify-between">
          <span>[FIELD JOURNAL // UNFILTERED NOTE STREAM]</span>
          <span>LOCATION: {personalData.location}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-ink-dark dark:text-paper-50 tracking-tight leading-[1.05]">
          Field Notes &amp; Marginalia
        </h1>
        <p className="font-sans text-lg sm:text-xl text-ink-muted dark:text-paper-200/80 font-light leading-relaxed">
          Daily observations, telemetry traces, harmonic experiments, and unfinished thoughts.
        </p>
      </header>

      {/* Stream of Notes */}
      <div className="space-y-10">
        {fieldNotes.map((note) => (
          <article
            key={note.id}
            className="border border-ink-dark/15 dark:border-paper-100/15 p-6 bg-paper-100/30 dark:bg-paper-900/30 space-y-4 font-mono text-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-dark/10 pb-2 text-[10px]">
              <span className="text-accent font-bold uppercase tracking-widest">
                [{note.tag}]
              </span>
              <div className="text-ink-muted flex items-center gap-3">
                <span>{note.date} // {note.time}</span>
                <span>&sect; {note.location}</span>
              </div>
            </div>

            <p className="font-sans text-base sm:text-lg text-ink-dark dark:text-paper-100 leading-relaxed font-normal">
              {note.thought}
            </p>

            {note.rawScratch && (
              <div className="p-2.5 bg-paper-50 dark:bg-paper-950 border border-ink-dark/10 text-[11px] text-ink-muted font-mono">
                <span className="text-accent font-bold mr-2">&gt; RAW TELEMETRY:</span>
                {note.rawScratch}
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Footer Return */}
      <div className="pt-8 border-t border-ink-dark/15 flex items-center justify-between font-mono text-xs">
        <Link href="/" className="text-accent underline font-bold uppercase">
          &larr; Return to Journal
        </Link>
        <span className="text-ink-muted">
          Updated in real-time from Tamsui &bull; 2026
        </span>
      </div>
    </div>
  );
}
