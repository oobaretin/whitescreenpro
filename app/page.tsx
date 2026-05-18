"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { useTranslation } from "@/hooks/useTranslation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CHANGELOG_SEEN_KEY } from "@/components/ChangelogModal";

type ToolBadge = "Popular" | "New";

type ToolGridEntry =
  | {
      type: "route";
      name: string;
      slug: string;
      desc: string;
      badge?: ToolBadge;
    }
  | { type: "open-health"; name: string; desc: string; badge?: ToolBadge }
  | { type: "open-settings"; name: string; desc: string; badge?: ToolBadge };

/** Shown first in All Tools — same cards as full-screen tools */
const PRIORITY_TOOL_ENTRIES: ToolGridEntry[] = [
  {
    type: "open-health",
    name: "Monitor Health Check",
    desc: "Wizard: dead pixels, bleed, gray, motion blur",
    badge: "New",
  },
  {
    type: "open-settings",
    name: "Master warmth & sync",
    desc: "Kelvin, brightness, match tabs — opens ⚙️",
    badge: "New",
  },
  {
    type: "route",
    name: "Zen Mode",
    slug: "motion-blur-test",
    desc: "On any tool: idle 3s → cursor & UI fade",
  },
  {
    type: "route",
    name: "Context tips (?)",
    slug: "dead-pixel-test",
    desc: "Bottom-left ? — hints change per tool",
  },
];

const ROUTE_TOOL_ROWS: Array<{
  name: string;
  slug: string;
  desc: string;
  badge?: ToolBadge;
}> = [
  { name: "Black Screen", slug: "black-screen", desc: "Most popular", badge: "Popular" },
  { name: "Red Screen", slug: "red-screen", desc: "Lighting effect" },
  { name: "Blue Screen", slug: "blue-screen", desc: "Chroma key" },
  { name: "Green Screen", slug: "green-screen", desc: "Video production" },
  { name: "Pink Screen", slug: "pink-screen", desc: "Aesthetic" },
  { name: "Purple Screen", slug: "purple-screen", desc: "Creative" },
  { name: "Orange Screen", slug: "orange-screen", desc: "Warm lighting" },
  { name: "Yellow Screen", slug: "yellow-screen", desc: "Bright" },
  { name: "White Screen", slug: "white-screen", desc: "Clean display", badge: "Popular" },
  { name: "Gray Screen", slug: "gray-screen", desc: "Uniformity / 50% gray" },
  { name: "Zoom Lighting", slug: "zoom-lighting", desc: "Video call", badge: "New" },
  { name: "Tip Screen", slug: "tip-screen", desc: "POS tipping" },
  { name: "Signature Screen", slug: "signature-screen", desc: "Digital signature" },
  { name: "DVD Screensaver", slug: "dvd-screensaver", desc: "Nostalgic" },
  { name: "Broken Screen", slug: "broken-screen", desc: "Prank tool" },
  { name: "Dead Pixel Test", slug: "dead-pixel-test", desc: "Display checker" },
  { name: "BSOD", slug: "bsod", desc: "Blue screen of death" },
  { name: "Fake Update", slug: "fake-update", desc: "Prank screens" },
  { name: "Hacker Terminal", slug: "hacker-terminal", desc: "Matrix-style" },
  { name: "Matrix Rain", slug: "matrix-rain", desc: "Falling code" },
  { name: "Flip Clock", slug: "flip-clock", desc: "Digital clock" },
  { name: "No Signal", slug: "no-signal", desc: "TV static" },
  { name: "Screen Stress Test", slug: "screen-stress-test", desc: "Color cycle" },
  { name: "Burn-In Fixer", slug: "burn-in-fixer", desc: "OLED pixel refresher" },
  { name: "Motion Blur Test", slug: "motion-blur-test", desc: "Ghosting & response", badge: "New" },
  { name: "Reading Light", slug: "reading-light", desc: "Soft amber, sleep-friendly" },
  { name: "Reflection Checker", slug: "reflection-checker", desc: "Reflections & distortion" },
  { name: "Screen Ruler", slug: "ruler", desc: "px / in / cm + 16:9 grid" },
];

const ROUTE_TOOL_ENTRIES: Extract<ToolGridEntry, { type: "route" }>[] =
  ROUTE_TOOL_ROWS.map((row) => ({ type: "route" as const, ...row }));

export default function Home() {
  const t = useTranslation();
  const {
    setColor,
    setActiveMode,
    setActiveTab,
    setChangelogOpen,
    setHealthDashboardOpen,
    requestOpenSettingsFab,
  } = useAppStore();
  const [showChangelogBadge, setShowChangelogBadge] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(CHANGELOG_SEEN_KEY) === "true") {
      setShowChangelogBadge(false);
    }
  }, []);

  // Reset to white when landing on homepage
  useEffect(() => {
    setColor("#FFFFFF");
    setActiveMode("color");
    setActiveTab("colors");
  }, [setColor, setActiveMode, setActiveTab]);

  return (
    <div className="min-h-screen bg-page">
      <Navigation />
      
      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-page mb-3">
            {t.home.title}
          </h1>
          <p className="text-lg text-page/80 mb-8">
            {t.home.subtitle}
          </p>

          {/* All Tools Section */}
          <div className="bg-card rounded-xl shadow-md p-6 border border-card">
            <h2 className="text-2xl font-bold text-page mb-4">All Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...PRIORITY_TOOL_ENTRIES, ...ROUTE_TOOL_ENTRIES].map((item) => {
                const cardInner = (
                  <>
                    {"badge" in item && item.badge && (
                      <span
                        className={`absolute top-2 right-2 text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          item.badge === "Popular"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <div className="font-medium text-page">{item.name}</div>
                    <div className="text-xs text-page/70 mt-1">{item.desc}</div>
                  </>
                );
                const cardClass =
                  "tool-card relative text-left p-3 rounded-lg block w-full cursor-pointer";

                if (item.type === "route") {
                  return (
                    <Link key={item.name} href={`/${item.slug}`} className={cardClass}>
                      {cardInner}
                    </Link>
                  );
                }
                if (item.type === "open-health") {
                  return (
                    <button
                      key={item.name}
                      type="button"
                      className={cardClass}
                      onClick={() => setHealthDashboardOpen(true)}
                    >
                      {cardInner}
                    </button>
                  );
                }
                return (
                  <button
                    key={item.name}
                    type="button"
                    className={cardClass}
                    onClick={() => requestOpenSettingsFab()}
                  >
                    {cardInner}
                  </button>
                );
              })}
            </div>
            {/* What's New trigger – hidden after user has seen v2 changelog */}
            {showChangelogBadge && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  id="changelog-trigger"
                  onClick={() => setChangelogOpen(true)}
                  className="py-1.5 px-3 rounded-full text-white text-xs font-bold cursor-pointer border-none transition-opacity hover:opacity-90"
                  style={{ background: "var(--accent-color)" }}
                >
                  What&apos;s New in v2.1? ✨
                </button>
              </div>
            )}
          </div>
        </div>

        {/* About — collapsed by default; full copy still in DOM for SEO */}
        <details className="group bg-card rounded-xl shadow-md mb-6 border border-card">
          <summary className="cursor-pointer select-none list-none flex items-center justify-between gap-3 p-6 [&::-webkit-details-marker]:hidden">
            <h2 className="text-2xl font-bold text-page">{t.home.aboutTitle}</h2>
            <span className="flex-shrink-0 text-page/50 transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
              ▼
            </span>
          </summary>
          <div className="px-6 pb-6 pt-0 space-y-6 border-t border-card">
          <p className="text-page/90 leading-relaxed">{t.home.aboutDescription}</p>

          <div>
          <h3 className="text-xl font-semibold text-page mb-3">{t.home.definitionTitle}</h3>
          <p className="text-page/90 mb-6 leading-relaxed">{t.home.definition}</p>

          <h3 className="text-xl font-semibold text-page mb-3">{t.home.featuresTitle}</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-2">
            <div>
              <h4 className="font-semibold text-page mb-2">{t.about.useCases}</h4>
              <ul className="space-y-2 text-page/85 text-sm">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0" style={{ color: "var(--accent-color)" }} aria-hidden="true">
                    •
                  </span>
                  <span>{t.about.professional}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0" style={{ color: "var(--accent-color)" }} aria-hidden="true">
                    •
                  </span>
                  <span>{t.about.creative}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0" style={{ color: "var(--accent-color)" }} aria-hidden="true">
                    •
                  </span>
                  <span>{t.about.testing}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0" style={{ color: "var(--accent-color)" }} aria-hidden="true">
                    •
                  </span>
                  <span>{t.about.entertainment}</span>
                </li>
              </ul>
            </div>
          </div>
          </div>
          <p className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-2 hover:opacity-80"
              style={{ color: "var(--accent-color)" }}
            >
              {t.nav.about}
              <span aria-hidden="true">→</span>
            </Link>
          </p>
          </div>
        </details>

        {/* How Tools Work */}
        <details className="group bg-card rounded-xl shadow-md mb-6 border border-card">
          <summary className="cursor-pointer select-none list-none flex items-center justify-between gap-3 p-6 [&::-webkit-details-marker]:hidden">
            <h2 className="text-2xl font-bold text-page">{t.home.toolsTitle}</h2>
            <span className="flex-shrink-0 text-page/50 transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
              ▼
            </span>
          </summary>
          <div className="px-6 pb-6 pt-0 space-y-4 border-t border-card">
            <div className="border-l-4 pl-4" style={{ borderLeftColor: "var(--accent-color)" }}>
              <h3 className="font-semibold text-page mb-2">Color Screens</h3>
              <p className="text-page/85 text-sm">{t.toolExplanations.colorScreens}</p>
            </div>
            <div className="border-l-4 pl-4" style={{ borderLeftColor: "var(--accent-color)" }}>
              <h3 className="font-semibold text-page mb-2">{t.tools.zoomLighting}</h3>
              <p className="text-page/85 text-sm">{t.toolExplanations.zoomLighting}</p>
            </div>
            <div className="border-l-4 pl-4" style={{ borderLeftColor: "var(--accent-color)" }}>
              <h3 className="font-semibold text-page mb-2">{t.tools.signature}</h3>
              <p className="text-page/85 text-sm">{t.toolExplanations.signature}</p>
            </div>
            <div className="border-l-4 pl-4" style={{ borderLeftColor: "var(--accent-color)" }}>
              <h3 className="font-semibold text-page mb-2">{t.tools.tipScreen}</h3>
              <p className="text-page/85 text-sm">{t.toolExplanations.tipScreen}</p>
            </div>
            <div className="border-l-4 pl-4" style={{ borderLeftColor: "var(--accent-color)" }}>
              <h3 className="font-semibold text-page mb-2">{t.tools.deadPixelTest}</h3>
              <p className="text-page/85 text-sm">{t.toolExplanations.deadPixel}</p>
            </div>
            <div className="border-l-4 pl-4" style={{ borderLeftColor: "var(--accent-color)" }}>
              <h3 className="font-semibold text-page mb-2">{t.pranks.brokenScreen}</h3>
              <p className="text-page/85 text-sm">{t.toolExplanations.brokenScreen}</p>
            </div>
            <div className="border-l-4 pl-4" style={{ borderLeftColor: "var(--accent-color)" }}>
              <h3 className="font-semibold text-page mb-2">{t.pranks.bsod}</h3>
              <p className="text-page/85 text-sm">{t.toolExplanations.bsod}</p>
            </div>
            <div className="border-l-4 pl-4" style={{ borderLeftColor: "var(--accent-color)" }}>
              <h3 className="font-semibold text-page mb-2">{t.pranks.fakeUpdate}</h3>
              <p className="text-page/85 text-sm">{t.toolExplanations.fakeUpdate}</p>
            </div>
            <div className="border-l-4 pl-4" style={{ borderLeftColor: "var(--accent-color)" }}>
              <h3 className="font-semibold text-page mb-2">{t.pranks.hackerTerminal}</h3>
              <p className="text-page/85 text-sm">{t.toolExplanations.hackerTerminal}</p>
            </div>
            <div className="border-l-4 pl-4" style={{ borderLeftColor: "var(--accent-color)" }}>
              <h3 className="font-semibold text-page mb-2">{t.ambient.dvdScreensaver}</h3>
              <p className="text-page/85 text-sm">{t.toolExplanations.dvdScreensaver}</p>
            </div>
            <div className="border-l-4 pl-4" style={{ borderLeftColor: "var(--accent-color)" }}>
              <h3 className="font-semibold text-page mb-2">{t.ambient.matrixRain}</h3>
              <p className="text-page/85 text-sm">{t.toolExplanations.matrixRain}</p>
            </div>
            <div className="border-l-4 pl-4" style={{ borderLeftColor: "var(--accent-color)" }}>
              <h3 className="font-semibold text-page mb-2">{t.ambient.flipClock}</h3>
              <p className="text-page/85 text-sm">{t.toolExplanations.flipClock}</p>
            </div>
            <div className="border-l-4 pl-4" style={{ borderLeftColor: "var(--accent-color)" }}>
              <h3 className="font-semibold text-page mb-2">{t.ambient.noSignal}</h3>
              <p className="text-page/85 text-sm">{t.toolExplanations.noSignal}</p>
            </div>
          </div>
        </details>

        {/* Q&A */}
        <details className="group bg-card rounded-xl shadow-md mb-6 border border-card">
          <summary className="cursor-pointer select-none list-none flex items-center justify-between gap-3 p-6 [&::-webkit-details-marker]:hidden">
            <h2 className="text-2xl font-bold text-page">{t.home.qaTitle}</h2>
            <span className="flex-shrink-0 text-page/50 transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
              ▼
            </span>
          </summary>
          <div className="px-6 pb-6 pt-0 space-y-6 border-t border-card">
            <div>
              <h3 className="font-semibold text-page mb-2">Q: {t.qa.q1}</h3>
              <p className="text-page/85 text-sm pl-0 sm:pl-4">{t.qa.a1}</p>
            </div>
            <div>
              <h3 className="font-semibold text-page mb-2">Q: {t.qa.q2}</h3>
              <p className="text-page/85 text-sm pl-0 sm:pl-4">{t.qa.a2}</p>
            </div>
            <div>
              <h3 className="font-semibold text-page mb-2">Q: {t.qa.q3}</h3>
              <p className="text-page/85 text-sm pl-0 sm:pl-4">{t.qa.a3}</p>
            </div>
            <div>
              <h3 className="font-semibold text-page mb-2">Q: {t.qa.q4}</h3>
              <p className="text-page/85 text-sm pl-0 sm:pl-4">{t.qa.a4}</p>
            </div>
            <div>
              <h3 className="font-semibold text-page mb-2">Q: {t.qa.q5}</h3>
              <p className="text-page/85 text-sm pl-0 sm:pl-4">{t.qa.a5}</p>
            </div>
            <div>
              <h3 className="font-semibold text-page mb-2">Q: {t.qa.q6}</h3>
              <p className="text-page/85 text-sm pl-0 sm:pl-4">{t.qa.a6}</p>
            </div>
            <div>
              <h3 className="font-semibold text-page mb-2">Q: {t.qa.q7}</h3>
              <p className="text-page/85 text-sm pl-0 sm:pl-4">{t.qa.a7}</p>
            </div>
          </div>
        </details>
      </main>

      <Footer />
    </div>
  );
}

