import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { SectionNav } from "@/components/ui/SectionNav";
import { personalInfo } from "@/lib/portfolio-data";

export default function Home() {
  return (
    <>
      <HeroSection />

      <main className="relative overflow-hidden bg-bg" id="main-content">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(51,24,139,0.22)_0%,rgba(6,5,14,0)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(112,76,255,0.14),transparent_48%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-2 pt-6 sm:px-4 sm:pt-8">
          <SectionNav />
        </div>

        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />

        <footer className="border-t border-border/80 py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-6 text-xs text-muted sm:flex-row sm:items-center lg:px-8">
            <p>
              {new Date().getFullYear()} {personalInfo.name}. Built with Next.js, Tailwind CSS, and Framer Motion.
            </p>
            <p className="font-mono uppercase tracking-[0.2em] text-accentSoft">Costa Rica</p>
          </div>
        </footer>
      </main>
    </>
  );
}