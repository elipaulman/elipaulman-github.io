"use client";

import { faq, personal } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { ChevronDownIcon } from "./icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function FAQSection() {
  const reveal = useScrollReveal();

  return (
    <section id="faq" className="section-shell">
      <div ref={reveal} className="reveal space-y-6">
        <SectionHeading
          tag="faq"
          title="Quick Answers"
          description="A few things recruiters and teammates usually ask me."
        />

        <div className="space-y-0 divide-y divide-[var(--border)]">
          {faq.map((item) => (
            <details
              key={item.id}
              open={item.expanded}
              className="group py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--accent)]">
                    {'//'}
                  </span>
                  <span className="font-display text-base font-semibold tracking-tight text-[var(--text-strong)]">
                    {item.question}
                  </span>
                </span>
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="mt-3 ml-7 border-l-2 border-[var(--accent-dim)] pl-4 text-sm leading-relaxed text-[var(--text)]">
                {renderAnswer(item)}
              </div>
            </details>
          ))}
        </div>

        <p className="pt-2 text-center font-mono text-sm text-[var(--muted)]">
          {'// still curious? '}
          <a
            href={`mailto:${personal.email}`}
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            {personal.email}
          </a>
        </p>
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
      <div className="space-y-2">
        <p>
          <strong className="text-[var(--text-strong)]">Languages & Frameworks:</strong>{" "}
          {item.answer.programmingLanguages}
        </p>
        <p>
          <strong className="text-[var(--text-strong)]">Software:</strong>{" "}
          {item.answer.software}
        </p>
        <p>
          <strong className="text-[var(--text-strong)]">Other Skills:</strong>{" "}
          {item.answer.otherSkills}
        </p>
      </div>
    );
  }

  if (item.id === "involvement" && item.answer.leadership && item.answer.roles) {
    return (
      <div className="space-y-2">
        <p>
          <strong className="text-[var(--text-strong)]">Leadership:</strong>{" "}
          {item.answer.leadership.join(", ")}
        </p>
        <p>
          <strong className="text-[var(--text-strong)]">Roles:</strong>{" "}
          {item.answer.roles.join(", ")}
        </p>
        {item.answer.goals && (
          <p>
            <strong className="text-[var(--text-strong)]">Goals:</strong>{" "}
            {item.answer.goals}
          </p>
        )}
      </div>
    );
  }

  return null;
}
