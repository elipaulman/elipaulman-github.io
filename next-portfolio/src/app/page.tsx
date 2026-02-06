import Script from "next/script";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { EducationSection } from "@/components/EducationSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { personal, socials } from "@/lib/data";

export default function Home() {
  const websiteUrl = personal.website.startsWith("http")
    ? personal.website
    : `https://${personal.website}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.title,
    email: personal.email,
    url: websiteUrl,
    sameAs: [
      socials.socialMedia.linkedin.url,
      socials.socialMedia.github.url,
      websiteUrl,
    ],
    alumniOf: personal.university,
    address: {
      "@type": "PostalAddress",
      addressLocality: personal.location,
    },
  };

  return (
    <>
      <div className="relative min-h-screen">
        {/* Subtle accent gradient at top */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--accent-dim),transparent)]" />

        <NavBar resumePath={socials.resume.path} />
        <main className="mx-auto max-w-5xl px-5 pb-14 sm:px-8 sm:pb-16">
          <Hero socials={socials} />

          <div className="accent-line" />
          <AboutSection />
          <SkillsSection />

          <div className="accent-line" />
          <ExperienceTimeline />

          <div className="accent-line" />
          <ProjectsGrid />

          <div className="accent-line" />
          <EducationSection />
          <FAQSection />

          <div className="accent-line" />
          <ContactSection />

          <footer className="mt-20 border-t border-[var(--border)] pt-8 pb-10 text-center">
            <p className="font-mono text-xs text-[var(--muted)]">
              Designed & built by {personal.name}
            </p>
            <p className="mt-2 font-mono text-[0.65rem] text-[var(--line-number)]">
              Next.js + TypeScript &middot; {new Date().getFullYear()}
            </p>
          </footer>
        </main>
      </div>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6ENGFNQ089"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6ENGFNQ089');
        `}
      </Script>
    </>
  );
}
