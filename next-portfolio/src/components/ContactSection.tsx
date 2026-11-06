import Link from "next/link";
import { personal, socials } from "@/lib/data";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "./icons";
import { FxGround } from "./FxGround";

const CLOSE = { bg: "#ff5a1f", surface: "#ff8a4c", ink: "#101114", muted: "#a3330c", accent: "#ffc27a", accentInk: "#101114" };
const CLOSE_PARAMS = { speed: 0.35, grain: 0.7, tint: 0.6, contrast: 0.65, calm: 0.6, calmX: 0.3, calmY: 0.5 };

export function ContactSection() {
  return (
    <section id="contact" className="contact">
      <FxGround id="grain-gradient" className="band-fx" palette={CLOSE} seed={31} params={CLOSE_PARAMS} />
      <div className="inner">
        <h2 className="contact-head poster">Let&rsquo;s talk</h2>
        <Link href={`mailto:${personal.email}`} className="contact-mail">
          {personal.email}
        </Link>

        <div className="contact-actions">
          <Link href={socials.socialMedia.linkedin.url} target="_blank" rel="noreferrer" className="btn btn-fill">
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </Link>
          <Link href={socials.socialMedia.github.url} target="_blank" rel="noreferrer" className="btn">
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </Link>
          <Link href={socials.resume.path} download className="btn">
            <DownloadIcon className="h-4 w-4" />
            Resume
          </Link>
        </div>

        <div className="contact-foot">
          <span>{personal.location}</span>
          <Link href={`tel:${socials.phone.replace(/\D/g, "")}`}>{socials.phone}</Link>
          <span>Designed and built by {personal.name}</span>
        </div>
      </div>
    </section>
  );
}
