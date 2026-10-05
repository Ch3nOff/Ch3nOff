'use client';

import React, { useState } from 'react';

interface InteractiveFootnoteProps {
  term: string;
  annotation: string;
  tag?: string;
  children?: React.ReactNode;
}

export default function InteractiveFootnote({ term, annotation, tag = 'NOTE', children }: InteractiveFootnoteProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span
        data-cursor="INSPECT"
        className="cursor-help border-b border-accent/70 text-ink-dark dark:text-paper-100 font-medium hover:text-accent dark:hover:text-accent transition-colors"
      >
        {children || term}
        <sup className="text-[9px] font-mono text-accent ml-0.5 font-bold">[*]</sup>
      </span>

      {isOpen && (
        <span className="absolute z-40 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-paper-50 dark:bg-paper-900 border border-accent/40 shadow-xl text-left block pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <span className="block text-[8px] font-mono tracking-widest text-accent uppercase pb-1 mb-1 border-b border-ink-dark/10 dark:border-paper-100/10 flex justify-between">
            <span>[MARGINALIA // {tag}]</span>
            <span>§ REF</span>
          </span>
          <span className="block text-[11px] font-sans text-ink-dark dark:text-paper-100 leading-snug">
            {annotation}
          </span>
        </span>
      )}
    </span>
  );
}
