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
                <span className="logo" style={{ padding: 0 }}>
                  <Image
                    src={`/${school.image}`}
                    alt={school.imageAlt}
                    fill
                    sizes="56px"
                    unoptimized
                    className="object-cover"
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
