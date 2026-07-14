"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { DownloadIcon } from "./icons";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#education", label: "education" },
  { href: "#faq", label: "faq" },
  { href: "#contact", label: "contact" },
];

const sectionIds = links.map((link) => link.href.slice(1));

export function NavBar({ resumePath }: { resumePath: string }) {
  const [open, setOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/85">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
        <Link
          href="#intro"
          className="font-display text-lg font-bold tracking-tight text-[var(--accent)]"
        >
          EP<span className="text-[var(--muted)]">.</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-3 py-1.5 font-mono text-[0.7rem] transition-colors duration-200 after:absolute after:inset-x-3 after:-bottom-px after:h-px after:bg-[var(--accent)] after:transition-transform after:duration-200 after:content-[''] hover:text-[var(--text-strong)] ${
                  isActive
                    ? "text-[var(--text-strong)] after:scale-x-100"
                    : "text-[var(--muted)] after:scale-x-0"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={resumePath}
            download
            className="btn btn-primary hidden h-9 text-[0.7rem] px-3 py-0 md:inline-flex"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            resume
          </Link>
          <ThemeToggle />
          <button
            className="icon-btn h-9 font-mono text-[0.7rem] px-3 py-0 md:hidden"
            onClick={() => setOpen((p) => !p)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? "[x]" : "[=]"}
          </button>
        </div>
      </div>

      <div
        className="grid md:hidden"
        aria-hidden={!open}
        inert={!open}
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          transition: "grid-template-rows 200ms ease-out, opacity 160ms ease-out",
        }}
      >
        <nav className="overflow-hidden">
          <div className="space-y-1 border-t border-[var(--border)] px-5 py-4 sm:px-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-4 py-2.5 font-mono text-sm text-[var(--muted)] border border-transparent transition-all duration-200 hover:bg-[var(--panel-hover)] hover:border-[var(--border)] hover:text-[var(--text-strong)]"
              >
                <span className="text-[var(--accent)] opacity-70">{'// '}</span>
                {link.label}
              </Link>
            ))}
            <Link
              href={resumePath}
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-4 py-2.5 font-mono text-sm text-[var(--muted)] border border-transparent transition-all duration-200 hover:bg-[var(--panel-hover)] hover:border-[var(--border)] hover:text-[var(--text-strong)]"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              resume.pdf
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
