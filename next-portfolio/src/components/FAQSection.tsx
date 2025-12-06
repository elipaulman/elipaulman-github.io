import { faq, personal } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function FAQSection() {
  return (
    <section id="faq" className="section-shell">
      <div className="glass-panel space-y-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Quick Answers"
          description="A few things recruiters and teammates usually ask me."
        />
        <div className="space-y-3">
          {faq.map((item) => (
            <details
              key={item.id}
              open={item.expanded}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-semibold text-[var(--text-strong)]">
                <span>{item.question}</span>
                <span className="text-sm text-[var(--muted)] group-open:hidden">+</span>
                <span className="text-sm text-[var(--muted)] hidden group-open:inline">−</span>
              </summary>
              <div className="mt-3 space-y-2 text-sm text-[var(--muted)]">
                {renderAnswer(item)}
              </div>
            </details>
          ))}
          <p className="text-center text-sm text-[var(--muted)]">
            Still curious? Email me at{" "}
            <a
              href={`mailto:${personal.email}`}
              className="font-semibold text-[var(--accent)]"
            >
              {personal.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

function renderAnswer(item: (typeof faq)[number]) {
  if (typeof item.answer === "string") {
    return <p>{item.answer}</p>;
  }

  if (item.id === "technical-skills") {
    return (
      <>
        <p>
          <strong>Programming Languages & Frameworks:</strong>{" "}
          {item.answer.programmingLanguages}
        </p>
        <p>
          <strong>Software:</strong> {item.answer.software}
        </p>
        <p>
          <strong>Other Skills:</strong> {item.answer.otherSkills}
        </p>
      </>
    );
  }

  if (item.id === "involvement" && item.answer.leadership && item.answer.roles) {
    return (
      <>
        <p>
          <strong>Leadership & Involvement:</strong>{" "}
          {item.answer.leadership.join(", ")}
        </p>
        <p>
          <strong>Roles:</strong> {item.answer.roles.join(", ")}
        </p>
        {item.answer.goals ? (
          <p>
            <strong>Leadership Goals:</strong> {item.answer.goals}
          </p>
        ) : null}
      </>
    );
  }

  return null;
}
