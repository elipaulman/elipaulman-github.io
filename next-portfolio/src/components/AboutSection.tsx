import Image from "next/image";
import { personal } from "@/lib/data";
import { FxGround } from "./FxGround";

const PAPER = { bg: "#f2f3f5", surface: "#e3e6ec", ink: "#101114", muted: "#5d6474", accent: "#ffd6c2", accentInk: "#101114" };
const PAPER_DARK = { bg: "#0e0f12", surface: "#171a20", ink: "#f2f3f5", muted: "#a6a9b2", accent: "#3a1d10", accentInk: "#f2f3f5" };
const PAPER_PARAMS = { speed: 0.25, grain: 0.55, tint: 0.5, contrast: 0.35, calm: 0.75, calmX: 0.3, calmY: 0.5 };

export function AboutSection() {
  return (
    <section id="about" className="sec sec-fx">
      <FxGround id="grain-gradient" className="band-fx" palette={PAPER} darkPalette={PAPER_DARK} seed={23} params={PAPER_PARAMS} />
      <div className="inner">
        <h2 className="sec-title poster">About</h2>
        <div className="about">
          <div>
            <p className="about-lead">
              I&rsquo;m a Software Quality Engineer at Apple, where I test and automate the carrier
              services behind buying an iPhone or iPad, including financing, trade-in, and promotions.
              I graduated from Ohio State in December 2025 with a degree in CSE.
            </p>
            <div className="about-body">
              <p>{personal.about.detailed}</p>
            </div>
          </div>
          <div className="about-photo">
            <Image
              src="/images/eli-kyoto.webp"
              alt="Elijah Paulman standing on a stone path in Kyoto"
              fill
              unoptimized
              className="object-cover object-[center_40%]"
              sizes="(max-width: 960px) 100vw, 420px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
