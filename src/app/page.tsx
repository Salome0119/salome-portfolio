import BackgroundFX from "@/components/sections/BackgroundFX";
import CursorGlow from "@/components/ui/CursorGlow";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import StackMarquee from "@/components/sections/StackMarquee";
import SkillsMatrix from "@/components/sections/SkillsMatrix";
import Timeline from "@/components/sections/Timeline";
import Projects from "@/components/sections/Projects";
import SaloCLI from "@/components/sections/SaloCLI";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

/**
 * ============================================================
 *  PÁGINA PRINCIPAL
 *  --------------------------------------------------------
 *  Orden de secciones:
 *   00 · Fondo ambiental + cursor glow
 *      · Navbar
 *   01 · Hero (presentación + typewriter)
 *      · Stack marquee
 *   02 · Matriz de habilidades
 *   03 · Trayectoria (timeline)
 *   04 · Proyectos
 *   05 · SaloCLI (consola interactiva)
 *   06 · Contacto
 *      · Footer
 * ============================================================
 */
export default function Page() {
  return (
    <>
      {/* Fondo animado + cursor con glow */}
      <BackgroundFX />
      <CursorGlow />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <StackMarquee />
        <SkillsMatrix />
        <Timeline />
        <Projects />
        <SaloCLI />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
