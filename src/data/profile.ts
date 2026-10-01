/**
 * ============================================================
 *  DATOS CENTRALIZADOS DEL PORTAFOLIO
 *  --------------------------------------------------------
 *  Este es el ÚNICO archivo que necesitas editar para
 *  personalizar el portafolio (textos, enlaces, skills,
 *  experiencia, proyectos, comandos de la terminal, etc.).
 * ============================================================
 */

import type { LucideIcon } from "lucide-react";
import {
  Server,
  LayoutTemplate,
  Database,
  GitBranch,
  Sparkles,
  Code2,
  Terminal as TerminalIcon,
  GraduationCap,
  School,
  BadgeCheck,
} from "lucide-react";

/* ------------------------------------------------------------
 *  IDENTIDAD / CONTACTO
 * ---------------------------------------------------------- */
export const profile = {
  firstName: "Salomé",
  lastName: "Ocampo Henao",
  fullName: "Salomé Ocampo Henao",
  role: "Tecnóloga en Análisis y Desarrollo de Software & Técnica en Programación",
  shortRole: "Software Developer",
  location: "Medellín, Colombia",
  city: "Medellín",
  country: "Colombia",
  summary:
    "Desarrolladora de Software con experiencia en la creación de aplicaciones web utilizando Python (Django), Java (Spring Boot), JavaScript, HTML/CSS y bases de datos relacionales (MySQL). Orientada al aprendizaje autónomo, la atención al detalle y la entrega de soluciones eficientes.",
  /** Frase corta que se escribe en la terminal del Hero */
  typingLines: [
    "Hola, soy Salomé Ocampo Henao 👋",
    "Software Developer",
    "Construyo apps web con Django, Spring Boot y JavaScript",
  ],
  stackLine: ["Python", "Java", "Django", "Spring Boot", "JavaScript", "MySQL"],
  languages: [
    { name: "Español", level: "Nativo", percent: 100 },
    { name: "Inglés", level: "A2", percent: 45 },
  ],
  socials: {
    email: "salohenao19@gmail.com",
    phone: "+573155959444",
    phoneDisplay: "+57 315 595 9444",
    whatsapp: "573155959444", // solo dígitos con prefijo país, para wa.me
    github: "https://github.com/Salome0119",
    linkedin:
      "https://www.linkedin.com/in/salome-ocampo-henao-3299653b8",
  },
} as const;

/** Enlace del CV (coloca aquí tu PDF en /public/cv/ o cambia la URL) */
export const cvUrl = "/cv/Salome-Ocampo-Henao-CV.pdf";

/* ------------------------------------------------------------
 *  NAVEGACIÓN
 * ---------------------------------------------------------- */
export const navLinks = [
  { id: "inicio", label: "Inicio" },
  { id: "habilidades", label: "Habilidades" },
  { id: "experiencia", label: "Trayectoria" },
  { id: "proyectos", label: "Proyectos" },
  { id: "consola", label: "Consola" },
  { id: "contacto", label: "Contacto" },
] as const;

/* ------------------------------------------------------------
 *  MATRIZ DE HABILIDADES
 * ---------------------------------------------------------- */
export type Skill = {
  name: string;
  level: number; // 0 - 100
  note?: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  icon: LucideIcon;
  accent: string;
  description: string;
  skills: Skill[];
  tags: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    accent: "from-emerald-400/25 to-emerald-600/5",
    description:
      "Construyo la lógica de negocio con frameworks de alta productividad y arquitecturas limpias.",
    skills: [
      { name: "Python", level: 90, note: "Lenguaje principal" },
      { name: "Django", level: 88, note: "MVT · ORM · Admin" },
      { name: "Java", level: 82, note: "POO · Colecciones" },
      { name: "Spring Boot", level: 78, note: "REST · Inyección de dependencias" },
      { name: "Arquitecturas MVC / MTV", level: 85, note: "Separación de responsabilidades" },
      { name: "Autenticación & CRUD", level: 90, note: "Login, roles, sesiones" },
    ],
    tags: ["Python", "Django", "Java", "Spring Boot", "MVC", "REST", "ORM"],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: LayoutTemplate,
    accent: "from-cyan-400/25 to-cyan-600/5",
    description:
      "Interfaces dinámicas, accesibles y responsivas enfocadas en la experiencia de usuario.",
    skills: [
      { name: "JavaScript (ES6+)", level: 85, note: "DOM · Eventos · Lógica" },
      { name: "HTML5", level: 92, note: "Semántica y estructura" },
      { name: "CSS3", level: 88, note: "Flexbox · Grid · Animaciones" },
      { name: "Interfaces dinámicas", level: 80, note: "Actualización en tiempo real" },
      { name: "Maquetación Web", level: 90, note: "Diseño adaptativo" },
      { name: "Responsive Design", level: 86, note: "Mobile first" },
    ],
    tags: ["JavaScript", "HTML5", "CSS3", "DOM", "Flexbox", "Grid"],
  },
  {
    id: "datos",
    title: "Bases de Datos",
    icon: Database,
    accent: "from-sky-400/25 to-sky-600/5",
    description:
      "Modelado relacional y persistencia de datos con consultas optimizadas.",
    skills: [
      { name: "MySQL", level: 86, note: "Consultas y joins" },
      { name: "XAMPP", level: 90, note: "Entorno local Apache + MySQL" },
      { name: "Diseño relacional", level: 82, note: "Normalización" },
      { name: "Persistencia de datos", level: 88, note: "CRUD completo" },
      { name: "SQL básico-intermedio", level: 80, note: "SELECT · INSERT · UPDATE" },
    ],
    tags: ["MySQL", "SQL", "XAMPP", "Modelado", "Normalización"],
  },
  {
    id: "herramientas",
    title: "Herramientas & Versionado",
    icon: GitBranch,
    accent: "from-violet-400/25 to-violet-600/5",
    description:
      "Flujo de trabajo con control de versiones y resolución de conflictos.",
    skills: [
      { name: "Git", level: 85, note: "add · commit · merge" },
      { name: "GitHub", level: 84, note: "Repos, issues y Pull Requests" },
      { name: "Manejo de ramas", level: 80, note: "feature / main / hotfix" },
      { name: "Resolución de conflictos", level: 78, note: "merge y rebase" },
      { name: "Postman", level: 76, note: "Pruebas de endpoints" },
    ],
    tags: ["Git", "GitHub", "Branches", "Pull Requests", "Postman"],
  },
];

/* ------------------------------------------------------------
 *  HABILIDADES BLANDAS
 * ---------------------------------------------------------- */
export const softSkills = [
  { name: "Trabajo en equipo", icon: Sparkles, desc: "Colaboración y respeto mutuo en proyectos grupales." },
  { name: "Resolución de problemas", icon: Code2, desc: "Análisis lógico y descomposición de retos técnicos." },
  { name: "Aprendizaje autónomo", icon: GraduationCap, desc: "Curiosidad constante y autoformación guiada." },
  { name: "Comunicación asertiva", icon: BadgeCheck, desc: "Explicar ideas técnicas de forma clara y directa." },
  { name: "Atención al detalle", icon: Sparkles, desc: "Revisión minuciosa antes de entregar." },
  { name: "Comunicación técnica", icon: TerminalIcon, desc: "Documentación clara de código y procesos." },
];

/* ------------------------------------------------------------
 *  TRAYECTORIA (TIMELINE)
 * ---------------------------------------------------------- */
export type TimelineItem = {
  period: string;
  title: string;
  institution: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  current?: boolean;
};

export const timeline: TimelineItem[] = [
  {
    period: "2025 — Presente",
    title: "Tecnología en Análisis y Desarrollo de Software",
    institution: "SENA — Centro Textil y de Gestión Industrial",
    description:
      "Formación técnica superior en análisis, diseño y desarrollo de software. Modelado de datos, construcción de aplicaciones web y prácticas con el stack de trabajo.",
    icon: GraduationCap,
    tags: ["Análisis de software", "Arquitectura web", "Bases de datos", "Buenas prácticas"],
    current: true,
  },
  {
    period: "2023 — 2024",
    title: "Técnica en Programación de Software",
    institution: "I.E. San Juan Bosco / SENA",
    description:
      "Programación estructurada y orientada a objetos, construcción de algoritmos, primeros CRUD y اتصال de aplicaciones web con bases de datos relacionales.",
    icon: School,
    tags: ["Algoritmos", "POO", "CRUD", "MySQL"],
  },
  {
    period: "2018 — 2024",
    title: "Bachiller Académico",
    institution: "Institución Educativa San Juan Bosco",
    description:
      "Formación académica con énfasis en lógica matemática, tecnología y trabajo colaborativo en proyectos de aula.",
    icon: School,
    tags: ["Lógica", "Trabajo en equipo", "Tecnología"],
  },
];

/* ------------------------------------------------------------
 *  PROYECTOS
 *  ----------------------------------------------------------
 *  ➜ Datos tomados de github.com/Salome0119
 *  ➜ Para agregar o editar un proyecto: copia un objeto del array.
 * ---------------------------------------------------------- */
export type Project = {
  id: string;
  title: string;
  /** Nombre del repositorio en GitHub */
  repo: string;
  description: string;
  stack: string[];
  category: "web" | "backend" | "frontend" | "algoritmos";
  year: string;
  highlights: string[];
  /** Marca los proyectos insignia (se muestran con badge) */
  featured?: boolean;
  /** URL del despliegue en vivo, si existe */
  liveUrl?: string;
};

/** Helper para construir la URL de un repositorio propio */
export const repoUrl = (repo: string) => `https://github.com/Salome0119/${repo}`;

export const projects: Project[] = [
  {
    id: "ruta-segura-medellin",
    title: "Ruta Segura Medellín",
    repo: "Ruta_Segura_Medellin",
    description:
      "Plataforma web que resuelve la movilidad de Medellín: unifica datos de lluvia y sectores críticos en un modelo relacional normalizado y activa alertas de evacuación de forma automática antes de que se colapse un deprimido.",
    stack: ["Python", "Django", "MySQL", "PWA", "Service Worker"],
    category: "backend",
    year: "2026",
    featured: true,
    highlights: [
      "API REST con filtros por Query Params sobre 16 comunas",
      "Custom Management Commands para actualizar clima en segundo plano",
      "Alerta automática al superar 25 mm/h de precipitación",
      "PWA instalable con estrategia Cache First y pantalla offline",
    ],
    liveUrl: "https://github.com/Salome0119/Ruta_Segura_Medellin",
  },
  {
    id: "recicla-c4",
    title: "Recicla Comuna 4",
    repo: "recicla_C4",
    description:
      "Plataforma comunitaria de reciclaje con gamificación: los residentes acumulan puntos por participar en jornadas y los canjean por recompensas, dentro de un foro con moderación y contenido educativo.",
    stack: ["Django 5", "Python", "MySQL 8", "CSS3", "Bootstrap"],
    category: "web",
    year: "2026",
    featured: true,
    highlights: [
      "Arquitectura por roles: administrador, organizador y residente",
      "Autenticación personalizada con make_password y @rol_required",
      "Sistema de puntos, recompensas, canjes y notificaciones",
      "Foro con respuestas anidadas, reacciones y denuncias",
    ],
    liveUrl: "https://github.com/Salome0119/recicla_C4",
  },
  {
    id: "tema-foro",
    title: "Sistema de Gestión de Usuarios y Foro (CRM)",
    repo: "Tema_Foro",
    description:
      "Aplicación web tipo CRM en Django que integra un foro comunitario, un flujo de aprobación de privilegios administrativos y controles de acceso con base en roles.",
    stack: ["Django", "Python", "MySQL", "SMTP"],
    category: "backend",
    year: "2026",
    featured: true,
    highlights: [
      "Flujo de trabajo: solicitud de rol admin → aprobación o rechazo",
      "Cookies seguras (SESSION_COOKIE_SECURE, CSRF, HTTPONLY) y HSTS",
      "Recuperación de contraseña por correo vía SMTP",
      "Paginación de 10 ítems y control de propiedad de publicaciones",
    ],
    liveUrl: "https://github.com/Salome0119/Tema_Foro",
  },
  {
    id: "copia-rc4",
    title: "RC4 — Versión final del proyecto",
    repo: "Copia_RC4",
    description:
      "Repositorio de la versión consolidada del proyecto RC4, con el maquetado completo en CSS y los estilos finales aplicados sobre la estructura del proyecto.",
    stack: ["CSS3", "HTML5", "JavaScript"],
    category: "frontend",
    year: "2026",
    highlights: [
      "Hojas de estiloCCS separadas por módulo",
      "Diseño responsive mobile-first",
      "Componentes visuales reutilizables",
    ],
  },
  {
    id: "formulario-crud",
    title: "Formulario CRUD",
    repo: "Formulario_CRUD",
    description:
      "Formulario de creación, lectura, actualización y eliminación desplegado en producción, con interfaz limpia y operación completa sobre los registros.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    category: "frontend",
    year: "2026",
    highlights: [
      "CRUD completo con validación en el formulario",
      "Desplegado en Vercel",
      "Interfaz responsive y accesible",
    ],
    liveUrl: "https://formulario-crud-sage.vercel.app",
  },
  {
    id: "proyecto-vercel",
    title: "Proyecto — Despliegue en Vercel",
    repo: "Proyecto_vercel",
    description:
      "Sitio web estático construido como ejercicio de despliegue en la nube, con configuración de producción y publicación continua.",
    stack: ["HTML5", "CSS3", "Vercel"],
    category: "frontend",
    year: "2026",
    highlights: [
      "Pipeline de despliegue continuo",
      "Optimización de recursos estáticos",
      "Dominio activo en producción",
    ],
    liveUrl: "https://proyecto-vercel-blond.vercel.app",
  },
  {
    id: "proyecto",
    title: "Proyecto Web",
    repo: "Proyecto",
    description:
      "Desarrollo web completo publicado en producción, aplicando maquetación, estilos y estructura de navegación responsive.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    category: "frontend",
    year: "2026",
    highlights: [
      "Sitio publicado y funcional",
      "Estructura semántica y navegación responsive",
    ],
    liveUrl: "https://proyecto-livid-eight.vercel.app",
  },
  {
    id: "clase-django",
    title: "Práctica de Django + Bootstrap",
    repo: "clase_dj_Ficha-3147211",
    description:
      "Ejercicio académico de clase con Django y Bootstrap para practicar formularios, plantillas y la conexión del framework con una base de datos.",
    stack: ["Django", "Python", "Bootstrap"],
    category: "web",
    year: "2026",
    highlights: [
      "Formularios de Django con validación",
      "Plantillas y módulos estáticos",
      "Patrón MTV aplicado paso a paso",
    ],
  },
  {
    id: "formularios-rc4",
    title: "Formularios del proyecto RC4",
    repo: "Formularios_RC4",
    description:
      "Conjunto de formularios y componentes de interfaz creados como apoyo al proyecto RC4, con validaciones de cliente y estilos propios.",
    stack: ["CSS3", "HTML5"],
    category: "frontend",
    year: "2025",
    highlights: [
      "Formularios con validación en cliente",
      "Estilos CSS aplicados al proyecto RC4",
    ],
  },
  {
    id: "estructuras-de-datos",
    title: "Estructuras de datos con Python",
    repo: "ESTRUCTURAS_DE_DATOS",
    description:
      "Implementación de estructuras de datos lineales y no lineales en Python: listas, pilas, colas, árboles y tablas hash con sus operaciones básicas.",    stack: ["Python", "Algoritmos", "POO"],
    category: "algoritmos",
    year: "2025",
    highlights: [
      "Implementación desde cero de cada estructura",
      "Operaciones de inserción, búsqueda y eliminación",
      "Complejidad y casos de uso documentados",
    ],
  },
  {
    id: "arreglos-numpy",
    title: "Arreglos y variables no primitivas",
    repo: "Arreglos_con_python_Numpy",
    description:
      "Prácticas con vectores y matrices en Python usando NumPy: broadcasting, operaciones elemento a elemento y comparación entre arreglos de distintas dimensiones.",
    stack: ["Python", "NumPy", "Jupyter"],
    category: "algoritmos",
    year: "2025",
    highlights: [
      "Vectores y matrices con broadcasting",
      "Operaciones entre arreglos de distinta dimensión",
      "Notebooks de Jupyter como guía de laboratorio",
    ],
  },
  {
    id: "arreglos-colab",
    title: "Arreglos en Colaboratory",
    repo: "Arreglos_12_08_2025",
    description:
      "Cuaderno de trabajo en Google Colaboratory para practicar arreglos de una y dos dimensiones, asociados y vectores con operaciones de entrada y salida por consola.",
    stack: ["Python", "Jupyter", "Google Colab"],
    category: "algoritmos",
    year: "2025",
    highlights: [
      "Arreglos unidimensionales y bidimensionales",
      "Operaciones de lectura y escritura por consola",
      "Ejercicios guiados paso a paso",
    ],
  },
];

/* ------------------------------------------------------------
 *  COMANDOS DE LA TERMINAL "SaloCLI"
 * ---------------------------------------------------------- */
export const terminalCommands: Record<string, (args: string) => string[]> = {
  help: () => [
    "SaloCLI v1.0.0 — comandos disponibles:",
    "",
    "  help              Muestra esta lista de comandos",
    "  skills           Despliega el stack técnico en formato JSON",
    "  contacto         Datos de contacto y links directos",
    "  sobremi          Resumen profesional",
    "  experiencia      Trayectoria académica",
    "  proyectos        Lista de proyectos",
    "  languages        Idiomas y nivel",
    "  whoami           Salomé Ocampo Henao",
    "  ls               Muestra las secciones del sitio",
    "  clear            Limpia la terminal",
    "",
    "Tip: escribe 'help' y presiona Enter.",
  ],
  skills: () => [
    JSON.stringify(
      {
        developer: {
          name: profile.fullName,
          role: profile.shortRole,
          location: profile.location,
          stack: profile.stackLine,
          backend: skillGroups[0].skills.map((s) => s.name),
          frontend: skillGroups[1].skills.map((s) => s.name),
          database: skillGroups[2].skills.map((s) => s.name),
          tools: skillGroups[3].skills.map((s) => s.name),
        },
      },
      null,
      2,
    ),
  ],
  contacto: () => [
    "Canales de contacto:",
    "",
    `  email     ${profile.socials.email}`,
    `  whatsapp  ${profile.socials.phoneDisplay}`,
    `  github    ${profile.socials.github}`,
    `  linkedin  ${profile.socials.linkedin}`,
    "",
    "→ wa.me/573155959444",
  ],
  sobremi: () => [profile.summary],
  experiencia: () => [
    "Trayectoria:",
    ...timeline.map(
      (t) => `  ${t.period}  ${t.title} — ${t.institution}`,
    ),
  ],
  proyectos: () => [
    "Proyectos:",
    ...projects.map((p) => `  [${p.year}] ${p.title}  (${p.stack.join(", ")})`),
  ],
  languages: () => [
    "Idiomas:",
    ...profile.languages.map((l) => `  ${l.name} — ${l.level}`),
  ],
  whoami: () => [
    `${profile.fullName}`,
    `${profile.role}`,
    `${profile.location}`,
  ],
  ls: () => [
    "inicio/",
    "habilidades/",
    "experiencia/",
    "proyectos/",
    "consola/",
    "contacto/",
  ],
  clear: () => [],
  clearScreen: () => [],
};

/** Alias(minúsculas sin acentos) → comando canónico */
export const commandAliases: Record<string, string> = {
  ayuda: "help",
  "h": "help",
  "?": "help",
  skills: "skills",
  stack: "skills",
  "tecnologias": "skills",
  contact: "contacto",
  contacto: "contacto",
  "whatsapp": "contacto",
  email: "contacto",
  about: "sobremi",
  "sobre-mi": "sobremi",
  cv: "sobremi",
  experiencia: "experiencia",
  educacion: "experiencia",
  study: "experiencia",
  proyectos: "proyectos",
  project: "proyectos",
  languages: "languages",
  idiomas: "languages",
  "idioma": "languages",
  whoami: "whoami",
  "quien-soy": "whoami",
  ls: "ls",
  dir: "ls",
  home: "ls",
  clear: "clear",
  cls: "clear",
  "clear-screen": "clear",
  cls2: "clear",
};

export const terminalBanner = [
  "SaloCLI v1.0.0  ·  build 2026.04  ·  node v22",
  "© Salomé Ocampo Henao — Software Developer",
  "Escribe 'help' para ver los comandos disponibles.",
];
