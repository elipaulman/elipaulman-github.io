"use client";

import Link from "next/link";
import { projects, socials } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { ExternalIcon } from "./icons";
import { useAnimateOnce } from "@/hooks/useScrollReveal";
import { useMouseTilt } from "@/hooks/useMouseTilt";

const formatTag = (tag: string): string => {
  const tagMap: Record<string, string> = {
    winner: "Winner",
    hackathon: "Hackathon",
  };
  return tagMap[tag] || tag;
};

export function ProjectsGrid() {
  const githubReposLink = socials.socialMedia.github.url;
  const animateOnce = useAnimateOnce();
  const tiltRef = useMouseTilt<HTMLElement>({ max: 7, lift: 10, leaveMs: 400 });

  return (
    <section id="projects" className="section-shell">
      <div className="space-y-8">
        <SectionHeading
          tag="projects"
          title="Recent Builds & Demos"
          description="Production work, hackathon wins, and experiments that show how I approach architecture, UX, and impact."
        />

        <div
          ref={animateOnce as React.RefCallback<HTMLDivElement>}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "1200px" }}
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              data-animate-child
              ref={tiltRef}
              className="card card-glow tilt-stage card-enter-animate flex h-full flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className="tilt-layer flex items-start justify-between gap-3"
                style={{ transform: "translateZ(22px)" }}
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-[var(--text-strong)]">
                  {project.title}
                </h3>
                {project.tags && (
                  <div className="flex shrink-0 gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="pill text-[0.65rem] px-2 py-0.5"
                      >
                        {formatTag(tag)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p
                className="tilt-layer mt-2 text-sm text-[var(--text)] leading-relaxed"
                style={{ transform: "translateZ(8px)" }}
              >
                {project.description}
              </p>
              <p
                className="tilt-layer mt-3 font-mono text-xs text-[var(--accent)]"
                style={{ transform: "translateZ(14px)" }}
              >
                {'// '}{project.techUsed.toLowerCase()}
              </p>
              <div className="tilt-layer mt-auto pt-4" style={{ transform: "translateZ(26px)" }}>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-[var(--accent)] transition hover:gap-3"
                >
                  {project.linkText}
                  <ExternalIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <Link
          href={githubReposLink}
          target="_blank"
          rel="noreferrer"
          className="block rounded-xl border border-[var(--accent)] bg-[var(--accent-dim)] px-5 py-4 text-center font-mono text-sm font-medium text-[var(--text-strong)] backdrop-blur-xl backdrop-saturate-180 shadow-[0_4px_16px_rgba(0,229,160,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_var(--accent-glow),0_4px_16px_rgba(0,229,160,0.2)]"
        >
          &gt; View all projects on GitHub
        </Link>
      </div>
    </section>
  );
}
