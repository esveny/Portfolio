import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { aboutSummary } from "@/lib/portfolio-data";

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="Systems-focused engineer building useful software"
      description="I combine product awareness with strong technical execution to ship reliable digital experiences."
    >
      <Reveal>
        <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-surface/70 p-7 shadow-card backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-surface/85 sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/0 blur-3xl transition duration-500 group-hover:bg-accent/25" />
          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_12%_12%,rgba(138,108,255,0.16),transparent_44%)]" />

          <p className="relative text-pretty text-base leading-8 text-muted transition group-hover:text-slate-200 sm:text-lg">
            {aboutSummary}
          </p>
          <div className="mt-8 grid gap-4 text-sm text-muted sm:grid-cols-3">
            <div className="rounded-xl border border-border/80 bg-bg/55 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:bg-bg/80">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accentSoft">Focus</p>
              <p className="mt-2 text-text transition hover:text-accentSoft">Full-stack product delivery</p>
            </div>
            <div className="rounded-xl border border-border/80 bg-bg/55 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:bg-bg/80">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accentSoft">Approach</p>
              <p className="mt-2 text-text transition hover:text-accentSoft">Systems thinking and clean architecture</p>
            </div>
            <div className="rounded-xl border border-border/80 bg-bg/55 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:bg-bg/80">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accentSoft">Value</p>
              <p className="mt-2 text-text transition hover:text-accentSoft">Maintainable solutions with business impact</p>
            </div>
          </div>
        </article>
      </Reveal>
    </SectionShell>
  );
}
