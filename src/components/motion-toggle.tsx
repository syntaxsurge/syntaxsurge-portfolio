"use client";

import { useSyncExternalStore } from "react";
import {
  getMotionEnabledSnapshot,
  setMotionEnabled,
  subscribeMotion,
} from "@/lib/motion";
import { PlayIcon } from "./icons";

export function MotionToggle() {
  const enabled = useSyncExternalStore(
    subscribeMotion,
    getMotionEnabledSnapshot,
    () => null,
  );
  return (
    <button
      className="motion-toggle"
      type="button"
      onClick={() => setMotionEnabled(!getMotionEnabledSnapshot())}
    >
      {enabled === false ? (
        <PlayIcon />
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M8 5v14m8-14v14" />
        </svg>
      )}
      {enabled === false ? "Play animations" : "Pause animations"}
    </button>
  );
}
