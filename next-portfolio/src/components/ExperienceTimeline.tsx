"use client";

import Image from "next/image";
import { experience } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { useAnimateOnce } from "@/hooks/useScrollReveal";
import { useMouseTilt } from "@/hooks/useMouseTilt";

export function ExperienceTimeline() {
  const animateOnce = useAnimateOnce();
  const tiltRef = useMouseTilt<HTMLElement>({ max: 5, lift: 8, leaveMs: 450 });

  return (
    <section id="experience" className="section-shell">
      <div>
        <SectionHeading
          tag="experience"
          title="Building & Shipping"
          description="Full-time roles, internships, and achievements that taught me how to ship quickly, lead teams, and own outcomes."
        />

        <div ref={animateOnce}>
          <div
            className="relative pl-8 md:pl-12"
            style={{ perspective: "1400px" }}
          >
            {/* Timeline line — centered at left-[11.5px] on mobile, left-[19.5px] on md */}
            <div className="absolute left-[11.5px] top-2 bottom-2 w-px bg-[var(--border)] md:left-[19.5px]" />
            <div
              data-animate-child
              className="accent-line-draw absolute left-[11.5px] top-2 bottom-2 w-px bg-[var(--accent)] opacity-60 md:left-[19.5px]"
            />

            <div className="space-y-6">
              {experience.map((role, index) => (
                <div key={role.id} className="relative">
                  {/* Timeline dot — centered on line, vertically centered with date */}
                  <div
                    data-animate-child
                    className="timeline-dot-animate absolute left-[-25px] top-[3px] h-2.5 w-2.5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] md:left-[-33px]"
                    style={{ animationDelay: `${index * 200 + 300}ms` }}
                  />

                  {/* Date */}
                  <p className="mb-2 font-mono text-xs leading-[18px] text-[var(--muted)]">
                    {role.date}
                  </p>

                  {/* Card */}
                  <article
                    data-animate-child
                    ref={tiltRef}
                    className="card card-glow tilt-stage timeline-card-animate"
                    style={{ animationDelay: `${index * 150 + 400}ms` }}
                  >
                    <div
                      className="tilt-layer flex items-start gap-4"
                      style={{ transform: "translateZ(20px)" }}
                    >
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

                    <ul
                      className="tilt-layer mt-4 space-y-2 text-sm text-[var(--text)]"
                      style={{ transform: "translateZ(8px)" }}
                    >
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
      </div>
    </section>
  );
}
