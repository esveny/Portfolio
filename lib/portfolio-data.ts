export type ExperienceItem = {
  role: string;
  organization: string;
  location: string;
  engagement: string;
  period: string;
  highlights: string[];
};

export type ProjectItem = {
  title: string;
  type: string;
  summary: string;
  contribution: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  status: "Live" | "In Progress" | "Case Study";
};

export const personalInfo = {
  name: "Brandon Esveny Brenes Arias",
  role: "Computer Systems Engineer",
  country: "Costa Rica",
  email: "branbrenes15@gmail.com",
  github: "https://github.com/esveny",
  linkedin: "https://www.linkedin.com/in/brandon-brenes-4a4a01203/"
};

export const hero = {
  headline: "Engineering practical digital products with systems-level thinking.",
  subheadline:
    "I design and ship reliable web experiences that blend strong technical execution, clean architecture, and business value.",
  primaryCta: "Enter Portfolio",
  secondaryCtas: [
    { label: "GitHub", href: personalInfo.github, newTab: true },
    { label: "LinkedIn", href: personalInfo.linkedin, newTab: true },
    { label: "Resume", href: "/cv/Resume%20Brandon%20Brenes%20A.pdf", newTab: true },
    { label: "Contact", href: "#contact", newTab: false }
  ]
};

export const aboutSummary =
  "I am a Computer Systems Engineering student focused on full-stack web development, robust system design, and building useful software that solves real operational problems. I work across frontend, backend, and data layers, with a strong focus on delivery quality, maintainability, and measurable product impact.";

export const experiences: ExperienceItem[] = [
  {
    role: "Full-Stack Web Developer",
    organization: "Taller Industrial Brenes y Asociados de Grecia S.A.",
    location: "Grecia, Alajuela, Costa Rica",
    engagement: "Part Time",
    period: "Oct 2025 - Present",
    highlights: [
      "Designed, developed, and deployed the company official web application from scratch using Astro and Tailwind CSS.",
      "Architected and implemented a relational Supabase database for image storage and content operations.",
      "Executed SEO improvements including meta-tags, SSR, and schema markup to strengthen discoverability and technical quality."
    ]
  },
  {
    role: "Data Digitization Operator",
    organization: "Municipality of Grecia",
    location: "Grecia, Alajuela, Costa Rica",
    engagement: "Volunteer Service",
    period: "Feb 2022 - Nov 2022",
    highlights: [
      "Supported municipal data digitization workflows with consistency and quality control.",
      "Collaborated with administrative teams to improve information traceability and record organization."
    ]
  }
];

export const projects: ProjectItem[] = [
  {
    title: "Industrial Company Official Web Platform",
    type: "Featured Production Project",
    summary:
      "Corporate web application delivered end-to-end for a real business environment, with structured content management and technical SEO foundations.",
    contribution:
      "Owned architecture, development, deployment, and optimization strategy from initial build to production delivery.",
    tags: ["Astro", "Tailwind CSS", "Supabase", "SSR", "Schema Markup", "SEO"],
    status: "Live"
  },
  {
    title: "Engineering Portfolio Platform",
    type: "Personal Product",
    summary:
      "A premium single-page portfolio focused on recruiter clarity, technical storytelling, and conversion-ready contact flows.",
    contribution:
      "TODO: Add measurable outcomes (traffic, recruiter responses, interview conversions) once tracked in production.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Supabase"],
    repoUrl: personalInfo.github,
    status: "In Progress"
  },
  {
    title: "Systems and Data Workflow Case Study",
    type: "Case Study",
    summary:
      "Structured showcase space for a future project combining backend services, relational modeling, and reporting workflows.",
    // TODO: Replace this card with a real published project once details are finalized.
    contribution:
      "TODO: Document architecture decisions, implementation scope, and technical tradeoffs after project launch.",
    tags: ["Backend", "Databases", "Power BI", "API Design"],
    status: "Case Study"
  }
];

export const skills = {
  frontend: ["JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
  backend: ["Java", "C#", "PHP", "Python"],
  databases: ["Supabase", "Oracle", "MySQL", "SQL Server", "Microsoft Access"],
  tools: ["Git", "GitHub", "Visual Studio", "VS Code", "MySQL Workbench", "Power BI", "Excel Solver"],
  infrastructure: ["Linux Basics", "Networking (CCNA-level)"]
};

export const education = {
  institution: "Fidelitas University, Costa Rica",
  degree: "Bachelor of Computer Systems Engineering",
  graduation: "Expected graduation: Spring 2026"
};

export const certifications = [
  "MET Certificate of Achievement (Level B1) - October 2025",
  "Scrum Fundamentals - March 2024",
  "CCNA v7 Cisco Networking Academy - August 2024",
  "Introduction to Networks - Cisco Networking Academy",
  "Switching, Routing and Wireless Essentials - Cisco Networking Academy"
];
