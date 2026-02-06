"use client";

import { useEffect, useRef, useCallback } from "react";

export function useScrollReveal(options?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const elementsRef = useRef<Set<HTMLElement>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("revealed");
            // Also reveal child .reveal elements (for reveal-stagger)
            el.querySelectorAll<HTMLElement>(".reveal").forEach((child) => {
              child.classList.add("revealed");
            });
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? "0px",
      }
    );

    elementsRef.current.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  const ref = useCallback((node: HTMLElement | null) => {
    if (node) {
      elementsRef.current.add(node);
      observerRef.current?.observe(node);
    }
  }, []);

  return ref;
}
