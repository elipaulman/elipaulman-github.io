"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { DownloadIcon } from "./icons";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#education", label: "education" },
  { href: "#faq", label: "faq" },
  { href: "#contact", label: "contact" },
];

export function NavBar({ resumePath }: { resumePath: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/70 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
        <Link
          href="#intro"
          className="font-display text-lg font-bold tracking-tight text-[var(--accent)]"
        >
          EP<span className="text-[var(--muted)]">.</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative rounded-md px-3 py-1.5 font-mono text-[0.7rem] text-[var(--muted)] transition-colors duration-200 hover:text-[var(--text-strong)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={resumePath}
            download
            className="hidden items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 font-mono text-[0.7rem] text-[var(--muted)] backdrop-blur-xl backdrop-saturate-180 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[var(--border-hover)] hover:text-[var(--text-strong)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:scale-[1.05] md:inline-flex"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            resume
          </Link>
          <ThemeToggle />
          <button
            className="rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3 py-2 font-mono text-xs text-[var(--muted)] backdrop-blur-xl backdrop-saturate-180 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-[var(--border-hover)] hover:text-[var(--text-strong)] hover:scale-[1.05] md:hidden"
            onClick={() => setOpen((p) => !p)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? "[x]" : "[=]"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--border)] px-5 py-4 sm:px-8 md:hidden backdrop-blur-xl">
          <div className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 font-mono text-sm text-[var(--muted)] backdrop-blur-sm bg-[var(--panel)]/50 border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:bg-[var(--panel-hover)] hover:border-[var(--border)] hover:text-[var(--text-strong)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
              >
                <span className="text-[var(--accent)] opacity-50">{'// '}</span>
                {link.label}
              </Link>
            ))}
            <Link
              href={resumePath}
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-sm text-[var(--muted)] backdrop-blur-sm bg-[var(--panel)]/50 border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:bg-[var(--panel-hover)] hover:border-[var(--border)] hover:text-[var(--text-strong)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              resume.pdf
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
