"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export type Theme = "dark" | "light";

function resolveInitial(): Theme {
  if (typeof document === "undefined") return "dark";
  const stored = localStorage.getItem("mk-theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(resolveInitial());
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("mk-theme", theme);
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={`glass-thin ${styles.toggle}`}
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <span aria-hidden="true" className={styles.icon}>
        {theme === "dark" ? "☾" : "☀"}
      </span>
    </button>
  );
}
