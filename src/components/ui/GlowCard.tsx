"use client";

import { useRef, type ReactNode } from "react";

/**
 * useGlowPointer
 * ------------------------------------------------------------------
 * Inyecta las coordenadas locales del puntero dentro de un elemento
 * como variables CSS (--mx / --my) para que la utilidad
 * `.glow-card` de globals.css dibuje el resplandor que la sigue.
 */
export function useGlowPointer<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  const onMouseMove = (e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return { ref, onMouseMove };
}

/** Envoltura que aplica glow + glass automáticamente */
export function GlowCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const { ref, onMouseMove } = useGlowPointer<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMouseMove as never}
      className={`glow-card glass rounded-2xl ${className}`}
    >
      {children}
    </Tag>
  );
}
