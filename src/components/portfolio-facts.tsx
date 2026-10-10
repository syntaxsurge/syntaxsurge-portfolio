"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { awards, projects } from "@/data/portfolio";
import { Arrow } from "./icons";

const totals = [projects.length, awards.length];

export function PortfolioFacts() {
  const container = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(totals);

  useEffect(() => {
    const element = container.current;
    if (
      !element ||
      typeof IntersectionObserver === "undefined" ||
      typeof window.matchMedia !== "function"
    )
      return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;
    const finish = () => {
      cancelAnimationFrame(frame);
      setCounts(totals);
    };
    const handlePreference = () => {
      if (preference.matches) finish();
    };
    const handleVisibility = () => {
      if (document.hidden) finish();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (started) finish();
          return;
        }
        if (started) return;
        started = true;
        if (preference.matches || document.hidden) return;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 900, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCounts(totals.map((total) => Math.round(total * eased)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    preference.addEventListener("change", handlePreference);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", handlePreference);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="portfolio-facts shell" ref={container}>
      <a className="portfolio-fact" href="#work">
        <span className="sr-only">{totals[0]} projects. Explore the work.</span>
        <span className="fact-count" aria-hidden="true">
          {counts[0]}
        </span>
        <span className="fact-label" aria-hidden="true">
          Projects <Arrow diagonal />
        </span>
      </a>
      <Link className="portfolio-fact" href="/recognition">
        <span className="sr-only">
          {totals[1]} hackathon recognitions. See the recognition record.
        </span>
        <span className="fact-count" aria-hidden="true">
          {counts[1]}
        </span>
        <span className="fact-label" aria-hidden="true">
          Hackathon recognitions <Arrow diagonal />
        </span>
      </Link>
      <div className="fact-sculpture" aria-hidden="true">
        <div className="wire-cube">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}
