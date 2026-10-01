# Portafolio — Salomé Ocampo Henao

Portafolio web interactivo con estética **cyber-clean**: fondo oscuro profundo,
acentos verde esmeralda neón, glassmorphism y micro-interacciones.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide React

---

## 🚀 Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:3000
```

| Comando         | Descripción                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Servidor de desarrollo             |
| `npm run build` | Build de producción                |
| `npm run start` | Sirve el build                     |
| `npx tsc --noEmit` | Verificación de tipos           |

---

## 🗂️ Estructura

```
src/
├── app/
│   ├── layout.tsx            # Metadata SEO, fuentes, layout raíz
│   ├── page.tsx              # Ensamblaje de todas las secciones
│   ├── globals.css           # Tema Tailwind v4 (@theme) + utilidades
│   ├── icon.tsx              # Favicon generado con ImageResponse
│   └── api/contact/route.ts  # Endpoint POST del formulario
├── components/
│   ├── sections/             # Navbar, Hero, Skills, Timeline, …
│   └── ui/                   # CursorGlow, GlowCard, Reveal, Typewriter…
├── data/
│   └── profile.ts            # ⚙️  TODOS LOS DATOS EDITABLES AQUÍ
└── public/cv/                # Coloca aquí tu PDF del CV
```

---

## ⚙️ Personalización

**El 90% del sitio se edita en un solo archivo:**
`src/data/profile.ts`

| Qué editar                 | Dónde dentro de `profile.ts`       |
| -------------------------- | --------------------------------- |
| Nombre, rol, ciudad        | `profile`                         |
| Emails, teléfonos, redes   | `profile.socials`                 |
| Ruta del CV                | `cvUrl`                           |
| Enlaces del menú           | `navLinks`                        |
| Habilidades y niveles       | `skillGroups`                     |
| Habilidades blandas        | `softSkills`                      |
| Trayectoria / formación    | `timeline`                        |
| Proyectos                  | `projects`                        |
| Comandos de la terminal    | `terminalCommands` + `commandAliases` |

### Agregar un proyecto
```ts
// src/data/profile.ts
{
  id: "mi-proyecto",
  title: "Nombre del proyecto",
  repo: "Mi_Repositorio",            // solo el nombre, sin usuario
  description: "Qué hace y por qué es relevante.",
  stack: ["Django", "MySQL"],
  category: "web",          // "web" | "backend" | "frontend" | "algoritmos"
  year: "2026",
  featured: true,            // opcional: muestra badge "Destacado"
  highlights: ["Punto clave 1", "Punto clave 2"],
  liveUrl: "https://mi-demo.vercel.app",   // opcional
}
```
La URL del repositorio se arma sola con `repoUrl(project.repo)`
→ `https://github.com/Salome0119/<repo>`.

### Agregar un comando a SaloCLI
```ts
terminalCommands.miComando = () => ["Salida en varias", "líneas."];
commandAliases.micmd = "miComando";   // alias sin acentos ni mayúsculas
```

---

## 🎨 Personalización del diseño

Todo el sistema visual vive en `src/app/globals.css`:

```css
@theme {
  --color-ink-900: #0b0f1a;   /* Fondo profundo */
  --color-neon-500: #10b981;  /* Verde esmeralda neón */
}
```

Utilidades propias incluidas:

- `glass` — panel con `backdrop-blur` y bordes sutiles.
- `glow-card` — borde + resplandor que sigue al puntero (`--mx` / `--my`).
- `cursor-halo` — halo radial global que sigue al cursor.
- `grid-bg` — rejilla tech con desplazamiento.
- `text-gradient` — degradado esmeralda para títulos.

Variables CSS inyectadas en tiempo real por `CursorGlow`:
`--cursor-x`, `--cursor-y`.

---

## ⌨️ Consola SaloCLI

Terminal simulada dentro de la página.

| Comando        | Resultado                                  |
| -------------- | ------------------------------------------ |
| `help`         | Lista de comandos                          |
| `skills`       | Stack técnico en formato JSON              |
| `contacto`     | Email, WhatsApp, GitHub y LinkedIn         |
| `sobremi`      | Resumen profesional                        |
| `experiencia`  | Trayectoria académica                      |
| `proyectos`    | Listado de proyectos                       |
| `languages`    | Idiomas y nivel                            |
| `whoami` / `ls`| Info personal / secciones del sitio        |
| `clear`        | Limpia la consola (o `Ctrl+L`)             |

Extras: historial con `↑` / `↓`, autocompletado con `Tab`,
comandos rápidos con un clic y typewriter en el prompt.

---

## ✉️ Formulario de contacto

`POST /api/contact` valida el payload (nombre, email, mensaje), aplica
límites de longitud y usa un *honeypot* anti-spam.

Para activar el envío real de correos, edita el bloque marcado en
`src/app/api/contact/route.ts` e integra tu proveedor (Resend, Nodemailer,
SendGrid…). Mientras tanto, el flujo ofrece abrir el cliente de correo o
WhatsApp con el mensaje ya redactado.

---

## ♿ Accesibilidad y rendimiento

- `prefers-reduced-motion` respetado en animaciones y efectos.
- El cursor con glow solo se activa en dispositivos con puntero fino.
- Navegación por teclado en terminal, filtros y acordeones (`aria-expanded`).
- Tipografías `next/font` con `display: swap` (sin layout shift).
- Enlace "volver arriba" con `aria-label` y foco visible.

---

## 🚀 Deploy

Vercel es la opción directa:

```bash
npx vercel
```

O cualquier hosting Node: `npm run build && npm run start`.
