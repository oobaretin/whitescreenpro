import type { Metadata } from "next";
import { OG_IMAGE, SITE_URL } from "./site";
import { toolOgImagePath } from "./ogImageTheme";

const ogImages = [
  {
    url: OG_IMAGE.url,
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
    alt: OG_IMAGE.alt,
  },
];
export const SEO = {
  home: {
    title: "White Screen & Monitor Test Tools | Full Screen Colors & Lighting",
    description:
      "Free full-screen color tools for monitor testing, dead pixel detection, and video call lighting. High-quality white, black, and chroma key screens for pros.",
  },
  "black-screen": {
    title: "Black Screen | Full Screen Black Display",
    description:
      "Pure black full-screen display for OLED testing, monitor bleed checks, and focus. Free, instant, no download required.",
  },
  "white-screen": {
    title: "White Screen | Full Screen White Display",
    description:
      "Clean full-screen white display for photography lighting, monitor calibration, and dead pixel detection. Free and professional-grade.",
  },
  "red-screen": {
    title: "Red Screen | Full Screen Red Lighting",
    description:
      "Full-screen red display for creative lighting, photography, and video production. One click to fullscreen.",
  },
  "blue-screen": {
    title: "Blue Screen | Chroma Key & Full Screen Blue",
    description:
      "Full-screen blue display for chroma key compositing, video production, and monitor testing. Free browser tool.",
  },
  "green-screen": {
    title: "Green Screen | Chroma Key Full Screen Green",
    description:
      "Professional green screen for video editing, streaming, and compositing. Full-screen chroma key in your browser.",
  },
  "yellow-screen": {
    title: "Yellow Screen | Full Screen Yellow Display",
    description:
      "Bright yellow full-screen display for creative projects, lighting tests, and monitor calibration.",
  },
  "orange-screen": {
    title: "Orange Screen | Warm Full Screen Lighting",
    description:
      "Warm orange full-screen display for ambient lighting, photography, and creative video backgrounds.",
  },
  "pink-screen": {
    title: "Pink Screen | Aesthetic Full Screen Display",
    description:
      "Soft pink full-screen display for aesthetic backgrounds, streaming overlays, and creative projects.",
  },
  "purple-screen": {
    title: "Purple Screen | Full Screen Purple Display",
    description:
      "Rich purple full-screen display for creative lighting, streaming backgrounds, and monitor tests.",
  },
  "gray-screen": {
    title: "Gray Screen | 50% Gray Monitor Uniformity Test",
    description:
      "Full-screen neutral gray (#808080) for checking panel uniformity, vignetting, and dirty screen effect. Ideal for display calibration and health checks.",
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
    title: "Hacker Terminal | Fake Terminal Screen Prank",
    description:
      "Realistic scrolling hacker terminal with green-on-black text. Perfect for pranks, stream overlays, and cyberpunk aesthetics.",
  },
  "dvd-screensaver": {
    title: "DVD Screensaver | Bouncing Logo Animation",
    description:
      "Classic bouncing DVD logo screensaver in your browser. Customize speed, size, and track corner hits. Nostalgic and fullscreen-ready.",
  },
  "flip-clock": {
    title: "Flip Clock | Retro Digital Clock Display",
    description:
      "Stylish flip-clock screensaver for your monitor or stream. Full-screen retro digital clock with smooth animations.",
  },
  "no-signal": {
    title: "No Signal | TV Static & Color Bars Screen",
    description:
      "Classic TV no-signal static and SMPTE color bars. Perfect for retro aesthetics, pranks, and stream backgrounds.",
  },
  "broken-screen": {
    title: "Broken Screen Prank | Cracked Screen Simulator",
    description:
      "Realistic cracked screen overlay prank. Timed activation, shake effects, and multiple crack patterns. For entertainment only.",
  },
  "bsod": {
    title: "BSOD Prank | Fake Blue Screen of Death",
    description:
      "Realistic fake Blue Screen of Death for Windows XP, 7, 10, and 11. Customizable error codes and messages.",
  },
  "fake-update": {
    title: "Fake Update Prank | Windows, Mac & Linux",
    description:
      "Convincing fake system update screens for Windows, macOS, Ubuntu, ChromeOS, and BIOS. For pranks and entertainment only.",
  },
  "tip-screen": {
    title: "Tip Screen | Digital Tipping Display for POS",
    description:
      "Customizable digital tip screen for restaurants, cafes, and service businesses. Set amounts and show thank-you messages.",
  },
  "signature-screen": {
    title: "Signature Screen | Digital Signature Pad",
    description:
      "Browser-based digital signature pad with adjustable pen thickness and colors. Capture signatures on any touchscreen or mouse.",
  },
  "screen-stress-test": {
    title: "Screen Stress Test | Rapid Color Cycle Monitor Test",
    description:
      "Rapid full-screen color cycling to stress-test panels and detect image retention. Includes photosensitivity warning.",
  },
  "burn-in-fixer": {
    title: "Burn-In Fixer | OLED Pixel Refresher Tool",
    description:
      "Full-screen pixel shifting and color cycling to help reduce OLED burn-in and image retention. Use periodically on OLED displays.",
  },
  "motion-blur-test": {
    title: "Motion Blur & Ghosting Test | Monitor Response Time Checker",
    description:
      "UFO-style motion test for ghosting and blur. Two-speed tracks to compare display clarity. Used by gamers and hardware reviewers for 60Hz–240Hz monitors.",
  },
  "reading-light": {
    title: "Reading Light | Soft Amber Screen for Night & Reading",
    description:
      "Minimal full-screen amber light with a gentle breathing glow. Sleep-friendly, no blue light. Use as a virtual lamp for reading or a cozy desk backdrop.",
  },
  "reflection-checker": {
    title: "Reflection Checker | Screen Glare & Distortion Test",
    description:
      "Deep black, checkerboard, and edge-to-edge grid modes. Find reflections, micro-scratches, and screen warping. Optimize your workspace and check screen cleaning.",
  },
  ruler: {
    title: "Screen Ruler | Pixel, Inch & CM Measurement Tool",
    description:
      "On-screen ruler with px, inch, and cm units plus a 16:9 grid overlay. Measure UI elements and check display scaling.",
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
  const toolOg = toolOgImagePath(slug);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `${SITE_URL}/${slug}`,
      images: [
        {
          url: toolOg,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [toolOg],
    },
  };
}

export function getDefaultMetadata(): Pick<
  Metadata,
  "metadataBase" | "openGraph" | "twitter"
> {
  return {
    metadataBase: new URL(SITE_URL),
    openGraph: {
      siteName: "WhiteScreen Tools",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      images: [OG_IMAGE.url],
    },
  };
}
