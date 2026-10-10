"use client";

import Image from "next/image";
import {
  type CSSProperties,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { business } from "@/data/business";
import {
  getReducedMotion,
  getVisibility,
  subscribeMotionPreference,
  subscribeVisibility,
} from "@/lib/motion";
import { PlayIcon } from "./icons";

const particles = Array.from({ length: 20 }, (_, index) => ({
  "--particle-x": `${8 + ((index * 37) % 84)}%`,
  "--particle-y": `${8 + ((index * 23) % 83)}%`,
  "--particle-size": `${3 + (index % 3)}px`,
  "--particle-duration": `${10 + (index % 5) * 2}s`,
  "--particle-delay": `${index * -0.7}s`,
  "--particle-dx": `${(index % 2 ? 1 : -1) * (8 + (index % 4) * 3)}px`,
  "--particle-dy": `${-8 - (index % 5) * 3}px`,
  "--particle-opacity": 0.25 + (index % 4) * 0.08,
}));

export function HeroPortrait() {
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
  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const running = !reducedMotion && visible && inView && !userPaused;

  useEffect(() => {
    const element = container.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hero-portrait" ref={container}>
      <Image
        src={business.heroPortrait.src}
        alt={business.heroPortrait.alt}
        width={business.heroPortrait.width}
        height={business.heroPortrait.height}
        sizes="(max-width: 850px) 100vw, 620px"
        preload
        unoptimized
      />
      {!reducedMotion && (
        <>
          <div
            className="hero-particles"
            aria-hidden="true"
            data-running={running}
          >
            {particles.map((properties, index) => (
              <span
                className="hero-particle"
                key={index}
                style={
                  {
                    ...properties,
                    animationPlayState: running ? "running" : "paused",
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <button
            className="hero-portrait-control"
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
