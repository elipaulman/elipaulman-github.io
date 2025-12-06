import type { ReactNode } from "react";
import Link from "next/link";
import { personal, socials } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  DocumentIcon,
} from "./icons";

export function ContactSection() {
  return (
    <section id="contact" className="section-shell">
      <div className="glass-panel space-y-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Together"
          description="Open to new grad SWE roles (Jan 2026 start). I respond fastest on email or LinkedIn."
        />
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-stretch">
          <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-[0_15px_60px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col gap-4 text-sm text-[var(--text-strong)]">
              <h3 className="text-lg font-semibold text-[var(--text-strong)]">
                Contact info
              </h3>
              <ContactRow
                icon={<MailIcon className="h-5 w-5" />}
                label="Email"
                value={
                  <div className="space-y-1">
                    <Link
                      href={`mailto:${personal.email}`}
                      className="font-semibold hover:text-[var(--accent)]"
                    >
                      {personal.email}
                    </Link>
                    <Link
                      href={`mailto:${personal.schoolEmail}`}
                      className="block font-semibold hover:text-[var(--accent)]"
                    >
                      {personal.schoolEmail}
                    </Link>
                  </div>
                }
              />
              <ContactRow
                icon={<PhoneIcon className="h-5 w-5" />}
                label="Phone"
                value={
                  <div>
                    <Link
                      href={`tel:${socials.phone.replace(/\D/g, "")}`}
                      className="font-semibold hover:text-[var(--accent)]"
                    >
                      {socials.phone}
                    </Link>
                  </div>
                }
              />
              <ContactRow
                icon={<LocationIcon className="h-5 w-5" />}
                label="Location"
                value={<span className="font-semibold">{personal.location}</span>}
              />
              <ContactRow
                icon={<DocumentIcon className="h-5 w-5" />}
                label="Resume"
                value={
                  <Link
                    href={socials.resume.path}
                    download
                    className="inline-flex items-center gap-1.5 font-semibold hover:text-[var(--accent)]"
                  >
                    Download PDF
                    <DownloadIcon className="h-3.5 w-3.5" />
                  </Link>
                }
              />
            </div>
          </div>

          <div className="flex h-full flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-[0_15px_60px_rgba(0,0,0,0.3)]">
            <h3 className="text-lg font-semibold text-[var(--text-strong)]">
              Social
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href={socials.socialMedia.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-4 py-2 text-sm font-semibold text-[var(--text-strong)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(34,211,238,0.18)]"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </Link>
              <Link
                href={socials.socialMedia.github.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-4 py-2 text-sm font-semibold text-[var(--text-strong)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(34,211,238,0.18)]"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </Link>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Fastest way to reach me is email. I usually reply within a day.
            </p>
            <div className="flex-1" />
          </div>
        </div>
      </div>
    </section>
  );
}

type ContactRowProps = {
  icon: ReactNode;
  label: string;
  value: ReactNode;
};

function ContactRow({ icon, label, value }: ContactRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[var(--muted)]">{icon}</div>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          {label}
        </p>
        <div className="text-[var(--text-strong)]">{value}</div>
      </div>
    </div>
  );
}
