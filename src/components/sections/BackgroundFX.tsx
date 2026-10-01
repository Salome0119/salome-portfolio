"use client";

import { motion } from "framer-motion";

/**
 * BackgroundFX — capas decorativas fijas:
 *  · rejilla tech que se desplaza
 *  · orbes de luz esmeralda
 *  · grano/noise
 *  · viñeta
 */
export default function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-900"
    >
      {/* Rejilla base */}
      <div className="grid-bg absolute inset-0 opacity-60" />

      {/* Orbes de luz */}
      <motion.div
        className="absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-emerald-500/12 blur-[130px]"
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-[140px]"
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-emerald-400/8 blur-[150px]"
        animate={{ y: [0, -40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Halo que sigue al cursor (variable --cursor-x/y) */}
      <div className="cursor-halo absolute inset-0" />

      {/* Grano + viñeta */}
      <div className="noise-layer absolute inset-0 opacity-[0.035] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(7,11,18,0.85)_100%)]" />
    </div>
  );
}
