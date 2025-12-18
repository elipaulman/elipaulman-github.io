import { skills } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function SkillsSection() {
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
        {items.map((item, idx) => (
          <SkillBadge key={item.name} item={item} index={idx} />
        ))}
      </div>
    </div>
  );
}

function SkillBadge({ item, index }: { item: { name: string }; index: number }) {
  const glyphPalette = [
    "linear-gradient(135deg, #38bdf8, #0ea5e9)",
    "linear-gradient(135deg, #a78bfa, #7c3aed)",
    "linear-gradient(135deg, #fb923c, #f97316)",
    "linear-gradient(135deg, #34d399, #16a34a)",
  ];

  const glyph = item.name.slice(0, 2).toUpperCase();
  const bg = glyphPalette[index % glyphPalette.length];

  return (
    <span className="pill inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold">
      <span
        aria-hidden
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold text-[color-mix(in_srgb,white_78%,#0b1725)] shadow-[0_6px_18px_rgba(0,0,0,0.18)] ring-1 ring-[color-mix(in_srgb,var(--accent)_28%,transparent)]"
        style={{ backgroundImage: bg }}
      >
        {glyph}
      </span>
      {item.name}
    </span>
  );
}
