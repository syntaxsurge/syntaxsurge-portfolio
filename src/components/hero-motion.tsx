"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { business } from "@/data/business";
import { PlayIcon } from "./icons";

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeMotionPreference(onChange: () => void) {
  if (typeof window.matchMedia !== "function") return () => {};
  const preference = window.matchMedia(motionQuery);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return (
    typeof window.matchMedia !== "function" ||
    window.matchMedia(motionQuery).matches
  );
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function getVisibility() {
  return document.visibilityState === "visible";
}

export function HeroMotion() {
  const reducedMotion = useSyncExternalStore(
    subscribeMotionPreference,
    getReducedMotion,
    () => true,
  );
  const visible = useSyncExternalStore(
    subscribeVisibility,
    getVisibility,
    () => false,
  );
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const motionAvailable = !reducedMotion && !failed;
  const shouldPlay = motionAvailable && visible && inView && !userPaused;

  useEffect(() => {
    const element = container.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        threshold: 0.1,
      },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    if (!shouldPlay) {
      player.pause();
      return;
    }
    let cancelled = false;
    player.play().catch(() => {
      if (!cancelled) setFailed(true);
    });
    return () => {
      cancelled = true;
      player.pause();
    };
  }, [shouldPlay]);

  return (
    <div className="hero-motion" ref={container}>
      <Image
        src={business.heroMotion.poster}
        alt=""
        fill
        sizes="(max-width: 850px) 100vw, 720px"
        preload
        unoptimized
      />
      {motionAvailable && (
        <>
          <video
            ref={video}
            src={business.heroMotion.src}
            poster={business.heroMotion.poster}
            width={business.heroMotion.width}
            height={business.heroMotion.height}
            loop
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            onError={() => setFailed(true)}
          />
          <button
            className="hero-motion-control"
            type="button"
            onClick={() => setUserPaused((paused) => !paused)}
          >
            {userPaused ? (
              <PlayIcon />
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M8 5v14m8-14v14" />
              </svg>
            )}
            {userPaused ? "Play animation" : "Pause animation"}
          </button>
        </>
      )}
    </div>
  );
}
