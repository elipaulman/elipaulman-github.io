"use client";

import { useCallback, type RefCallback } from "react";

export interface UseMouseTiltOptions {
  max?: number;
  lift?: number;
  leaveMs?: number;
}

type TiltReadyNode = HTMLElement & {
  __portfolioTiltSetup?: string;
};

export function useMouseTilt<T extends HTMLElement = HTMLElement>(
  options: UseMouseTiltOptions = {}
): RefCallback<T> {
  const { max = 8, lift = 8, leaveMs = 450 } = options;

  return useCallback(
    (node: T | null) => {
      if (!node || typeof window === "undefined") return;

      const setupSignature = `${max}:${lift}:${leaveMs}`;
      const tiltNode = node as TiltReadyNode;

      if ((tiltNode.__portfolioTiltSetup ?? "") === setupSignature) {
        return;
      }

      tiltNode.__portfolioTiltSetup = setupSignature;

      const supportsHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;
      const isSmallViewport = window.matchMedia("(max-width: 768px)").matches;

      if (!supportsHover || isSmallViewport) {
        node.style.transform = "";
        node.style.transition = "";
        return;
      }

      let raf = 0;
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
    },
    [max, lift, leaveMs]
  );
}
