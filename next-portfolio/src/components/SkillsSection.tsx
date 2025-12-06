import { skills } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function SkillsSection() {
  // Keep this lean so it stays scannable: highlight a curated subset
  const languagesFrameworks = [
    ...skills.programmingLanguages.slice(0, 7),
    ...(skills.frameworks ?? []).slice(0, 4),
  ];
  const toolsSpecialties = [
    ...(skills.tools ?? []).slice(0, 6),
    ...(skills.skills ?? []).slice(0, 4),
  ];

  return (
    <section id="skills" className="section-shell">
      <div className="glass-panel space-y-6">
        <SectionHeading
          eyebrow="Skills"
          title="Stacks I Build With"
          description="Languages, frameworks, platforms, and specialties I rely on to ship production-grade software."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <SkillCard title="Languages & Frameworks" items={languagesFrameworks} />
          <SkillCard title="Tools & Specialties" items={toolsSpecialties} />
        </div>
      </div>
    </section>
  );
}

type SkillCardProps = {
  title: string;
  items: { name: string }[];
};

function SkillCard({ title, items }: SkillCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-[0_15px_60px_rgba(0,0,0,0.3)]">
      <h3 className="text-lg font-semibold text-[var(--text-strong)]">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.name}
            className="pill px-3 py-1 text-xs font-semibold"
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
