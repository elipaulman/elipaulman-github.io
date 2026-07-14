"use client";

import Link from "next/link";
import { personal, socials } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "./icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ContactSection() {
  const reveal = useScrollReveal();

  return (
    <section id="contact" className="section-shell" style={{ overflow: 'visible', contentVisibility: 'visible' }}>
      <div ref={reveal} className="reveal space-y-6">
        <SectionHeading
          tag="contact"
          title="Let's Build Something"
          description="I'm most responsive via email and LinkedIn."
        />

        <div className="card max-w-xl space-y-2.5 font-mono text-sm">
          <Row label="email" value={personal.email} href={`mailto:${personal.email}`} />
          <Row label="phone" value={socials.phone} href={`tel:${socials.phone.replace(/\D/g, "")}`} />
          <Row label="location" value={personal.location} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={socials.socialMedia.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost px-4 py-2.5 text-sm"
          >
            <LinkedInIcon className="h-4 w-4" />
            linkedin
          </Link>
          <Link
            href={socials.socialMedia.github.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost px-4 py-2.5 text-sm"
          >
            <GitHubIcon className="h-4 w-4" />
            github
          </Link>
          <Link
            href={socials.resume.path}
            download
            className="btn btn-primary px-4 py-2.5 text-sm"
          >
            <DownloadIcon className="h-4 w-4" />
            &gt; download resume.pdf
          </Link>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex gap-2">
      <span className="shrink-0 text-[var(--accent)]">{label}</span>
      <span className="text-[var(--muted)]">=</span>
      {href ? (
        <Link href={href} className="min-w-0 truncate text-[var(--text-strong)] hover:text-[var(--accent)]">
          {value}
        </Link>
      ) : (
        <span className="min-w-0 truncate text-[var(--text-strong)]">{value}</span>
      )}
    </div>
  );
}
