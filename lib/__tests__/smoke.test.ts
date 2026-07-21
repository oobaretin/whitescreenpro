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
