"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { Project } from "@/types";
import { ExternalIcon, GitHubIcon } from "./icons";

const TAG_LABELS: Record<string, string> = {
  winner: "Winner",
  hackathon: "Hackathon",
  ai: "AI",
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "winner", label: "Winners" },
  { id: "hackathon", label: "Hackathons" },
  { id: "ai", label: "AI" },
  { id: "fullstack", label: "Full-stack" },
  { id: "systems", label: "Systems and games" },
];

/** True once the element has scrolled into view; drives the row rule drawing in. */
function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen] as const;
}

function ProjectRow({
  project,
  open,
  onToggle,
  index,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = useId();
  const [ref, seen] = useSeen<HTMLElement>();
  const d = project.detail;

  return (
    <article
      ref={ref}
      className={`work-row${seen ? " is-in" : ""}`}
      data-open={open}
      style={{ "--i": Math.min(index, 8) } as React.CSSProperties}
    >
      <div className="work-main">
        <div>
          <h3 className="work-name">{project.title}</h3>
          <p className="work-stack">{project.techUsed}</p>
          {project.tags
            ?.filter((tag) => TAG_LABELS[tag])
            .map((tag) => (
              <span key={tag} className="work-tag">
                {TAG_LABELS[tag]}
              </span>
            ))}
        </div>
        <p className="work-desc">{project.description}</p>
        <div className="work-actions">
          <Link href={project.link} target="_blank" rel="noreferrer" className="work-link">
            {project.linkText}
            <ExternalIcon className="h-4 w-4" />
          </Link>
          {d && (
            <button
              type="button"
              className="work-toggle"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={`${open ? "Hide" : "Show"} details: ${project.title}`}
              onClick={onToggle}
            >
              <i aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {d && (
        <div id={panelId} className="work-detail" role="region" aria-label={`${project.title} details`} inert={!open}>
          <div>
            <div className="work-detail-inner">
              <div>
                <p className="work-lead">{d.context}</p>
                <p className="work-role">
                  <strong>My part.</strong> {d.role}
                </p>
              </div>
              <ul className="work-points">
                {d.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="work-foot">
                <p className="work-meta">{d.meta}</p>
                {project.repo && (
                  <Link href={project.repo} target="_blank" rel="noreferrer" className="work-source">
                    <GitHubIcon className="h-4 w-4" />
                    Source code
                  </Link>
                )}
                {d.note && <p className="work-note">{d.note}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [swapped, setSwapped] = useState(false);
  const rows = useRef<Record<string, HTMLElement | null>>({});

  const visible = projects.filter((p) => filter === "all" || p.tags?.includes(filter));

  const choose = (id: string) => {
    setFilter(id);
    setOpenId(null);
    setSwapped(true);
  };

  const toggle = (id: string) => {
    const opening = openId !== id;
    setOpenId(opening ? id : null);
    if (!opening) return;
    // After the previous panel has collapsed, make sure the opened row is not under the nav.
    window.setTimeout(() => {
      const el = rows.current[id];
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < 90) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollBy({ top: top - 100, behavior: reduce ? "auto" : "smooth" });
      }
    }, 720);
  };

  return (
    <>
      <div className="work-head">
        <h2 className="sec-title poster">Projects</h2>
        <div className="work-filters" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="work-chip"
              aria-pressed={filter === f.id}
              onClick={() => choose(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div key={filter} className={swapped ? "work-list work-list-swap" : "work-list"}>
        {visible.map((project, i) => (
          <div key={project.id} ref={(el) => void (rows.current[project.id] = el)}>
            <ProjectRow
              project={project}
              index={i}
              open={openId === project.id}
              onToggle={() => toggle(project.id)}
            />
          </div>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
    </>
  );
}
