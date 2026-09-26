'use client';

import React, { useState, useEffect, useCallback } from 'react';

export default function BassSynth() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [slapCount, setSlapCount] = useState(0);
  const [lastBpm] = useState(114);

  // Notes in the funk pocket: E1 (41.2Hz), G1 (49.0Hz), A1 (55.0Hz), B1 (61.7Hz), D2 (73.4Hz)
  const notes = [41.2, 49.0, 55.0, 61.7, 73.4];

  const triggerSlap = useCallback((pitchIndex?: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const freq = notes[pitchIndex !== undefined ? pitchIndex % notes.length : slapCount % notes.length];

      const now = ctx.currentTime;

      // 1. Fundamental Bass Oscillator (Sub-punch)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq * 1.5, now);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.04);

      // Lowpass Filter for that warm magnetic pickup tone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(140, now + 0.35);

      oscGain.gain.setValueAtTime(0.7, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(ctx.destination);

      // 2. Metallic Fret-Slap Transient (White noise burst through bandpass)
      const bufferSize = ctx.sampleRate * 0.03; // 30ms transient
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(3200, now); // Fret wire metallic chime
      noiseFilter.Q.setValueAtTime(3.0, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc.start(now);
      noise.start(now);
      osc.stop(now + 0.5);
      noise.stop(now + 0.05);

      setIsPlaying(true);
      setSlapCount((prev) => prev + 1);
      setTimeout(() => setIsPlaying(false), 200);
    } catch {
      // AudioContext policy fallback
    }
  }, [slapCount, notes]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        triggerSlap();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerSlap]);

  return (
    <div className="inline-flex items-center gap-2 border border-ink-dark/20 dark:border-paper-100/20 px-2.5 py-1 text-[10px] font-mono tracking-wider bg-paper-100/50 dark:bg-paper-800/50 select-none">
      <button
        onClick={() => triggerSlap()}
        data-cursor="THUMP"
        title="Press 'B' or click to trigger 16th-note slap bass harmonic"
        className={`flex items-center gap-1.5 transition-colors uppercase ${
          isPlaying ? 'text-accent font-bold scale-105' : 'text-ink-dark dark:text-paper-100 hover:text-accent'
        }`}
      >
        <span className={`inline-block w-2 h-2 ${isPlaying ? 'bg-accent' : 'bg-ink-muted/40'} rounded-none transition-all`}></span>
        <span>SLAP BASS [KEY: B]</span>
      </button>
      {slapCount > 0 && (
        <span className="text-[9px] text-accent/80 font-mono">
          #{slapCount} ({lastBpm} BPM)
        </span>
      )}
    </div>
  );
}
