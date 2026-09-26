import type { Metadata } from 'next';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import FieldDrawer from '@/components/FieldDrawer';

export const metadata: Metadata = {
  title: 'Matthew Chen (陳軍宇) — Personal Archive & Field Journal',
  description: 'Digital journal, visual diary, and experimental engineering archive of Matthew Chen (Ch3nOff). Small Language Models, dual-loop control systems, and tactile computing.',
  authors: [{ name: 'Matthew Chen (陳軍宇)', url: 'https://github.com/Ch3nOff' }],
  keywords: ['Matthew Chen', 'Ch3nOff', 'Tamkang University', 'dual-loop-controller', 'Small Language Models', 'Slap Bass', 'Robotics'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="paper-grain">
      <body className="bg-paper-50 text-ink-dark dark:bg-paper-950 dark:text-paper-50 min-h-screen selection:bg-accent selection:text-white transition-colors duration-200">
        <CustomCursor />
        <Navigation />
        <FieldDrawer />
        <div className="pt-20 sm:pt-24 min-h-screen flex flex-col justify-between">
          <main className="flex-1">
            {children}
          </main>

          {/* Editorial Footer */}
          <footer className="border-t border-ink-dark/15 dark:border-paper-100/15 py-12 px-4 sm:px-6 lg:px-8 font-mono text-[11px] text-ink-muted">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="text-ink-dark dark:text-paper-100 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent inline-block"></span>
                  MATTHEW CHEN // 陳軍宇
                </div>
                <div className="text-[10px]">
                  TAMSUI / NEW TAIPEI CITY &bull; TANGERANG &bull; 22°42&apos;N 120°29&apos;E
                </div>
                <div className="text-[9px] text-ink-muted/70">
                  HANDCRAFTED EDITORIAL ARCHIVE &bull; ZERO TEMPLATES &bull; VERMILION &amp; PAPER
                </div>
              </div>

              {/* Direct links */}
              <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-wider">
                <a
                  href="https://github.com/Ch3nOff"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="LINK"
                  className="hover:text-accent transition-colors underline"
                >
                  GitHub [@Ch3nOff]
                </a>
                <a
                  href="https://pypi.org/project/dual-loop-controller/"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="LINK"
                  className="hover:text-accent transition-colors underline"
                >
                  PyPI [dual-loop-controller]
                </a>
                <a
                  href="https://youtube.com/@ch3ng4m1ngyt"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="LINK"
                  className="hover:text-accent transition-colors underline"
                >
                  YouTube [Chen Gaming]
                </a>
                <a
                  href="mailto:ch3ng4m1ngyt@gmail.com"
                  data-cursor="LINK"
                  className="hover:text-accent transition-colors underline"
                >
                  ch3ng4m1ngyt@gmail.com
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
