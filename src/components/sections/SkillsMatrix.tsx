"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronDown } from "lucide-react";
import { skillGroups, softSkills, type SkillGroup } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useGlowPointer } from "@/components/ui/GlowCard";

/**
 * SkillsMatrix — dashboard interactivo de habilidades.
 *  · Selector de categorías (tabs)
 *  · Barras de nivel animadas
 *  · Tarjetas plegables con detalle por habilidad
 *  · Soft skills aparte
 */
export default function SkillsMatrix() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const [openSkill, setOpenSkill] = useState<string | null>(null);

  const active: SkillGroup =
    skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];
  const ActiveIcon = active.icon;

  return (
    <section id="habilidades" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            index="01"
            title="Matriz de habilidades"
            subtitle="Selecciona una categoría para explorar el stack, los niveles de dominio y las tecnologías que uso a diario."
            icon={<Brain className="h-4 w-4" />}
          />
        </Reveal>

        {/* ------------------------------- Tabs */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Categorías de habilidades"
            className="mb-8 flex flex-wrap gap-2.5"
          >
            {skillGroups.map((group) => {
              const Icon = group.icon;
              const isActive = group.id === activeId;
              return (
                <button
                  key={group.id}
                  role="tab"
                  id={`tab-${group.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${group.id}`}
                  onClick={() => {
                    setActiveId(group.id);
                    setOpenSkill(null);
                  }}
                  className={`group relative flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-emerald-300"
                      : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skills-tab"
                      className="absolute inset-0 -z-10 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/30"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  {group.title}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ------------------------------- Panel activo */}
        <div
          className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
        >
          <Reveal delay={0.15}>
            <SkillPanel
              key={active.id}
              group={active}
              openSkill={openSkill}
              setOpenSkill={setOpenSkill}
            />
          </Reveal>

          {/* Resumen / etiquetas */}
          <Reveal delay={0.25}>
            <div className="glass h-full rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${active.accent} ring-1 ring-white/10`}>
                  <ActiveIcon className="h-5 w-5 text-emerald-300" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">
                    {active.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {active.skills.length} habilidades ·{" "}
                    {Math.round(
                      active.skills.reduce((a, s) => a + s.level, 0) /
                        active.skills.length,
                    )}
                    % promedio
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-400">
                {active.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {active.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i }}
                    className="rounded-lg bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300 hover:ring-emerald-500/30"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>

              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="text-xs tracking-widest text-slate-500 uppercase">
                  Promedio del área
                </p>
                <p className="mt-1 text-3xl font-bold text-gradient">
                  {Math.round(
                    active.skills.reduce((a, s) => a + s.level, 0) /
                      active.skills.length,
                  )}
                  %
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ------------------------------- Soft skills */}
        <Reveal delay={0.1}>
          <div className="mt-16">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-slate-100">
              <span className="h-5 w-1 rounded-full bg-emerald-500" />
              Habilidades Blandas
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {softSkills.map((skill, i) => (
                <SoftCard key={skill.name} {...skill} index={i} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
function SkillPanel({
  group,
  openSkill,
  setOpenSkill,
}: {
  group: SkillGroup;
  openSkill: string | null;
  setOpenSkill: (v: string | null) => void;
}) {
  const { ref, onMouseMove } = useGlowPointer<HTMLDivElement>();
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="glow-card glass rounded-2xl p-6 sm:p-8"
    >
      <h3 className="mb-6 font-mono text-xs tracking-[0.25em] text-emerald-400/80 uppercase">
        {group.title} · click para ver detalle
      </h3>

      <ul className="space-y-5">
        {group.skills.map((skill, i) => {
          const isOpen = openSkill === skill.name;
          return (
            <li key={skill.name}>
              <button
                onClick={() => setOpenSkill(isOpen ? null : skill.name)}
                className="w-full text-left"
                aria-expanded={isOpen}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-200">
                    {skill.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-xs text-emerald-400">
                      {skill.level}%
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-emerald-400" : ""
                      }`}
                    />
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-300"
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && skill.note && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden pt-2 text-xs text-slate-500"
                  >
                    {skill.note}
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- */
function SoftCard({
  name,
  icon: Icon,
  desc,
  index,
}: {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  index: number;
}) {
  const { ref, onMouseMove } = useGlowPointer<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="glow-card glass group relative overflow-hidden rounded-2xl p-5"
    >
      <div className="relative z-10">
        <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/25 transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-4.5 w-4.5 text-emerald-400" />
        </span>
        <h4 className="text-sm font-semibold text-slate-100">{name}</h4>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{desc}</p>
      </div>
    </motion.div>
  );
}
