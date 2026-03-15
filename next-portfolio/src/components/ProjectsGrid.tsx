"use client";

import Link from "next/link";
import { useRef } from "react";
import { projects, socials } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { ExternalIcon } from "./icons";
import { useAnimateOnce } from "@/hooks/useScrollReveal";

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
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  const handleMouseMove = (
    e: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = cardRefs.current.get(id);
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 8;
    const rotateY = (x / (rect.width / 2)) * 8;
    const shadowX = (x / (rect.width / 2)) * 6;
    const shadowY = (y / (rect.height / 2)) * 6;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    el.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(var(--accent-rgb), 0.12)`;
  };

  const handleMouseLeave = (id: string) => {
    const el = cardRefs.current.get(id);
    if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = "";
  };

  return (
    <section id="projects" className="section-shell">
      <div className="space-y-8">
        <SectionHeading
          tag="projects"
          title="Recent Builds & Demos"
          description="Production work, hackathon wins, and experiments that show how I approach architecture, UX, and impact."
        />

        {/* Project grid */}
        <div
          ref={animateOnce as React.RefCallback<HTMLDivElement>}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "800px" }}
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              data-animate-child
              className="card card-glow card-enter-animate flex h-full flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
              ref={(el) => {
                if (el) {
                  cardRefs.current.set(project.id, el);
                  const onEnd = () => {
                    el.classList.add("card-tilt-ready");
                    el.removeEventListener("animationend", onEnd);
                  };
                  el.addEventListener("animationend", onEnd);
                } else {
                  cardRefs.current.delete(project.id);
                }
              }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={() => handleMouseLeave(project.id)}
            >
              <div className="flex items-start justify-between gap-3">
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
              <p className="mt-2 text-sm text-[var(--text)] leading-relaxed">
                {project.description}
              </p>
              <p className="mt-3 font-mono text-xs text-[var(--accent)]">
                {'// '}{project.techUsed.toLowerCase()}
              </p>
              <div className="mt-auto pt-4">
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

        {/* View all link */}
        <Link
          href={githubReposLink}
          target="_blank"
          rel="noreferrer"
          className="block rounded-xl border border-[var(--accent)] bg-[var(--accent-dim)] px-5 py-4 text-center font-mono text-sm font-medium text-[var(--text-strong)] backdrop-blur-xl backdrop-saturate-180 shadow-[0_4px_16px_rgba(0,229,160,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_0_40px_var(--accent-glow),0_4px_16px_rgba(0,229,160,0.2)] hover:scale-[1.01]"
        >
          &gt; View all projects on GitHub
        </Link>
      </div>
    </section>
  );
}
