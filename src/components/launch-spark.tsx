"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { Arrow } from "./icons";
import styles from "./launch-spark.module.css";

const sparks = Array.from({ length: 12 }, (_, index) => {
  const angle = (Math.PI * 2 * index) / 12;
  return {
    "--spark-x": `${Math.round(Math.cos(angle) * 78)}px`,
    "--spark-y": `${Math.round(-86 + Math.sin(angle) * 38)}px`,
    "--spark-turn": `${index * 30}deg`,
    "--spark-delay": `${(index % 3) * 60}ms`,
  } as CSSProperties;
});

export function LaunchSpark() {
  const [active, setActive] = useState(false);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handlePreference = () => {
      if (preference.matches) setActive(false);
    };
    const handleVisibility = () => {
      if (document.hidden) setActive(false);
    };
    preference.addEventListener("change", handlePreference);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      preference.removeEventListener("change", handlePreference);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  function launch() {
    if (active) return;
    setLaunched(true);
    if (
      document.hidden ||
      typeof window.matchMedia !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    setActive(true);
  }

  return (
    <div className={styles.launch}>
      {active && (
        <div className={styles.field} aria-hidden="true">
          <span
            className={styles.rocket}
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget) setActive(false);
            }}
          >
            <Arrow diagonal />
          </span>
          <span className={styles.trail} />
          {sparks.map((spark, index) => (
            <i className={styles.spark} style={spark} key={index} />
          ))}
        </div>
      )}
      <button
        className={styles.button}
        type="button"
        onClick={launch}
        aria-disabled={active}
      >
        Launch a spark <Arrow diagonal />
      </button>
      <span
        className={styles.status}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {launched ? "Ready when you are." : ""}
      </span>
    </div>
  );
}
