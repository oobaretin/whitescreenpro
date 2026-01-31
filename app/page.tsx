"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { useTranslation } from "@/hooks/useTranslation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Home() {
  const t = useTranslation();
  const { setColor, setActiveMode, setActiveTab } = useAppStore();

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
              {[
                { name: "Black Screen", slug: "black-screen", desc: "Most popular", badge: "Popular" as const },
                { name: "Red Screen", slug: "red-screen", desc: "Lighting effect" },
                { name: "Blue Screen", slug: "blue-screen", desc: "Chroma key" },
                { name: "Green Screen", slug: "green-screen", desc: "Video production" },
                { name: "Pink Screen", slug: "pink-screen", desc: "Aesthetic" },
                { name: "Purple Screen", slug: "purple-screen", desc: "Creative" },
                { name: "Orange Screen", slug: "orange-screen", desc: "Warm lighting" },
                { name: "Yellow Screen", slug: "yellow-screen", desc: "Bright" },
                { name: "White Screen", slug: "white-screen", desc: "Clean display", badge: "Popular" as const },
                { name: "Zoom Lighting", slug: "zoom-lighting", desc: "Video call", badge: "New" as const },
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
              ].map((item) => (
                <Link
                  key={item.name}
                  href={`/${item.slug}`}
                  className="tool-card relative text-left p-3 rounded-lg block"
                >
                  {item.badge && (
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
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-card rounded-xl shadow-md p-6 mb-6 border border-card">
          <h2 className="text-2xl font-bold text-page mb-4">{t.home.aboutTitle}</h2>
          <p className="text-page/90 mb-6 leading-relaxed">{t.home.aboutDescription}</p>
          
          <h3 className="text-xl font-semibold text-page mb-3">{t.home.definitionTitle}</h3>
          <p className="text-page/90 mb-6 leading-relaxed">{t.home.definition}</p>

          <h3 className="text-xl font-semibold text-page mb-3">{t.home.featuresTitle}</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">{t.about.useCases}</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{t.about.professional}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{t.about.creative}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{t.about.testing}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{t.about.entertainment}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How Tools Work Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.home.toolsTitle}</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">Color Screens</h4>
              <p className="text-gray-700 text-sm">{t.toolExplanations.colorScreens}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">{t.tools.zoomLighting}</h4>
              <p className="text-gray-700 text-sm">{t.toolExplanations.zoomLighting}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">{t.tools.signature}</h4>
              <p className="text-gray-700 text-sm">{t.toolExplanations.signature}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">{t.tools.tipScreen}</h4>
              <p className="text-gray-700 text-sm">{t.toolExplanations.tipScreen}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">{t.tools.deadPixelTest}</h4>
              <p className="text-gray-700 text-sm">{t.toolExplanations.deadPixel}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">{t.pranks.brokenScreen}</h4>
              <p className="text-gray-700 text-sm">{t.toolExplanations.brokenScreen}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">{t.pranks.bsod}</h4>
              <p className="text-gray-700 text-sm">{t.toolExplanations.bsod}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">{t.pranks.fakeUpdate}</h4>
              <p className="text-gray-700 text-sm">{t.toolExplanations.fakeUpdate}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">{t.pranks.hackerTerminal}</h4>
              <p className="text-gray-700 text-sm">{t.toolExplanations.hackerTerminal}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">{t.ambient.dvdScreensaver}</h4>
              <p className="text-gray-700 text-sm">{t.toolExplanations.dvdScreensaver}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">{t.ambient.matrixRain}</h4>
              <p className="text-gray-700 text-sm">{t.toolExplanations.matrixRain}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">{t.ambient.flipClock}</h4>
              <p className="text-gray-700 text-sm">{t.toolExplanations.flipClock}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">{t.ambient.noSignal}</h4>
              <p className="text-gray-700 text-sm">{t.toolExplanations.noSignal}</p>
            </div>
          </div>
        </div>

        {/* Q&A Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.home.qaTitle}</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Q: {t.qa.q1}</h4>
              <p className="text-gray-700 text-sm pl-4">{t.qa.a1}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Q: {t.qa.q2}</h4>
              <p className="text-gray-700 text-sm pl-4">{t.qa.a2}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Q: {t.qa.q3}</h4>
              <p className="text-gray-700 text-sm pl-4">{t.qa.a3}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Q: {t.qa.q4}</h4>
              <p className="text-gray-700 text-sm pl-4">{t.qa.a4}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Q: {t.qa.q5}</h4>
              <p className="text-gray-700 text-sm pl-4">{t.qa.a5}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Q: {t.qa.q6}</h4>
              <p className="text-gray-700 text-sm pl-4">{t.qa.a6}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Q: {t.qa.q7}</h4>
              <p className="text-gray-700 text-sm pl-4">{t.qa.a7}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

