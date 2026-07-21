export type ToolBadge = "Popular" | "New";

export type ToolCategory = "utility" | "color" | "tool" | "prank" | "ambient";

export type ToolGridEntry =
  | {
      type: "route";
      name: string;
      slug: string;
      desc: string;
      badge?: ToolBadge;
      category: ToolCategory;
    }
  | {
      type: "open-health" | "open-settings";
      name: string;
      desc: string;
      badge?: ToolBadge;
      category: "utility";
    };

export const TOOL_CATEGORIES: { id: ToolCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "utility", label: "Quick actions" },
  { id: "color", label: "Color screens" },
  { id: "tool", label: "Tools" },
  { id: "prank", label: "Pranks" },
  { id: "ambient", label: "Ambient" },
];

export const PRIORITY_TOOL_ENTRIES: ToolGridEntry[] = [
  {
    type: "open-health",
    name: "Monitor Health Check",
    desc: "Wizard: dead pixels, bleed, gray, motion blur",
    badge: "New",
    category: "utility",
  },
  {
    type: "open-settings",
    name: "Master warmth & sync",
    desc: "Kelvin, brightness, match tabs — opens ⚙️",
    badge: "New",
    category: "utility",
  },
  {
    type: "route",
    name: "Zen Mode",
    slug: "motion-blur-test",
    desc: "On any tool: idle 3s → cursor & UI fade",
    category: "utility",
  },
  {
    type: "route",
    name: "Context tips (?)",
    slug: "dead-pixel-test",
    desc: "Bottom-left ? — hints change per tool",
    category: "utility",
  },
];

const ROUTE_TOOL_ROWS: Array<{
  name: string;
  slug: string;
  desc: string;
  badge?: ToolBadge;
  category: ToolCategory;
}> = [
  { name: "Black Screen", slug: "black-screen", desc: "Most popular", badge: "Popular", category: "color" },
  { name: "Red Screen", slug: "red-screen", desc: "Lighting effect", category: "color" },
  { name: "Blue Screen", slug: "blue-screen", desc: "Chroma key", category: "color" },
  { name: "Green Screen", slug: "green-screen", desc: "Video production", category: "color" },
  { name: "Pink Screen", slug: "pink-screen", desc: "Aesthetic", category: "color" },
  { name: "Purple Screen", slug: "purple-screen", desc: "Creative", category: "color" },
  { name: "Orange Screen", slug: "orange-screen", desc: "Warm lighting", category: "color" },
  { name: "Yellow Screen", slug: "yellow-screen", desc: "Bright", category: "color" },
  { name: "White Screen", slug: "white-screen", desc: "Clean display", badge: "Popular", category: "color" },
  { name: "Gray Screen", slug: "gray-screen", desc: "Uniformity / 50% gray", category: "color" },
  { name: "Zoom Lighting", slug: "zoom-lighting", desc: "Video call", badge: "New", category: "tool" },
  { name: "Tip Screen", slug: "tip-screen", desc: "POS tipping", category: "tool" },
  { name: "Signature Screen", slug: "signature-screen", desc: "Digital signature", category: "tool" },
  { name: "Dead Pixel Test", slug: "dead-pixel-test", desc: "Display checker", category: "tool" },
  { name: "Screen Stress Test", slug: "screen-stress-test", desc: "Color cycle", category: "tool" },
  { name: "Burn-In Fixer", slug: "burn-in-fixer", desc: "OLED pixel refresher", category: "tool" },
  { name: "Motion Blur Test", slug: "motion-blur-test", desc: "Ghosting & response", badge: "New", category: "tool" },
  { name: "Reading Light", slug: "reading-light", desc: "Soft amber, sleep-friendly", category: "tool" },
  { name: "Reflection Checker", slug: "reflection-checker", desc: "Reflections & distortion", category: "tool" },
  { name: "Screen Ruler", slug: "ruler", desc: "px / in / cm + 16:9 grid", category: "tool" },
  { name: "Broken Screen", slug: "broken-screen", desc: "Prank tool", category: "prank" },
  { name: "BSOD", slug: "bsod", desc: "Blue screen of death", category: "prank" },
  { name: "Fake Update", slug: "fake-update", desc: "Prank screens", category: "prank" },
  { name: "Hacker Terminal", slug: "hacker-terminal", desc: "Matrix-style", category: "prank" },
  { name: "DVD Screensaver", slug: "dvd-screensaver", desc: "Nostalgic", category: "ambient" },
  { name: "Matrix Rain", slug: "matrix-rain", desc: "Falling code", category: "ambient" },
  { name: "Flip Clock", slug: "flip-clock", desc: "Digital clock", category: "ambient" },
  { name: "No Signal", slug: "no-signal", desc: "TV static", category: "ambient" },
];

export const ROUTE_TOOL_ENTRIES: Extract<ToolGridEntry, { type: "route" }>[] =
  ROUTE_TOOL_ROWS.map((row) => ({ type: "route" as const, ...row }));

export const ALL_TOOL_ENTRIES: ToolGridEntry[] = [
  ...PRIORITY_TOOL_ENTRIES,
  ...ROUTE_TOOL_ENTRIES,
];

export function filterToolEntries(
  entries: ToolGridEntry[],
  query: string,
  category: ToolCategory | "all",
): ToolGridEntry[] {
  const q = query.trim().toLowerCase();
  return entries.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    if (!q) return true;
    const haystack = [
      item.name,
      item.desc,
      item.type === "route" ? item.slug.replace(/-/g, " ") : "",
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
