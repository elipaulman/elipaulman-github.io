import Image from "next/image";
import { experience } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="section-shell">
      <div className="glass-panel space-y-8">
        <SectionHeading
          eyebrow="Experience"
          title="Building and Shipping"
          description="Internships, fellowships, and wins that taught me how to ship quickly, lead teams, and own outcomes."
        />
        <div className="grid gap-6">
          {experience.map((role) => (
            <article
              key={role.id}
              className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 sm:p-6 shadow-[0_15px_60px_rgba(0,0,0,0.3)] md:items-start"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--logo-bg)]">
                <Image
                  src={`/${role.logo}`}
                  alt={role.logoAlt}
                  width={44}
                  height={44}
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div className="space-y-2">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      {role.date}
                    </p>
                    <h3 className="text-xl font-semibold text-[var(--text-strong)]">
                      {role.title}
                    </h3>
                    <p className="text-sm font-medium text-[var(--muted-strong)]">
                      {role.company}
                    </p>
                  </div>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex gap-2 leading-relaxed md:leading-normal">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
