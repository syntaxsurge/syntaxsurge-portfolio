export const MOTION_STORAGE_KEY = "syntaxsurge-motion";
const motionEvent = "syntaxsurge-motion-change";

// The site's decorative motion starts automatically; a visitor can pause it.
export const motionInitScript = `(function(){var motion="playing";try{if(window.localStorage.getItem("syntaxsurge-motion")==="paused")motion="paused"}catch(e){}document.documentElement.dataset.motion=motion})();`;
let sessionEnabled: boolean | undefined;

function preference() {
  if (sessionEnabled !== undefined) return sessionEnabled;
  try {
    sessionEnabled =
      window.localStorage.getItem(MOTION_STORAGE_KEY) !== "paused";
  } catch {
    sessionEnabled = true;
  }
  return sessionEnabled;
}

function applyMotion(enabled: boolean) {
  document.documentElement.dataset.motion = enabled ? "playing" : "paused";
}

export function getMotionEnabledSnapshot(): boolean {
  if (typeof document === "undefined") return false;
  const applied = document.documentElement.dataset.motion;
  if (applied === "playing" || applied === "paused")
    return applied === "playing";
  return preference();
}

export function getServerMotionSnapshot(): boolean {
  return false;
}

export function setMotionEnabled(enabled: boolean) {
  if (typeof window === "undefined" || typeof enabled !== "boolean") return;
  sessionEnabled = enabled;
  applyMotion(enabled);
  try {
    window.localStorage.setItem(
      MOTION_STORAGE_KEY,
      enabled ? "playing" : "paused",
    );
  } catch {
    // The selection remains active for this session when storage is unavailable.
  }
  window.dispatchEvent(new Event(motionEvent));
}

export function subscribeMotion(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== MOTION_STORAGE_KEY && event.key !== null) return;
    sessionEnabled = event.newValue !== "paused";
    applyMotion(sessionEnabled);
    onChange();
  };
  applyMotion(preference());
  window.addEventListener(motionEvent, onChange);
  window.addEventListener("storage", syncStorage);
  return () => {
    window.removeEventListener(motionEvent, onChange);
    window.removeEventListener("storage", syncStorage);
  };
}

export function subscribeVisibility(onChange: () => void) {
  if (typeof document === "undefined") return () => {};
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

export function getVisibility() {
  return (
    typeof document !== "undefined" && document.visibilityState === "visible"
  );
}
