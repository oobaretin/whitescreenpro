"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { useTranslation } from "@/hooks/useTranslation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ToolGrid } from "@/components/ToolGrid";
import { QuickPresets } from "@/components/QuickPresets";
import { CHANGELOG_SEEN_KEY } from "@/components/ChangelogModal";
import { useShareLinkRestore } from "@/hooks/useShareLinkRestore";
import { parseShareLinkParams } from "@/lib/shareLink";

export default function Home() {
  const t = useTranslation();
  const {
    setColor,
    setActiveMode,
    setActiveTab,
    setChangelogOpen,
  } = useAppStore();
  const [showChangelogBadge, setShowChangelogBadge] = useState(true);

  useShareLinkRestore();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(CHANGELOG_SEEN_KEY) === "true") {
      setShowChangelogBadge(false);
    }
  }, []);

  // Reset to white when landing on homepage (unless share link specifies a color)
  useEffect(() => {
    const shareState =
      typeof window !== "undefined"
        ? parseShareLinkParams(window.location.search)
        : null;
    if (!shareState?.color) {
      setColor("#FFFFFF");
    }
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
          <p className="text-lg text-page/80 mb-6">
            {t.home.subtitle}
          </p>

          <QuickPresets />

          <ToolGrid
            showChangelogBadge={showChangelogBadge}
            onOpenChangelog={() => setChangelogOpen(true)}
          />
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

