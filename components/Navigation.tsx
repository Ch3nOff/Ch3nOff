'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BassSynth from './BassSynth';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Clock in Taipei / Taiwan time
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Taipei',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(`${timeStr} TPE`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  const navItems = [
    { name: 'INDEX', href: '/' },
    { name: 'ESSAYS', href: '/#essays' },
    { name: 'ARTIFACTS', href: '/artifacts' },
    { name: 'MANIFESTO', href: '/manifesto' },
    { name: 'ARCHIVE', href: '/archive' },
    { name: 'NOTES', href: '/notes' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-mono text-[11px] ${
        isScrolled
          ? 'bg-paper-50/90 dark:bg-paper-950/90 backdrop-blur-md border-b border-ink-dark/15 dark:border-paper-100/15 py-2.5'
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand / Archive Stamp */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              data-cursor="HOME"
              className="flex items-center gap-2 group tracking-widest text-ink-dark dark:text-paper-50"
            >
              <span className="w-2 h-2 bg-accent inline-block transform group-hover:rotate-45 transition-transform"></span>
              <span className="font-bold tracking-widest">CH3NOFF</span>
              <span className="text-ink-muted hidden sm:inline">// 陳軍宇</span>
            </Link>
            <span className="hidden md:inline-block text-[9px] text-ink-muted/60 pl-2 border-l border-ink-dark/10 dark:border-paper-100/10">
              [PERSONAL ARCHIVE // 2026]
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[10px] tracking-widest">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  data-cursor="GOTO"
                  className={`transition-colors uppercase flex items-center gap-1 ${
                    isActive
                      ? 'text-accent font-bold'
                      : 'text-ink-dark/80 dark:text-paper-100/80 hover:text-accent dark:hover:text-accent'
                  }`}
                >
                  <span className="text-ink-muted text-[8px]">0{idx + 1}.</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Tools: Slap Bass + Time + Dark Mode + Secret Drawer hint */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden sm:block">
              <BassSynth />
            </div>

            <div className="hidden xl:block text-[9px] text-ink-muted tracking-widest font-mono">
              {currentTime || '21:35 CST'}
            </div>

            {/* Ink density toggle (Dark/Paper) */}
            <button
              onClick={toggleDarkMode}
              data-cursor="SHIFT"
              title="Toggle Paper / Ink Night density"
              className="px-2 py-1 border border-ink-dark/20 dark:border-paper-100/20 text-[10px] uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
            >
              {isDark ? 'PAPER' : 'INK'}
            </button>

            {/* Field notes drawer key trigger */}
            <span
              title="Press '?' on your keyboard to reveal secret field scratchpad"
              className="hidden md:inline-block px-1.5 py-0.5 text-[9px] text-accent border border-accent/40 bg-accent/5 font-mono cursor-help"
            >
              [?] DRAWER
            </span>
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="flex lg:hidden items-center justify-between overflow-x-auto py-1 mt-2 border-t border-ink-dark/10 dark:border-paper-100/10 text-[10px] tracking-wider gap-4 scrollbar-none">
          {navItems.map((item, idx) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-ink-dark dark:text-paper-100 hover:text-accent shrink-0 uppercase"
            >
              0{idx + 1}. {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
