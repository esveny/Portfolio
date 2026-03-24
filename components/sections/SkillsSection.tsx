import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { SkillLogo } from "@/components/ui/SkillLogo";
import { skills } from "@/lib/portfolio-data";

const skillGroups = [
  { key: "frontend", label: "Frontend", items: skills.frontend },
  { key: "backend", label: "Backend", items: skills.backend },
  { key: "databases", label: "Databases", items: skills.databases },
  { key: "tools", label: "Tools", items: skills.tools },
  { key: "infrastructure", label: "Networking / Infrastructure", items: skills.infrastructure }
];

export function SkillsSection() {
  return (
    <SectionShell
      id="skills"
      eyebrow="Skills"
      title="Technical toolkit"
      description="Stack capabilities grouped for quick recruiter scanning and technical fit checks."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.key} delay={index * 0.07}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-border/75 bg-surface/70 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-surface/85">
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/0 blur-3xl transition duration-500 group-hover:bg-accent/25" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_15%_15%,rgba(135,106,255,0.14),transparent_42%)]" />

              <h3 className="relative text-lg font-semibold text-text transition group-hover:text-accentSoft">{group.label}</h3>
              <p className="relative mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted/90">
                {group.items.length} core capabilities
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group/skill inline-flex items-center gap-2 rounded-full border border-border/80 bg-bg/50 px-3 py-1.5 text-sm text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/10 hover:text-text"
                  >
                    <SkillLogo
                      skill={item}
                      className="text-muted transition duration-200 group-hover/skill:text-accentSoft group-hover/skill:drop-shadow-[0_0_8px_rgba(135,106,255,0.45)]"
                    />
                    {item}
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
