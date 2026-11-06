import { skills } from "@/lib/data";

const categories = [
  { key: "programmingLanguages" as const, label: "Languages" },
  { key: "frameworks" as const, label: "Frameworks and cloud" },
  { key: "tools" as const, label: "Tools" },
  { key: "skills" as const, label: "Specialties" },
];

export function SkillsSection() {
  return (
    <section id="skills" className="sec">
      <div className="inner">
        <h2 className="sec-title poster">Skills</h2>
        <div>
          {categories.map((cat) => (
            <div key={cat.key} className="skill">
              <h3>{cat.label}</h3>
              <p className="skill-run">
                {(skills[cat.key] ?? []).map((item) => (
                  <span key={item.name}>{item.name}</span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
