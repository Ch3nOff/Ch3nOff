'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { articles } from '@/data/articles';

export default function ArchivePage() {
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedMood, setSelectedMood] = useState<string>('ALL');

  // Extract unique filter values
  const years = useMemo(() => ['ALL', ...Array.from(new Set(articles.map((a) => a.year)))], []);
  const topics = useMemo(() => ['ALL', ...Array.from(new Set(articles.map((a) => a.category)))], []);
  const types = useMemo(() => ['ALL', ...Array.from(new Set(articles.map((a) => a.type)))], []);
  const moods = useMemo(() => ['ALL', ...Array.from(new Set(articles.map((a) => a.mood)))], []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchYear = selectedYear === 'ALL' || a.year === selectedYear;
      const matchTopic = selectedTopic === 'ALL' || a.category === selectedTopic;
      const matchType = selectedType === 'ALL' || a.type === selectedType;
      const matchMood = selectedMood === 'ALL' || a.mood === selectedMood;
      return matchYear && matchTopic && matchType && matchMood;
    });
  }, [selectedYear, selectedTopic, selectedType, selectedMood]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Header */}
      <header className="space-y-4 border-b-2 border-ink-dark dark:border-paper-50 pb-8">
        <div className="font-mono text-xs text-accent uppercase tracking-widest flex items-center justify-between">
          <span>[LEDGER 03 // COMPLETE CHRONOLOGICAL ARCHIVE]</span>
          <span>ENTRIES: [{articles.length}]</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-ink-dark dark:text-paper-50 tracking-tight leading-[1.05]">
          Chronological Field Archive
        </h1>
        <p className="font-sans text-lg sm:text-xl text-ink-muted dark:text-paper-200/80 font-light leading-relaxed max-w-3xl">
          A temporal record of architectural essays, physical mechanics, and system reflections.
        </p>
      </header>

      {/* Minimal Filter Bar */}
      <div className="border border-ink-dark/15 dark:border-paper-100/15 p-4 sm:p-6 bg-paper-100/40 dark:bg-paper-900/40 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-ink-dark/10 pb-2 text-[10px] text-accent font-bold uppercase tracking-widest">
          <span>FILTER PARAMETERS</span>
          <button
            onClick={() => {
              setSelectedYear('ALL');
              setSelectedTopic('ALL');
              setSelectedType('ALL');
              setSelectedMood('ALL');
            }}
            className="hover:underline text-ink-muted"
          >
            [RESET ALL FILTERS]
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Year */}
          <div className="space-y-1">
            <span className="text-[10px] text-ink-muted uppercase block">YEAR</span>
            <div className="flex flex-wrap gap-1">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-2 py-0.5 text-[10px] uppercase border transition-colors ${
                    selectedYear === y
                      ? 'bg-accent text-white border-accent'
                      : 'border-ink-dark/15 dark:border-paper-100/15 hover:border-accent'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Topic */}
          <div className="space-y-1">
            <span className="text-[10px] text-ink-muted uppercase block">TOPIC</span>
            <div className="flex flex-wrap gap-1">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`px-2 py-0.5 text-[10px] uppercase border transition-colors ${
                    selectedTopic === t
                      ? 'bg-accent text-white border-accent'
                      : 'border-ink-dark/15 dark:border-paper-100/15 hover:border-accent'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          <div className="space-y-1">
            <span className="text-[10px] text-ink-muted uppercase block">TYPE</span>
            <div className="flex flex-wrap gap-1">
              {types.map((tp) => (
                <button
                  key={tp}
                  onClick={() => setSelectedType(tp)}
                  className={`px-2 py-0.5 text-[10px] uppercase border transition-colors ${
                    selectedType === tp
                      ? 'bg-accent text-white border-accent'
                      : 'border-ink-dark/15 dark:border-paper-100/15 hover:border-accent'
                  }`}
                >
                  {tp}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div className="space-y-1">
            <span className="text-[10px] text-ink-muted uppercase block">MOOD</span>
            <div className="flex flex-wrap gap-1">
              {moods.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMood(m)}
                  className={`px-2 py-0.5 text-[10px] uppercase border transition-colors ${
                    selectedMood === m
                      ? 'bg-accent text-white border-accent'
                      : 'border-ink-dark/15 dark:border-paper-100/15 hover:border-accent'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chronological Archive Table / List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-ink-muted border-b border-ink-dark/15 pb-2">
          <span>MATCHING ENTRIES: [{filteredArticles.length}]</span>
          <span>SORT: CHRONOLOGICAL DESCENDING</span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center font-mono text-xs text-ink-muted border border-dashed border-ink-dark/20">
            No entries matching the selected filter combination.
          </div>
        ) : (
          <div className="divide-y divide-ink-dark/15 dark:divide-paper-100/15 font-mono text-xs">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline hover:bg-accent/5 transition-colors px-2 -mx-2"
              >
                <div className="md:col-span-1 text-accent font-bold">
                  [{art.number}]
                </div>

                <div className="md:col-span-2 text-ink-muted text-[11px]">
                  {art.date}
                </div>

                <div className="md:col-span-6 space-y-1 font-sans">
                  <Link
                    href={`/article/${art.slug}`}
                    className="font-serif text-xl sm:text-2xl text-ink-dark dark:text-paper-50 hover:text-accent font-medium leading-snug block"
                  >
                    {art.title}
                  </Link>
                  <p className="text-xs text-ink-muted line-clamp-1">
                    {art.subtitle}
                  </p>
                </div>

                <div className="md:col-span-3 flex md:flex-col md:items-end justify-between text-right text-[10px] text-ink-muted gap-1">
                  <span className="text-accent font-bold uppercase">{art.category}</span>
                  <span>{art.readingTime} &bull; {art.mood}</span>
                  <Link
                    href={`/article/${art.slug}`}
                    className="text-accent hover:underline hidden md:inline"
                  >
                    Open &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Return */}
      <div className="pt-8 border-t border-ink-dark/15 flex items-center justify-between font-mono text-xs">
        <Link href="/" className="text-accent underline font-bold uppercase">
          &larr; Return to Journal
        </Link>
        <span className="text-ink-muted">
          All entries self-authored &bull; 2026 Archive
        </span>
      </div>
    </div>
  );
}
