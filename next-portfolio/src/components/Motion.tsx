"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EASE = "expo.out"; // the same curve as --ease in globals.css

/**
 * The page's motion, kept deliberately small:
 *  - the name widens letter by letter near the cursor (the one playful moment)
 *  - the timeline spine draws and its dots fill as you scroll
 *  - project rules draw in as rows arrive; the photo unmasks once
 *  - a hairline scroll progress
 * Everything is gated on prefers-reduced-motion; the cursor effect also needs a fine pointer.
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

      /* Project rows: the rule draws when the row arrives */
      ScrollTrigger.batch(".work-row", {
        start: "top 88%",
        once: true,
        onEnter: (rows) =>
          rows.forEach((row, i) =>
            gsap.delayedCall(i * 0.08, () => row.classList.add("is-in")),
          ),
      });

      /* The name: letters widen through the font's width axis as the cursor passes */
      const fine = gsap.matchMedia();
      fine.add("(hover: hover) and (pointer: fine)", () => {
        const name = document.querySelector<HTMLElement>(".hero-name");
        const hero = document.querySelector<HTMLElement>(".hero");
        if (!name || !hero) return;
        const chars = Array.from(name.querySelectorAll<HTMLElement>(".ch"));
        const REST = 62;
        const WIDE = 78;
        const REST_LS = -0.012; // em, matches .poster
        const MIN_LS = -0.04;

        const setW = chars.map((el) =>
          gsap.quickTo(el, "--w", { duration: 0.7, ease: "power3.out" }),
        );

        // Each line behaves like an accordion: as letters widen, the gaps between the others
        // tighten so the name keeps its footprint and never crowds the portrait.
        const lines = Array.from(name.querySelectorAll<HTMLElement>("span > i")).map((el) => ({
          el,
          chars: Array.from(el.querySelectorAll<HTMLElement>(".ch")),
          restWidth: 0,
          ls: REST_LS,
        }));
        const span = (cs: HTMLElement[]) =>
          cs[cs.length - 1].getBoundingClientRect().right - cs[0].getBoundingClientRect().left;
        const fontSize = () => parseFloat(getComputedStyle(name).fontSize);
        const settleSpacing = () => {
          const fs = fontSize();
          for (const l of lines) {
            const gaps = Math.max(1, l.chars.length - 1);
            const delta = span(l.chars) - l.restWidth;
            l.ls = gsap.utils.clamp(MIN_LS, REST_LS, l.ls - (delta / (gaps * fs)) * 0.6);
            l.el.style.letterSpacing = `${l.ls}em`;
          }
        };
        let tickUntil = 0;
        const tick = () => {
          settleSpacing();
          if (performance.now() > tickUntil) gsap.ticker.remove(tick);
        };
        const keepTicking = () => {
          tickUntil = performance.now() + 900;
          gsap.ticker.remove(tick);
          gsap.ticker.add(tick);
        };

        // Letter centres at their resting width, relative to the name block.
        let centres: { x: number; y: number }[] = [];
        let radius = 0;
        const measure = () => {
          gsap.ticker.remove(tick);
          gsap.set(chars, { "--w": REST });
          for (const l of lines) {
            l.ls = REST_LS;
            l.el.style.letterSpacing = "";
            l.restWidth = span(l.chars);
          }
          centres = chars.map((el) => ({
            x: el.offsetLeft + el.offsetWidth / 2,
            y: el.offsetTop + el.offsetHeight / 2,
          }));
          radius = fontSize() * 0.95;
        };
        // Wait out the entrance so offsets are stable.
        const ready = gsap.delayedCall(1.6, measure);
        window.addEventListener("resize", measure);

        let raf = 0;
        const onMove = (e: PointerEvent) => {
          if (!centres.length || raf) return;
          raf = requestAnimationFrame(() => {
            raf = 0;
            const r = name.getBoundingClientRect();
            const px = e.clientX - r.left;
            const py = e.clientY - r.top;
            centres.forEach((c, i) => {
              const d = Math.hypot(px - c.x, (py - c.y) * 0.6);
              const t = Math.max(0, 1 - d / radius);
              const k = t * t * (3 - 2 * t); // smoothstep
              setW[i](REST + (WIDE - REST) * k);
            });
            keepTicking();
          });
        };
        const onLeave = () => {
          setW.forEach((s) => s(REST));
          keepTicking();
        };
        hero.addEventListener("pointermove", onMove);
        hero.addEventListener("pointerleave", onLeave);

        return () => {
          if (raf) cancelAnimationFrame(raf);
          ready.kill();
          gsap.ticker.remove(tick);
          lines.forEach((l) => (l.el.style.letterSpacing = ""));
          window.removeEventListener("resize", measure);
          hero.removeEventListener("pointermove", onMove);
          hero.removeEventListener("pointerleave", onLeave);
          gsap.set(chars, { clearProps: "--w" });
        };
      });

      return () => {
        fine.revert();
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
