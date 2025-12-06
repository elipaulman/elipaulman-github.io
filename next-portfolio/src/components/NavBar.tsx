"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { DownloadIcon } from "./icons";

type NavBarProps = {
  resumePath: string;
};

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function NavBar({ resumePath }: NavBarProps) {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="#intro"
          className="text-lg font-semibold tracking-tight text-[var(--text-strong)]"
        >
          Elijah Paulman
        </Link>

        <div className="flex items-center gap-3">
          <button
            className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm font-medium text-[var(--text-strong)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            Menu
          </button>
          <div className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:-translate-y-0.5 hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href={resumePath}
            className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-sm font-medium text-[var(--text-strong)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)] md:inline-flex"
            download
          >
            <DownloadIcon className="h-4 w-4" />
            Resume
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-2 max-w-6xl space-y-2 px-6 pb-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="flex w-full items-center rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-4 py-3 text-[var(--text-strong)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={resumePath}
            onClick={handleLinkClick}
            className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-4 py-3 text-sm font-medium text-[var(--text-strong)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
            download
          >
            <DownloadIcon className="h-4 w-4" />
            Resume
          </Link>
        </div>
      ) : null}
    </header>
  );
}
