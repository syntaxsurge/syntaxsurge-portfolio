"use client";

import { useSyncExternalStore } from "react";
import {
  getServerThemeSnapshot,
  getThemeSnapshot,
  setTheme,
  subscribeTheme,
} from "@/lib/theme";
import { ThemeIcon } from "./icons";
import styles from "./header.module.css";

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const label = theme
    ? `Switch to ${theme === "light" ? "dark" : "light"} theme`
    : "Toggle color theme";

  return (
    <button
      className={`${styles.iconButton} ${styles.themeButton}`}
      type="button"
      data-current-theme={theme ?? undefined}
      aria-label={label}
      title={label}
      onClick={() => setTheme(getThemeSnapshot() === "dark" ? "light" : "dark")}
    >
      <span className={styles.lightIcon} aria-hidden="true">
        <ThemeIcon mode="light" />
      </span>
      <span className={styles.darkIcon} aria-hidden="true">
        <ThemeIcon mode="dark" />
      </span>
    </button>
  );
}
