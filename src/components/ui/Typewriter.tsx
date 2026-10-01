"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Typewriter
 * ------------------------------------------------------------------
 * Efecto de escritura tipo máquina con cursor parpadeante.
 * Recibe una lista de frases y las rota en bucle infinito.
 */
export default function Typewriter({
  lines,
  className = "",
  typingSpeed = 62,
  deleteSpeed = 28,
  holdMs = 1500,
}: {
  lines: readonly string[];
  className?: string;
  typingSpeed?: number;
  deleteSpeed?: number;
  holdMs?: number;
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    const current = lines[lineIndex] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed,
        );
      } else {
        timeout = setTimeout(() => setPhase("holding"), 380);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), holdMs);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deleteSpeed,
        );
      } else {
        setLineIndex((i) => (i + 1) % lines.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, lineIndex, lines, typingSpeed, deleteSpeed, holdMs]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] animate-blink bg-emerald-400 align-middle" />
    </span>
  );
}

/** Reutilizable para el cursor ">" animado */
export function PromptChar({ className = "" }: { className?: string }) {
  return (
    <motion.span
      className={className}
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
    >
      &gt;
    </motion.span>
  );
}
