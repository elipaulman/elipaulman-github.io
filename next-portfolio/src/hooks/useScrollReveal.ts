"use client";

import { useEffect, useRef, useCallback, type RefCallback } from "react";

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

/**
 * One-shot scroll-triggered hook. Adds "animate-in" class to the observed
 * element and all descendants with [data-animate-child] once it enters view,
 * then disconnects the observer.
 *
 * Mirrors the two-phase pattern of useScrollReveal:
 * - ref callback stores the node (fires during React commit, before effects)
 * - useEffect creates the observer and observes the stored node (fires after commit)
 * - ref callback also observes directly on re-renders when observer already exists
 */
export function useAnimateOnce(threshold = 0.15): RefCallback<Element> {
  const nodeRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add("animate-in");
            el.querySelectorAll("[data-animate-child]").forEach((child) => {
              child.classList.add("animate-in");
            });
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold }
    );

    // Observe the node stored by the ref callback before this effect ran
    if (nodeRef.current) {
      observerRef.current.observe(nodeRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [threshold]);

  const ref = useCallback((node: Element | null) => {
    nodeRef.current = node;
    // On re-renders, observer already exists — observe directly
    if (node && observerRef.current) {
      observerRef.current.observe(node);
    }
  }, []);

  return ref;
}
