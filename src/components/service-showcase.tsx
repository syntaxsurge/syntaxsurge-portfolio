"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { business } from "@/data/business";
import { useVisibleMotion } from "@/lib/use-visible-motion";
import { Arrow } from "./icons";
import styles from "./service-showcase.module.css";

export function ServiceShowcase() {
  const container = useRef<HTMLDivElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const element = container.current;
    const nav = navigation.current;
    if (!element || !nav) return;
    const panels = Array.from(element.querySelectorAll<HTMLElement>("article"));
    let frame = 0;

    function update() {
      frame = 0;
      const bounds = panels.map((panel) => panel.getBoundingClientRect());
      const navBounds = nav!.getBoundingClientRect();
      // On phones the sticky service links sit above, rather than beside, the cards.
      const overlaps =
        getComputedStyle(nav!).position === "sticky" &&
        navBounds.right > bounds[0].left;
      const readingLine = Math.min(
        window.innerHeight - 24,
        Math.max(
          window.innerHeight * 0.45,
          overlaps ? navBounds.bottom + 24 : 0,
        ),
      );
      let current = 0;
      for (const [index, boundsOfPanel] of bounds.entries()) {
        if (boundsOfPanel.top > readingLine) break;
        current = index;
      }
      setSelected(current);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const observer =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(scheduleUpdate);
    observer?.observe(element);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className={styles.showcase} ref={container}>
      <nav className={styles.navigation} ref={navigation} aria-label="Services">
        {business.services.map((service, index) => (
          <a
            className={styles.serviceLink}
            href={`#service-${service.id}`}
            aria-current={index === selected ? "location" : undefined}
            key={service.id}
          >
            <span className={styles.marker} aria-hidden="true" />
            <span>{service.title}</span>
            <span className={styles.linkArrow} aria-hidden="true">
              <Arrow />
            </span>
          </a>
        ))}
      </nav>
      <div className={styles.cards}>
        {business.services.map((service, index) => (
          <ServiceCard
            service={service}
            active={index === selected}
            key={service.id}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  active,
}: {
  service: (typeof business.services)[number];
  active: boolean;
}) {
  const { ref, running } = useVisibleMotion<HTMLElement>();

  return (
    <article
      className={styles.panel}
      id={`service-${service.id}`}
      aria-labelledby={`service-${service.id}-title`}
      tabIndex={-1}
      ref={ref}
      data-active={active}
      data-running={running}
    >
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.floor} />
        <div className={styles.orbit} />
        <div className={styles.orbitSecondary} />
        <span className={styles.node} />
        <span className={styles.nodeSecondary} />
        <div className={styles.diagram}>
          <span className={styles.backplate} />
          <Image
            src={service.image}
            width={400}
            height={250}
            alt=""
            sizes="(max-width: 700px) 80vw, 520px"
            unoptimized
          />
        </div>
      </div>
      <div className={styles.copy}>
        <div>
          <h3 id={`service-${service.id}-title`}>{service.title}</h3>
          <p>{service.description}</p>
        </div>
        <a
          className={`button button-dark ${styles.action}`}
          href={`${business.links.email}?subject=${encodeURIComponent(`Let's talk about ${service.title.toLowerCase()}`)}`}
          aria-label={`Let’s build ${service.title.toLowerCase()}`}
        >
          Let’s build it <Arrow diagonal />
        </a>
      </div>
    </article>
  );
}
