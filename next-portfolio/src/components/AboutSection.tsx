import type { ReactNode } from "react";
import Link from "next/link";
import { personal, socials } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { LocationIcon, MailIcon } from "./icons";

export function AboutSection() {
  const websiteUrl = personal.website.startsWith("http")
    ? personal.website
    : `https://${personal.website}`;

  return (
    <section id="about" className="section-shell">
      <div className="glass-panel space-y-8">
        <SectionHeading
          eyebrow="About"
          title="Who I Am"
          description="I ship fast, keep things maintainable, and love pairing AI/ML with solid product instincts."
        />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-[0_12px_50px_rgba(0,0,0,0.28)]">
              <p className="leading-relaxed text-[var(--muted)]">
                {personal.about.short}
              </p>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                {personal.about.detailed}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Callout title="What I&apos;m looking for">
                New grad SWE roles (Jan 2026 start). Love backend + AI features with measurable impact.
              </Callout>
              <Callout title="How I work">
                Bias for action, fast iterations, clean API boundaries, and crisp documentation.
              </Callout>
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-[0_15px_60px_rgba(0,0,0,0.35)]">
            <div className="space-y-4 text-sm text-[var(--text-strong)]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--muted)]">Name</span>
                <span className="font-semibold">{personal.name}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--muted)]">University</span>
                <span className="font-semibold text-right">
                  {personal.university}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--muted)]">Website</span>
                <Link
                  href={websiteUrl}
                  className="font-semibold text-[var(--accent)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  {personal.website.replace(/^https?:\/\//, "")}
                </Link>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[var(--muted)]">Email</span>
                <div className="space-y-1 text-right font-semibold">
                  <Link
                    href={`mailto:${personal.email}`}
                    className="hover:text-[var(--accent)]"
                  >
                    {personal.email}
                  </Link>
                  <Link
                    href={`mailto:${personal.schoolEmail}`}
                    className="block text-xs font-medium text-[var(--muted)] hover:text-[var(--accent)]"
                  >
                    {personal.schoolEmail}
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--muted)]">Phone</span>
                <Link
                  href={`tel:${socials.phone.replace(/\D/g, "")}`}
                  className="font-semibold hover:text-[var(--accent)]"
                >
                  {socials.phone}
                </Link>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--muted)]">Location</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--text-strong)]">
                  <LocationIcon className="h-4 w-4" />
                  {personal.location}
                </span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="pill">Full-stack</span>
              <span className="pill">AI/ML</span>
              <span className="pill">Cloud</span>
              <span className="pill">Leadership</span>
              <span className="pill">Rapid prototyping</span>
            </div>
            <div className="mt-5 hidden items-center gap-3 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,theme(colors.sky.500)_14%,transparent)] px-4 py-3 text-sm text-[var(--text-strong)] sm:flex">
              <MailIcon className="h-4 w-4" />
              <span>Available for new grad SWE roles starting January 2026.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type CalloutProps = {
  title: string;
  children: ReactNode;
};

function Callout({ title, children }: CalloutProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
      <p className="text-sm font-semibold text-[var(--text-strong)]">{title}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">{children}</p>
    </div>
  );
}
