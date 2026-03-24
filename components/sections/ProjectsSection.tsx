import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { projects } from "@/lib/portfolio-data";

export function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      eyebrow="Projects"
      title="Selected builds and technical case studies"
      description="Project storytelling focused on architecture choices, contribution depth, and delivery outcomes."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.08} className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/75 bg-surface/65 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-surface/80 sm:p-7">
              <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-accent/0 blur-3xl transition duration-500 group-hover:bg-accent/30" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_15%,rgba(138,108,255,0.16),transparent_40%)]" />

              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-accentSoft">{project.type}</p>
                <Badge>{project.status}</Badge>
              </div>

              <h3 className="mt-4 text-xl font-semibold text-text transition group-hover:text-accentSoft">{project.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted transition group-hover:text-slate-200">{project.summary}</p>

              <div className="mt-5 rounded-xl border border-border/70 bg-bg/45 p-4 transition duration-300 group-hover:border-accent/35 group-hover:bg-bg/70">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accentSoft">Contribution</p>
                <p className="mt-2 text-sm leading-7 text-muted">{project.contribution}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/80 px-3 py-1 text-xs text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/10 hover:text-text"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-border px-4 py-2 text-xs font-semibold text-text transition duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/10"
                  >
                    View Code
                  </a>
                ) : null}
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-border px-4 py-2 text-xs font-semibold text-text transition duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/10"
                  >
                    Live Demo
                  </a>
                ) : null}
                {!project.repoUrl && !project.demoUrl ? (
                  <span className="inline-flex items-center rounded-full border border-dashed border-border px-4 py-2 text-xs text-muted">
                    Link pending
                  </span>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
