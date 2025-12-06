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
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(109,40,217,0.12),transparent_25%),radial-gradient(circle_at_90%_10%,rgba(56,189,248,0.16),transparent_22%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.12),transparent_30%)]" />
        <NavBar resumePath={socials.resume.path} />
        <main className="mx-auto max-w-6xl px-6 pb-16">
          <Hero socials={socials} />
          <AboutSection />
          <SkillsSection />
          <ExperienceTimeline />
          <ProjectsGrid />
          <EducationSection />
          <FAQSection />
          <ContactSection />
          <footer className="mt-10 text-center text-xs text-[var(--muted)]">
            Built with Next.js · Last updated {new Date().getFullYear()}
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
