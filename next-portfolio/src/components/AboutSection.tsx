"use client";

import Image from "next/image";
import Link from "next/link";
import { personal, socials } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMouseTilt } from "@/hooks/useMouseTilt";

export function AboutSection() {
  const reveal = useScrollReveal();
  const tiltRef = useMouseTilt<HTMLDivElement>({ max: 4, lift: 6, leaveMs: 450 });
  const photoTiltRef = useMouseTilt<HTMLDivElement>({ max: 4, lift: 8, leaveMs: 450 });
  const terminalTiltRef = useMouseTilt<HTMLDivElement>({ max: 5, lift: 8, leaveMs: 450 });
  const websiteUrl = personal.website.startsWith("http")
    ? personal.website
    : `https://${personal.website}`;

  return (
    <section id="about" className="section-shell" style={{ overflow: 'visible', contentVisibility: 'visible' }}>
      <div ref={reveal} className="reveal space-y-8">
        <SectionHeading
          tag="about"
          title="Who I Am"
          description="I ship fast, keep things maintainable, and love combining AI/ML with strong product sense."
        />

        <div
          className="grid gap-8 lg:grid-cols-2 lg:items-stretch"
          style={{ perspective: "1400px", overflow: "visible" }}
        >
          {/* Bio */}
          <div className="flex flex-col gap-6">
            <div ref={tiltRef} className="tilt-stage flex-1">
              <div className="card h-full">
              <p
                className="tilt-layer leading-relaxed text-[var(--text)]"
                style={{ transform: "translateZ(10px)" }}
              >
                {personal.about.short}
              </p>
              <p
                className="tilt-layer mt-4 leading-relaxed text-[var(--text)]"
                style={{ transform: "translateZ(18px)" }}
              >
                {personal.about.detailed}
              </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div ref={tiltRef} className="tilt-stage">
                <div className="card">
                <p
                  className="tilt-layer font-mono text-xs text-[var(--accent)]"
                  style={{ transform: "translateZ(14px)" }}
                >
                  {'// focus'}
                </p>
                <p
                  className="tilt-layer mt-2 font-display text-sm font-semibold tracking-tight text-[var(--text-strong)]"
                  style={{ transform: "translateZ(20px)" }}
                >
                  What I focus on
                </p>
                <p
                  className="tilt-layer mt-1 text-sm text-[var(--muted)]"
                  style={{ transform: "translateZ(8px)" }}
                >
                  Quality engineering, test automation, and building AI/ML-powered products with measurable impact.
                </p>
                </div>
              </div>
              <div ref={tiltRef} className="tilt-stage">
                <div className="card">
                <p
                  className="tilt-layer font-mono text-xs text-[var(--accent)]"
                  style={{ transform: "translateZ(14px)" }}
                >
                  {'// method'}
                </p>
                <p
                  className="tilt-layer mt-2 font-display text-sm font-semibold tracking-tight text-[var(--text-strong)]"
                  style={{ transform: "translateZ(20px)" }}
                >
                  How I work
                </p>
                <p
                  className="tilt-layer mt-1 text-sm text-[var(--muted)]"
                  style={{ transform: "translateZ(8px)" }}
                >
                  Bias for action, fast iterations, clean API boundaries, and crisp documentation.
                </p>
                </div>
              </div>
            </div>
          </div>

          {/* Photo + Terminal column */}
          <div className="flex flex-col gap-4 h-full">
          {/* Photo card */}
          <div ref={photoTiltRef} className="tilt-stage flex-1 min-h-96">
            <div className="card overflow-hidden p-2 h-full">
            <div className="relative h-full min-h-48 rounded-lg overflow-hidden">
              <Image
                src="/images/eli-photo-1-optimized.jpg"
                alt="Elijah Paulman at an Apple campus event"
                fill
                className="object-cover object-[center_82%]"
                sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 90vw, 440px"
              />
            </div>
            </div>
          </div>

          {/* Terminal card */}
          <div
            ref={terminalTiltRef}
            className="tilt-stage shrink-0"
          >
            <div className="card overflow-hidden">
            <div
              className="tilt-layer flex items-center gap-2 border-b border-[var(--border)] pb-3 mb-4"
              style={{ transform: "translateZ(24px)" }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/50" />
              <span className="ml-2 font-mono text-xs text-[var(--muted)]">
                elijah@portfolio ~ $
              </span>
            </div>

            <div
              className="tilt-layer space-y-3 font-mono text-sm"
              style={{ transform: "translateZ(12px)" }}
            >
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

            <div
              className="tilt-layer mt-6 flex flex-wrap gap-2"
              style={{ transform: "translateZ(18px)" }}
            >
              <span className="pill">Full-stack</span>
              <span className="pill">AI/ML</span>
              <span className="pill">Cloud</span>
              <span className="pill">Leadership</span>
            </div>
            </div>
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
