"use client";

import Link from "next/link";
import { personal, socials } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function AboutSection() {
  const reveal = useScrollReveal();
  const websiteUrl = personal.website.startsWith("http")
    ? personal.website
    : `https://${personal.website}`;

  return (
    <section id="about" className="section-shell">
      <div ref={reveal} className="reveal space-y-8">
        <SectionHeading
          tag="about"
          title="Who I Am"
          description="I ship fast, keep things maintainable, and love combining AI/ML with strong product sense."
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          {/* Bio */}
          <div className="space-y-6">
            <div className="card">
              <p className="leading-relaxed text-[var(--text)]">
                {personal.about.short}
              </p>
              <p className="mt-4 leading-relaxed text-[var(--text)]">
                {personal.about.detailed}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card">
                <p className="font-mono text-xs text-[var(--accent)]">{'// focus'}</p>
                <p className="mt-2 font-display text-sm font-semibold tracking-tight text-[var(--text-strong)]">
                  What I focus on
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Quality engineering, test automation, and building AI/ML-powered products with measurable impact.
                </p>
              </div>
              <div className="card">
                <p className="font-mono text-xs text-[var(--accent)]">{'// method'}</p>
                <p className="mt-2 font-display text-sm font-semibold tracking-tight text-[var(--text-strong)]">
                  How I work
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Bias for action, fast iterations, clean API boundaries, and crisp documentation.
                </p>
              </div>
            </div>
          </div>

          {/* Terminal card */}
          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3 mb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/50" />
              <span className="ml-2 font-mono text-xs text-[var(--muted)]">
                elijah@portfolio ~ $
              </span>
            </div>

            <div className="space-y-3 font-mono text-sm">
              <TerminalRow label="name" value={personal.name} />
              <TerminalRow label="university" value={personal.university} />
              <TerminalRow
                label="website"
                value={
                  <Link
                    href={websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--accent)] hover:underline"
                  >
                    {personal.website.replace(/^https?:\/\//, "")}
                  </Link>
                }
              />
              <TerminalRow
                label="email"
                value={
                  <Link
                    href={`mailto:${personal.email}`}
                    className="text-[var(--text-strong)] hover:text-[var(--accent)]"
                  >
                    {personal.email}
                  </Link>
                }
              />
              <TerminalRow
                label="phone"
                value={
                  <Link
                    href={`tel:${socials.phone.replace(/\D/g, "")}`}
                    className="text-[var(--text-strong)] hover:text-[var(--accent)]"
                  >
                    {socials.phone}
                  </Link>
                }
              />
              <TerminalRow label="location" value={personal.location} />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="pill">Full-stack</span>
              <span className="pill">AI/ML</span>
              <span className="pill">Cloud</span>
              <span className="pill">Leadership</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-2">
      <span className="shrink-0 text-[var(--accent)]">{label}</span>
      <span className="text-[var(--muted)]">=</span>
      <span className="min-w-0 text-[var(--text-strong)]">{value}</span>
    </div>
  );
}
