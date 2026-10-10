"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useVisibleMotion } from "@/lib/use-visible-motion";
import styles from "./background-video.module.css";

type BackgroundMedia = {
  poster: string;
  video: string;
  width: number;
  height: number;
};

export function BackgroundVideo({
  media,
  variant,
}: {
  media: BackgroundMedia;
  variant: "hero" | "work";
}) {
  const { ref: container, running: canRun } =
    useVisibleMotion<HTMLDivElement>(0);
  const video = useRef<HTMLVideoElement>(null);
  const mounted = useRef(false);
  const pending = useRef(false);
  const blocked = useRef(false);
  const generation = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playRejected, setPlayRejected] = useState(false);
  const [errored, setErrored] = useState(false);

  const pause = useCallback(() => {
    generation.current += 1;
    pending.current = false;
    video.current?.pause();
  }, []);

  const play = useCallback(() => {
    const element = video.current;
    if (!element || pending.current || blocked.current || element.error) return;
    const request = ++generation.current;
    pending.current = true;

    const reject = () => {
      if (!mounted.current || request !== generation.current) return;
      pending.current = false;
      blocked.current = true;
      element.pause();
      setPlaying(false);
      setPlayRejected(true);
    };

    try {
      Promise.resolve(element.play()).then(() => {
        if (mounted.current && request === generation.current)
          pending.current = false;
      }, reject);
    } catch {
      reject();
    }
  }, []);

  useEffect(() => {
    const element = video.current;
    mounted.current = true;
    return () => {
      mounted.current = false;
      generation.current += 1;
      pending.current = false;
      element?.pause();
    };
  }, []);

  useEffect(() => {
    if (canRun && !errored) play();
    else pause();
  }, [canRun, errored, pause, play]);

  function retry() {
    if (!canRun || errored || !video.current?.getAttribute("src")) return;
    blocked.current = false;
    play();
  }

  return (
    <div
      className={`${styles.background} ${styles[variant]}`}
      ref={container}
      data-background={variant}
    >
      {playRejected && canRun && !errored && (
        <button className={styles.control} type="button" onClick={retry}>
          Play {variant} background video
        </button>
      )}
      <div className={styles.media} aria-hidden="true">
        <Image
          className={styles.poster}
          src={media.poster}
          width={media.width}
          height={media.height}
          alt=""
          sizes="100vw"
          preload={variant === "hero"}
          unoptimized
        />
        <video
          className={styles.video}
          ref={video}
          src={loaded || canRun ? media.video : undefined}
          poster={media.poster}
          muted
          autoPlay
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
          data-playing={playing && canRun}
          onLoadStart={() => setLoaded(true)}
          onPlaying={() => {
            if (!canRun || errored) {
              pause();
              return;
            }
            blocked.current = false;
            setPlayRejected(false);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onError={() => {
            blocked.current = true;
            setErrored(true);
            setPlaying(false);
          }}
        />
      </div>
    </div>
  );
}
