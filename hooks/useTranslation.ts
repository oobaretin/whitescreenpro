"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { en, loadLocale, type Translations } from "@/lib/translations";

export function useTranslation(): Translations {
  const language = useAppStore((s) => s.language);
  const [t, setT] = useState<Translations>(en);

  useEffect(() => {
    if (language === "en") {
      setT(en);
      return;
    }
    let cancelled = false;
    void loadLocale(language).then((locale) => {
      if (!cancelled) setT(locale);
    });
    return () => {
      cancelled = true;
    };
  }, [language]);

  return t;
}

export type { Translations };
