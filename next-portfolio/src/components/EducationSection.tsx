import Image from "next/image";
import { education } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function EducationSection() {
  return (
    <section id="education" className="section-shell">
      <div className="glass-panel space-y-8">
        <SectionHeading
          eyebrow="Education"
          title="Where I Learned"
          description="Programs and schools that shaped my foundation in computer science and engineering."
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] justify-items-stretch gap-6">
          {education.map((school) => (
            <article
              key={school.id}
              className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-[0_15px_60px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                  <Image
                    src={`/${school.image}`}
                    alt={school.imageAlt}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-strong)]">
                    {school.institution}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">{school.degree}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">
                    {school.dates}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                {school.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
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
