"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EASE = "expo.out"; // the same curve as --ease in globals.css

/**
 * The page's motion, kept deliberately small:
 *  - the timeline spine draws and its dots fill as you scroll
 *  - the About photo unmasks once (project rules are drawn by ProjectList)
 *  - a hairline scroll progress
 * Everything is gated on prefers-reduced-motion. (The name's entrance is pure CSS in globals.css.)
 */
export function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const html = document.documentElement;
      html.classList.add("js-motion");

      /* Scroll progress */
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });

      /* Hero portrait drifts a touch slower than the page */
      gsap.to(".hero-figure", {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      /* Impact numbers count up once, the first time they scroll into view */
      const finals: Array<() => void> = [];
      document.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
        const to = Number(el.dataset.to);
        if (!Number.isFinite(to)) return;
        const finalText = el.textContent ?? String(to);
        finals.push(() => (el.textContent = finalText));
        // Only start from zero if it's still off-screen, so nothing flickers on load.
        if (el.getBoundingClientRect().top > window.innerHeight * 0.88) el.textContent = "0";
        const counter = { v: 0 };
        gsap.to(counter, {
          v: to,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => (el.textContent = Math.round(counter.v).toLocaleString("en-US")),
          onComplete: () => (el.textContent = finalText),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      /* About photo: a single unmask with a slow settle */
      const photo = document.querySelector(".about-photo");
      if (photo) {
        gsap.to(photo, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.3,
          ease: EASE,
          scrollTrigger: { trigger: photo, start: "top 82%", once: true },
        });
        gsap.fromTo(
          ".about-photo img",
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.8,
            ease: EASE,
            scrollTrigger: { trigger: photo, start: "top 82%", once: true },
          },
        );
      }

      /* Timeline: the spine follows your scroll, dots fill when it reaches them */
      document.querySelectorAll<HTMLElement>(".tl-list").forEach((list) => {
        gsap.fromTo(
          list,
          { "--p": 0 },
          {
            "--p": 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 70%", scrub: 0.4 },
          },
        );
        list.querySelectorAll<HTMLElement>(".tl-item").forEach((item) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 70%",
            toggleClass: { targets: item, className: "is-reached" },
          });
        });
      });

      return () => {
        finals.forEach((restore) => restore());
        html.classList.remove("js-motion");
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div aria-hidden="true">
      <div className="scroll-progress" />
    </div>
  );
}
