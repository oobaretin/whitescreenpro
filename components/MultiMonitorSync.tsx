"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { subscribeWhiteScreenSync } from "@/lib/broadcastSync";

/**
 * Listens for BroadcastChannel messages and applies color / Kelvin / master brightness
 * when Multi-Monitor Sync is enabled. Local-only; no network.
 */
export function MultiMonitorSync() {
  useEffect(() => {
    return subscribeWhiteScreenSync(({ type, value }) => {
      if (!useAppStore.getState().multiMonitorSyncEnabled) return;
      if (type === "color") {
        useAppStore.getState().setColor(String(value), { fromSync: true });
      } else if (type === "kelvin") {
        useAppStore.getState().setMasterKelvin(Number(value), { fromSync: true });
      } else if (type === "brightness") {
        useAppStore.getState().setMasterBrightness(Number(value), { fromSync: true });
      }
    });
  }, []);

  return null;
}
