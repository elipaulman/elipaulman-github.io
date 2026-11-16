import Link from "next/link";
import { projects, socials } from "@/lib/data";
import { FxGround } from "./FxGround";
import { ProjectList } from "./ProjectList";

const LEAK = { bg: "#101114", surface: "#1b1d23", ink: "#f2f3f5", muted: "#8f939c", accent: "#ff5a1f", accentInk: "#101114" };
const LEAK_DARK = { ...LEAK, bg: "#191b20", surface: "#23262d" };

export function ProjectsGrid() {
  return (
    <section id="projects" className="work">
      <FxGround id="film-light-leak" className="band-fx" palette={LEAK} darkPalette={LEAK_DARK} seed={5} />
      <div className="inner">
        <ProjectList projects={projects} />
        <p className="work-more">
          More on{" "}
          <Link
            href={socials.socialMedia.github.repositories ?? socials.socialMedia.github.url}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
