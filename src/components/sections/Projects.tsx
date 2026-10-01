"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ExternalLink, Layers, Check, Star } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import { projects, profile, repoUrl, type Project } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useGlowPointer } from "@/components/ui/GlowCard";

/* ------------------------------------------------------------
 *  Filtros por categoría
 * ---------------------------------------------------------- */
const filters: { id: Project["category"] | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "web", label: "Web" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "algoritmos", label: "Algoritmos" },
];

/**
 * Projects — repositorios reales de github.com/Salome0119
 * ➜ Para editar o agregar: `src/data/profile.ts` → `projects`
 */
export default function Projects() {
  const [filter, setFilter] = useState<Project["category"] | "todos">("todos");
  const list =
    filter === "todos" ? projects : projects.filter((p) => p.category === filter);

  const count = (id: Project["category"] | "todos") =>
    id === "todos" ? projects.length : projects.filter((p) => p.category === id).length;

  return (
    <section id="proyectos" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            index="03"
            title="Proyectos"
            subtitle="Repositorios reales publicados en mi perfil de GitHub: plataformas web en Django, interfaces responsive, algoritmos y estructuras de datos en Python."
            icon={<FolderGit2 className="h-4 w-4" />}
          />
        </Reveal>

        {/* Filtros */}
        <Reveal delay={0.1}>
          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  filter === f.id
                    ? "bg-emerald-500/12 text-emerald-300 ring-1 ring-emerald-500/30"
                    : "text-slate-400 ring-1 ring-white/8 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                {f.label}
                <span className="ml-1.5 font-mono text-[10px] text-slate-500">
                  {count(f.id)}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enlace a todos los repositorios */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <a
              href={`${profile.socials.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-xl glass px-6 py-3.5 text-sm font-medium text-slate-200 transition-all hover:border-emerald-500/40 hover:text-emerald-300"
            >
              <Github className="h-4.5 w-4.5" />
              Ver los {projects.length} repositorios en GitHub
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, onMouseMove } = useGlowPointer<HTMLDivElement>();
  const url = repoUrl(project.repo);

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMouseMove}
      layout
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="glow-card glass group relative flex flex-col overflow-hidden rounded-2xl p-6 sm:p-7"
    >
      <div className="relative z-10 flex h-full flex-col">
        {/* Encabezado */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Layers className="h-5 w-5 text-emerald-400" />
          </span>
          <div className="flex items-center gap-2">
            {project.featured && (
              <span
                title="Proyecto insignia"
                className="inline-flex items-center gap-1 rounded-lg bg-amber-400/12 px-2 py-1 text-[10px] font-medium text-amber-300 ring-1 ring-amber-400/25"
              >
                <Star className="h-3 w-3 fill-current" />
                Destacado
              </span>
            )}
            <span className="font-mono text-xs text-slate-500">{project.year}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-100 sm:text-xl">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-[11px] text-emerald-400/70">
          Salome0119/{project.repo}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>

        {/* Puntos clave */}
        <ul className="mt-5 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-slate-400">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Stack */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300 ring-1 ring-white/8 transition-colors group-hover:bg-emerald-500/8"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/8 pt-5">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 transition-colors hover:text-emerald-300"
          >
            <Github className="h-3.5 w-3.5" />
            Código
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 transition-colors hover:text-cyan-300"
            >
              Demo en vivo
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
