"use client";

import { useEffect, useState } from "react";

export function useTypewriterLoop(commands: string[]): string {
  const [text, setText] = useState("");

  useEffect(() => {
    if (commands.length === 0) return;

    let commandIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = 0;

    const step = () => {
      const full = commands[commandIndex];
      if (!deleting) {
        charIndex++;
        setText(full.slice(0, charIndex));
        if (charIndex === full.length) {
          deleting = true;
          timer = window.setTimeout(step, 1600);
          return;
        }
        timer = window.setTimeout(step, 46);
      } else {
        charIndex--;
        setText(full.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          commandIndex = (commandIndex + 1) % commands.length;
          timer = window.setTimeout(step, 380);
          return;
        }
        timer = window.setTimeout(step, 26);
      }
    };

    timer = window.setTimeout(step, 300);
    return () => window.clearTimeout(timer);
  }, [commands]);

  return text;
}
