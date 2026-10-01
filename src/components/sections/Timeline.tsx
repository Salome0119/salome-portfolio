"use client";

import { motion } from "framer-motion";
import { MapPinned } from "lucide-react";
import { timeline } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useGlowPointer } from "@/components/ui/GlowCard";

/**
 * Timeline — línea de tiempo cronológica de experiencia y educación.
 * En móvil la línea queda a la izquierda; en escritorio se centra
 * con tarjetas alternadas.
 */
export default function Timeline() {
  return (
    <section
      id="experiencia"
      className="relative px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* Fondo decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent"
      />

      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            index="02"
            title="Trayectoria"
            subtitle="Formación académica y técnica en análisis y desarrollo de software, con foco en la construcción de aplicaciones web funcionales."
            icon={<MapPinned className="h-4 w-4" />}
          />
        </Reveal>

        <div className="relative">
          {/* Línea vertical (móvil) / central (escritorio) */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[15px] w-px bg-gradient-to-b from-emerald-500/60 via-emerald-500/25 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <ul className="space-y-10 md:space-y-16">
            {timeline.map((item, i) => (
              <TimelineRow key={item.title} item={item} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
function TimelineRow({
  item,
  index,
}: {
  item: (typeof timeline)[number];
  index: number;
}) {
  const isRight = index % 2 === 1;
  const Icon = item.icon;
  const { ref, onMouseMove } = useGlowPointer<HTMLDivElement>();

  return (
    <li className="relative pl-12 md:pl-0">
      {/* Nodo */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`absolute top-6 left-[6px] z-10 grid h-5 w-5 place-items-center rounded-full border-2 border-ink-900 bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)] md:left-1/2 md:-translate-x-1/2 ${
          item.current ? "animate-glow-pulse" : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-ink-950" />
      </motion.span>

      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`glow-card glass rounded-2xl p-6 sm:p-7 ${
          isRight ? "md:ml-[3.5rem]" : "md:mr-[3.5rem] md:text-right"
        }`}
      >
        <div className="relative z-10">
          <div
            className={`mb-3 flex flex-wrap items-center gap-2.5 ${
              isRight ? "md:justify-end" : ""
            }`}
          >
            <span className="rounded-lg bg-emerald-500/12 px-2.5 py-1 font-mono text-[11px] tracking-wide text-emerald-300 ring-1 ring-emerald-500/25">
              {item.period}
            </span>
            {item.current && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 ring-1 ring-white/10">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                En curso
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-slate-100 sm:text-xl">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-emerald-400/90">{item.institution}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {item.description}
          </p>

          <div
            className={`mt-5 flex flex-wrap gap-2 ${isRight ? "md:justify-end" : ""}`}
          >
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] text-slate-400 ring-1 ring-white/8"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Icono decorativo */}
        <Icon className="absolute top-5 right-5 h-5 w-5 text-emerald-400/15" />
      </motion.div>
    </li>
  );
}
