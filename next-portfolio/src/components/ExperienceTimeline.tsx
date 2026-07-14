"use client";

import Image from "next/image";
import { experience } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ExperienceTimeline() {
  const reveal = useScrollReveal();

  return (
    <section id="experience" className="section-shell" style={{ overflow: 'visible', contentVisibility: 'visible' }}>
      <div ref={reveal} className="reveal">
        <SectionHeading
          tag="experience --log --all"
          title="Building & Shipping"
          description="Full-time roles, internships, and achievements that taught me how to ship quickly, lead teams, and own outcomes."
        />

        <div>
          {experience.map((role) => (
            <div
              key={role.id}
              className="grid grid-cols-1 gap-3 border-b border-[var(--border-inner)] py-4 sm:grid-cols-[118px_1fr] sm:gap-5 last:border-b-0"
            >
              <p className="font-mono text-xs text-[var(--accent-2)] sm:pt-0.5">
                {role.date}
              </p>
              <div className="flex min-w-0 gap-3.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--logo-bg)] p-2">
                  <Image
                    src={`/${role.logo}`}
                    alt={role.logoAlt}
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                    style={{ filter: "var(--logo-filter)" }}
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-[var(--text-strong)]">
                    {role.title}
                  </p>
                  <p className="mb-2.5 text-sm text-[var(--muted)]">{role.company}</p>
                  <div className="space-y-1.5">
                    {role.responsibilities.map((item) => (
                      <p
                        key={item}
                        className="max-w-[75ch] text-sm leading-relaxed text-[var(--muted)]"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
