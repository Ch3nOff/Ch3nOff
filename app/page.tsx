'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { personalData } from '@/data/personal';
import { articles, Article } from '@/data/articles';
import { artifacts } from '@/data/artifacts';
import { fieldNotes } from '@/data/notes';
import GenerativeCanvas from '@/components/GenerativeCanvas';
import ArticleCard from '@/components/ArticleCard';
import FloatingPreview from '@/components/FloatingPreview';
import RubikVisualizer from '@/components/RubikVisualizer';
import InteractiveFootnote from '@/components/InteractiveFootnote';

export default function HomePage() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleArticleHover = (article: Article | null, e?: React.MouseEvent) => {
    setActiveArticle(article);
    if (e) {
      setCursorPos({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-36 pb-24">
      {/* Floating preview for hovered articles */}
      <FloatingPreview activeArticle={activeArticle} cursorPos={cursorPos} />

      {/* ───────────────────────────────────────────────────────────
          01. OPENING SPREAD / JOURNAL HERO (NOT A SAAS LANDING PAGE)
         ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-6 sm:pt-12 border-b border-ink-dark/15 dark:border-paper-100/15 pb-16 sm:pb-24">
        {/* Top Technical Metadata Ledger */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-widest text-ink-muted border-b border-ink-dark/10 dark:border-paper-100/10 pb-3 mb-10 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent"></span>
            <span>ENTRY // VOL. 2026.09</span>
          </div>
          <div className="hidden sm:block">
            COORDINATES: {personalData.coordinates}
          </div>
          <div>
            AFFILIATION: TAMKANG UNIV // DEPT OF AI &amp; CS
          </div>
          <div className="text-accent font-bold">
            LAST_REVISION: {personalData.lastUpdated}
          </div>
        </div>

        {/* Asymmetrical Editorial Name & Generative Canvas Opening */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left / Center Typography Stack */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative">
              {/* Vertical stamp */}
              <div className="hidden xl:block absolute -left-12 top-2 text-[9px] font-mono tracking-ultra vertical-rl text-ink-muted/70 uppercase">
                ARCHIVE DEPT // 09-26-2026
              </div>

              {/* Fragmented Layered Name */}
              <div className="space-y-1">
                <span className="block font-mono text-xs text-accent tracking-widest uppercase">
                  [AUTHOR &bull; RESEARCH JOURNAL]
                </span>
                <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-ink-dark dark:text-paper-50 leading-[0.88]">
                  MATTHEW
                </h1>
                <div className="flex items-baseline gap-4 sm:gap-8 flex-wrap">
                  <span className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ink-dark/90 dark:text-paper-100 tracking-tight">
                    CHEN
                  </span>
                  <span className="font-serif text-3xl sm:text-5xl md:text-6xl text-accent font-light tracking-wide">
                    陳軍宇
                  </span>
                  <span className="font-mono text-xs text-ink-muted border border-ink-dark/20 dark:border-paper-100/20 px-2 py-0.5 self-center">
                    @Ch3nOff
                  </span>
                </div>
              </div>
            </div>

            {/* Field Manifesto Paragraph */}
            <p className="font-sans text-base sm:text-lg lg:text-xl text-ink-dark/90 dark:text-paper-100/90 max-w-2xl leading-relaxed pt-4 font-light">
              I started this archive because folders on my laptop were turning into a tangled second brain.
              I work on{' '}
              <InteractiveFootnote
                term="small language models"
                annotation="Small Language Models (350M–750M) with sparse MoE routing running locally on laptop NPU silicon without internet dependency."
                tag="AI_KERNELS"
              >
                sparse small language models
              </InteractiveFootnote>
              , write{' '}
              <InteractiveFootnote
                term="dual-loop control theory"
                annotation="Published PyPI package dual-loop-controller v2.5.0: nested velocity-position loops eliminating motor overshoot."
                tag="PYPI_PACKAGE"
              >
                cascaded feedback algorithms
              </InteractiveFootnote>
              , slap funk grooves on a 4-string bass, and study Traditional Chinese characters in Tamsui.
            </p>

            {/* Live Thinking Status & Quick Meta */}
            <div className="pt-4 border-t border-ink-dark/10 dark:border-paper-100/10 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-accent tracking-widest uppercase">CURRENTLY THINKING ABOUT:</span>
                <p className="text-ink-dark dark:text-paper-100 font-medium">
                  Grouped-Subspace Latent Attention &amp; eliminating KV-cache memory saturation on 15W NPU silicon.
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-accent tracking-widest uppercase">HARDWARE TESTBED:</span>
                <p className="text-ink-dark dark:text-paper-100 font-medium">
                  Intel Core Ultra + RTX 40/50 Series / ESP32 BLE Mesh Nodes / Custom Slap Bass Rig.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Element: Generative Canvas & Physical Specs */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border border-ink-dark/20 dark:border-paper-100/20 p-2 bg-paper-100/40 dark:bg-paper-900/40">
              <GenerativeCanvas className="w-full h-64 sm:h-72" intensity={1.2} />
            </div>
            <div className="p-3 bg-paper-100/60 dark:bg-paper-900/60 border border-ink-dark/10 text-[10px] font-mono text-ink-muted space-y-1.5">
              <div className="flex justify-between border-b border-ink-dark/10 pb-1 text-ink-dark dark:text-paper-100 font-bold">
                <span>TELEMETRY GAUGES</span>
                <span className="text-accent">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>PYPI PACKAGE:</span>
                <a href={personalData.links.pypi} target="_blank" rel="noreferrer" className="underline hover:text-accent">
                  dual-loop-controller v2.5.0
                </a>
              </div>
              <div className="flex justify-between">
                <span>GITHUB REPO:</span>
                <a href={personalData.links.repo} target="_blank" rel="noreferrer" className="underline hover:text-accent">
                  Ch3nOff/Ch3nOff
                </a>
              </div>
              <div className="flex justify-between">
                <span>YOUTUBE CHANNEL:</span>
                <a href={personalData.links.youtube} target="_blank" rel="noreferrer" className="underline hover:text-accent">
                  Chen Gaming
                </a>
              </div>
              <div className="flex justify-between">
                <span>CONTACT:</span>
                <a href={`mailto:${personalData.links.email}`} className="underline hover:text-accent">
                  {personalData.links.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          02. EDITORIAL ESSAYS / WRITING (ARCHIVE ARCHITECTURE)
         ─────────────────────────────────────────────────────────── */}
      <section id="essays" className="space-y-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-ink-dark dark:border-paper-50 pb-4 gap-2">
          <div>
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
              [COLLECTION 01 // LONGFORM THINKING]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink-dark dark:text-paper-50 tracking-tight">
              Selected Writings &amp; Architectures
            </h2>
          </div>
          <div className="text-right font-mono text-xs text-ink-muted">
            TOTAL PIECES: [05] &bull; 2026 ARCHIVE
          </div>
        </div>

        {/* Editorial Articles List with cursor preview */}
        <div className="divide-y divide-ink-dark/10 dark:divide-paper-100/10">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onHover={handleArticleHover}
            />
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 font-mono text-xs">
          <span className="text-ink-muted">
            &darr; Hover over any title to inspect architectural sketch
          </span>
          <Link
            href="/archive"
            data-cursor="EXPAND"
            className="text-accent underline font-bold uppercase tracking-wider hover:text-accent-dark"
          >
            Browse Full Chronological Archive &rarr;
          </Link>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          03. PUBLISHED ARTIFACTS, PACKAGES & REPOSITORIES
         ─────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-ink-dark dark:border-paper-50 pb-4 gap-2">
          <div>
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
              [COLLECTION 02 // HARDWARE &amp; CODE ARTIFACTS]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink-dark dark:text-paper-50 tracking-tight">
              Published Libraries &amp; Systems
            </h2>
          </div>
          <div className="font-mono text-xs text-ink-muted">
            ZERO GENERIC CRUD &bull; LOW-LEVEL MECHANICS
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artifacts.slice(0, 6).map((art) => (
            <div
              key={art.id}
              className="border border-ink-dark/20 dark:border-paper-100/20 p-5 bg-paper-100/30 dark:bg-paper-900/30 flex flex-col justify-between space-y-4 hover:border-accent transition-colors group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-accent font-bold uppercase">
                    [{art.category}]
                  </span>
                  <span className="text-ink-muted border border-ink-dark/15 dark:border-paper-100/15 px-1.5 py-0.2">
                    {art.status}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-ink-dark dark:text-paper-50 group-hover:text-accent transition-colors">
                  {art.name}
                  {art.version && <span className="text-xs font-mono ml-2 text-ink-muted">{art.version}</span>}
                </h3>

                <p className="font-sans text-xs text-ink-dark/80 dark:text-paper-200/80 leading-relaxed">
                  {art.oneLiner}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-ink-dark/10 dark:border-paper-100/10">
                <div className="flex flex-wrap gap-1 font-mono text-[9px]">
                  {art.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 bg-paper-200 dark:bg-paper-800 text-ink-dark dark:text-paper-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  {art.links.pypi && (
                    <a
                      href={art.links.pypi}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="PYPI"
                      className="text-accent underline font-bold"
                    >
                      PyPI Page &rarr;
                    </a>
                  )}
                  {art.links.github && (
                    <a
                      href={art.links.github}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="CODE"
                      className="hover:text-accent transition-colors underline"
                    >
                      Source &rarr;
                    </a>
                  )}
                  {art.links.youtube && (
                    <a
                      href={art.links.youtube}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="WATCH"
                      className="hover:text-accent transition-colors underline"
                    >
                      Video Demo &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          04. THE SENSORY CORNER (SPATIAL COMBINATORICS & ACOUSTICS)
         ─────────────────────────────────────────────────────────── */}
      <section className="space-y-6 border border-ink-dark/20 dark:border-paper-100/20 p-6 sm:p-8 bg-paper-100/20 dark:bg-paper-900/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-ink-dark/15 dark:border-paper-100/15 pb-3 gap-2 font-mono">
          <span className="text-xs uppercase tracking-widest text-accent font-bold">
            [SECTION 03 // PHYSICAL HOBBIES &amp; SENSORY DISCIPLINE]
          </span>
          <span className="text-[10px] text-ink-muted">
            SPEEDCUBING &bull; SLAP BASS &bull; DISTRIBUTED SERVERS &bull; CAPSA
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Rubik's Cube Scrambler Widget */}
          <div className="lg:col-span-6 space-y-4">
            <RubikVisualizer />
            <p className="font-sans text-xs text-ink-dark/80 dark:text-paper-200/80 leading-relaxed italic">
              &ldquo;Treating the 3x3 cube as a 43-quintillion state graph. Your fingers execute muscle memory while your eyes track the next cross edge before the current pair even seats.&rdquo;
            </p>
          </div>

          {/* Slap Bass & Card Theory Breakdown */}
          <div className="lg:col-span-6 space-y-5 font-mono text-xs">
            <div className="border border-ink-dark/15 dark:border-paper-100/15 p-4 space-y-2 bg-paper-50 dark:bg-paper-900">
              <div className="flex justify-between items-center text-[10px] text-accent font-bold">
                <span>BASS GUITAR SLAP PHYSICS</span>
                <span>118 BPM POCKET</span>
              </div>
              <p className="font-sans text-xs text-ink-dark/90 dark:text-paper-100/90 leading-relaxed">
                Slap bass requires thumb recoil against the nickel-silver fret wire within 1.2ms. Press key <kbd className="px-1 py-0.5 bg-paper-200 dark:bg-paper-800 border font-mono">B</kbd> anywhere on the site to hear the Web Audio synthesized slap transient.
              </p>
            </div>

            <div className="border border-ink-dark/15 dark:border-paper-100/15 p-4 space-y-2 bg-paper-50 dark:bg-paper-900">
              <div className="flex justify-between items-center text-[10px] text-accent font-bold">
                <span>CAPSA BANTING &amp; SUSUN (BIG TWO THEORY)</span>
                <span>52-CARD ASYMMETRY</span>
              </div>
              <p className="font-sans text-xs text-ink-dark/90 dark:text-paper-100/90 leading-relaxed">
                A study in tempo dictation and incomplete information. Knowing when to pass high Spades to force out royal combinations teaches more risk hedging than corporate spreadsheets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          05. RECENT FIELD SCRATCHPAD (STREAM OF CONSCIOUSNESS)
         ─────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-ink-dark/15 dark:border-paper-100/15 pb-2 font-mono">
          <span className="text-xs uppercase tracking-widest text-accent font-bold">
            [SECTION 04 // LIVE FIELD NOTES &amp; MARGINALIA]
          </span>
          <Link href="/notes" className="text-xs underline text-ink-muted hover:text-accent">
            View All Notes &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fieldNotes.slice(0, 3).map((note) => (
            <div
              key={note.id}
              className="border-l-2 border-accent/60 pl-4 py-2 space-y-2 bg-paper-100/30 dark:bg-paper-900/30 font-mono text-xs"
            >
              <div className="flex justify-between text-[10px] text-ink-muted">
                <span>{note.date}</span>
                <span className="text-accent">{note.tag}</span>
              </div>
              <p className="font-sans text-sm text-ink-dark dark:text-paper-100 leading-snug">
                {note.thought}
              </p>
              <div className="text-[10px] text-ink-muted/80 pt-1">
                &sect; {note.location}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          06. CLOSING MANIFESTO CALLOUT
         ─────────────────────────────────────────────────────────── */}
      <section className="border-t-2 border-ink-dark dark:border-paper-50 pt-12 pb-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline font-mono">
        <div className="md:col-span-3 text-xs text-accent font-bold uppercase tracking-widest">
          MANIFESTO // CC5+ ETHOS
        </div>
        <div className="md:col-span-9 space-y-4">
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink-dark dark:text-paper-50 italic leading-snug">
            &ldquo;Competence without compassion is dangerous; creativity without conviction is hollow. We build tools to expand human autonomy, not to feed automated slop.&rdquo;
          </blockquote>
          <div className="flex items-center gap-6 text-xs pt-2">
            <Link href="/manifesto" className="text-accent font-bold underline uppercase tracking-widest">
              Read Complete Personal Manifesto &rarr;
            </Link>
            <span className="text-ink-muted">
              Press &apos;?&apos; for secret archive drawer
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
