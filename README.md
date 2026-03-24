# Brandon Portfolio (Next.js)

Modern single-page portfolio for Brandon Esveny Brenes Arias built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (contact submissions)

## Project Structure

```text
app/
  api/contact/route.ts          # Secure contact endpoint for Supabase inserts
  globals.css                   # Theme tokens and base styles
  layout.tsx                    # Metadata + font setup
  page.tsx                      # Single-page composition
components/
  sections/
    AboutSection.tsx
    ContactSection.tsx
    EducationSection.tsx
    ExperienceSection.tsx
    HeroSection.tsx
    ProjectsSection.tsx
    SkillsSection.tsx
  ui/
    Badge.tsx
    PlasmaBackground.tsx
    Reveal.tsx
    SectionNav.tsx
    SectionShell.tsx
lib/
  portfolio-data.ts             # Portfolio content source of truth
  supabaseAdmin.ts              # Server-only Supabase client helper
  utils.ts
  validation.ts                 # Zod schema for contact payload
supabase/
  contact_submissions.sql       # Suggested table schema
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Set these values in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (optional for future client use)
- `SUPABASE_SERVICE_ROLE_KEY`

4. Create table in Supabase SQL editor using:

- `supabase/contact_submissions.sql`

5. Run development server:

```bash
npm run dev
```

## Contact Flow

- Client validates with Zod in `ContactSection`.
- Form posts to `POST /api/contact`.
- API route validates again and inserts via service-role Supabase client.
- Success and error states are shown in UI.

## Content Updates

Edit portfolio content in `lib/portfolio-data.ts`.

Some project cards include explicit TODO markers where final metrics or links are still pending real data.