"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { getMotionEnabledSnapshot, subscribeMotion } from "@/lib/motion";
import styles from "./section-reveal.module.css";

type RevealVariant = "rise" | "slide" | "orbit" | "stamp";

export function SectionReveal({
  children,
  variant = "rise",
  className,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "active" | "finished">("idle");

  useEffect(() => {
    const element = container.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    let started = false;
    const finish = () => {
      if (started) setState("finished");
    };
    const handlePreference = () => {
      if (!getMotionEnabledSnapshot()) finish();
    };
    const handleVisibility = () => {
      if (document.hidden) finish();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (started || !entry.isIntersecting) return;
        started = true;
        observer.disconnect();
        setState(
          !getMotionEnabledSnapshot() || document.hidden
            ? "finished"
            : "active",
        );
      },
      { threshold: 0.12 },
    );

    observer.observe(element);
    const unsubscribeMotion = subscribeMotion(handlePreference);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      unsubscribeMotion();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div
      ref={container}
      className={[styles.reveal, styles[variant], className]
        .filter(Boolean)
        .join(" ")}
      data-reveal-state={state}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setState("finished");
      }}
    >
      {children}
    </div>
  );
}
