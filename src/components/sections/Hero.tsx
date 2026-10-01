"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Download,
  ArrowDownRight,
  MessageCircle,
  Languages,
  Sparkles,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { profile, cvUrl } from "@/data/profile";
import Typewriter from "@/components/ui/Typewriter";

/**
 * Hero — presentación principal:
 *  · título con efecto de escritura
 *  · badge de disponibilidad
 *  · CTAs
 *  · marquesina de stack + indicadores de idiomas
 */
export default function Hero() {
  const socials = [
    { icon: Github, href: profile.socials.github, label: "GitHub" },
    { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
    {
      icon: Mail,
      href: `mailto:${profile.socials.email}`,
      label: "Email",
    },
  ];

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center px-4 pt-28 pb-16 sm:px-6 lg:pt-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ------------------------------- Columna de texto */}
          <div>
            {/* Badge disponibilidad */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs tracking-wide text-emerald-200 sm:text-sm">
                Disponible para oportunidades y proyectos
              </span>
            </motion.div>

            {/* Título con typewriter */}
            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
              <span className="block text-slate-300">
                <Typewriter lines={profile.typingLines} typingSpeed={58} deleteSpeed={26} holdMs={1500} />
              </span>
            </h1>

            {/* Rol */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
            >
              {profile.role}
            </motion.p>

            {/* Ubicación y contacto rápido */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                {profile.location}
              </span>
              <a
                href={`mailto:${profile.socials.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-emerald-300"
              >
                <Mail className="h-4 w-4 text-emerald-400" />
                {profile.socials.email}
              </a>
              <a
                href={`tel:${profile.socials.phone}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-emerald-300"
              >
                <Phone className="h-4 w-4 text-emerald-400" />
                {profile.socials.phoneDisplay}
              </a>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#proyectos"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-[0_10px_40px_-12px_rgba(16,185,129,0.9)] transition-all hover:shadow-[0_12px_50px_-10px_rgba(16,185,129,1)] sm:text-base"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <ArrowDownRight className="h-4.5 w-4.5" />
                Ver Proyectos
              </a>

              <a
                href="#contacto"
                className="group inline-flex items-center gap-2 rounded-xl glass px-6 py-3.5 text-sm font-semibold text-slate-100 transition-all hover:border-emerald-500/40 hover:text-emerald-300 sm:text-base"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                Contactar
              </a>

              <a
                href={cvUrl}
                download
                className="group inline-flex items-center gap-2 px-2 py-3.5 text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-emerald-300 hover:underline sm:text-base"
              >
                <Download className="h-4.5 w-4.5 transition-transform group-hover:translate-y-0.5" />
                Descargar CV
              </a>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex items-center gap-3"
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass rounded-xl p-3 text-slate-400 transition-all hover:-translate-y-1 hover:text-emerald-400 hover:shadow-[0_8px_30px_-10px_rgba(16,185,129,0.7)]"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ------------------------------- Columna visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Tarjeta "terminal / identity card" */}
            <div className="glass relative overflow-hidden rounded-3xl p-6 shadow-[0_30px_80px_-40px_rgba(16,185,129,0.5)]">
              {/* barra superior */}
              <div className="mb-5 flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                <span className="ml-3 font-mono text-[11px] text-slate-500">
                  salome@portfolio:~
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs sm:text-sm">
                <p className="text-slate-500">
                  <span className="text-emerald-400">const</span>{" "}
                  <span className="text-sky-400">dev</span> = {"{"}
                </p>
                <ul className="space-y-1.5 pl-4 text-slate-300">
                  <li>
                    <span className="text-emerald-400">nombre</span>:{" "}
                    <span className="text-amber-300">&quot;Salomé Ocampo Henao&quot;</span>,
                  </li>
                  <li>
                    <span className="text-emerald-400">rol</span>:{" "}
                    <span className="text-amber-300">&quot;Software Developer&quot;</span>,
                  </li>
                  <li>
                    <span className="text-emerald-400">ciudad</span>:{" "}
                    <span className="text-amber-300">&quot;{profile.city}, {profile.country}&quot;</span>,
                  </li>
                  <li>
                    <span className="text-emerald-400">enfoque</span>:{" "}
                    <span className="text-amber-300">
                      &quot;Detalle · Autonomía · Soluciones&quot;
                    </span>
                  </li>
                </ul>
                <p className="text-slate-500">{"}"};</p>
              </div>

              {/* Lenguajes */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="mb-3 flex items-center gap-2 text-xs font-medium tracking-wide text-slate-400 uppercase">
                  <Languages className="h-3.5 w-3.5 text-emerald-400" />
                  Idiomas
                </p>
                <div className="space-y-3">
                  {profile.languages.map((lang) => (
                    <div key={lang.name}>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="text-slate-300">{lang.name}</span>
                        <span className="text-emerald-400">{lang.level}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.percent}%` }}
                          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sparkles */}
              <Sparkles className="animate-glow-pulse absolute -top-4 -right-4 h-8 w-8 text-emerald-400/60" />
            </div>

            {/* Tarjeta flotante: stack */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute -bottom-6 -left-4 hidden rounded-2xl px-4 py-3 shadow-2xl sm:block"
            >
              <p className="mb-2 text-[10px] tracking-widest text-slate-500 uppercase">
                Stack principal
              </p>
              <div className="flex flex-wrap gap-1.5">
                {profile.stackLine.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-emerald-500/12 px-2 py-1 font-mono text-[11px] text-emerald-300 ring-1 ring-emerald-500/25"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
