'use client';

import React, { useEffect, useRef } from 'react';

interface GenerativeCanvasProps {
  className?: string;
  intensity?: number;
}

export default function GenerativeCanvas({ className = '', intensity = 1 }: GenerativeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let time = 0;

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', onResize);
    canvas.addEventListener('mousemove', onMouseMove);

    // Number of harmonic oscillation waves simulating dual-loop state feedback
    const numCurves = 7;

    const render = () => {
      time += 0.008 * intensity;
      // Gentle damping for mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Check dark mode
      const isDark = document.documentElement.classList.contains('dark');
      const baseStroke = isDark ? 'rgba(236, 233, 226, ' : 'rgba(20, 19, 18, ';
      const accentStroke = 'rgba(214, 69, 39, ';

      for (let i = 0; i < numCurves; i++) {
        ctx.beginPath();
        const progress = i / numCurves;
        const phase = time + progress * Math.PI * 1.5;
        const amplitude = 32 + Math.sin(time * 0.5 + i) * 20;

        // Trace wave from left to right
        for (let x = 0; x <= width; x += 6) {
          const normX = x / width;
          // Dual loop resonance equation: outer position wave + inner fast velocity oscillation
          const outerWave = Math.sin(normX * 4 + phase) * amplitude;
          const innerWave = Math.cos(normX * 12 - phase * 1.8) * (amplitude * 0.35);

          // Proximity distortion from mouse
          const dx = x - mouseX;
          const distY = height / 2 - mouseY;
          const mouseDist = Math.sqrt(dx * dx + distY * distY);
          const mouseInfluence = Math.exp(-mouseDist / 120) * 28;

          const y = height / 2 + (outerWave + innerWave) * (1 - Math.abs(normX - 0.5) * 0.8) + mouseInfluence * Math.sin(normX * 10);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Color modulation
        if (i === 3) {
          // Highlight primary resonant trace in signature burnt vermilion
          ctx.strokeStyle = `${accentStroke}0.85)`;
          ctx.lineWidth = 1.4;
        } else {
          const alpha = 0.12 + Math.abs(Math.sin(time + i)) * 0.18;
          ctx.strokeStyle = `${baseStroke}${alpha.toFixed(2)})`;
          ctx.lineWidth = 0.8;
        }

        ctx.stroke();
      }

      // Discrete state markers / telemetry points along the wave
      const numNodes = 5;
      for (let n = 0; n < numNodes; n++) {
        const nx = ((n + 1) / (numNodes + 1)) * width;
        const normNx = nx / width;
        const ny = height / 2 + Math.sin(normNx * 4 + time + 0.5) * 35;

        ctx.fillStyle = n % 2 === 0 ? '#D64527' : (isDark ? '#ECE9E2' : '#141312');
        ctx.fillRect(nx - 1.5, ny - 1.5, 3, 3);

        // Small technical coordinate text beside central node
        if (n === 2) {
          ctx.font = '9px monospace';
          ctx.fillStyle = isDark ? 'rgba(236, 233, 226, 0.45)' : 'rgba(20, 19, 18, 0.45)';
          ctx.fillText(`ψ_t: ${(Math.sin(time) * 1.4).toFixed(3)}`, nx + 8, ny - 6);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [intensity]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
      <div className="absolute bottom-2 right-2 text-[9px] font-mono tracking-widest text-ink-muted/50 uppercase pointer-events-none">
        FIG 01 // DUAL-LOOP OSCILLATOR MATRIX
      </div>
    </div>
  );
}
