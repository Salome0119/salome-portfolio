"use client";

import { useEffect, useState } from "react";
import { Menu, X, Terminal, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { navLinks, profile } from "@/data/profile";

/**
 * Navbar — navegación glass con indicador de sección activa,
 * efecto de "shrink" al hacer scroll y menú móvil.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("inicio");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const offset = window.innerHeight * 0.35;
      let current = "inicio";
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= offset) current = link.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "glass w-[min(100%-1.5rem,64rem)] py-2 shadow-[0_8px_40px_-12px_rgba(16,185,129,0.25)]"
            : "w-[min(100%-1.5rem,72rem)] py-3"
        }`}
      >
        {/* Logo */}
        <a href="#inicio" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/12 font-mono text-sm font-bold text-emerald-400 ring-1 ring-emerald-500/30 transition-all group-hover:bg-emerald-500/20">
            S
            <span className="absolute inset-0 rounded-xl opacity-0 shadow-[0_0_22px_rgba(16,185,129,0.55)] transition-opacity group-hover:opacity-100" />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-sm font-semibold text-slate-100">Salomé</span>
            <span className="font-mono text-[10px] tracking-widest text-emerald-400/80">
              DEV
            </span>
          </span>
        </a>

        {/* Links escritorio */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`relative rounded-lg px-3.5 py-2 text-sm transition-colors ${
                  active === link.id
                    ? "text-emerald-300"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden rounded-lg p-2 text-slate-400 transition-colors hover:text-emerald-400 sm:block"
          >
            <Github className="h-4.5 w-4.5" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden rounded-lg p-2 text-slate-400 transition-colors hover:text-emerald-400 sm:block"
          >
            <Linkedin className="h-4.5 w-4.5" />
          </a>
          <a
            href="#consola"
            className="hidden items-center gap-1.5 rounded-xl bg-emerald-500/12 px-3.5 py-2 text-sm font-medium text-emerald-300 ring-1 ring-emerald-500/30 transition-all hover:bg-emerald-500/20 hover:shadow-[0_0_20px_-4px_rgba(16,185,129,0.6)] sm:flex"
          >
            <Terminal className="h-4 w-4" />
            SaloCLI
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="rounded-lg p-2 text-slate-300 ring-1 ring-white/10 transition-colors hover:text-emerald-400 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 w-[min(100%-1.5rem,40rem)] md:hidden"
          >
            <ul className="glass flex flex-col gap-1 rounded-2xl p-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm transition-colors ${
                      active === link.id
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-1 flex items-center gap-3 border-t border-white/10 px-3 pt-3">
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-emerald-400">
                  <Github className="h-5 w-5" />
                </a>
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-emerald-400">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={`mailto:${profile.socials.email}`} aria-label="Email" className="text-slate-400 hover:text-emerald-400">
                  <Mail className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
