export type ContextHelpBlock = { title: string; text: string };

export const CONTEXT_HELP_DEFAULT: ContextHelpBlock = {
  title: "Need help?",
  text: "Pick a tool from the grid to test your display, set lighting, or try effects. Open Master Controls (⚙️) for brightness, Kelvin warmth, and multi-monitor sync.",
};

/** First path segment, e.g. /dead-pixel-test → dead-pixel-test */
const BY_SLUG: Record<string, ContextHelpBlock> = {
  "white-screen": {
    title: "Pro lighting tip",
    text: "Use a warm Kelvin (around 2700K) to look natural in a dim room, or cooler (6500K) to match daylight. Adjust in Master Controls.",
  },
  "gray-screen": {
    title: "Uniformity check",
    text: "Look for uneven patches, vignetting, or a dirty screen effect. The panel should appear as one smooth grey.",
  },
  "black-screen": {
    title: "Backlight bleed",
    text: "In a dark room, check edges and corners for unwanted glow. Some IPS glow is normal; very bright leaks may warrant a warranty check.",
  },
  "dead-pixel-test": {
    title: "The lens trick",
    text: "Use a magnifying glass or your phone's zoom to see if a speck is dust or a dead/stuck pixel. Cycle colors; bad pixels won't match the fill.",
  },
  "motion-blur-test": {
    title: "Sync check",
    text: "If the UFO blocks show a tail, motion blur or slow response may be the cause. Try Overdrive (or similar) in your monitor’s on-screen menu.",
  },
  "burn-in-fixer": {
    title: "Safety first",
    text: "Run 10–30 minutes for mild OLED retention. This won’t fix cracked glass—only helps with ghosted static images on OLED-type panels.",
  },
  "reflection-checker": {
    title: "Reflections & smudges",
    text: "Deep Black reveals glare; grid and checkerboard highlight smudges and warping. Try lights on vs off to separate scratches from reflections.",
  },
  "reading-light": {
    title: "Reading light",
    text: "Tap to cycle warmth. The slow breathing glow is meant for low eye strain. Press Esc or use Exit to leave.",
  },
  "zoom-lighting": {
    title: "Video calls",
    text: "Face the screen and match warmth to your room. Warmer light often flatters skin; cooler reads more like daylight.",
  },
  "screen-stress-test": {
    title: "Flashing colors",
    text: "Stop if you feel discomfort. This tool is for quick panel stress checks—not for long viewing. Photosensitive users should avoid it.",
  },
  "ruler": {
    title: "Screen ruler",
    text: "Use px, inches, or cm. The grid helps check aspect ratio and alignment. Calibrate mentally against a known object if you need absolute accuracy.",
  },
  "green-screen": {
    title: "Chroma green",
    text: "Classic for keying in video apps. Light the screen evenly so your software can pull a clean key.",
  },
  "blue-screen": {
    title: "Blue screen",
    text: "Often used as a chroma or fill. Pair with even lighting if you’re using it for production work.",
  },
  "red-screen": {
    title: "Red screen",
    text: "Useful for stuck-pixel checks (red subpixel) and as a bold lighting wash.",
  },
  "tip-screen": {
    title: "Tip screen",
    text: "Designed for tablets or POS-style tipping. Customize amounts and thank-you messaging for your venue.",
  },
  "signature-screen": {
    title: "Signature",
    text: "Sign with touch or mouse, then save. Good for quick agreements or kiosk capture.",
  },
};

const BY_MODE: Partial<Record<string, ContextHelpBlock>> = {
  "dead-pixel": BY_SLUG["dead-pixel-test"],
  "motion-blur-test": BY_SLUG["motion-blur-test"],
  "burn-in-fixer": BY_SLUG["burn-in-fixer"],
  "reading-light": BY_SLUG["reading-light"],
  "zoom-lighting": BY_SLUG["zoom-lighting"],
  "color-cycle": BY_SLUG["screen-stress-test"],
};

export function resolveContextHelp(
  pathname: string,
  activeMode: string,
): ContextHelpBlock {
  const slug = pathname.replace(/^\//, "").split("/").filter(Boolean)[0] ?? "";
  if (slug && BY_SLUG[slug]) return BY_SLUG[slug];
  const fromMode = BY_MODE[activeMode];
  if (fromMode) return fromMode;
  return CONTEXT_HELP_DEFAULT;
}
