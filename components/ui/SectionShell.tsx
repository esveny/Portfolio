import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
};

export function SectionShell({ id, eyebrow, title, description, className, children }: SectionShellProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-24", className)} aria-labelledby={`${id}-title`}>
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent/90">{eyebrow}</p>
          <h2 id={`${id}-title`} className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {title}
          </h2>
          {description ? <p className="mt-4 text-base leading-7 text-muted">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}