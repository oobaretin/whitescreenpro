"use client";

import { useLayoutEffect } from "react";
import { useAppStore } from "@/lib/store";

/** Hydrates Zustand from localStorage before paint to avoid SSR/client mismatches. */
export function StoreHydration() {
  const hydrateFromStorage = useAppStore((s) => s.hydrateFromStorage);

  useLayoutEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  return null;
}
