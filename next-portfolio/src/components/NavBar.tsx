"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LinkedInIcon } from "./icons";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const drawerLinks = [
  ...links.slice(0, 4),
  { href: "#education", label: "Education" },
  { href: "#beyond", label: "Beyond work" },
  links[4],
];

const sectionIds = ["about", "experience", "projects", "skills", "education", "beyond", "contact"];

export function NavBar({ name, linkedinUrl }: { name: string; linkedinUrl: string }) {
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
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="chip-btn"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon className="h-4 w-4" />
            <span className="chip-label">LinkedIn</span>
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
            {drawerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                data-active={activeId === link.href.slice(1)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
