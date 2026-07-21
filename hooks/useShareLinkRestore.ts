"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { parseShareLinkParams } from "@/lib/shareLink";

/**
 * Applies ?color=...&brightness=... from the URL once on mount.
 */
export function useShareLinkRestore() {
  const setColor = useAppStore((s) => s.setColor);
  const setBrightness = useAppStore((s) => s.setBrightness);
  const appliedRef = useRef(false);

  useEffect(() => {
    if (appliedRef.current || typeof window === "undefined") return;

    const parsed = parseShareLinkParams(window.location.search);
    if (!parsed) return;

    appliedRef.current = true;

    if (parsed.brightness !== undefined) {
      setBrightness(parsed.brightness);
    }
    if (parsed.color) {
      setColor(parsed.color);
    }
  }, [setColor, setBrightness]);
}

/** Returns true when the current URL carries share-link color params. */
export function hasShareLinkColor(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(parseShareLinkParams(window.location.search)?.color);
}
