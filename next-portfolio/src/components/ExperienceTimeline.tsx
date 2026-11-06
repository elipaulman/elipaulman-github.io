import Image from "next/image";
import { experience } from "@/lib/data";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Start of a date range like "May 2025 - August 2025" or "November 2024". */
function startOf(date: string) {
  const m = date.match(/([A-Za-z]+)\s+(\d{4})/);
  const month = m ? MONTHS.indexOf(m[1]) : 0;
  const year = m ? Number(m[2]) : 0;
  return { year, key: year * 12 + month };
}

export function ExperienceTimeline() {
  const sorted = [...experience].sort((a, b) => startOf(b.date).key - startOf(a.date).key);

  const years: { year: number; roles: typeof sorted }[] = [];
  for (const role of sorted) {
    const { year } = startOf(role.date);
    const last = years[years.length - 1];
    if (last && last.year === year) last.roles.push(role);
    else years.push({ year, roles: [role] });
  }

  return (
    <section id="experience" className="sec">
      <div className="inner">
        <h2 className="sec-title poster">Experience</h2>

        <div className="tl">
          {years.map(({ year, roles }) => (
            <div key={year} className="tl-year">
              <p className="tl-year-label poster" aria-label={String(year)}>
                {year}
              </p>
              <ol className="tl-list">
                {roles.map((role) => (
                  <li key={role.id} className="tl-item" data-current={/present/i.test(role.date)}>
                    <article>
                      <p className="entry-date">{role.date}</p>
                      <div className="tl-head">
                        <span className="logo logo-sm">
                          <Image
                            src={`/${role.logo}`}
                            alt={role.logoAlt}
                            fill
                            sizes="44px"
                            unoptimized
                            className="object-contain p-1.5"
                          />
                        </span>
                        <div>
                          <h3 className="entry-org">{role.company}</h3>
                          <p className="entry-role">{role.title}</p>
                        </div>
                      </div>
                      <ul className="entry-body tl-body">
                        {role.responsibilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
