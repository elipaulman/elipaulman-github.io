"use client";

import { useCallback, type RefCallback } from "react";

export interface UseGroupTiltOptions {
  liftPx?: number;
  radiusPx?: number;
  leaveMs?: number;
}

/**
 * Gives every `[data-group-tilt-card]` descendant a gentle, distance-based
 * lift toward the cursor as it moves across the container, so the grid
 * reads as one responsive surface rather than isolated hover targets.
 * Deliberately avoids 3D rotation — it read as disorienting in practice.
 */
export function useGroupTilt<T extends HTMLElement = HTMLElement>(
  options: UseGroupTiltOptions = {}
): RefCallback<T> {
  const { liftPx = 4, radiusPx = 260, leaveMs = 400 } = options;

  return useCallback(
    (node: T | null) => {
      if (!node || typeof window === "undefined") return;

      const supportsHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;
      const isSmallViewport = window.matchMedia("(max-width: 768px)").matches;
      if (!supportsHover || isSmallViewport) return;

      let raf = 0;
      let restoreTimer = 0;

      const cards = () =>
        Array.from(node.querySelectorAll<HTMLElement>("[data-group-tilt-card]"));

      const handleMove = (e: PointerEvent) => {
        if (restoreTimer) {
          window.clearTimeout(restoreTimer);
          restoreTimer = 0;
        }
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          cards().forEach((card) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
            const proximity = clamp(1 - dist / radiusPx, 0, 1);

            card.style.transition = "transform 220ms ease-out";
            card.style.transform = `translateY(${-proximity * liftPx}px)`;

            if (
              e.clientX >= rect.left &&
              e.clientX <= rect.right &&
              e.clientY >= rect.top &&
              e.clientY <= rect.bottom
            ) {
              card.style.setProperty(
                "--mx",
                `${((e.clientX - rect.left) / rect.width) * 100}%`
              );
              card.style.setProperty(
                "--my",
                `${((e.clientY - rect.top) / rect.height) * 100}%`
              );
            }
          });
        });
      };

      const handleLeave = () => {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        cards().forEach((card) => {
          card.style.transition = `transform ${leaveMs}ms cubic-bezier(0.16, 1, 0.3, 1)`;
          card.style.transform = "";
        });
        restoreTimer = window.setTimeout(() => {
          cards().forEach((card) => {
            card.style.transition = "";
          });
          restoreTimer = 0;
        }, leaveMs);
      };

      node.addEventListener("pointermove", handleMove);
      node.addEventListener("pointerleave", handleLeave);
    },
    [liftPx, radiusPx, leaveMs]
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
