import Image from "next/image";
import Link from "next/link";
import { education, personal } from "@/lib/data";
import { FxGround } from "./FxGround";
import type { Socials } from "@/types";
import { DocumentIcon, LinkedInIcon, MailIcon } from "./icons";

const HERO_PALETTE = {
  bg: "#ff5a1f",
  surface: "#ff8a4c",
  ink: "#101114",
  muted: "#a3330c",
  accent: "#ffc27a",
  accentInk: "#101114",
};

const HERO_PARAMS = { speed: 0.45, softness: 0.55, warp: 0.7, grain: 0.7, scatter: 0.55, tint: 0.65, contrast: 0.7, calm: 0.5, calmX: 0.22, calmY: 0.82 };

export function Hero({ socials }: { socials: Socials }) {
  const [, ...rest] = personal.name.split(" ");

  return (
    <section id="top" className="hero">
      <FxGround
        id="grain-gradient"
        className="hero-fx"
        palette={HERO_PALETTE}
        seed={11}
        params={HERO_PARAMS}
      />

      <h1 className="hero-name poster" aria-label={personal.name}>
        <span aria-hidden="true">
          <i>{personal.shortName}</i>
        </span>
        <span aria-hidden="true">
          <i>{rest.join(" ")}</i>
        </span>
      </h1>

      <div className="hero-figure-wrap">
        <Image
          src="/images/eli-cutout.webp"
          alt=""
          width={884}
          height={2200}
          priority
          unoptimized
          className="hero-figure"
        />
      </div>

      <div className="hero-foot">
        <div>
          <p className="hero-statement">
            Software quality engineer at Apple, testing and automating carrier financing and
            purchase flows for iPhone and iPad.
          </p>
          <div className="hero-actions">
            <Link href={`mailto:${socials.email.primary}`} className="btn btn-fill">
              <MailIcon className="h-4 w-4" />
              Email me
            </Link>
            <Link href={socials.resume.path} download className="btn">
              <DocumentIcon className="h-4 w-4" />
              Resume
            </Link>
            <Link
              href={socials.socialMedia.linkedin.url}
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </Link>
          </div>
        </div>
        <ul className="hero-facts">
          <li>Software Quality Engineer, Apple</li>
          <li>{education[0].degree.replace("B.S. ", "B.S. ")}, Ohio State</li>
          <li>{personal.location}</li>
        </ul>
      </div>
    </section>
  );
}
