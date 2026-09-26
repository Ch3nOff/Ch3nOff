'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { personalData } from '@/data/personal';
import { fieldNotes } from '@/data/notes';

export default function FieldDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink-pure/60 backdrop-blur-xs transition-opacity duration-200">
      <div className="w-full max-w-xl h-full bg-paper-50 dark:bg-paper-950 border-l border-ink-dark/20 dark:border-paper-100/20 p-6 md:p-8 flex flex-col justify-between overflow-y-auto font-mono text-ink-dark dark:text-paper-50 shadow-2xl animate-in slide-in-from-right duration-200">
        <div>
          <div className="flex items-center justify-between border-b border-ink-dark/15 dark:border-paper-100/15 pb-4 mb-6">
            <div>
              <span className="text-xs text-accent font-bold tracking-widest uppercase">
                [SECRET ARCHIVE DRAWER // PRESS ESC TO EXIT]
              </span>
              <p className="text-[10px] text-ink-muted mt-0.5">
                RAW UNFILTERED SCRATCHPAD & TELEMETRY LOGS
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs px-2 py-1 border border-ink-dark/20 hover:border-accent hover:text-accent transition-colors"
            >
              [ESC / CLOSE]
            </button>
          </div>

          {/* Identity Coordinates */}
          <div className="border border-ink-dark/10 p-3 bg-paper-100/50 dark:bg-paper-900/50 mb-6 text-xs space-y-1">
            <div className="text-[10px] text-accent uppercase font-bold tracking-widest">
              IDENTITY SIGNATURE
            </div>
            <div>NAME: {personalData.name} ({personalData.nativeName})</div>
            <div>GITHUB: <a href={personalData.links.github} target="_blank" rel="noreferrer" className="underline hover:text-accent">@Ch3nOff</a></div>
            <div>PYPI PACKAGE: <a href={personalData.links.pypi} target="_blank" rel="noreferrer" className="underline hover:text-accent">dual-loop-controller v2.5.0</a></div>
            <div>YOUTUBE: <a href={personalData.links.youtube} target="_blank" rel="noreferrer" className="underline hover:text-accent">Chen Gaming (@ch3ng4m1ngyt)</a></div>
            <div>EMAIL: <a href={`mailto:${personalData.links.email}`} className="underline hover:text-accent">{personalData.links.email}</a></div>
            <div>LOCATION: {personalData.location} [{personalData.coordinates}]</div>
            <div>ACADEMIC: {personalData.academic.institution} — {personalData.academic.major}</div>
          </div>

          {/* Raw Scratches */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xs uppercase tracking-widest text-ink-muted border-b border-ink-dark/10 pb-1">
              FIELD NOTE STREAM (CHRONOLOGICAL)
            </h3>
            {fieldNotes.map((note) => (
              <div key={note.id} className="text-xs border-l-2 border-accent/60 pl-3 py-1 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-ink-muted">
                  <span>{note.date} // {note.time}</span>
                  <span className="text-accent">{note.tag}</span>
                </div>
                <p className="font-sans text-[13px] text-ink-dark/90 dark:text-paper-100/90 leading-relaxed">
                  {note.thought}
                </p>
                {note.rawScratch && (
                  <div className="text-[10px] text-ink-muted font-mono bg-paper-100 dark:bg-paper-800 p-1.5 mt-1 border border-ink-dark/5">
                    &gt; {note.rawScratch}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-ink-dark/15 dark:border-paper-100/15 flex items-center justify-between text-[10px] text-ink-muted">
          <span>HINT: TYPE &apos;B&apos; ANYTIME FOR SLAP BASS FREQUENCY</span>
          <Link href="/manifesto" onClick={() => setIsOpen(false)} className="text-accent underline font-bold">
            READ MANIFESTO &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
