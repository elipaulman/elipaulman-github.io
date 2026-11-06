import { experience } from "@/lib/data";

/* Every item comes from experience.json or personal.json; nothing is invented. */
const items = [
  "Apple",
  "Amazon",
  "London Computer Systems",
  "IBM Accelerate",
  "J.P. Morgan Code for Good",
  "CodePath",
  "Engineers for a Sustainable World",
  "Ohio State CSE",
];

export function Marquee() {
  const companies = new Set(experience.map((e) => e.company));
  const list = items.filter(
    (i) => companies.has(i) || ["Ohio State CSE", "J.P. Morgan Code for Good", "IBM Accelerate", "CodePath"].includes(i),
  );
  const run = [...list, ...list];

  return (
    <div className="strip" aria-hidden="true">
      <div className="strip-track">
        {[0, 1].map((n) => (
          <div key={n} style={{ display: "flex" }}>
            {run.map((text, i) => (
              <span key={`${n}-${i}`}>{text}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
