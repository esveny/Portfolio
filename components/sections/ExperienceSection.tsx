import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { experiences } from "@/lib/portfolio-data";

export function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      eyebrow="Experience"
      title="Real execution in production and operations"
      description="Hands-on work across application delivery, data workflows, and technical optimization."
    >
      <div className="space-y-6">
        {experiences.map((item, index) => (
          <Reveal key={`${item.organization}-${item.role}`} delay={index * 0.1}>
            <article className="rounded-2xl border border-border/75 bg-surface/65 p-6 shadow-card backdrop-blur-xl sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-text">{item.role}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {item.organization} | {item.engagement}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-accentSoft">{item.location}</p>
                </div>
                <p className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.13em] text-accent">
                  {item.period}
                </p>
              </div>

              <ul className="mt-5 space-y-3 text-sm leading-7 text-muted sm:text-base">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}