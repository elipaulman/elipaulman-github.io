import Image from "next/image";
import Link from "next/link";
import { personal } from "@/lib/data";
import type { Socials } from "@/types";
import {
  ExternalIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  DocumentIcon,
} from "./icons";

type HeroProps = {
  socials: Socials;
};

export function Hero({ socials }: HeroProps) {
  const accentCta =
    "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition duration-150";

  return (
    <section
      id="intro"
      className="section-shell relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--panel)] px-6 sm:px-10 lg:px-16"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(125,211,252,0.18),transparent_35%),radial-gradient(circle_at_82%_5%,rgba(167,139,250,0.18),transparent_30%),radial-gradient(circle_at_55%_90%,rgba(14,165,233,0.18),transparent_32%)]" />
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="space-y-6 pl-4 pr-2 sm:pl-6 sm:pr-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-8 py-6 sm:px-10 shadow-[0_12px_50px_rgba(0,0,0,0.28)]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                New Grad SWE • AI/ML • Cloud
              </span>
              <span className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Available Jan 2026
              </span>
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-8 py-8 sm:px-10 sm:py-10 shadow-[0_18px_70px_rgba(0,0,0,0.28)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
              Hello, I&apos;m
            </p>
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold leading-tight text-[var(--text-strong)] sm:text-5xl">
                {personal.name}
              </h1>
              <p className="max-w-2xl text-lg text-[var(--muted)] sm:text-xl">
                {personal.title}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <Link
              href={`mailto:${socials.email.primary}`}
              className={`${accentCta} border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--text-strong)] hover:-translate-y-0.5 hover:shadow-[0_15px_60px_rgba(34,211,238,0.25)]`}
            >
              <MailIcon className="h-4 w-4" />
              Email
            </Link>
            <Link
              href={socials.resume.path}
              className={`${accentCta} border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--text-strong)] hover:-translate-y-0.5 hover:shadow-[0_15px_60px_rgba(34,211,238,0.25)]`}
              download
            >
              <DocumentIcon className="h-4 w-4" />
              Resume
            </Link>
            <Link
              href={socials.socialMedia.github.url}
              className={`${accentCta} border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--text-strong)] hover:-translate-y-0.5 hover:shadow-[0_15px_60px_rgba(34,211,238,0.25)]`}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
              <ExternalIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={socials.socialMedia.linkedin.url}
              className={`${accentCta} border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--text-strong)] hover:-translate-y-0.5 hover:shadow-[0_15px_60px_rgba(34,211,238,0.25)]`}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
              <ExternalIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto max-w-md lg:mx-0">
          <div className="absolute inset-0 translate-x-4 translate-y-6 rounded-[28px] bg-[linear-gradient(135deg,rgba(125,211,252,0.38),rgba(167,139,250,0.32))] blur-3xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--panel)]">
            <Image
              src="/images/EliStandingClear.png"
              alt="Portrait of Elijah Paulman"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
