"use client";

import { motion } from "framer-motion";
import { hero, personalInfo } from "@/lib/portfolio-data";
import { PlasmaBackground } from "@/components/ui/PlasmaBackground";

export function HeroSection() {
  const onEnterPortfolio = () => {
    const target = document.getElementById("about");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="relative min-h-screen overflow-hidden">
      <PlasmaBackground />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-12 pt-6 sm:px-8">
        <div className="mb-10 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accentSoft">{personalInfo.country}</p>
          <a
            href="#contact"
            className="rounded-full border border-accent/35 bg-accent/15 px-4 py-2 text-xs font-semibold text-text transition hover:border-accent/60 hover:bg-accent/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Available for opportunities
          </a>
        </div>

        <div className="my-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-mono text-xs uppercase tracking-[0.32em] text-accentSoft"
          >
            {personalInfo.name}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {personalInfo.role}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35 }}
            className="mt-5 max-w-3xl text-pretty text-base leading-8 text-slate-200/95 sm:text-lg"
          >
            {hero.headline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45 }}
            className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-slate-300 sm:text-base"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={onEnterPortfolio}
              className="group inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#4622bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {hero.primaryCta}
              <span className="transition group-hover:translate-x-1" aria-hidden="true">
                {"->"}
              </span>
            </button>

            {hero.secondaryCtas.map((cta) => {
              const shouldOpenNewTab = cta.newTab ?? cta.href.startsWith("http");
              return (
                <a
                  key={cta.label}
                  href={cta.href}
                  target={shouldOpenNewTab ? "_blank" : undefined}
                  rel={shouldOpenNewTab ? "noreferrer" : undefined}
                  className="inline-flex items-center rounded-full border border-slate-300/25 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:-translate-y-0.5 hover:border-slate-100/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  {cta.label}
                </a>
              );
            })}
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={onEnterPortfolio}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mx-auto mt-10 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-300/90 transition hover:text-white"
          aria-label="Scroll to portfolio details"
        >
          Scroll for details
          <span className="h-10 w-[1px] bg-gradient-to-b from-accentSoft to-transparent" />
        </motion.button>
      </div>
    </header>
  );
}
