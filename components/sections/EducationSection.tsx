import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { certifications, education } from "@/lib/portfolio-data";

export function EducationSection() {
  return (
    <SectionShell
      id="education"
      eyebrow="Education"
      title="Academic track and certifications"
      description="Formal preparation in systems engineering, agile foundations, and networking fundamentals."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <article className="group relative h-full overflow-hidden rounded-2xl border border-border/75 bg-surface/70 p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-surface/85">
            <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/0 blur-3xl transition duration-500 group-hover:bg-accent/25" />
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accentSoft">Degree Path</p>
            <h3 className="mt-4 text-xl font-semibold text-text transition group-hover:text-accentSoft">{education.degree}</h3>
            <p className="mt-2 text-sm text-muted transition group-hover:text-slate-200">{education.institution}</p>
            <p className="mt-5 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent transition group-hover:border-accent/55 group-hover:bg-accent/20">
              {education.graduation}
            </p>
          </article>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={0.1}>
          <article className="group relative h-full overflow-hidden rounded-2xl border border-border/75 bg-surface/70 p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-surface/85">
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-accent/0 blur-3xl transition duration-500 group-hover:bg-accent/25" />
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accentSoft">Certifications</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted sm:text-base">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="flex gap-3 rounded-lg border border-transparent px-2 py-1 transition duration-200 hover:-translate-y-0.5 hover:border-accent/25 hover:bg-bg/55"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent transition duration-200 group-hover:shadow-[0_0_10px_rgba(108,71,255,0.65)]" aria-hidden="true" />
                  <span className="transition duration-200 hover:text-text">{cert}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </SectionShell>
  );
}
