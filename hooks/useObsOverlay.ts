"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { parseObsOverlay } from "@/lib/obsOverlay";

/** Reads ?obs=1 from the URL and toggles overlay mode (hides UI chrome). */
export function useObsOverlay() {
  const setObsOverlayMode = useAppStore((s) => s.setObsOverlayMode);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const enabled = parseObsOverlay(window.location.search);
    setObsOverlayMode(enabled);

    if (enabled) {
      document.documentElement.classList.add("obs-overlay");
    } else {
      document.documentElement.classList.remove("obs-overlay");
    }

    return () => {
      setObsOverlayMode(false);
      document.documentElement.classList.remove("obs-overlay");
    };
  }, [setObsOverlayMode]);
}

/** Mount once in root layout to sync OBS overlay state globally. */
export function ObsOverlaySync() {
  useObsOverlay();
  return null;
}
