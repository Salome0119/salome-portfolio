"use client";

import { Mail, MessageCircle, Heart, ArrowUp } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { motion } from "framer-motion";
import { profile, navLinks } from "@/data/profile";

/**
 * Footer — enlaces, créditos y botón "volver arriba".
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { icon: Github, href: profile.socials.github, label: "GitHub" },
    { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profile.socials.email}`, label: "Email" },
    {
      icon: MessageCircle,
      href: `https://wa.me/${profile.socials.whatsapp}`,
      label: "WhatsApp",
    },
  ];

  return (
    <footer className="relative border-t border-white/8 px-4 pt-14 pb-8 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/12 font-mono text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/30">
                S
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-100">{profile.fullName}</p>
                <p className="font-mono text-[10px] tracking-widest text-emerald-400/80">
                  {profile.shortRole.toUpperCase()}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {profile.summary}
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-xl p-2.5 text-slate-400 ring-1 ring-white/8 transition-all hover:-translate-y-1 hover:text-emerald-400 hover:ring-emerald-500/40"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <nav>
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Navegación
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Contacto directo
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${profile.socials.email}`}
                  className="text-slate-400 transition-colors hover:text-emerald-300"
                >
                  {profile.socials.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.socials.phone}`}
                  className="text-slate-400 transition-colors hover:text-emerald-300"
                >
                  {profile.socials.phoneDisplay}
                </a>
              </li>
              <li className="text-slate-500">{profile.location}</li>
            </ul>
          </div>
        </div>

        {/* Separador + créditos */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {year} {profile.fullName}. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            Hecho con
            <Heart className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
            y código — Next.js 15 · React 19 · Tailwind CSS
          </p>
        </div>
      </div>

      {/* Botón volver arriba */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -3 }}
        aria-label="Volver arriba"
        className="glass fixed right-5 bottom-5 z-40 rounded-full p-3 text-emerald-400 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.8)] transition-colors hover:bg-emerald-500/15 sm:right-8 sm:bottom-8"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  );
}
