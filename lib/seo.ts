import type { Metadata } from "next";

/** SEO titles (≤60 chars) and meta descriptions (≤155 chars) for key pages. */
export const SEO = {
  home: {
    title: "White Screen & Monitor Test Tools | Full Screen Colors & Lighting",
    description:
      "Free full-screen color tools for monitor testing, dead pixel detection, and video call lighting. High-quality white, black, and chroma key screens for pros.",
  },
  "dead-pixel-test": {
    title: "Dead Pixel Test | Monitor Checker & Stuck Pixel Detector",
    description:
      "Test your monitor for dead, stuck, or defective pixels. Cycle through full-screen colors to identify display issues. Free, instant, and professional-grade.",
  },
  "zoom-lighting": {
    title: "Free Zoom Lighting Tool | White Screen for Video Calls",
    description:
      "Turn your monitor into a professional ring light. Use our white screen lighting tool to improve your appearance on Zoom, Teams, and Google Meet calls.",
  },
  "matrix-rain": {
    title: "Matrix Rain | 4K Aesthetic Screen Backgrounds",
    description:
      "Immersive falling code and Matrix rain animations for your display. Perfect for coding vibes, stream backgrounds, and digital art displays.",
  },
  "hacker-terminal": {
    title: "Hacker Terminal | 4K Aesthetic Screen Backgrounds",
    description:
      "Immersive falling code and Matrix rain animations for your display. Perfect for coding vibes, stream backgrounds, and digital art displays.",
  },
} as const;

export type ToolSlug = keyof Omit<typeof SEO, "home">;

export function getToolMeta(slug: string): { title: string; description: string } | null {
  if (slug === "home") return null;
  const entry = SEO[slug as ToolSlug];
  return entry ?? null;
}

export function getToolMetadata(slug: string): Metadata | null {
  const meta = getToolMeta(slug);
  if (!meta) return null;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: { title: meta.title, description: meta.description, type: "website" },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}
