"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getColorString,
  getGradientCSS,
  adjustColorTemperature,
  getColorFromTemperature,
} from "@/lib/colorUtils";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useTimer } from "@/hooks/useTimer";
import { useAutoCycle } from "@/hooks/useAutoCycle";
import { useFlicker } from "@/hooks/useFlicker";
import { ControlPanel } from "@/components/ControlPanel";
import { PatternOverlay } from "@/components/PatternOverlay";
import { TimerDisplay } from "@/components/TimerDisplay";
import { HintIndicator } from "@/components/HintIndicator";
import { ZoomLightingDisplay } from "@/components/tools/ZoomLightingDisplay";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BSOD } from "@/components/pranks/BSOD";
import { BrokenScreenOverlay } from "@/components/pranks/BrokenScreenOverlay";
import { FakeUpdate } from "@/components/pranks/FakeUpdate";
import { HackerTerminal } from "@/components/pranks/HackerTerminal";
import { DVDScreensaver } from "@/components/ambient/DVDScreensaver";
import { MatrixRain } from "@/components/ambient/MatrixRain";
import { FlipClock } from "@/components/ambient/FlipClock";
import { NoSignal } from "@/components/ambient/NoSignal";

export default function Home() {
  const t = useTranslation();
  const {
    currentColor,
    brightness,
    colorTemperature,
    gradient,
    pattern,
    showHint,
    setPanelOpen,
    panelAutoHide,
    panelHideDelay,
    activeMode,
    zoomLighting,
  } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const containerRef = useFullscreen();
  const flickerVisible = useFlicker();
  useKeyboardShortcuts();
  useTimer();
  useAutoCycle();

  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track client-side mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Parse URL parameters for shareable links
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const color = params.get("color");
    const brightnessParam = params.get("brightness");
    const gradientParam = params.get("gradient");

    if (color) {
      useAppStore.getState().setColor(`#${color}`);
    }

    if (brightnessParam) {
      const brightnessValue = parseInt(brightnessParam, 10);
      if (!isNaN(brightnessValue) && brightnessValue >= 0 && brightnessValue <= 100) {
        useAppStore.getState().setBrightness(brightnessValue);
      }
    }

    if (gradientParam === "true") {
      useAppStore.getState().setGradient({ enabled: true });
    }
  }, []);

  // Auto-hide panel after inactivity (only on desktop, mobile uses hamburger menu)
  useEffect(() => {
    if (!panelAutoHide) return;
    
    // Only auto-hide on mobile devices (screen width < 768px)
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const resetHideTimeout = () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setPanelOpen(false);
      }, panelHideDelay);
    };

    const handleActivity = () => {
      resetHideTimeout();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("touchstart", handleActivity);

    resetHideTimeout();

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [panelAutoHide, panelHideDelay, setPanelOpen]);

  // Hide hint after 3 seconds
  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => {
        useAppStore.setState({ showHint: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  // Calculate final color based on active mode
  // Use default white until mounted to prevent hydration mismatch
  let displayColor = mounted ? currentColor : "#FFFFFF";
  
  // Handle zoom lighting mode
  if (mounted && activeMode === "zoom-lighting") {
    displayColor = zoomLighting.preset === "custom" 
      ? zoomLighting.customColor 
      : getColorFromTemperature(zoomLighting.colorTemperature);
    displayColor = getColorString(displayColor, zoomLighting.brightness);
  } else if (mounted) {
    // Normal color mode
    if (colorTemperature !== 0) {
      displayColor = adjustColorTemperature(displayColor, colorTemperature);
    }
    displayColor = getColorString(displayColor, brightness);
  }

  const gradientCSS = getGradientCSS(gradient);
  const backgroundColor = mounted && gradient.enabled ? gradientCSS : displayColor;

  const { isFullscreen, toggleFullscreen } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {t.home.title}
          </h1>
          <p className="text-lg text-gray-600">
            {t.home.subtitle}
          </p>
        </div>

        {/* Display Area - Always show on homepage */}
        <div
          ref={containerRef}
          data-display-area
          className={`${
            isFullscreen ? "fixed inset-0 z-50" : "relative h-[300px] rounded-xl shadow-md mb-6 cursor-pointer"
          } overflow-hidden group`}
          style={{
            backgroundColor: gradient.enabled ? undefined : backgroundColor,
            backgroundImage: gradient.enabled ? gradientCSS : undefined,
            opacity: flickerVisible ? 1 : 1,
            transition: "opacity 0.1s ease-in-out",
          }}
          onClick={!isFullscreen ? toggleFullscreen : undefined}
        >
          <PatternOverlay pattern={pattern} />
          <TimerDisplay />
          {activeMode === "zoom-lighting" && <ZoomLightingDisplay />}
          {activeMode === "broken-screen" && <BrokenScreenOverlay />}
          {activeMode === "bsod" && <BSOD />}
          {activeMode === "fake-update" && <FakeUpdate />}
          {activeMode === "hacker-terminal" && <HackerTerminal />}
          {activeMode === "dvd-screensaver" && <DVDScreensaver />}
          {activeMode === "matrix-rain" && <MatrixRain />}
          {activeMode === "flip-clock" && <FlipClock />}
          {activeMode === "no-signal" && <NoSignal />}
          {showHint && <HintIndicator />}
          
          {/* Fullscreen Button Overlay */}
          {!isFullscreen && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="px-6 py-3 bg-gray-900/90 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-lg backdrop-blur-sm">
                {t.home.clickToFullscreen}
              </div>
            </div>
          )}
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <ControlPanel />
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.home.aboutTitle}</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{t.home.aboutDescription}</p>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.home.definitionTitle}</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">{t.home.definition}</p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.home.featuresTitle}</h3>
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

        {/* All Tools Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { name: "Black Screen", slug: "black-screen", desc: "Most popular" },
              { name: "Red Screen", slug: "red-screen", desc: "Lighting effect" },
              { name: "Blue Screen", slug: "blue-screen", desc: "Chroma key" },
              { name: "Green Screen", slug: "green-screen", desc: "Video production" },
              { name: "Pink Screen", slug: "pink-screen", desc: "Aesthetic" },
              { name: "Purple Screen", slug: "purple-screen", desc: "Creative" },
              { name: "Orange Screen", slug: "orange-screen", desc: "Warm lighting" },
              { name: "Yellow Screen", slug: "yellow-screen", desc: "Bright" },
              { name: "White Screen", slug: "white-screen", desc: "Clean display" },
              { name: "Zoom Lighting", slug: "zoom-lighting", desc: "Video call" },
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
                className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors block"
              >
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

