"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useGlowPointer } from "@/components/ui/GlowCard";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * Contact — formulario validado + tarjetas de contacto directo.
 * El envío usa POST a /api/contact y, ante cualquier problema,
 * ofrece abrir el cliente de correo (mailto) o WhatsApp.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [copied, setCopied] = useState(false);
  // Copia del último envío válido (para el enlace mailto de confirmación)
  const [sent, setSent] = useState({ name: "", email: "", subject: "", message: "" });

  const whatsappHref = `https://wa.me/${profile.socials.whatsapp}?text=${encodeURIComponent(
    `Hola Salomé, te encontré por tu portafolio y me gustaría hablar sobre una oportunidad.`,
  )}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors ?? {});
        setStatus("error");
        return;
      }
      setStatus("ok");
      setSent({ ...form });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard no disponible */
    }
  };

  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: profile.socials.email,
      href: `mailto:${profile.socials.email}`,
      accent: "hover:text-emerald-300",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: profile.socials.phoneDisplay,
      href: whatsappHref,
      accent: "hover:text-emerald-300",
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: profile.socials.phoneDisplay,
      href: `tel:${profile.socials.phone}`,
      accent: "hover:text-emerald-300",
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: profile.location,
      href: "https://maps.google.com/?q=Medellin+Colombia",
      accent: "hover:text-emerald-300",
    },
  ];

  return (
    <section id="contacto" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            index="05"
            title="Contacto"
            subtitle="¿Tienes un proyecto en mente o una oportunidad que pueda encajar? Escríbeme y te responderé lo antes posible."
            icon={<Send className="h-4 w-4" />}
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* ------------------------------- Canales */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {channels.map((c) => (
                  <ChannelCard key={c.label} {...c} />
                ))}
              </div>

              {/* Perfiles */}
              <div className="glow-card glass relative rounded-2xl p-5">
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      ¿Prefieres conectar por redes?
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Código, proyectos y notas de aprendizaje.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="rounded-xl p-2.5 text-slate-300 ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:text-emerald-400 hover:ring-emerald-500/40"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="rounded-xl p-2.5 text-slate-300 ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:text-emerald-400 hover:ring-emerald-500/40"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <button
                      onClick={copyEmail}
                      aria-label="Copiar email"
                      className="rounded-xl p-2.5 text-slate-300 ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:text-emerald-400 hover:ring-emerald-500/40"
                    >
                      {copied ? (
                        <Check className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Disponibilidad */}
              <div className="glow-card glass relative flex-1 overflow-hidden rounded-2xl p-5">
                <div className="relative z-10 flex h-full flex-col justify-center gap-3">
                  <p className="text-sm font-semibold text-slate-100">
                    Estado de disponibilidad
                  </p>
                  <p className="flex items-center gap-2 text-sm text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Abierta a oportunidades
                  </p>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Abierta a proyectos freelance, prácticas o pasantías.
                    Respondo en menos de 24 horas.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ------------------------------- Formulario */}
          <Reveal delay={0.2}>
            <form
              onSubmit={submit}
              noValidate
              className="glow-card glass relative h-full overflow-hidden rounded-2xl p-6 sm:p-8"
            >
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-slate-100">
                  Envíame un mensaje
                </h3>
                <p className="mt-1.5 text-xs text-slate-500">
                  Los campos marcados con * son obligatorios.
                </p>

                {/* Honeypot invisible para bots */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute h-0 w-0 opacity-0"
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field
                    id="name"
                    label="Nombre *"
                    placeholder="Tu nombre"
                    value={form.name}
                    error={errors.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                  />
                  <Field
                    id="email"
                    type="email"
                    label="Email *"
                    placeholder="tucorreo@dominio.com"
                    value={form.email}
                    error={errors.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                  />
                </div>

                <Field
                  id="subject"
                  label="Asunto"
                  placeholder="Ej. Oportunidad de contratación"
                  value={form.subject}
                  onChange={(v) => setForm({ ...form, subject: v })}
                />

                <div className="mt-4">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-medium tracking-wide text-slate-400"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Cuéntame sobre el proyecto o la oportunidad…"
                    className={`w-full resize-none rounded-xl border bg-white/4 px-4 py-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:bg-white/6 ${
                      errors.message
                        ? "border-red-500/50 focus:border-red-400"
                        : "border-white/10 focus:border-emerald-500/50"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Mensaje de estado */}
                <AnimatePresence>
                  {status === "ok" && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-xs text-emerald-300 ring-1 ring-emerald-500/25"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      Mensaje validado. ¿Abrir tu cliente de correo para enviarlo?
                      <a
                        href={`mailto:${profile.socials.email}?subject=${encodeURIComponent(
                          sent.subject || "Contacto desde el portafolio",
                        )}&body=${encodeURIComponent(
                          `Nombre: ${sent.name}\nEmail: ${sent.email}\n\n${sent.message}`,
                        )}`}
                        className="ml-auto font-semibold underline underline-offset-2"
                      >
                        Abrir
                      </a>
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-xs text-red-300 ring-1 ring-red-500/25"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      No se pudo enviar. Escríbeme directo a{" "}
                      <a
                        href={`mailto:${profile.socials.email}`}
                        className="font-semibold underline underline-offset-2"
                      >
                        {profile.socials.email}
                      </a>
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-[0_10px_40px_-14px_rgba(16,185,129,0.9)] transition-all hover:shadow-[0_12px_46px_-10px_rgba(16,185,129,1)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                    {status === "sending" ? "Enviando…" : "Enviar mensaje"}
                  </button>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium text-slate-300 ring-1 ring-white/10 transition-all hover:ring-emerald-500/40 hover:text-emerald-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <div className="mt-4 first:mt-0">
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium tracking-wide text-slate-400"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white/4 px-4 py-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:bg-white/6 ${
          error
            ? "border-red-500/50 focus:border-red-400"
            : "border-white/10 focus:border-emerald-500/50"
        }`}
      />
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
type Channel = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  accent: string;
};

function ChannelCard({ icon: Icon, label, value, href, accent }: Channel) {
  const { ref, onMouseMove } = useGlowPointer<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="glow-card glass rounded-2xl p-4"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 block"
      >
        <span className="mb-2.5 grid h-9 w-9 place-items-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/25">
          <Icon className="h-4 w-4 text-emerald-400" />
        </span>
        <p className="text-[11px] tracking-widest text-slate-500 uppercase">
          {label}
        </p>
        <p className={`mt-0.5 text-sm font-medium text-slate-200 ${accent}`}>
          {value}
        </p>
      </a>
    </motion.div>
  );
}
