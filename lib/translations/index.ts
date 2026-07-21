import type { Language, Translations } from "./types";
import { en } from "./locales/en";

export type { Language, Translations } from "./types";
export { en };

const localeLoaders: Record<Language, () => Promise<Translations>> = {
  en: async () => en,
  es: () => import("./locales/es").then((m) => m.es),
  fr: () => import("./locales/fr").then((m) => m.fr),
  de: () => import("./locales/de").then((m) => m.de),
  it: () => import("./locales/it").then((m) => m.it),
  pt: () => import("./locales/pt").then((m) => m.pt),
  zh: () => import("./locales/zh").then((m) => m.zh),
  ja: () => import("./locales/ja").then((m) => m.ja),
  ko: () => import("./locales/ko").then((m) => m.ko),
  ar: () => import("./locales/ar").then((m) => m.ar),
  ru: () => import("./locales/ru").then((m) => m.ru),
  hi: () => import("./locales/hi").then((m) => m.hi),
  tr: () => import("./locales/tr").then((m) => m.tr),
};

const localeCache = new Map<Language, Translations>([["en", en]]);

/** Lazy-load a locale bundle (English is synchronous). */
export async function loadLocale(language: Language): Promise<Translations> {
  if (language === "en") return en;
  const cached = localeCache.get(language);
  if (cached) return cached;
  const loaded = await localeLoaders[language]();
  localeCache.set(language, loaded);
  return loaded;
}

/** Preload a locale in the background (e.g. on language picker hover). */
export function preloadLocale(language: Language): void {
  if (language === "en" || localeCache.has(language)) return;
  void loadLocale(language);
}

/** @deprecated Use `en` or `loadLocale()` — only English ships in the main bundle. */
export const translations = { en } as const;
