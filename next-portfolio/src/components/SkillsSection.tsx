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

function SkillCard({
  label,
  items,
}: {
  label: string;
  items: { name: string }[];
}) {
  return (
    <div className="card h-full">
      <div className="mb-4 border-b border-[var(--border)] pb-3">
        <p className="font-mono text-xs font-medium tracking-wide text-[var(--accent)]">
          {"// "}
          {label}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.name}
            className="pill cursor-default select-none whitespace-nowrap"
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const reveal = useScrollReveal();

  return (
    <section id="skills" className="section-shell" style={{ overflow: 'visible', contentVisibility: 'visible' }}>
      <div ref={reveal} className="reveal space-y-8">
        <SectionHeading
          tag="skills"
          title="Stacks I Build With"
          description="Languages, frameworks, platforms, and specialties I rely on to ship production-grade software — including Claude Code and AI-assisted development in my day-to-day workflow."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map((cat) => {
            const items = skills[cat.key] ?? [];
            return <SkillCard key={cat.key} label={cat.label} items={items} />;
          })}
        </div>
      </div>
    </section>
  );
}
