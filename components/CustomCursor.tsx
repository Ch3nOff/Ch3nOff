'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'text' | 'action'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setCursorType('action');
      } else if (target.closest('a, button, input, [role="button"]')) {
        setCursorText('');
        setCursorType('hover');
      } else if (target.closest('p, h1, h2, h3, h4, span')) {
        setCursorText('');
        setCursorType('text');
      } else {
        setCursorText('');
        setCursorType('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out select-none hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      {cursorText ? (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-ink-dark text-paper-50 dark:bg-paper-50 dark:text-ink-dark text-[10px] font-mono tracking-widest uppercase border border-accent/40 shadow-sm rounded-none">
          <span className="w-1.5 h-1.5 bg-accent inline-block animate-pulse"></span>
          <span>{cursorText}</span>
        </div>
      ) : cursorType === 'hover' ? (
        <div className="w-8 h-8 rounded-full border border-accent/80 bg-accent/10 transition-all duration-150 scale-110 flex items-center justify-center">
          <div className="w-1 h-1 bg-accent rounded-full"></div>
        </div>
      ) : cursorType === 'text' ? (
        <div className="w-1 h-5 bg-accent/70 transition-all duration-100"></div>
      ) : (
        <div className="w-2.5 h-2.5 bg-ink-dark/80 dark:bg-paper-50/80 rounded-full transition-all duration-100 ring-1 ring-ink-muted/30"></div>
      )}
    </div>
  );
}
