"use client";

import Image from "next/image";
import { experience } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ExperienceTimeline() {
  const reveal = useScrollReveal();

  return (
    <section id="experience" className="section-shell">
      <div ref={reveal} className="reveal">
        <SectionHeading
          tag="experience"
          title="Building & Shipping"
          description="Full-time roles, internships, and wins that taught me how to ship quickly, lead teams, and own outcomes."
        />

        <div className="relative pl-8 md:pl-12">
          {/* Timeline line — centered at left-[11.5px] on mobile, left-[19.5px] on md */}
          <div className="absolute left-[11.5px] top-2 bottom-2 w-px bg-[var(--border)] md:left-[19.5px]" />

          <div className="reveal-stagger space-y-6">
            {experience.map((role) => (
              <div key={role.id} className="reveal relative">
                {/* Timeline dot — centered on line, vertically centered with date */}
                <div className="absolute left-[-25px] top-[3px] h-2.5 w-2.5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] md:left-[-33px]" />

                {/* Date */}
                <p className="mb-2 font-mono text-xs leading-[18px] text-[var(--muted)]">
                  {role.date}
                </p>

                {/* Card */}
                <article className="card card-glow">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--logo-bg)]">
                      <Image
                        src={`/${role.logo}`}
                        alt={role.logoAlt}
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                        style={{ filter: "var(--logo-filter)" }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-bold tracking-tight text-[var(--text-strong)]">
                        {role.title}
                      </h3>
                      <p className="text-sm font-medium text-[var(--muted-strong)]">
                        {role.company}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-[var(--text)]">
                    {role.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 leading-relaxed"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
