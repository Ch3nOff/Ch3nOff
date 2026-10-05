import React from 'react';
import Link from 'next/link';
import { manifestoData } from '@/data/manifesto';
import { personalData } from '@/data/personal';

export default function ManifestoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-20">
      {/* Manifesto Header */}
      <header className="space-y-4 border-b-2 border-ink-dark dark:border-paper-50 pb-8">
        <div className="font-mono text-xs text-accent uppercase tracking-widest flex items-center justify-between">
          <span>[DOCUMENT 00 // PERSONAL MANIFESTO]</span>
          <span>EST. 2026</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-ink-dark dark:text-paper-50 tracking-tight leading-[1.05]">
          {manifestoData.headline}
        </h1>
        <p className="font-sans text-lg sm:text-xl text-ink-muted dark:text-paper-200/80 font-light leading-relaxed">
          {manifestoData.subheadline}
        </p>
      </header>

      {/* Structured Manifesto Core Sections */}
      <div className="space-y-16">
        {manifestoData.sections.map((sec, idx) => (
          <section key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-b border-ink-dark/15 dark:border-paper-100/15 pb-12">
            <div className="md:col-span-4 space-y-1 font-mono">
              <span className="text-xs text-accent font-bold tracking-widest uppercase">
                {sec.tag}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-ink-dark dark:text-paper-50 tracking-tight">
                {sec.title}
              </h2>
            </div>

            <div className="md:col-span-8 space-y-4 font-sans text-base sm:text-lg text-ink-dark/90 dark:text-paper-100/90 leading-relaxed font-light">
              <p className="font-medium text-ink-dark dark:text-paper-50 text-lg sm:text-xl italic font-serif">
                &ldquo;{sec.lead}&rdquo;
              </p>

              {sec.paragraphs && sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}

              {sec.items && (
                <ul className="space-y-3 pt-2 font-mono text-xs sm:text-sm text-ink-dark dark:text-paper-100">
                  {sec.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2.5">
                      <span className="text-accent font-bold">&sect;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* THINGS I CHANGED MY MIND ABOUT */}
      <section className="space-y-8 border-b border-ink-dark/15 dark:border-paper-100/15 pb-16">
        <div className="space-y-1 font-mono">
          <span className="text-xs text-accent font-bold tracking-widest uppercase">
            [REVISIONS // INTELLECTUAL HUMILITY]
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink-dark dark:text-paper-50">
            Things I Changed My Mind About
          </h2>
        </div>

        <div className="space-y-6">
          {manifestoData.mindChanged.map((item, idx) => (
            <div
              key={idx}
              className="border border-ink-dark/20 dark:border-paper-100/20 p-6 bg-paper-100/30 dark:bg-paper-900/30 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="space-y-1 border-l-2 border-ink-muted/40 pl-3">
                  <span className="text-ink-muted text-[10px] uppercase tracking-wider block">PREVIOUS ASSUMPTION</span>
                  <p className="text-ink-dark/70 dark:text-paper-200/70 line-through">{item.previous}</p>
                </div>
                <div className="space-y-1 border-l-2 border-accent pl-3">
                  <span className="text-accent text-[10px] uppercase tracking-wider block">CURRENT CONVICTION</span>
                  <p className="text-ink-dark dark:text-paper-100 font-bold">{item.current}</p>
                </div>
              </div>
              <div className="text-xs font-sans text-ink-muted pt-2 border-t border-ink-dark/10">
                <span className="font-mono text-accent font-bold">REASON FOR SHIFT: </span>
                {item.reason}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LAST 10 THINGS I DISCOVERED */}
      <section className="space-y-8 pb-12">
        <div className="space-y-1 font-mono">
          <span className="text-xs text-accent font-bold tracking-widest uppercase">
            [EMPIRICAL LOG // 10 RECENT DISCOVERIES]
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink-dark dark:text-paper-50">
            Observations from Bench &amp; Code
          </h2>
        </div>

        <div className="divide-y divide-ink-dark/15 dark:divide-paper-100/15 font-mono text-xs">
          {manifestoData.tenDiscoveries.map((disc) => (
            <div key={disc.number} className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
              <span className="md:col-span-1 text-accent font-bold text-sm">
                [{disc.number}]
              </span>
              <div className="md:col-span-6 font-sans text-base text-ink-dark dark:text-paper-100 font-medium">
                {disc.statement}
              </div>
              <div className="md:col-span-5 text-ink-muted text-[11px] leading-relaxed">
                // {disc.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-ink-dark/15 flex items-center justify-between font-mono text-xs">
        <Link href="/" className="text-accent underline font-bold uppercase">
          &larr; Return to Journal
        </Link>
        <span className="text-ink-muted">
          Coordinates: {personalData.coordinates}
        </span>
      </div>
    </div>
  );
}
