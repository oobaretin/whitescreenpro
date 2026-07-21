import { colord } from "colord";
import type { ToolSlug } from "./seo";

export interface OgImageTheme {
  background: string;
  textColor: string;
  subtitleColor: string;
  accent: string;
  category: string;
  /** Solid fill for color-screen tools (left panel). */
  swatch?: string;
}

const CATEGORY_DEFAULTS: Record<string, Omit<OgImageTheme, "swatch">> = {
  color: {
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    textColor: "#111827",
    subtitleColor: "#4b5563",
    accent: "#2563eb",
    category: "Color screen",
  },
  tool: {
    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    textColor: "#111827",
    subtitleColor: "#374151",
    accent: "#2563eb",
    category: "Tool",
  },
  prank: {
    background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
    textColor: "#f9fafb",
    subtitleColor: "#d1d5db",
    accent: "#ef4444",
    category: "Prank",
  },
  ambient: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    textColor: "#f8fafc",
    subtitleColor: "#94a3b8",
    accent: "#22c55e",
    category: "Ambient",
  },
};

const COLOR_SCREEN_HEX: Partial<Record<ToolSlug, string>> = {
  "white-screen": "#FFFFFF",
  "black-screen": "#000000",
  "red-screen": "#FF0000",
  "green-screen": "#00FF00",
  "blue-screen": "#0000FF",
  "yellow-screen": "#FFFF00",
  "orange-screen": "#FFA500",
  "pink-screen": "#FFC0CB",
  "purple-screen": "#800080",
  "gray-screen": "#808080",
};

const TOOL_CATEGORY: Partial<Record<ToolSlug, keyof typeof CATEGORY_DEFAULTS>> = {
  "dead-pixel-test": "tool",
  "zoom-lighting": "tool",
  "tip-screen": "tool",
  "signature-screen": "tool",
  "screen-stress-test": "tool",
  "burn-in-fixer": "tool",
  "motion-blur-test": "tool",
  "reading-light": "tool",
  "reflection-checker": "tool",
  ruler: "tool",
  "broken-screen": "prank",
  bsod: "prank",
  "fake-update": "prank",
  "hacker-terminal": "prank",
  "dvd-screensaver": "ambient",
  "matrix-rain": "ambient",
  "flip-clock": "ambient",
  "no-signal": "ambient",
};

function contrastingText(hex: string): { text: string; subtitle: string } {
  const dark = colord(hex).isDark();
  return dark
    ? { text: "#f9fafb", subtitle: "#d1d5db" }
    : { text: "#111827", subtitle: "#374151" };
}

/** Visual theme for per-tool Open Graph images (1200×630). */
export function getOgImageTheme(slug: string): OgImageTheme {
  const colorHex = COLOR_SCREEN_HEX[slug as ToolSlug];
  if (colorHex) {
    const { text, subtitle } = contrastingText(colorHex);
    return {
      background: colorHex,
      textColor: text,
      subtitleColor: subtitle,
      accent: "#2563eb",
      category: "Color screen",
      swatch: colorHex,
    };
  }

  const cat = TOOL_CATEGORY[slug as ToolSlug] ?? "tool";
  const base = CATEGORY_DEFAULTS[cat];

  const overrides: Partial<Record<ToolSlug, Partial<OgImageTheme>>> = {
    "matrix-rain": { accent: "#22c55e", swatch: "#0a0f0a" },
    "hacker-terminal": { accent: "#22c55e", swatch: "#0a0f0a" },
    bsod: { accent: "#3b82f6", swatch: "#0078d4" },
    "reading-light": {
      background: "linear-gradient(135deg, #78350f 0%, #451a03 100%)",
      textColor: "#fef3c7",
      subtitleColor: "#fcd34d",
      accent: "#fbbf24",
      swatch: "#92400e",
    },
    "zoom-lighting": { swatch: "#ffffff" },
  };

  return { ...base, ...overrides[slug as ToolSlug] };
}

export function toolOgImagePath(slug: string): string {
  return `/${slug}/opengraph-image`;
}
