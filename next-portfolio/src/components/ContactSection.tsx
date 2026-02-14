"use client";

import Link from "next/link";
import { personal, socials } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  LocationIcon,
} from "./icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ContactSection() {
  const reveal = useScrollReveal();

  return (
    <section id="contact" className="section-shell">
      <div ref={reveal} className="reveal space-y-8">
        <SectionHeading
          tag="contact"
          title="Let's Build Something"
          description="I'm most responsive via email and LinkedIn."
        />

        {/* Contact cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href={`mailto:${personal.email}`}
            className="card card-glow flex items-center gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-dim)]">
              <MailIcon className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-xs text-[var(--muted)]">{'// email'}</p>
              <p className="truncate text-sm font-semibold text-[var(--text-strong)]">
                {personal.email}
              </p>
            </div>
          </Link>

          <Link
            href={`tel:${socials.phone.replace(/\D/g, "")}`}
            className="card card-glow flex items-center gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-dim)]">
              <PhoneIcon className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--muted)]">{'// phone'}</p>
              <p className="text-sm font-semibold text-[var(--text-strong)]">
                {socials.phone}
              </p>
            </div>
          </Link>

          <div className="card flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-dim)]">
              <LocationIcon className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--muted)]">{'// location'}</p>
              <p className="text-sm font-semibold text-[var(--text-strong)]">
                {personal.location}
              </p>
            </div>
          </div>
        </div>

        {/* Social + Resume row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <Link
            href={socials.socialMedia.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--panel)] px-4 py-2.5 font-mono text-sm text-[var(--muted)] backdrop-blur-xl backdrop-saturate-180 shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_24px_var(--accent-glow),0_4px_16px_rgba(0,229,160,0.12)] hover:scale-[1.02]"
          >
            <LinkedInIcon className="h-4 w-4" />
            linkedin
          </Link>
          <Link
            href={socials.socialMedia.github.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--panel)] px-4 py-2.5 font-mono text-sm text-[var(--muted)] backdrop-blur-xl backdrop-saturate-180 shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_24px_var(--accent-glow),0_4px_16px_rgba(0,229,160,0.12)] hover:scale-[1.02]"
          >
            <GitHubIcon className="h-4 w-4" />
            github
          </Link>
          <Link
            href={socials.resume.path}
            download
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--accent)] bg-[var(--accent-dim)] px-4 py-2.5 font-mono text-sm font-semibold text-[var(--text-strong)] backdrop-blur-xl backdrop-saturate-180 shadow-[0_4px_16px_rgba(0,229,160,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_0_32px_var(--accent-glow),0_4px_16px_rgba(0,229,160,0.2)] hover:scale-[1.02]"
          >
            <DownloadIcon className="h-4 w-4" />
            &gt; download resume.pdf
          </Link>
        </div>
      </div>
    </section>
  );
}
