"use client";

import Image from "next/image";
import {
  useCallback,
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
import styles from "./work-sculpture.module.css";

export function WorkSculpture() {
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
  const mounted = useRef(false);
  const pending = useRef(false);
  const blocked = useRef(false);
  const generation = useRef(0);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [errored, setErrored] = useState(false);
  const canRun = !reducedMotion && visible && inView && !userPaused;

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
    const element = container.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (canRun && !errored) play();
    else pause();
  }, [canRun, errored, pause, play]);

  function toggle() {
    if (playing) {
      setUserPaused(true);
      pause();
      return;
    }

    setUserPaused(false);
    blocked.current = false;
    if (
      !reducedMotion &&
      visible &&
      inView &&
      !errored &&
      video.current?.getAttribute("src")
    )
      play();
  }

  return (
    <div className={styles.sculpture} ref={container}>
      <div className={styles.media} aria-hidden="true">
        <Image
          className={styles.poster}
          src={business.workMotion.poster}
          width={business.workMotion.width}
          height={business.workMotion.height}
          alt=""
          sizes="(max-width: 700px) 100vw, 440px"
          unoptimized
        />
        <video
          className={styles.video}
          ref={video}
          src={loaded || canRun ? business.workMotion.video : undefined}
          poster={business.workMotion.poster}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
          data-playing={playing && !reducedMotion}
          onLoadStart={() => setLoaded(true)}
          onPlaying={() => {
            if (!canRun || errored) {
              pause();
              return;
            }
            blocked.current = false;
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
      {!reducedMotion && !errored && (
        <button className={styles.control} type="button" onClick={toggle}>
          {playing ? "Pause sculpture" : "Play sculpture"}
        </button>
      )}
    </div>
  );
}
