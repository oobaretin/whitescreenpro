"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { parseShareLinkParams } from "@/lib/shareLink";

/**
 * Applies ?color=...&brightness=...&kelvin=...&temp=... from the URL once on mount.
 */
export function useShareLinkRestore() {
  const setColor = useAppStore((s) => s.setColor);
  const setBrightness = useAppStore((s) => s.setBrightness);
  const setMasterKelvin = useAppStore((s) => s.setMasterKelvin);
  const setColorTemperature = useAppStore((s) => s.setColorTemperature);
  const appliedRef = useRef(false);

  useEffect(() => {
    if (appliedRef.current || typeof window === "undefined") return;

    const parsed = parseShareLinkParams(window.location.search);
    if (!parsed) return;

    appliedRef.current = true;

    if (parsed.brightness !== undefined) {
      setBrightness(parsed.brightness);
    }
    if (parsed.colorTemperature !== undefined) {
      setColorTemperature(parsed.colorTemperature);
    }
    if (parsed.kelvin !== undefined) {
      setMasterKelvin(parsed.kelvin);
    } else if (parsed.color) {
      setColor(parsed.color);
    }
  }, [setColor, setBrightness, setMasterKelvin, setColorTemperature]);
}

/** Returns true when the current URL carries share-link color params. */
export function hasShareLinkColor(): boolean {
  if (typeof window === "undefined") return false;
  const parsed = parseShareLinkParams(window.location.search);
  return Boolean(parsed?.color || parsed?.kelvin);
}
