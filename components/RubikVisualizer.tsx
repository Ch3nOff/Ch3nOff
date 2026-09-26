'use client';

import React, { useState } from 'react';

// 6 standard Rubik colors in muted editorial palette
const COLORS = {
  W: '#F7F5EE', // White (paper)
  Y: '#E5B842', // Warm ochre yellow
  G: '#3F7A59', // Pine green
  B: '#355E8D', // Slate blue
  O: '#D64527', // Burnt vermilion orange
  R: '#9A2B20', // Deep brick red
};

type ColorKey = keyof typeof COLORS;

const SCRAMBLE_MOVES = ["R", "R'", "U", "U'", "F", "F'", "D", "D'", "L", "L'", "R2", "U2", "F2"];

export default function RubikVisualizer() {
  const [faceColors, setFaceColors] = useState<ColorKey[]>([
    'O', 'O', 'O',
    'O', 'O', 'O',
    'O', 'O', 'O'
  ]);
  const [scramble, setScramble] = useState<string>("R U R' U' R' F R2 U' R' U' R U R' F'");
  const [turnsCount, setTurnsCount] = useState<number>(14);

  const generateScramble = () => {
    const moves: string[] = [];
    for (let i = 0; i < 18; i++) {
      const randomMove = SCRAMBLE_MOVES[Math.floor(Math.random() * SCRAMBLE_MOVES.length)];
      moves.push(randomMove);
    }
    const newScramble = moves.join(' ');
    setScramble(newScramble);
    setTurnsCount((prev) => prev + 18);

    // Permute the front face stickers unpredictably
    const palette: ColorKey[] = ['W', 'Y', 'G', 'B', 'O', 'R'];
    const newColors = Array.from({ length: 9 }, (_, i) => {
      if (i === 4) return 'O'; // center remains orange
      return palette[Math.floor(Math.random() * palette.length)];
    });
    setFaceColors(newColors);
  };

  const solveToPristine = () => {
    setFaceColors(['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']);
    setScramble("CFOP SOLVED // SUB-16s LOOKAHEAD STATE");
  };

  return (
    <div className="border border-ink-dark/15 dark:border-paper-100/15 p-4 bg-paper-50 dark:bg-paper-900 font-mono text-[11px]">
      <div className="flex items-center justify-between border-b border-ink-dark/10 dark:border-paper-100/10 pb-2 mb-3">
        <span className="text-[10px] uppercase tracking-widest text-accent font-bold">
          [CFOP // 3X3 SPATIAL LOOKAHEAD]
        </span>
        <span className="text-[9px] text-ink-muted">PB: 14.82s // SUB-16</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* 3x3 Grid Display */}
        <div className="grid grid-cols-3 gap-1 p-1.5 bg-ink-dark/90 border border-ink-dark w-24 h-24 shrink-0 shadow-inner">
          {faceColors.map((col, idx) => (
            <div
              key={idx}
              className="w-full h-full rounded-[1px] transition-colors duration-200"
              style={{ backgroundColor: COLORS[col] }}
              title={`Sticker ${idx + 1}: ${col}`}
            />
          ))}
        </div>

        {/* Scramble & Controls */}
        <div className="flex-1 space-y-2">
          <div className="text-[10px] text-ink-muted break-all font-mono leading-relaxed bg-paper-100 dark:bg-paper-800 p-2 border border-ink-dark/10">
            <span className="text-ink-dark dark:text-paper-100 font-bold">SCRAMBLE: </span>
            {scramble}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={generateScramble}
              data-cursor="SCRAMBLE"
              className="px-2.5 py-1 text-[10px] bg-ink-dark text-paper-50 dark:bg-paper-100 dark:text-ink-dark hover:bg-accent dark:hover:bg-accent dark:hover:text-white transition-colors uppercase tracking-wider"
            >
              New Scramble
            </button>
            <button
              onClick={solveToPristine}
              data-cursor="SOLVE"
              className="px-2.5 py-1 text-[10px] border border-ink-dark/30 dark:border-paper-100/30 hover:border-accent hover:text-accent transition-colors uppercase tracking-wider"
            >
              Reset Face
            </button>
            <span className="text-[9px] text-ink-muted ml-auto font-mono">
              TPS: 8.4 // TURNS: {turnsCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
