import { describe, expect, it, vi } from "vitest";
import {
  getColorString,
  getGradientCSS,
  isValidColor,
  kelvinToHex,
} from "@/lib/colorUtils";
import {
  buildShareLinkParams,
  parseShareLinkParams,
} from "@/lib/shareLink";

describe("colorUtils", () => {
  it("getColorString returns hex unchanged at 100% brightness", () => {
    expect(getColorString("#FF0000", 100)).toBe("#ff0000");
  });

  it("getColorString darkens at lower brightness", () => {
    expect(getColorString("#FFFFFF", 50)).toBe("#808080");
  });

  it("getGradientCSS returns linear gradient CSS", () => {
    const css = getGradientCSS({
      enabled: true,
      type: "linear",
      startColor: "#FFFFFF",
      endColor: "#000000",
      angle: 90,
    });
    expect(css).toContain("linear-gradient(90deg");
    expect(css).toContain("#ffffff");
    expect(css).toContain("#000000");
  });

  it("kelvinToHex returns valid hex in range", () => {
    const warm = kelvinToHex(3000);
    const cool = kelvinToHex(9000);
    expect(isValidColor(warm)).toBe(true);
    expect(isValidColor(cool)).toBe(true);
    expect(warm).not.toBe(cool);
  });
});

describe("shareLink", () => {
  it("parseShareLinkParams decodes color and brightness", () => {
    const parsed = parseShareLinkParams("color=FF0000&brightness=75");
    expect(parsed).toEqual({ color: "#FF0000", brightness: 75 });
  });

  it("parseShareLinkParams rejects invalid color", () => {
    const parsed = parseShareLinkParams("color=not-a-color&brightness=50");
    expect(parsed).toEqual({ brightness: 50 });
  });

  it("parseShareLinkParams returns null when empty", () => {
    expect(parseShareLinkParams("")).toBeNull();
  });

  it("buildShareLinkParams round-trips with parse", () => {
    const params = buildShareLinkParams({
      color: "#00FF00",
      brightness: 42,
      kelvin: 5500,
      colorTemperature: 20,
    });
    const parsed = parseShareLinkParams(params);
    expect(parsed).toEqual({
      color: "#00FF00",
      brightness: 42,
      kelvin: 5500,
      colorTemperature: 20,
    });
  });
});

describe("recentTools", () => {
  it("recordRecentTool dedupes and caps list", async () => {
    const { recordRecentTool, getRecentTools } = await import("@/lib/recentTools");
    const store: Record<string, string> = {};
    vi.stubGlobal("localStorage", {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => {
        store[k] = v;
      },
    });
    recordRecentTool("white-screen");
    recordRecentTool("black-screen");
    recordRecentTool("white-screen");
    expect(getRecentTools()[0]).toBe("white-screen");
    expect(getRecentTools()[1]).toBe("black-screen");
    vi.unstubAllGlobals();
  });
});

describe("toolsCatalog", () => {
  it("filterToolEntries matches by name", async () => {
    const { filterToolEntries, ALL_TOOL_ENTRIES } = await import(
      "@/lib/toolsCatalog"
    );
    const results = filterToolEntries(ALL_TOOL_ENTRIES, "matrix", "all");
    expect(results.some((r) => r.name === "Matrix Rain")).toBe(true);
  });

  it("filterToolEntries respects category", async () => {
    const { filterToolEntries, ALL_TOOL_ENTRIES } = await import(
      "@/lib/toolsCatalog"
    );
    const results = filterToolEntries(ALL_TOOL_ENTRIES, "", "prank");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.category === "prank")).toBe(true);
  });
});

describe("jsonLd", () => {
  it("builds FAQ and WebApplication schemas", async () => {
    const { getHomeJsonLd } = await import("@/lib/jsonLd");
    const schemas = getHomeJsonLd();
    expect(schemas).toHaveLength(2);
    expect(schemas[0]["@type"]).toBe("WebApplication");
    expect(schemas[1]["@type"]).toBe("FAQPage");
  });
});
describe("toolDeepLinks", () => {
  it("parses dead pixel auto cycle params", async () => {
    const { parseToolDeepLinks } = await import("@/lib/toolDeepLinks");
    const parsed = parseToolDeepLinks(
      "dead-pixel-test",
      "cycle=1&interval=5&grid=1",
    );
    expect(parsed?.tool).toBe("dead-pixel-test");
    if (parsed?.tool === "dead-pixel-test") {
      expect(parsed.config.autoCycle).toBe(true);
      expect(parsed.config.cycleInterval).toBe(5);
      expect(parsed.config.showGrid).toBe(true);
    }
  });

  it("parses flicker params on color pages", async () => {
    const { parseToolDeepLinks } = await import("@/lib/toolDeepLinks");
    const parsed = parseToolDeepLinks("white-screen", "flicker=1&hz=2&intensity=80");
    expect(parsed?.tool).toBe("flicker");
    if (parsed?.tool === "flicker") {
      expect(parsed.config.enabled).toBe(true);
      expect(parsed.config.frequency).toBe(2);
      expect(parsed.config.intensity).toBe(80);
    }
  });
});

describe("keyboardShortcuts", () => {
  it("lists core shortcuts", async () => {
    const { KEYBOARD_SHORTCUTS } = await import("@/lib/keyboardShortcuts");
    expect(KEYBOARD_SHORTCUTS.length).toBeGreaterThanOrEqual(8);
    expect(KEYBOARD_SHORTCUTS.some((s) => s.keys.includes("?"))).toBe(true);
  });
});

describe("obsOverlay", () => {
  it("parses obs overlay URL param", async () => {
    const { parseObsOverlay, appendObsParam } = await import("@/lib/obsOverlay");
    expect(parseObsOverlay("obs=1")).toBe(true);
    expect(parseObsOverlay("overlay=true")).toBe(true);
    expect(parseObsOverlay("color=FF0000")).toBe(false);
    expect(appendObsParam("https://example.com/green-screen?color=00FF00")).toContain(
      "obs=1",
    );
  });
});

describe("ogImageTheme", () => {
  it("uses solid color background for color screens", async () => {
    const { getOgImageTheme, toolOgImagePath } = await import("@/lib/ogImageTheme");
    const theme = getOgImageTheme("green-screen");
    expect(theme.swatch).toBe("#00FF00");
    expect(theme.background).toBe("#00FF00");
    expect(toolOgImagePath("white-screen")).toBe("/white-screen/opengraph-image");
  });

  it("assigns category themes for non-color tools", async () => {
    const { getOgImageTheme } = await import("@/lib/ogImageTheme");
    expect(getOgImageTheme("matrix-rain").category).toBe("Ambient");
    expect(getOgImageTheme("bsod").category).toBe("Prank");
    expect(getOgImageTheme("dead-pixel-test").category).toBe("Tool");
  });
});

describe("healthReport", () => {
  it("formats health report text with all steps", async () => {
    const { formatHealthReportText, HEALTH_CHECK_STEPS } = await import(
      "@/lib/healthReport"
    );
    const text = formatHealthReportText({
      completedAt: new Date("2026-07-21T12:00:00"),
      steps: HEALTH_CHECK_STEPS,
    });
    expect(text).toContain("Monitor Health Report");
    expect(text).toContain("Dead Pixel Hunt");
    expect(text).toContain("Ghosting / Motion Blur");
  });
});

describe("monitorLayouts", () => {
  it("defines multi-monitor layout presets", async () => {
    const { MONITOR_LAYOUT_PRESETS } = await import("@/lib/monitorLayouts");
    expect(MONITOR_LAYOUT_PRESETS.length).toBeGreaterThanOrEqual(3);
    expect(MONITOR_LAYOUT_PRESETS[0].monitors.length).toBe(2);
  });
});

describe("presets", () => {
  it("defines quick start presets with href or action", async () => {
    const { QUICK_PRESETS } = await import("@/lib/presets");
    expect(QUICK_PRESETS.length).toBeGreaterThanOrEqual(3);
    for (const p of QUICK_PRESETS) {
      expect(p.label.length).toBeGreaterThan(0);
      expect("href" in p || "action" in p).toBe(true);
    }
  });
});

describe("seo", () => {
  it("every sitemap tool has metadata", async () => {
    const { SEO } = await import("@/lib/seo");
    const tools = [
      "black-screen",
      "red-screen",
      "blue-screen",
      "green-screen",
      "yellow-screen",
      "orange-screen",
      "pink-screen",
      "purple-screen",
      "white-screen",
      "gray-screen",
      "zoom-lighting",
      "tip-screen",
      "signature-screen",
      "dvd-screensaver",
      "broken-screen",
      "dead-pixel-test",
      "bsod",
      "matrix-rain",
      "flip-clock",
      "no-signal",
      "fake-update",
      "hacker-terminal",
      "screen-stress-test",
      "burn-in-fixer",
      "motion-blur-test",
      "reading-light",
      "reflection-checker",
      "ruler",
    ];
    for (const slug of tools) {
      expect(SEO[slug as keyof typeof SEO], `missing SEO for ${slug}`).toBeDefined();
      expect(SEO[slug as keyof typeof SEO].title.length).toBeGreaterThan(0);
    }
  });
});
