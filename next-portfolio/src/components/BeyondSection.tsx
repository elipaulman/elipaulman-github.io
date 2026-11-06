import { faq, personal } from "@/lib/data";

type Involvement = { leadership?: string[]; roles?: string[]; goals?: string };

/* Everything here comes from faq.json and personal.json; nothing is new. */
export function BeyondSection() {
  const involvement = faq.find((q) => q.id === "involvement")?.answer as Involvement | undefined;
  const goals = faq.find((q) => q.id === "goals")?.answer;

  return (
    <section id="beyond" className="sec">
      <div className="inner">
        <h2 className="sec-title poster">Beyond work</h2>

        <div className="beyond">
          {involvement?.roles && (
            <div className="beyond-block">
              <h3>Leadership and clubs</h3>
              <ul className="entry-body">
                {involvement.roles.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              {involvement.goals && <p className="beyond-note">{involvement.goals}</p>}
            </div>
          )}

          {typeof goals === "string" && (
            <div className="beyond-block">
              <h3>What I&rsquo;m focused on</h3>
              <p className="beyond-big">{goals}</p>
            </div>
          )}

          <div className="beyond-block">
            <h3>Outside of work</h3>
            <p>{personal.hobbies}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
