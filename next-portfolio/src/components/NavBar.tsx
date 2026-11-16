"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { socials } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#beyond", label: "Beyond work" },
  { href: "#contact", label: "Contact" },
];

const sectionIds = links.map((link) => link.href.slice(1));

const emailHref = `mailto:${socials.email.primary}`;
const resumeHref = `/${socials.resume.path}`;

export function NavBar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  return (
    <header className="nav">
      <div className="nav-bar">
        <Link href="#top" className="nav-brand">
          {name}
        </Link>

        <nav className="nav-links" aria-label="Sections">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              data-active={activeId === link.href.slice(1)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-tools">
          <a href={emailHref} className="nav-cta">
            Email
          </a>
          <a href={resumeHref} download className="nav-cta nav-cta-light">
            Resume
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="chip-btn nav-menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-drawer"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id="nav-drawer"
        className="nav-drawer"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        aria-hidden={!open}
        inert={!open}
      >
        <div>
          <nav className="nav-drawer-inner" aria-label="Sections">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                data-active={activeId === link.href.slice(1)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="nav-drawer-actions">
            <a href={emailHref} onClick={() => setOpen(false)}>
              Email me
            </a>
            <a href={resumeHref} download onClick={() => setOpen(false)}>
              Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
