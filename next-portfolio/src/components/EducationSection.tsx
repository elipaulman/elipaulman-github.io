"use client";

import Image from "next/image";
import { education } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function EducationSection() {
  const reveal = useScrollReveal();

  return (
    <section id="education" className="section-shell">
      <div ref={reveal} className="reveal space-y-8">
        <SectionHeading
          tag="education"
          title="Where I Learned"
          description="Programs and schools that shaped my foundation in computer science and engineering."
        />

        <div className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {education.map((school) => (
            <article
              key={school.id}
              className="reveal card flex h-full flex-col border-l-4 border-l-[var(--accent)]"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={`/${school.image}`}
                    alt={school.imageAlt}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-bold tracking-tight text-[var(--text-strong)]">
                    {school.institution}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">{school.degree}</p>
                </div>
              </div>
              <p className="mt-2 font-mono text-xs text-[var(--muted)]">
                {school.dates}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-[var(--text)]">
                {school.details.map((detail) => (
                  <li key={detail} className="flex gap-2 leading-relaxed">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
