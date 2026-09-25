export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "syntaxsurge-theme";
const THEME_EVENT = "syntaxsurge-theme-change";

// Run at the start of the body before visible content. This string contains no
// visitor-controlled values and does not depend on the client bundle loading.
export const themeInitScript = `(function(){var theme;try{theme=window.localStorage.getItem("syntaxsurge-theme")}catch(e){}if(theme!=="light"&&theme!=="dark"){try{theme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch(e){theme="light"}}document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme})();`;

let sessionPreference: Theme | null | undefined;

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

function systemTheme(): Theme {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

function preference(): Theme | null {
  if (sessionPreference !== undefined) return sessionPreference;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    sessionPreference = isTheme(stored) ? stored : null;
  } catch {
    sessionPreference = null;
  }
  return sessionPreference;
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function setTheme(theme: Theme) {
  if (typeof window === "undefined" || !isTheme(theme)) return;
  // Apply first so private browsing or unavailable storage cannot block a click.
  sessionPreference = theme;
  applyTheme(theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The selection still remains active for this page session.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function getThemeSnapshot(): Theme | null {
  if (typeof document === "undefined") return null;
  const applied = document.documentElement.dataset.theme;
  return isTheme(applied) ? applied : (preference() ?? systemTheme());
}

// Both server rendering and React's first hydration render use the same value.
export function getServerThemeSnapshot(): null {
  return null;
}

export function subscribeTheme(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const syncSystem = () => {
    if (preference() === null) {
      applyTheme(systemTheme());
      onChange();
    }
  };
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
    // A removed/invalid preference returns this tab to the device preference.
    sessionPreference = isTheme(event.newValue) ? event.newValue : null;
    applyTheme(sessionPreference ?? systemTheme());
    onChange();
  };
  let media: MediaQueryList | undefined;
  try {
    media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", syncSystem);
  } catch {
    // Explicit Light/Dark controls still work without matchMedia support.
  }
  applyTheme(preference() ?? systemTheme());
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", syncStorage);
  return () => {
    media?.removeEventListener?.("change", syncSystem);
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", syncStorage);
  };
}
