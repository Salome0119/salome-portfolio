import type { ReactNode } from "react";

/**
 * SectionHeading — encabezado reutilizable de cada sección.
 * Muestra un índice (01, 02…), un título y una línea decorativa.
 */
export default function SectionHeading({
  index,
  title,
  subtitle,
  icon,
}: {
  index: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-xs tracking-[0.3em] text-emerald-400/80">
          {index}
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-emerald-500/70 to-transparent" />
        {icon ? (
          <span className="text-emerald-400/70 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        ) : null}
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
