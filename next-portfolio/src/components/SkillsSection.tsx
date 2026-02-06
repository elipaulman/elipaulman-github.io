"use client";

import { skills } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const categories = [
  { key: "programmingLanguages" as const, label: "languages" },
  { key: "frameworks" as const, label: "frameworks" },
  { key: "tools" as const, label: "tools" },
  { key: "skills" as const, label: "specialties" },
];

export function SkillsSection() {
  const reveal = useScrollReveal();

  return (
    <section id="skills" className="section-shell">
      <div ref={reveal} className="reveal space-y-8">
        <SectionHeading
          tag="skills"
          title="Stacks I Build With"
          description="Languages, frameworks, platforms, and specialties I rely on to ship production-grade software."
        />

        <div className="reveal-stagger grid gap-4 sm:grid-cols-2">
          {categories.map((cat) => {
            const items = skills[cat.key] ?? [];
            return (
              <div key={cat.key} className="reveal card card-glow">
                <p className="mb-4 font-mono text-xs text-[var(--accent)]">
                  {'// '}{cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item.name} className="pill">
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
