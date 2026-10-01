"use client";

import { profile } from "@/data/profile";

/**
 * StackMarquee — cinta infinita con el stack tecnológico.
 * Movimiento CSS puro (animación marquee definida en globals.css).
 */
export default function StackMarquee() {
  const items = [...profile.stackLine, ...profile.stackLine];
  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-ink-800/40 py-5 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-900 to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-10">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="flex items-center gap-10 font-mono text-sm tracking-widest text-slate-500 uppercase transition-colors hover:text-emerald-400 sm:text-base"
          >
            {tech}
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
