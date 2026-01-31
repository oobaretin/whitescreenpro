"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

/**
 * Syncs store theme to document for CSS variables.
 * Runs on mount and whenever theme changes.
 */
export function ThemeSync() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return null;
}
