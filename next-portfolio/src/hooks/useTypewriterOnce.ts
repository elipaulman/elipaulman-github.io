"use client";

import { useEffect, useState } from "react";

/** Types out `text` once, character by character, starting after `delayMs`. */
export function useTypewriterOnce(
  text: string,
  delayMs = 0
): { text: string; done: boolean } {
  const [length, setLength] = useState(0);

  useEffect(() => {
    let i = 0;
    let timer = 0;

    const step = () => {
      i++;
      setLength(i);
      if (i < text.length) {
        timer = window.setTimeout(step, 38);
      }
    };

    timer = window.setTimeout(step, delayMs);
    return () => window.clearTimeout(timer);
  }, [text, delayMs]);

  return { text: text.slice(0, length), done: length >= text.length };
}
