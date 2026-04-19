"use client";

import { skills } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const categories = [
  { key: "programmingLanguages" as const, label: "languages", reverse: false },
  { key: "frameworks" as const, label: "frameworks", reverse: true },
  { key: "tools" as const, label: "tools", reverse: false },
  { key: "skills" as const, label: "specialties", reverse: true },
];

function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: { name: string }[];
  reverse: boolean;
  duration: number;
}) {
  const doubled = [...items, ...items];

  return (
    <>
      <div className="flex flex-wrap gap-2 md:hidden">
        {items.map((item) => (
          <span
            key={item.name}
            className="pill cursor-default select-none whitespace-nowrap"
          >
            {item.name}
          </span>
        ))}
      </div>
      <div className="marquee-wrapper relative hidden overflow-hidden py-1 md:block">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
          style={{ background: "linear-gradient(90deg, var(--bg) 0%, transparent 100%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
          style={{ background: "linear-gradient(270deg, var(--bg) 0%, transparent 100%)" }}
        />
        <div
          className="marquee-track flex w-max gap-5"
          style={{
            animation: `${reverse ? "marquee-right" : "marquee-left"} ${duration}s linear infinite`,
          }}
        >
          {doubled.map((item, idx) => (
            <span
              key={`${item.name}-${idx}`}
              className="pill cursor-default select-none whitespace-nowrap"
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export function SkillsSection() {
  const reveal = useScrollReveal();

  return (
    <section id="skills" className="section-shell">
      <div ref={reveal} className="reveal space-y-10">
        <SectionHeading
          tag="skills"
          title="Stacks I Build With"
          description="Languages, frameworks, platforms, and specialties I rely on to ship production-grade software."
        />
        <div className="space-y-7">
          {categories.map((cat) => {
            const items = skills[cat.key] ?? [];
            return (
              <div key={cat.key}>
                <p className="mb-3 font-mono text-sm font-medium text-[var(--accent)]">
                  {"// "}
                  {cat.label}
                </p>
                <MarqueeRow
                  items={items}
                  reverse={cat.reverse}
                  duration={Math.round(items.length * 4)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
