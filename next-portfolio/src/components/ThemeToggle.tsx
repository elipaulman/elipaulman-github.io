"use client";

import { useCallback, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "./icons";

type Theme = "dark" | "light";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getThemeSnapshot(): Theme {
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerSnapshot,
  );

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("theme", next);
    document.documentElement.dataset.theme = next;
    window.dispatchEvent(new Event("storage"));
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-transparent px-3 py-1.5 font-mono text-[0.7rem] text-[var(--muted)] transition-all duration-200 hover:border-[var(--border-hover)] hover:text-[var(--text-strong)]"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <SunIcon className="h-3.5 w-3.5" />
      ) : (
        <MoonIcon className="h-3.5 w-3.5" />
      )}
      <span className="hidden sm:inline">
        {"// "}
        {theme === "dark" ? "light" : "dark"}
      </span>
    </button>
  );
}
