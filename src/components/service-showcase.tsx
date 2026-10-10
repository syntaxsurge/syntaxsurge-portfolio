"use client";

import Image from "next/image";
import { type KeyboardEvent, useId, useRef, useState } from "react";
import { business } from "@/data/business";
import { useVisibleMotion } from "@/lib/use-visible-motion";
import { Arrow } from "./icons";
import styles from "./service-showcase.module.css";

export function ServiceShowcase() {
  const { ref: container, running } = useVisibleMotion<HTMLDivElement>();
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const service = business.services[selected];

  function chooseWithKeyboard(event: KeyboardEvent<HTMLButtonElement>) {
    let next: number;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = (selected + 1) % business.services.length;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next =
          (selected - 1 + business.services.length) % business.services.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = business.services.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className={styles.showcase} ref={container} data-running={running}>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="What can we build for you?"
        aria-orientation="vertical"
      >
        {business.services.map((option, index) => (
          <button
            className={styles.tab}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={index === selected}
            tabIndex={index === selected ? 0 : -1}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            onClick={() => setSelected(index)}
            onKeyDown={chooseWithKeyboard}
            key={option.title}
          >
            {option.title}
            <span className={styles.tabArrow} aria-hidden="true">
              <Arrow />
            </span>
          </button>
        ))}
      </div>

      {business.services.map((option, index) => (
        <div
          className={styles.panel}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          tabIndex={0}
          hidden={index !== selected}
          key={option.title}
        >
          {index === selected && (
            <>
              <div className={styles.stage} aria-hidden="true" key={selected}>
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
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <a
                  className={`button button-dark ${styles.action}`}
                  href={`${business.links.email}?subject=${encodeURIComponent(`Let's talk about ${service.title.toLowerCase()}`)}`}
                >
                  Let’s build it <Arrow diagonal />
                </a>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
