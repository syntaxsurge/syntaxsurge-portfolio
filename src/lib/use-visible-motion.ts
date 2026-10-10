"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  getMotionEnabledSnapshot,
  getServerMotionSnapshot,
  getVisibility,
  subscribeMotion,
  subscribeVisibility,
} from "./motion";

export function useVisibleMotion<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const enabled = useSyncExternalStore(
    subscribeMotion,
    getMotionEnabledSnapshot,
    getServerMotionSnapshot,
  );
  const visible = useSyncExternalStore(
    subscribeVisibility,
    getVisibility,
    () => false,
  );
  const [inView, setInView] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, running: enabled && visible && inView };
}
