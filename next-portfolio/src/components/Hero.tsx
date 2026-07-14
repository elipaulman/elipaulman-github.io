"use client";

import Link from "next/link";
import { personal } from "@/lib/data";
import type { Socials } from "@/types";
import { GitHubIcon, LinkedInIcon, MailIcon, DocumentIcon } from "./icons";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import { useTypewriterLoop } from "@/hooks/useTypewriterLoop";
import { useTypewriterOnce } from "@/hooks/useTypewriterOnce";

type HeroProps = {
  socials: Socials;
};

const EYEBROW_COMMANDS = [
  "whoami",
  "cat about.md",
  "ls experience/",
  "git log --oneline -3",
];

const HEADLINE = `${personal.name} builds carrier\nsystems at Apple`;

export function Hero({ socials }: HeroProps) {
  const tiltRef = useMouseTilt<HTMLDivElement>({ max: 5, lift: 6, leaveMs: 550 });
  const eyebrow = useTypewriterLoop(EYEBROW_COMMANDS);
  const { text: headline, done: headlineDone } = useTypewriterOnce(HEADLINE, 650);

  return (
    <section id="intro" className="relative py-24 sm:py-32 lg:py-40">
      <div
        aria-hidden="true"
        className="hero-glow-layer"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(var(--accent-rgb), 0.07) 0%, transparent 70%)",
          animation: "hero-glow-pulse 4s ease-in-out infinite alternate",
        }}
      />

      <div className="tilt-perspective relative" style={{ zIndex: 1 }}>
        <div ref={tiltRef} className="tilt-stage space-y-6" style={{ position: "relative" }}>
          <div aria-hidden="true" className="depth-grid" />

          {/* Terminal eyebrow */}
          <div
            className="hero-animate tilt-layer"
            style={{
              transform: "translateZ(18px)",
              animation: "fade-slide-up 0.6s 100ms ease-out both",
            }}
          >
            <p className="min-h-[1.2em] font-mono text-xs tracking-wide text-[var(--accent)]" aria-hidden="true">
              {"$ "}
              {eyebrow}
              <span className="typing-cursor" />
            </p>
          </div>

          {/* Narrative headline */}
          <div
            className="hero-animate tilt-layer"
            style={{
              transform: "translateZ(48px)",
              animation: "fade-slide-up 0.6s 250ms ease-out both",
            }}
          >
            <h1
              className="min-h-[2.3em] font-mono font-semibold text-[var(--text-strong)] sm:min-h-[2.28em]"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                lineHeight: 1.14,
                letterSpacing: "-0.015em",
              }}
            >
              {headline.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
              <span className={`typing-cursor${headlineDone ? "" : " is-typing"}`} />
            </h1>
          </div>

          {/* Lede */}
          <div
            className="hero-animate tilt-layer"
            style={{
              transform: "translateZ(12px)",
              animation: "fade-slide-up 0.6s 400ms ease-out both",
            }}
          >
            <p
              className="max-w-[60ch] text-[var(--text)]"
              style={{ fontSize: "1.1rem", lineHeight: 1.68 }}
            >
              Software Quality Engineer testing and automating{" "}
              <span className="text-[var(--accent-2)]">iPhone carrier onboarding</span>. Ohio
              State CSE &apos;25. Previously shipped automation at Amazon and REST APIs at
              London Computer Systems.
            </p>
          </div>

          {/* CTA buttons */}
          <div
            className="hero-animate tilt-layer flex flex-wrap items-center gap-3 pt-2"
            style={{
              transform: "translateZ(28px)",
              animation: "fade-slide-up 0.6s 550ms ease-out both",
            }}
          >
            <Link
              href={`mailto:${socials.email.primary}`}
              className="btn btn-primary px-5 py-2.5 text-sm"
            >
              <MailIcon className="h-4 w-4" />
              contact me
            </Link>
            <Link
              href={socials.resume.path}
              download
              className="btn px-5 py-2.5 text-sm"
            >
              <DocumentIcon className="h-4 w-4" />
              resume.pdf
            </Link>

            <span className="mx-1 hidden h-5 w-px bg-[var(--border)] sm:block" />

            <div className="flex gap-2">
              <Link
                href={socials.socialMedia.github.url}
                target="_blank"
                rel="noreferrer"
                className="icon-btn"
                aria-label="GitHub"
              >
                <GitHubIcon className="h-4 w-4" />
              </Link>
              <Link
                href={socials.socialMedia.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="icon-btn"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
