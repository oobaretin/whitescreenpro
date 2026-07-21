"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { parseToolDeepLinks } from "@/lib/toolDeepLinks";

/** Applies tool-specific URL params once on mount (e.g. dead-pixel-test?cycle=1). */
export function useToolDeepLinks(toolSlug: string) {
  const setDeadPixel = useAppStore((s) => s.setDeadPixel);
  const setFlicker = useAppStore((s) => s.setFlicker);
  const appliedRef = useRef(false);

  useEffect(() => {
    if (appliedRef.current || typeof window === "undefined" || !toolSlug) return;

    const parsed = parseToolDeepLinks(toolSlug, window.location.search);
    if (!parsed) return;

    appliedRef.current = true;

    if (parsed.tool === "dead-pixel-test") {
      setDeadPixel(parsed.config);
    } else if (parsed.tool === "flicker") {
      setFlicker({
        enabled: parsed.config.enabled,
        ...(parsed.config.frequency !== undefined
          ? { frequency: parsed.config.frequency }
          : {}),
        ...(parsed.config.intensity !== undefined
          ? { intensity: parsed.config.intensity }
          : {}),
      });
    }
  }, [toolSlug, setDeadPixel, setFlicker]);
}
