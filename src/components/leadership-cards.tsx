"use client";

import Image from "next/image";
import { type PointerEvent, useEffect, useRef } from "react";
import { business } from "@/data/business";
import { getMotionEnabledSnapshot } from "@/lib/motion";
import { useVisibleMotion } from "@/lib/use-visible-motion";
import { Arrow, Github, Trophy } from "./icons";
import { ResumeButton } from "./resume-preview";
import { SectionReveal } from "./section-reveal";
import styles from "./leadership-cards.module.css";

type LeadershipProfile = typeof business.founder | typeof business.marketingLead;
type ProfileLink = {
  label: "GitHub" | "LinkedIn";
  href: string;
};

export function LeadershipCards() {
  return (
    <SectionReveal className={styles.grid}>
      <LeadershipCard
        member={business.founder}
        links={[
          { label: "GitHub", href: business.links.github },
          { label: "LinkedIn", href: business.links.linkedin },
        ]}
        founder
      />
      <LeadershipCard
        member={business.marketingLead}
        links={[{ label: "GitHub", href: business.marketingLead.github }]}
      />
    </SectionReveal>
  );
}

function LeadershipCard({
  member,
  links,
  founder = false,
}: {
  member: LeadershipProfile;
  links: ProfileLink[];
  founder?: boolean;
}) {
  const { ref, running } = useVisibleMotion<HTMLElement>();
  const surface = useRef<HTMLDivElement>(null);

  function resetTilt() {
    surface.current?.style.setProperty("--tilt-x", "0deg");
    surface.current?.style.setProperty("--tilt-y", "0deg");
  }

  function tilt(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      !running ||
      !getMotionEnabledSnapshot() ||
      event.currentTarget.contains(document.activeElement)
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = Math.max(
      -1,
      Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2),
    );
    const y = Math.max(
      -1,
      Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2),
    );
    surface.current?.style.setProperty("--tilt-x", `${-y * 4}deg`);
    surface.current?.style.setProperty("--tilt-y", `${x * 4}deg`);
  }

  useEffect(() => {
    if (!running) resetTilt();
  }, [running]);

  return (
    <article
      className={styles.card}
      data-founder={founder || undefined}
      ref={ref}
      onPointerMove={tilt}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      onFocusCapture={resetTilt}
      onBlurCapture={resetTilt}
    >
      <div className={styles.surface} ref={surface}>
        <div className={styles.portrait}>
          <Image
            src={member.portrait.src}
            alt={`Portrait of ${member.name}`}
            width={member.portrait.width}
            height={member.portrait.height}
            sizes="(max-width: 760px) 100vw, (max-width: 1240px) 50vw, 580px"
          />
          {founder && <FounderCompanion running={running} />}
        </div>
        <div className={styles.info}>
          <p className={styles.role}>{member.role}</p>
          <h3>{member.name}</h3>
          <p className={styles.description}>{member.description}</p>
          <div className={styles.actions}>
            {links.map(({ label, href }) => (
              <a
                className={`button button-outline ${styles.action}`}
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on ${label} (opens in a new tab)`}
              >
                {label === "GitHub" && <Github />}
                {label} <Arrow diagonal />
              </a>
            ))}
            {founder && (
              <>
                <ResumeButton className={`button button-outline ${styles.action}`} />
                <a
                  className={`text-link ${styles.recognition}`}
                  href="/recognition#top"
                >
                  <Trophy /> Hackathon recognitions <Arrow />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function FounderCompanion({ running }: { running: boolean }) {
  return (
    <div
      className={styles.companion}
      data-running={running}
      aria-hidden="true"
    >
      <svg viewBox="0 0 144 144" fill="none">
        <ellipse
          cx="72"
          cy="133"
          rx="37"
          ry="6"
          fill="currentColor"
          opacity=".14"
        />
        <circle cx="72" cy="73" r="56" className={styles.orb} />
        <path
          d="M72 21V29"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="72" cy="16" r="7" className={styles.signal} />
        <rect
          x="35"
          y="31"
          width="74"
          height="61"
          rx="24"
          className={styles.face}
        />
        <path
          d="M52 54L46 61L52 68M92 54L98 61L92 68"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M62 75Q72 84 82 75"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect
          x="49"
          y="91"
          width="47"
          height="31"
          rx="12"
          fill="currentColor"
        />
        <path
          d="M64 101L59 106L64 111M81 101L86 106L81 111"
          className={styles.code}
        />
        <path
          d="M45 97L31 104L24 95M58 123V129M87 123V129"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g className={styles.hand}>
          <path
            d="M100 97L117 82L120 69"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M113 63V54Q113 51 116 51Q119 51 119 54V58V48Q119 45 122 45Q125 45 125 48V57V50Q125 47 128 47Q131 47 131 50V61Q131 72 121 73Q113 72 113 63Z"
            className={styles.face}
          />
        </g>
      </svg>
    </div>
  );
}
