"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

const RTL_LANGUAGES = new Set(["ar"]);

/**
 * Syncs document lang and dir with the active locale for a11y and SEO.
 */
export function LangSync() {
  const language = useAppStore((state) => state.language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = RTL_LANGUAGES.has(language) ? "rtl" : "ltr";
  }, [language]);

  return null;
}
