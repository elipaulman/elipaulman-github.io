import Link from "next/link";
import { projects, socials } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { ExternalIcon } from "./icons";

const tagStyles: Record<string, string> = {
  hackathon: "bg-emerald-300 text-emerald-950 dark:bg-emerald-400/30 dark:text-emerald-50 border-emerald-600 dark:border-emerald-300/50 font-bold",
  winner: "bg-amber-300 text-amber-950 dark:bg-amber-400/30 dark:text-amber-50 border-amber-600 dark:border-amber-300/50 font-bold",
};

export function ProjectsGrid() {
  const githubReposLink = socials.socialMedia.github.url;
  return (
    <section id="projects" className="section-shell">
      <div className="glass-panel space-y-8">
        <SectionHeading
          eyebrow="Projects"
          title="Recent Builds & Demos"
          description="Production work, hackathon wins, and experiments that show how I approach architecture, UX, and impact."
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] justify-items-stretch gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group relative flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-[0_15px_60px_rgba(0,0,0,0.3)] transition hover:-translate-y-1 hover:border-[var(--accent)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold text-[var(--text-strong)]">
                  {project.title}
                </h3>
                {project.tags ? (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${tagStyles[tag] ?? "bg-white/10 text-white/90 border-white/15"}`}
                      >
                        {tag === "winner" ? "Winner" : tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">{project.description}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">
                {project.techUsed}
              </p>
              <div className="mt-auto pt-4">
                <Link
                  href={project.link}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition hover:gap-3"
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.linkText}
                  <ExternalIcon className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <Link
          href={githubReposLink}
          target="_blank"
          rel="noreferrer"
          className="group block rounded-2xl border border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-5 py-4 text-center text-sm font-semibold text-[var(--text-strong)] shadow-[0_15px_60px_rgba(34,211,238,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_70px_rgba(34,211,238,0.28)]"
        >
          <span className="inline-flex items-center gap-2">
            View all projects on GitHub
          </span>
        </Link>
      </div>
    </section>
  );
}
