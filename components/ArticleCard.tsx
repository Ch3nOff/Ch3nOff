'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
  onHover?: (article: Article | null, mouseEvent?: React.MouseEvent) => void;
}

export default function ArticleCard({ article, onHover }: ArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    onHover?.(article, e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    onHover?.(article, e);
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`group relative border-b border-ink-dark/15 dark:border-paper-100/15 py-6 sm:py-8 transition-all duration-200 ${
        isHovered ? 'bg-accent/5 dark:bg-accent/10 px-4 -mx-4' : 'bg-transparent'
      }`}
    >
      <Link
        href={`/article/${article.slug}`}
        data-cursor="READ"
        className="block"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
          {/* Index Number & Type */}
          <div className="md:col-span-2 flex items-center md:flex-col md:items-start justify-between md:justify-start gap-1 font-mono text-xs">
            <span className="text-accent font-bold tracking-widest text-sm">
              [{article.number}]
            </span>
            <span className="text-[10px] text-ink-muted uppercase tracking-wider">
              {article.type} // {article.category}
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="md:col-span-7 space-y-1.5">
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-ink-dark dark:text-paper-50 group-hover:text-accent transition-colors duration-150 tracking-tight leading-snug">
              {article.title}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-ink-muted dark:text-paper-200/80 line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Metadata & Timestamp */}
          <div className="md:col-span-3 flex md:flex-col md:items-end justify-between text-right font-mono text-[11px] text-ink-muted/80 gap-1 pt-2 md:pt-0">
            <time dateTime={article.date} className="text-ink-dark dark:text-paper-100 font-medium">
              {article.date}
            </time>
            <div className="flex items-center gap-2">
              <span className="text-accent text-[9px] uppercase tracking-wider">
                {article.mood}
              </span>
              <span>•</span>
              <span>{article.readingTime}</span>
            </div>
            <span className="text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-sans">
              Open Essay &rarr;
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
