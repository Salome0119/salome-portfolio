import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

/* ------------------------------------------------------------
 *  Fuentes
 * ---------------------------------------------------------- */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/* ------------------------------------------------------------
 *  SEO
 * ---------------------------------------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL("https://salome-ocampo.dev"),
  title: {
    default: `${profile.fullName} — ${profile.shortRole}`,
    template: `%s | ${profile.fullName}`,
  },
  description: profile.summary,
  keywords: [
    "Salomé Ocampo Henao",
    "Software Developer",
    "Desarrolladora de software",
    "Python",
    "Django",
    "Java",
    "Spring Boot",
    "JavaScript",
    "MySQL",
    "Medellín",
    "Colombia",
    "Portafolio",
  ],
  authors: [{ name: profile.fullName, url: profile.socials.linkedin }],
  creator: profile.fullName,
  openGraph: {
    type: "website",
    locale: "es_CO",
    title: `${profile.fullName} — ${profile.shortRole}`,
    description: profile.summary,
    siteName: `${profile.fullName} | Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} — ${profile.shortRole}`,
    description: profile.summary,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0f1a",
  width: "device-width",
  initialScale: 1,
};

/* ------------------------------------------------------------
 *  Layout raíz
 * ---------------------------------------------------------- */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
