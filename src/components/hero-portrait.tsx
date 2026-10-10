"use client";

import Image from "next/image";
import { type CSSProperties } from "react";
import { business } from "@/data/business";
import { useVisibleMotion } from "@/lib/use-visible-motion";

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
  const { ref: container, running } = useVisibleMotion<HTMLDivElement>();

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
      <div className="hero-particles" aria-hidden="true" data-running={running}>
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
    </div>
  );
}
