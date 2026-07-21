import { COLOR_PRESETS } from "../colorUtils";
import { getStoredSettings } from "../storageUtils";
import { defaultGradient } from "./defaults";
import type { AppState, Language } from "./types";

const VALID_LANGUAGES = new Set<string>([
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "zh",
  "ja",
  "ko",
  "ar",
  "ru",
  "hi",
  "tr",
]);

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function readInt(key: string, fallback: number, min: number, max: number): number {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  const n = parseInt(raw, 10);
  if (Number.isNaN(n)) return fallback;
  return clamp(n, min, max);
}

function readBool(key: string, fallback: boolean): boolean {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (raw === null) return fallback;
  return raw === "true";
}

/** Reads persisted client settings — safe to call only in the browser. */
export function readPersistedStorePatch(): Partial<AppState> | null {
  if (typeof window === "undefined") return null;

  const settings = getStoredSettings();
  const rawLanguage = localStorage.getItem("whitescreentools-language");
  const language = VALID_LANGUAGES.has(rawLanguage ?? "")
    ? (rawLanguage as Language)
    : "en";
  const theme =
    localStorage.getItem("whitescreentools-theme") === "dark" ? "dark" : "light";

  return {
    currentColor: settings.lastColor || COLOR_PRESETS[0].hex,
    brightness: settings.brightness ?? 100,
    colorTemperature: settings.colorTemperature ?? 0,
    gradient: settings.gradient || defaultGradient,
    panelAutoHide: settings.autoHidePanel ?? true,
    panelHideDelay: settings.panelHideDelay ?? 3000,
    masterKelvin: readInt("whitescreentools-master-kelvin", 6500, 2000, 10000),
    masterBrightness: readInt("whitescreentools-master-brightness", 100, 20, 100),
    multiMonitorSyncEnabled: readBool("whitescreentools-multi-sync", true),
    language,
    theme,
    pixelShifterEnabled: readBool("whitescreentools-pixel-shifter", false),
    ecoMode: readBool("whitescreentools-eco-mode", false),
    storeHydrated: true,
  };
}

export function applyPersistedDomState(theme: "light" | "dark", language: Language) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
}
