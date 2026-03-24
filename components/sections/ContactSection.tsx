"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { personalInfo } from "@/lib/portfolio-data";
import { contactSchema, type ContactInput } from "@/lib/validation";

type FormErrors = Partial<Record<keyof ContactInput, string>>;

const initialState: ContactInput = {
  name: "",
  email: "",
  message: ""
};

export function ContactSection() {
  const [form, setForm] = useState<ContactInput>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const messageLength = useMemo(() => form.message.trim().length, [form.message]);
  const contactChannels = [
    {
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      actionLabel: "Send Email",
      helper: "Best for opportunities and collaborations",
      external: false
    },
    {
      label: "GitHub",
      value: "github.com/esveny",
      href: personalInfo.github,
      actionLabel: "Open Profile",
      helper: "Code samples and active repositories",
      external: true
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/brandon-brenes-4a4a01203",
      href: personalInfo.linkedin,
      actionLabel: "Open Profile",
      helper: "Professional background and updates",
      external: true
    }
  ];

  const onChange = (field: keyof ContactInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setServerError(null);
    setSuccess(false);
  };

  const validate = () => {
    const parsed = contactSchema.safeParse(form);

    if (parsed.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: FormErrors = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0] as keyof ContactInput | undefined;
      if (!path || fieldErrors[path]) continue;
      fieldErrors[path] = issue.message;
    }

    setErrors(fieldErrors);
    return false;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Something went wrong. Please try again.");
      }

      setSuccess(true);
      setForm(initialState);
      setErrors({});
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Unable to send your message right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Let us build something meaningful"
      description="Open to internships, junior engineering roles, and freelance collaborations."
      className="pb-28"
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <article className="group relative h-full overflow-hidden rounded-2xl border border-border/75 bg-surface/75 p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-surface/85">
            <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/0 blur-3xl transition duration-500 group-hover:bg-accent/20" />
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accentSoft">Direct Channels</p>
            <ul className="mt-5 space-y-3">
              {contactChannels.map((channel) => (
                <li key={channel.label} className="rounded-xl border border-border/80 bg-bg/50 p-4 transition duration-200 hover:border-accent/35 hover:bg-bg/80">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-text">{channel.label}</p>
                      <p className="mt-1 text-sm text-muted">{channel.value}</p>
                      <p className="mt-1 text-xs text-muted/85">{channel.helper}</p>
                    </div>
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noreferrer" : undefined}
                      className="inline-flex shrink-0 items-center rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text transition hover:-translate-y-0.5 hover:border-accent/45 hover:bg-accent/10"
                    >
                      {channel.actionLabel}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-border/80 bg-bg/55 p-4 text-xs leading-6 text-muted">
              <p className="font-mono uppercase tracking-[0.18em] text-accentSoft">Response Time</p>
              <p className="mt-2">Usually within 24-48 hours for role opportunities and project inquiries.</p>
            </div>
          </article>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={0.12}>
          <motion.form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border/75 bg-surface/75 p-7 shadow-card"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-text">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={(event) => onChange("name", event.target.value)}
                  autoComplete="name"
                  className="w-full rounded-xl border border-border bg-bg/70 px-4 py-3 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  placeholder="Your full name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name ? (
                  <p id="name-error" className="mt-2 text-xs text-rose-300">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-text">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={(event) => onChange("email", event.target.value)}
                  autoComplete="email"
                  className="w-full rounded-xl border border-border bg-bg/70 px-4 py-3 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  placeholder="name@company.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email ? (
                  <p id="email-error" className="mt-2 text-xs text-rose-300">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-text">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={(event) => onChange("message", event.target.value)}
                  className="w-full rounded-xl border border-border bg-bg/70 px-4 py-3 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  placeholder="Tell me about your role, project, or collaboration opportunity."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : "message-helper"}
                />
                <div className="mt-2 flex items-center justify-between">
                  {errors.message ? (
                    <p id="message-error" className="text-xs text-rose-300">
                      {errors.message}
                    </p>
                  ) : (
                    <p id="message-helper" className="text-xs text-muted">
                      Minimum 20 characters.
                    </p>
                  )}
                  <p className="text-xs text-muted">{messageLength}/1200</p>
                </div>
              </div>
            </div>

            {serverError ? <p className="mt-4 text-sm text-rose-300">{serverError}</p> : null}
            {success ? (
              <p className="mt-4 text-sm text-emerald-300">Message sent successfully. I will get back to you soon.</p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex items-center rounded-full border border-accent/50 bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4622bf] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </Reveal>
      </div>
    </SectionShell>
  );
}
