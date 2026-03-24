import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Brandon Esveny Brenes Arias | Computer Systems Engineer",
  description:
    "Portfolio of Brandon Esveny Brenes Arias, a Computer Systems Engineer focused on full-stack web development and practical digital products.",
  openGraph: {
    title: "Brandon Esveny Brenes Arias | Portfolio",
    description:
      "Modern systems engineering portfolio showcasing full-stack projects, technical skills, and real delivery experience.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
