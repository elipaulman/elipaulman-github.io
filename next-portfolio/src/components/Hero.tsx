"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { personal } from "@/lib/data";
import type { Socials } from "@/types";
import { GitHubIcon, LinkedInIcon, MailIcon, DocumentIcon } from "./icons";

type HeroProps = {
  socials: Socials;
};

export function Hero({ socials }: HeroProps) {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowCursor(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="intro" className="relative py-24 sm:py-32 lg:py-40">
      <div className="space-y-8 text-center sm:text-left">
        {/* Avatar + greeting */}
        <div className="flex items-center justify-center gap-4 sm:justify-start">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-[1.5px] ring-[var(--accent)] ring-offset-2 ring-offset-[var(--bg)]">
            <Image
              src="/images/EliStandingClear.png"
              alt="Elijah Paulman"
              fill
              className="object-cover object-top"
              sizes="56px"
              priority
            />
          </div>
          <p className="font-mono text-xs tracking-wide text-[var(--accent)]">
            {'// hello, I\'m'}
          </p>
        </div>

        {/* Name */}
        <h1 className="heading-display text-5xl text-[var(--text-strong)] sm:text-6xl lg:text-7xl xl:text-8xl">
          {personal.name}
        </h1>

        {/* Typing subtitle */}
        <div className="flex justify-center overflow-hidden sm:justify-start">
          <p
            className={`inline-block overflow-hidden whitespace-nowrap border-r-2 border-[var(--accent)] font-mono text-sm text-[var(--muted)] sm:text-base ${
              !showCursor ? "border-transparent" : ""
            }`}
            style={{
              "--typing-width": `${personal.title.length}ch`,
              animation: `typing 3s steps(${personal.title.length}, end) forwards, blink-caret 0.75s step-end 5`,
              width: "0",
            } as React.CSSProperties}
          >
            {personal.title}
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 sm:justify-start">
          <Link
            href={`mailto:${socials.email.primary}`}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--accent)] bg-[var(--accent-dim)] px-5 py-2.5 font-mono text-sm font-medium text-[var(--text-strong)] backdrop-blur-xl backdrop-saturate-180 shadow-[0_4px_16px_rgba(0,229,160,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_0_32px_var(--accent-glow),0_4px_16px_rgba(0,229,160,0.2)] hover:border-[var(--accent)] hover:scale-[1.02]"
          >
            <MailIcon className="h-4 w-4" />
            contact me
          </Link>
          <Link
            href={socials.resume.path}
            download
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--panel)] px-5 py-2.5 font-mono text-sm text-[var(--muted)] backdrop-blur-xl backdrop-saturate-180 shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[var(--border-hover)] hover:text-[var(--text-strong)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-[1.02]"
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
              className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--panel)] p-2.5 text-[var(--muted)] backdrop-blur-xl backdrop-saturate-180 shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[var(--border-hover)] hover:text-[var(--text-strong)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-[1.05]"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-4 w-4" />
            </Link>
            <Link
              href={socials.socialMedia.linkedin.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--panel)] p-2.5 text-[var(--muted)] backdrop-blur-xl backdrop-saturate-180 shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[var(--border-hover)] hover:text-[var(--text-strong)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-[1.05]"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
