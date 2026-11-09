"use client";

import { useEffect, useRef } from "react";

type Palette = {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  accentInk: string;
};

type FxController = { destroy: () => void; setPalette: (p: Partial<Palette>) => unknown };
type FxModule = {
  default: {
    mount: (
      el: HTMLElement,
      id: string,
      opts: { palette: Palette; seed?: number; params?: Record<string, number> },
    ) => Promise<FxController>;
  };
};

type Props = {
  id: string;
  palette: Palette;
  /** Palette to switch to under the dark theme, if it differs. */
  darkPalette?: Palette;
  seed?: number;
  params?: Record<string, number>;
  className?: string;
};

/**
 * A GPU ground from the Taste Skill's effects library (public/fx). Draws only while on screen,
 * shows one still frame under reduced motion, and falls back to a CSS picture without WebGL.
 */
export function FxGround({ id, palette, darkPalette, seed = 7, params, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ctrl: FxController | null = null;
    let cancelled = false;

    const isDark = () => document.documentElement.dataset.theme === "dark";
    const pick = () => (isDark() && darkPalette ? darkPalette : palette);

    (async () => {
      try {
        const url = "/fx/fx.js";
        const mod = (await import(/* webpackIgnore: true */ url)) as FxModule;
        if (cancelled) return;
        ctrl = await mod.default.mount(el, id, { palette: pick(), seed, params });
        if (cancelled) ctrl.destroy();
      } catch (err) {
        console.warn("fx ground unavailable", err);
      }
    })();

    const mo = new MutationObserver(() => ctrl?.setPalette(pick()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelled = true;
      mo.disconnect();
      ctrl?.destroy();
    };
  }, [id, palette, darkPalette, seed, params]);

  return <div ref={ref} className={className} aria-hidden="true" />;
}
