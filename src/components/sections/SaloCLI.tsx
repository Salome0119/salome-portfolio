"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minus, Square, Trash2 } from "lucide-react";
import {
  terminalCommands,
  commandAliases,
  terminalBanner,
  profile,
} from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useGlowPointer } from "@/components/ui/GlowCard";

type Line =
  | { kind: "input"; text: string }
  | { kind: "output"; text: string[] }
  | { kind: "banner" }
  | { kind: "error"; text: string };

const quickCommands = ["help", "skills", "contacto", "sobremi", "proyectos"];

/** Normaliza el texto para comparar comandos (sin acentos, minúsculas) */
const normalize = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/**
 * SaloCLI — terminal interactiva simulada.
 * Comandos disponibles: help, skills, contacto, sobremi, experiencia,
 * proyectos, languages, whoami, ls, clear.
 * ➜ Para agregar comandos edita `src/data/profile.ts`.
 */
export default function SaloCLI() {
  const [lines, setLines] = useState<Line[]>([{ kind: "banner" }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref, onMouseMove } = useGlowPointer<HTMLDivElement>();

  /* --------------------------- autoscroll del contenido */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, typed]);

  /* --------------------------- efecto de escritura del prompt */
  useEffect(() => {
    if (isTyping) {
      if (typed.length < input.length) {
        const t = setTimeout(() => setTyped(input.slice(0, typed.length + 1)), 42);
        return () => clearTimeout(t);
      }
      setIsTyping(false);
    }
  }, [typed, input, isTyping]);

  /* --------------------------- ejecutar un comando */
  const run = useCallback((raw: string) => {
    const clean = raw.trim();
    setLines((prev) => [...prev, { kind: "input", text: clean }]);
    setTyped("");
    setIsTyping(true);

    if (!clean) return;

    const [cmd, ...args] = clean.split(/\s+/);
    const key = commandAliases[normalize(cmd)] ?? normalize(cmd);

    if (key === "clear") {
      setLines([]);
      return;
    }

    const handler = terminalCommands[key];
    if (handler) {
      const out = handler(args.join(" "));
      setLines((prev) => [...prev, { kind: "output", text: out }]);
    } else {
      setLines((prev) => [
        ...prev,
        {
          kind: "error",
          text: `salo: comando no encontrado: ${cmd}. Escribe 'help' para ver las opciones.`,
        },
      ]);
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = input.trim();
    if (clean) setHistory((h) => [clean, ...h]);
    setHistIndex(-1);
    run(clean);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIndex + 1, history.length - 1);
      if (next >= 0) {
        setHistIndex(next);
        setInput(history[next]);
        setTyped(history[next]);
        setIsTyping(false);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIndex - 1;
      setHistIndex(next);
      const value = next >= 0 ? history[next] : "";
      setInput(value);
      setTyped(value);
      setIsTyping(false);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = normalize(input);
      if (partial) {
        const match = Object.keys(commandAliases).find((c) => c.startsWith(partial));
        if (match) {
          setInput(match);
          setTyped(match);
          setIsTyping(false);
        }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const reset = () => {
    setLines([{ kind: "banner" }]);
    setInput("");
    setTyped("");
    setHistory([]);
    setHistIndex(-1);
    setIsTyping(true);
  };

  const prompt = "salo@sportfolio:~$";

  return (
    <section id="consola" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            index="04"
            title="SaloCLI"
            subtitle="Una terminal viva dentro del portafolio. Escribe comandos para explorar el stack, la trayectoria y los datos de contacto como si fuera tu propia consola."
            icon={<TerminalIcon className="h-4 w-4" />}
          />
        </Reveal>

        <Reveal delay={0.12}>
          <div
            ref={ref}
            onMouseMove={onMouseMove}
            className="glow-card relative overflow-hidden rounded-2xl shadow-[0_40px_100px_-50px_rgba(16,185,129,0.55)]"
          >
            {/* --------------------------- Barra de título */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/8 bg-ink-800/80 px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                </div>
                <span className="hidden font-mono text-xs text-slate-400 sm:block">
                  salo@sportfolio — bash — 92×28
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={reset}
                  aria-label="Limpiar terminal"
                  title="Limpiar (Ctrl+L)"
                  className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-white/5 hover:text-emerald-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <span className="hidden rounded-md p-1.5 text-slate-600 sm:block">
                  <Minus className="h-3.5 w-3.5" />
                </span>
                <span className="hidden rounded-md p-1.5 text-slate-600 sm:block">
                  <Square className="h-3.5 w-3.5" />
                </span>
                <span className="rounded-md p-1.5 text-slate-600 sm:hidden">
                  <X className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* --------------------------- Área de salida */}
            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="relative z-10 h-[22rem] cursor-text overflow-y-auto bg-ink-900/80 p-4 font-mono text-xs leading-relaxed backdrop-blur-xl sm:h-[26rem] sm:p-6 sm:text-[13px]"
            >
              {lines.map((line, i) => (
                <RenderLine key={i} line={line} prompt={prompt} />
              ))}

              {/* Línea actual con prompt */}
              <div className="flex flex-wrap items-center gap-x-2">
                <span className="shrink-0 text-emerald-400">{prompt}</span>
                <span className="text-slate-100">
                  {isTyping ? typed : input}
                  {!isTyping && <span className="ml-0.5 animate-blink text-emerald-400">▌</span>}
                </span>
              </div>
            </div>

            {/* --------------------------- Input */}
            <form
              onSubmit={submit}
              className="relative z-10 flex items-center gap-2 border-t border-white/8 bg-ink-800/70 px-4 py-3 backdrop-blur-xl sm:px-6"
            >
              <span className="font-mono text-xs text-emerald-400">{prompt}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setTyped("");
                  setIsTyping(true);
                }}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                placeholder="help, skills, contacto..."
                aria-label="Consola SaloCLI"
                className="flex-1 bg-transparent font-mono text-xs text-slate-100 outline-none placeholder:text-slate-600 sm:text-[13px]"
              />
              <button
                type="submit"
                className="rounded-md bg-emerald-500/12 px-3 py-1.5 font-mono text-[11px] text-emerald-300 ring-1 ring-emerald-500/30 transition-colors hover:bg-emerald-500/22"
              >
                run ↵
              </button>
            </form>

            {/* --------------------------- Comandos rápidos */}
            <div className="relative z-10 flex flex-wrap items-center gap-2 border-t border-white/8 bg-ink-900/60 px-4 py-3 sm:px-6">
              <span className="mr-1 text-[11px] tracking-widest text-slate-600 uppercase">
                Comandos:
              </span>
              <AnimatePresence mode="popLayout">
                {quickCommands.map((cmd) => (
                  <motion.button
                    key={cmd}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => {
                      run(cmd);
                      inputRef.current?.focus();
                    }}
                    className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-400 ring-1 ring-white/8 transition-all hover:bg-emerald-500/12 hover:text-emerald-300 hover:ring-emerald-500/30"
                  >
                    {cmd}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {/* Escaneo sutil */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-0 h-16 animate-scan bg-gradient-to-b from-emerald-500/8 to-transparent"
            />
          </div>
        </Reveal>

        {/* --------------------------- Accesos directos */}
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
            <span>Atajos:</span>
            <a
              href={`mailto:${profile.socials.email}`}
              className="rounded-lg px-3 py-1.5 ring-1 ring-white/8 transition-colors hover:ring-emerald-500/40 hover:text-emerald-300"
            >
              {profile.socials.email}
            </a>
            <a
              href={`https://wa.me/${profile.socials.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-1.5 ring-1 ring-white/8 transition-colors hover:ring-emerald-500/40 hover:text-emerald-300"
            >
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
function RenderLine({ line, prompt }: { line: Line; prompt: string }) {
  if (line.kind === "banner") {
    return (
      <div className="mb-3 space-y-0.5 border-b border-white/8 pb-3">
        {terminalBanner.map((b, i) => (
          <p key={b} className={i === 2 ? "text-slate-500" : "text-emerald-400/90"}>
            {i === 2 ? "" : "> "}
            {b}
          </p>
        ))}
      </div>
    );
  }

  if (line.kind === "input") {
    return (
      <p className="break-words">
        <span className="text-emerald-400">{prompt}</span>{" "}
        <span className="text-slate-100">{line.text}</span>
      </p>
    );
  }

  if (line.kind === "error") {
    return (
      <p className="break-words text-red-400">
        <span className="text-slate-600">└─&gt; </span>
        {line.text}
      </p>
    );
  }

  return (
    <pre className="mb-1 overflow-x-auto font-mono text-slate-300 whitespace-pre">
      {line.text.join("\n")}
    </pre>
  );
}
