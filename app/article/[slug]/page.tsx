import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import { personalData } from '@/data/personal';
import ReadingProgress from '@/components/ReadingProgress';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: PageProps) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="relative pb-24">
      <ReadingProgress />

      {/* Article Top Breadcrumb & Metadata Stamp */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 border-b border-ink-dark/15 dark:border-paper-100/15">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-ink-muted uppercase">
          <Link
            href="/#essays"
            className="text-accent hover:underline flex items-center gap-1 font-bold"
          >
            &larr; Back to Index
          </Link>
          <div className="flex items-center gap-4">
            <span>PIECE [{article.number}]</span>
            <span>&bull;</span>
            <span>{article.category}</span>
            <span>&bull;</span>
            <span>{article.date}</span>
            <span>&bull;</span>
            <span className="text-accent font-bold">{article.readingTime}</span>
          </div>
        </div>
      </div>

      {/* Oversized Article Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-ink-dark/15 dark:border-paper-100/15">
        <div className="max-w-4xl space-y-4">
          <div className="font-mono text-xs text-accent tracking-widest uppercase">
            [ESSAY // ARCHIVE {article.year}]
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-ink-dark dark:text-paper-50 tracking-tight leading-[1.05]">
            {article.title}
          </h1>
          <p className="font-sans text-lg sm:text-xl text-ink-muted dark:text-paper-200/80 font-light leading-relaxed max-w-3xl pt-2">
            {article.subtitle}
          </p>
        </div>
      </header>

      {/* ───────────────────────────────────────────────────────────
          3-COLUMN EDITORIAL MAGAZINE READING EXPERIENCE
          Left: Chapter Index & Meta
          Center: Main Essay Narrative
          Right: Marginalia & Field Annotations
         ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Chapter Navigation & Author Meta (Sticky) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-8 font-mono text-xs border-b lg:border-b-0 lg:border-r border-ink-dark/10 dark:border-paper-100/10 pb-8 lg:pb-0 pr-0 lg:pr-6">
            <div className="space-y-3">
              <span className="text-[10px] text-accent font-bold uppercase tracking-widest">
                CHAPTER OUTLINE
              </span>
              <ul className="space-y-2 text-ink-dark/80 dark:text-paper-200/80 text-[11px]">
                {article.chapters.map((ch, idx) => (
                  <li key={ch.id} className="hover:text-accent transition-colors">
                    <a href={`#${ch.id}`} className="block leading-snug">
                      <span className="text-accent font-mono mr-1.5">0{idx + 1}.</span>
                      {ch.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-4 border-t border-ink-dark/10 dark:border-paper-100/10 text-[10px] text-ink-muted">
              <div>AUTHOR: {personalData.name} ({personalData.nativeName})</div>
              <div>LOCATION: {personalData.location}</div>
              <div>MOOD: <span className="text-accent font-bold uppercase">{article.mood}</span></div>
              <div className="pt-2">
                <a
                  href={personalData.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-accent"
                >
                  GitHub @Ch3nOff
                </a>
              </div>
            </div>
          </aside>

          {/* CENTER COLUMN: Main Article Content */}
          <main className="lg:col-span-6 space-y-12">
            {/* Lead Paragraph with Drop Cap */}
            <p className="drop-cap font-sans text-lg sm:text-xl text-ink-dark dark:text-paper-100 leading-relaxed font-light">
              {article.content.leadParagraph}
            </p>

            {/* Content Sections */}
            {article.content.sections.map((section, sIdx) => {
              const chapterMatch = article.chapters[sIdx];
              return (
                <section
                  key={sIdx}
                  id={chapterMatch ? chapterMatch.id : `section-${sIdx}`}
                  className="space-y-6 pt-4 scroll-mt-28"
                >
                  {section.heading && (
                    <h2 className="font-serif text-2xl sm:text-3xl text-ink-dark dark:text-paper-50 tracking-tight border-b border-ink-dark/15 dark:border-paper-100/15 pb-2">
                      {section.heading}
                    </h2>
                  )}

                  {section.subheading && (
                    <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                      {section.subheading}
                    </h3>
                  )}

                  {section.body.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="font-sans text-base sm:text-lg text-ink-dark/90 dark:text-paper-100/90 leading-relaxed font-normal"
                    >
                      {para}
                    </p>
                  ))}

                  {/* Inline Pull Quote */}
                  {section.pullQuote && (
                    <figure className="my-8 py-6 border-y-2 border-accent/40 px-4 sm:px-6 bg-accent/5 dark:bg-accent/10">
                      <blockquote className="font-serif italic text-xl sm:text-2xl text-ink-dark dark:text-paper-50 leading-snug">
                        &ldquo;{section.pullQuote}&rdquo;
                      </blockquote>
                    </figure>
                  )}

                  {/* ASCII or Mathematical Diagram */}
                  {section.diagram && (
                    <div className="my-6 p-4 border border-ink-dark/20 dark:border-paper-100/20 bg-paper-100/60 dark:bg-paper-900/60 font-mono text-[10px] sm:text-xs overflow-x-auto text-ink-dark dark:text-paper-100">
                      <div className="text-[9px] text-accent uppercase tracking-widest pb-2 mb-2 border-b border-ink-dark/10">
                        {section.diagram.title}
                      </div>
                      <pre className="leading-tight">{section.diagram.ascii}</pre>
                    </div>
                  )}

                  {/* Formatted Code Block */}
                  {section.codeBlock && (
                    <div className="my-6 border border-ink-dark/20 dark:border-paper-100/20 bg-ink-pure text-paper-100 p-4 font-mono text-xs overflow-x-auto">
                      <div className="flex justify-between items-center text-[9px] text-paper-200/60 pb-2 mb-2 border-b border-paper-100/10 uppercase tracking-widest">
                        <span>LANGUAGE: {section.codeBlock.language}</span>
                        <span>CH3NOFF KERNEL</span>
                      </div>
                      <pre className="leading-relaxed">{section.codeBlock.code}</pre>
                      {section.codeBlock.caption && (
                        <div className="text-[9px] text-paper-200/50 pt-2 mt-2 border-t border-paper-100/10 italic">
                          // {section.codeBlock.caption}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mobile Marginalia (Only visible on small screens) */}
                  {section.marginNote && (
                    <div className="lg:hidden p-3 bg-accent/5 border-l-2 border-accent font-hand text-accent text-sm">
                      Note: {section.marginNote}
                    </div>
                  )}
                </section>
              );
            })}

            {/* Footnotes Section */}
            {article.footnotes.length > 0 && (
              <footer className="pt-12 border-t border-ink-dark/20 dark:border-paper-100/20 space-y-4 font-mono text-xs">
                <div className="text-[10px] text-accent uppercase tracking-widest font-bold">
                  [FOOTNOTES &amp; FORMAL CITATIONS]
                </div>
                <ol className="space-y-2 list-decimal list-inside text-ink-muted text-[11px]">
                  {article.footnotes.map((fn) => (
                    <li key={fn.id} className="leading-relaxed">
                      <span className="text-ink-dark dark:text-paper-100 font-sans">{fn.text}</span>
                    </li>
                  ))}
                </ol>
              </footer>
            )}
          </main>

          {/* RIGHT COLUMN: Desktop Marginalia & Handwritten Notes */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 font-mono text-xs border-l border-ink-dark/10 dark:border-paper-100/10 pl-6">
            <span className="text-[10px] text-accent font-bold uppercase tracking-widest block">
              MARGINALIA &amp; NOTES
            </span>

            {article.content.sections.map((section, idx) => {
              if (!section.marginNote) return null;
              return (
                <div
                  key={idx}
                  className="p-3 bg-paper-100/50 dark:bg-paper-900/50 border border-ink-dark/10 dark:border-paper-100/10 space-y-1 relative"
                >
                  <span className="text-[8px] text-accent uppercase tracking-widest block">
                    ANNOTATION &sect; 0{idx + 1}
                  </span>
                  <p className="margin-hand text-base text-accent">
                    &ldquo;{section.marginNote}&rdquo;
                  </p>
                </div>
              );
            })}

            {/* Reference info */}
            <div className="p-4 border border-ink-dark/15 dark:border-paper-100/15 bg-paper-100/30 text-[10px] space-y-2">
              <div className="text-accent uppercase font-bold tracking-widest">
                PERSONAL DISCIPLINE
              </div>
              <p className="font-sans text-ink-dark/80 dark:text-paper-200/80 leading-normal">
                All code samples and algorithmic theorems are tested on real silicon before archiving.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
