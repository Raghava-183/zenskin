"use client";

import { useEffect, useState } from "react";

type Mode = "light" | "dark";

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const saved = (() => {
      try {
        return localStorage.getItem("zenskin-theme");
      } catch {
        return null;
      }
    })();

    if (saved === "light" || saved === "dark") {
      setMode(saved);
      return;
    }

    setMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    );
  }, []);

  function toggle() {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("zenskin-theme", next);
    } catch {
      /* private browsing — the choice just won't persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-9 w-9 place-items-center rounded-pill border border-edge text-tx2 transition-colors hover:border-rose hover:text-rose"
    >
      {mode === "dark" ? (
        <svg
          className="h-[17px] w-[17px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
        </svg>
      ) : (
        <svg
          className="h-[17px] w-[17px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 14.5A8.2 8.2 0 0 1 9.6 4a8.5 8.5 0 1 0 10.4 10.5Z" />
        </svg>
      )}
    </button>
  );
}
