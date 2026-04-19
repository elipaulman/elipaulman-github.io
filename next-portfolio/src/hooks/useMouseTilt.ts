"use client";

import { useCallback, type RefCallback } from "react";

export interface UseMouseTiltOptions {
  max?: number;
  lift?: number;
  leaveMs?: number;
}

export function useMouseTilt<T extends HTMLElement = HTMLElement>(
  options: UseMouseTiltOptions = {}
): RefCallback<T> {
  const { max = 8, lift = 8, leaveMs = 450 } = options;

  return useCallback(
    (node: T | null) => {
      if (!node || typeof window === "undefined") return;
      
      let raf = 0;

      // Fallback for touch devices: continuous, smooth automatic 3D wobble
      if (window.matchMedia("(hover: none)").matches) {
        const animate = (time: number) => {
          // Create an organic, looping float pattern using slightly offset sine waves
          const rx = Math.sin(time / 1000) * (max * 0.6);
          const ry = Math.cos(time / 1300) * (max * 0.6);
          node.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${lift}px)`;
          raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        
        return () => {
          if (raf) cancelAnimationFrame(raf);
          node.style.transform = "";
        };
      }

      let restoreTimer = 0;

      const handleEnter = () => {
        if (restoreTimer) {
          window.clearTimeout(restoreTimer);
          restoreTimer = 0;
        }
        node.style.transition = "transform 120ms ease-out";
      };

      const handleMove = (e: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        const rx = -py * max * 2;
        const ry = px * max * 2;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          node.style.transition = "";
          node.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${lift}px)`;
        });
      };

      const handleLeave = () => {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        node.style.transition = `transform ${leaveMs}ms cubic-bezier(0.16, 1, 0.3, 1)`;
        node.style.transform = "";
        restoreTimer = window.setTimeout(() => {
          node.style.transition = "";
          restoreTimer = 0;
        }, leaveMs);
      };

      node.addEventListener("pointerenter", handleEnter);
      node.addEventListener("pointermove", handleMove);
      node.addEventListener("pointerleave", handleLeave);

      return () => {
        node.removeEventListener("pointerenter", handleEnter);
        node.removeEventListener("pointermove", handleMove);
        node.removeEventListener("pointerleave", handleLeave);
        if (raf) cancelAnimationFrame(raf);
        if (restoreTimer) window.clearTimeout(restoreTimer);
        node.style.transform = "";
        node.style.transition = "";
      };
    },
    [max, lift, leaveMs]
  );
}
