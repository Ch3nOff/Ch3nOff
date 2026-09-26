'use client';

import React, { useEffect, useState } from 'react';
import { Article } from '@/data/articles';

interface FloatingPreviewProps {
  activeArticle: Article | null;
  cursorPos: { x: number; y: number };
}

export default function FloatingPreview({ activeArticle, cursorPos }: FloatingPreviewProps) {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    if (!activeArticle) return;
    // Smooth trailing follow
    setPos({
      x: cursorPos.x + 24,
      y: cursorPos.y + 12,
    });
  }, [activeArticle, cursorPos]);

  if (!activeArticle) return null;

  return (
    <div
      className="pointer-events-none fixed z-30 hidden lg:block transition-all duration-100 ease-out select-none"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'rotate(-1.5deg)',
      }}
    >
      <div className="w-72 bg-paper-50 dark:bg-paper-950 border border-ink-dark/30 dark:border-paper-100/30 p-3 shadow-2xl space-y-2">
        {/* Schematic Preview Box */}
        <div className="w-full h-36 bg-paper-200/60 dark:bg-paper-800/80 border border-ink-dark/15 dark:border-paper-100/15 flex flex-col justify-between p-2.5 overflow-hidden relative">
          <div className="flex justify-between items-center text-[9px] font-mono text-accent">
            <span>PREVIEW // FIG.{activeArticle.number}</span>
            <span>{activeArticle.category}</span>
          </div>

          <div className="font-mono text-[10px] text-ink-dark/70 dark:text-paper-100/70 line-clamp-3 leading-tight italic bg-paper-50/70 dark:bg-paper-900/70 p-2 border border-ink-dark/5">
            &ldquo;{activeArticle.previewImagePrompt}&rdquo;
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-ink-muted">
            <span>TAIPEI // ARCHIVE</span>
            <span className="text-accent font-bold">CLICK TO READ &rarr;</span>
          </div>
        </div>

        {/* Caption */}
        <div className="text-[10px] font-mono text-ink-dark dark:text-paper-100 flex items-center justify-between pt-1">
          <span className="font-bold uppercase tracking-wider">{activeArticle.title.slice(0, 32)}...</span>
          <span className="text-accent">{activeArticle.readingTime}</span>
        </div>
      </div>
    </div>
  );
}
