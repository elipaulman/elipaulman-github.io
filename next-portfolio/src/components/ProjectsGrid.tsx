import Link from "next/link";
import { projects, socials } from "@/lib/data";
import { ExternalIcon } from "./icons";
import { FxGround } from "./FxGround";

const LEAK = { bg: "#101114", surface: "#1b1d23", ink: "#f2f3f5", muted: "#8f939c", accent: "#ff5a1f", accentInk: "#101114" };
const LEAK_DARK = { ...LEAK, bg: "#191b20", surface: "#23262d" };

const TAGS: Record<string, string> = {
  winner: "Winner",
  hackathon: "Hackathon",
  ai: "AI",
};

export function ProjectsGrid() {
  return (
    <section id="projects" className="work">
      <FxGround id="film-light-leak" className="band-fx" palette={LEAK} darkPalette={LEAK_DARK} seed={5} />
      <div className="inner">
        <h2 className="sec-title poster">Projects</h2>
        <div>
          {projects.map((project) => (
            <article key={project.id} className="work-row">
              <div>
                <h3 className="work-name">{project.title}</h3>
                <p className="work-stack">{project.techUsed}</p>
                {project.tags?.map((tag) => (
                  <span key={tag} className="work-tag">
                    {TAGS[tag] ?? tag}
                  </span>
                ))}
              </div>
              <p className="work-desc">{project.description}</p>
              <Link
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="work-link"
              >
                {project.linkText}
                <ExternalIcon className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
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
