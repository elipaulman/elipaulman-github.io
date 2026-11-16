import Image from "next/image";
import { education } from "@/lib/data";

export function EducationSection() {
  return (
    <section id="education" className="sec">
      <div className="inner">
        <h2 className="sec-title poster">Education</h2>
        <div>
          {education.map((school) => (
            <article key={school.id} className="entry">
              <div className="entry-head">
                <span className="edu-logo" data-school={school.id}>
                  <Image
                    src={`/${school.image}`}
                    alt={school.imageAlt}
                    fill
                    sizes="(max-width: 640px) 68px, 88px"
                    unoptimized
                    className="edu-img"
                  />
                </span>
                <div>
                  <h3 className="entry-org">{school.institution}</h3>
                  <p className="entry-role">{school.degree}</p>
                  <p className="entry-date">{school.dates}</p>
                </div>
              </div>
              <ul className="entry-body">
                {school.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
