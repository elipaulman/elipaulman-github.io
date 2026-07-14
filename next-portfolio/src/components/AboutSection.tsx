"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
          className="grid gap-8 lg:grid-cols-2 lg:items-start"
          style={{ perspective: "1400px", overflow: "visible" }}
        >
          {/* Bio */}
          <div className="flex flex-col gap-6">
            <div ref={tiltRef} className="tilt-stage">
              <div className="card">
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

            <StatsRow />
          </div>

          {/* Photo + Terminal facts column */}
          <div className="flex flex-col gap-4">
          <div ref={photoTiltRef} className="tilt-stage">
            <div className="card overflow-hidden p-2">
            <div className="relative h-56 rounded-lg overflow-hidden sm:h-64">
              <Image
                src="/images/eli-photo-1-optimized.jpg"
                alt="Elijah Paulman at an Apple campus event"
                fill
                className="object-cover object-[center_65%]"
                sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 90vw, 440px"
              />
            </div>
            </div>
          </div>

          <div
            ref={terminalTiltRef}
            className="tilt-stage"
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
              <TerminalRow
                label="status"
                value={<span className="text-[var(--accent)]">full-time @ Apple</span>}
              />
            </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsRow() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {personal.stats.map((stat) => (
        <Stat key={stat.label} {...stat} />
      ))}
    </div>
  );
}

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const format = (n: number) =>
      (n >= 1000 ? n.toLocaleString("en-US") : String(n)) + suffix;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          const duration = 1400;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(format(Math.floor(value * eased)));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, suffix]);

  return (
    <div className="border-l-2 border-[var(--border)] pl-3 transition-colors duration-200 hover:border-[var(--accent)]">
      <span
        ref={ref}
        className="block font-mono text-2xl font-semibold tabular-nums text-[var(--accent)]"
      >
        {display}
      </span>
      <span className="mt-1 block text-xs text-[var(--muted)]">{label}</span>
    </div>
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
