"use client";

import { useEffect, useRef } from "react";

/**
 * The page's one effect: a dot-matrix field. Dots swell around the pointer and a slow
 * wave travels across the grid. Paused while off-screen, static under reduced motion,
 * never behind body copy (the hero's copy sits on the masked, quiet corner).
 */
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const STEP = 20;
    const RADIUS = 170;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const draw = (now: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.14;
      pointer.y += (pointer.ty - pointer.y) * 0.14;
      ctx.clearRect(0, 0, w, h);
      const t = reduce ? 0 : now / 1000;
      for (let y = STEP / 2; y < h; y += STEP) {
        for (let x = STEP / 2; x < w; x += STEP) {
          const wave = Math.sin(x * 0.012 + t * 0.9) * Math.cos(y * 0.014 - t * 0.7);
          let r = 1.25 + wave * 0.65;
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          let a = 0.34;
          if (d < RADIUS) {
            const k = 1 - d / RADIUS;
            r += k * k * 5.2;
            a += k * 0.5;
          }
          ctx.globalAlpha = a;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(r, 0.4), 0, Math.PI * 2);
          ctx.fillStyle = "#101114";
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      if (pointer.x < -5000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);

    resize();
    // Reduced motion drops the ambient wave (t stays 0); the pointer response stays,
    // because it answers the person's own action.
    raf = requestAnimationFrame(loop);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero-field" aria-hidden="true" />;
}
