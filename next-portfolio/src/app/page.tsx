import Script from "next/script";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { EducationSection } from "@/components/EducationSection";
import { BeyondSection } from "@/components/BeyondSection";
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
      <NavBar name={personal.name} linkedinUrl={socials.socialMedia.linkedin.url} />
      <main>
        <Hero socials={socials} />
        <AboutSection />
        <ExperienceTimeline />
        <ProjectsGrid />
        <SkillsSection />
        <EducationSection />
        <BeyondSection />
        <ContactSection />
      </main>
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
