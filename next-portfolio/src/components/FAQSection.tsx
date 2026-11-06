import { faq } from "@/lib/data";

export function FAQSection() {
  return (
    <section id="faq" className="sec">
      <div className="inner">
        <h2 className="sec-title poster">Questions</h2>
        <div className="faq">
          {faq
            .filter((item) => item.id !== "technical-skills") /* covered by the Skills section */
            .map((item, index) => (
            <details key={item.id} open={index === 0}>
              <summary>{item.question}</summary>
              <div className="answer">{renderAnswer(item)}</div>
            </details>
          ))}
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
      <div className="space-y-2">
        <p>
          <strong>Languages:</strong>{" "}
          {item.answer.programmingLanguages}
        </p>
        <p>
          <strong>Frameworks:</strong>{" "}
          {item.answer.frameworks}
        </p>
        <p>
          <strong>Software:</strong>{" "}
          {item.answer.software}
        </p>
        <p>
          <strong>Other Skills:</strong>{" "}
          {item.answer.otherSkills}
        </p>
      </div>
    );
  }

  if (item.id === "involvement" && item.answer.leadership && item.answer.roles) {
    return (
      <div className="space-y-2">
        <p>
          <strong>Leadership:</strong>{" "}
          {item.answer.leadership.join(", ")}
        </p>
        <p>
          <strong>Roles:</strong>{" "}
          {item.answer.roles.join(", ")}
        </p>
        {item.answer.goals && (
          <p>
            <strong>Goals:</strong>{" "}
            {item.answer.goals}
          </p>
        )}
      </div>
    );
  }

  return null;
}
