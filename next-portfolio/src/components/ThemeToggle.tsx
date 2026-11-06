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
  return "light";
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
      className="chip-btn"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <span suppressHydrationWarning style={{ display: "inline-flex" }}>
        {theme === "dark" ? (
          <SunIcon className="h-4 w-4" />
        ) : (
          <MoonIcon className="h-4 w-4" />
        )}
      </span>
    </button>
  );
}
