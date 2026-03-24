"use client";

import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import {
  siCisco,
  siCss,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLinux,
  siMysql,
  siOpenjdk,
  siPhp,
  siPython,
  siSupabase,
  siTailwindcss,
  siTypescript
} from "simple-icons";
import { cn } from "@/lib/utils";

type SkillLogoProps = {
  skill: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"span">, "children">;

const skillIcons = {
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  HTML: siHtml5,
  CSS: siCss,
  "Tailwind CSS": siTailwindcss,
  Java: siOpenjdk,
  PHP: siPhp,
  Python: siPython,
  Supabase: siSupabase,
  MySQL: siMysql,
  Git: siGit,
  GitHub: siGithub,
  "MySQL Workbench": siMysql,
  "Linux Basics": siLinux,
  "Networking (CCNA-level)": siCisco
} as const satisfies Record<string, { path: string }>;

const skillImageLogos = {
  "C#": "/logos/csharp.svg",
  Oracle: "/logos/oracle.svg",
  "SQL Server": "/logos/sqlserver.svg",
  "Microsoft Access": "/logos/microsoft-access.svg",
  "Visual Studio": "/logos/visualstudio.svg",
  "VS Code": "/logos/vscode.svg",
  "Power BI": "/logos/powerbi.svg",
  "Excel Solver": "/logos/excel-solver.svg"
} as const satisfies Record<string, string>;

const skillMonograms = {} as const satisfies Record<string, string>;

function fallbackMonogram(skill: string): string {
  const explicit = skillMonograms[skill as keyof typeof skillMonograms];
  if (explicit) return explicit;
  return skill
    .split(/\s+/)
    .map((chunk) => chunk.replace(/[^A-Za-z]/g, ""))
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase())
    .join("");
}

export function SkillLogo({ skill, className, ...props }: SkillLogoProps) {
  const icon = skillIcons[skill as keyof typeof skillIcons];
  const imageLogo = skillImageLogos[skill as keyof typeof skillImageLogos];

  if (icon) {
    return (
      <span className={cn("inline-flex h-4 w-4 items-center justify-center", className)} aria-hidden="true" {...props}>
        <svg viewBox="0 0 24 24" className="h-full w-full fill-current">
          <path d={icon.path} />
        </svg>
      </span>
    );
  }

  if (imageLogo) {
    return (
      <span
        className={cn(
          "inline-flex h-4 w-4 items-center justify-center overflow-hidden rounded-[4px] border border-current/30 bg-transparent",
          className
        )}
        aria-hidden="true"
        {...props}
      >
        <Image
          src={imageLogo}
          alt=""
          width={16}
          height={16}
          className="h-full w-full object-contain opacity-80 grayscale contrast-125 brightness-0 invert transition duration-200 group-hover/skill:opacity-100"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex h-4 min-w-4 items-center justify-center rounded-[4px] border border-current/40 px-0.5 font-mono text-[9px] font-semibold leading-none",
        className
      )}
      aria-hidden="true"
      {...props}
    >
      {fallbackMonogram(skill)}
    </span>
  );
}
