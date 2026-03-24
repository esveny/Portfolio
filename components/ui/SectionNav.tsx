"use client";

import { motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" }
];

export function SectionNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="sticky top-4 z-40 mx-auto mb-8 w-fit rounded-full border border-border/80 bg-surface/80 px-2 py-2 shadow-card backdrop-blur-xl"
      aria-label="Section navigation"
    >
      <ul className="flex flex-wrap items-center justify-center gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="inline-flex rounded-full px-3 py-2 text-xs font-medium text-muted transition hover:bg-accent/15 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}