import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import GenerativeCanvas from '@/components/GenerativeCanvas';

// The lab is fully interactive — load its JS only when this route needs it,
// keeping the main bundle lean on every other page.
const LabChat = dynamic(() => import('@/components/lab/LabChat'), {
  ssr: false,
  loading: () => (
    <div className="border border-dashed border-ink-dark/25 dark:border-paper-100/25 py-24 text-center font-mono text-[10px] uppercase tracking-widest text-ink-muted animate-pulse">
      Calibrating instruments // loading shared lab feed…
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'Research Lab — Live Bench Chat | Matthew Chen (Ch3nOff)',
  description:
    'Shared research chat: post experiments, thoughts and prototypes to the open bench log. Reactions, filters and live Supabase feed.',
  keywords: ['research lab', 'experiment log', 'small language models', 'control systems', 'Supabase'],
};

export default function LabPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-12">
      {/* Opening ledger strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-widest text-ink-muted border-b border-ink-dark/10 dark:border-paper-100/10 pb-3 uppercase pt-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-accent" />
          LAB TERMINAL // OPEN BENCH FEED
        </div>
        <div className="hidden sm:block">STORAGE: SUPABASE (Postgres + RLS + Realtime)</div>
        <div className="text-accent font-bold">MODE: COLLECTIVE SCRATCHPAD</div>
      </div>

      {/* Editorial header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <span className="block font-mono text-xs text-accent tracking-widest uppercase">
            [COLLECTION 04 // LIVE RESEARCH CHAT]
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tighter text-ink-dark dark:text-paper-50 leading-[0.92]">
            THE RESEARCH{' '}
            <span className="italic text-accent">LAB</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-ink-dark/85 dark:text-paper-100/85 max-w-2xl leading-relaxed font-light">
            An open bench where experiments are logged before they are pretty. Share a running
            protocol, a half-formed thought, a failed dither experiment — anything the archive
            deserves but a blog post doesn&apos;t. Every entry is searchable, reactable
            (<span className="font-mono text-xs">⚗ replicate · ✦ insight · ? query</span>) and
            synced live through Supabase.
          </p>
        </div>
        <div className="lg:col-span-4">
          <div className="border border-ink-dark/20 dark:border-paper-100/20 p-2 bg-paper-100/40 dark:bg-paper-900/40">
            <GenerativeCanvas className="w-full h-44 sm:h-52" intensity={0.8} />
          </div>
          <p className="font-hand text-lg text-accent mt-2 -rotate-1">
            &larr; same generative ink, now with a memory. Say something on the bench.
          </p>
        </div>
      </section>

      {/* Interactive feed */}
      <LabChat />
    </div>
  );
}
