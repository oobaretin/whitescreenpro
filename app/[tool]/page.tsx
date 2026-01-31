"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { PatternOverlay } from "@/components/PatternOverlay";
import { TimerDisplay } from "@/components/TimerDisplay";
import { HintIndicator } from "@/components/HintIndicator";
import { ZoomLightingDisplay } from "@/components/tools/ZoomLightingDisplay";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ControlPanel } from "@/components/ControlPanel";
import { BSOD } from "@/components/pranks/BSOD";
import { BrokenScreenOverlay } from "@/components/pranks/BrokenScreenOverlay";
import { FakeUpdate } from "@/components/pranks/FakeUpdate";
import { HackerTerminal } from "@/components/pranks/HackerTerminal";
import { DVDScreensaver } from "@/components/ambient/DVDScreensaver";
import { MatrixRain } from "@/components/ambient/MatrixRain";
import { FlipClock } from "@/components/ambient/FlipClock";
import { NoSignal } from "@/components/ambient/NoSignal";
import { SignatureScreen } from "@/components/tools/SignatureScreen";
import { TipScreen } from "@/components/tools/TipScreen";
import { DeadPixelTest } from "@/components/tools/DeadPixelTest";
import { ScreenStressTest } from "@/components/tools/ScreenStressTest";
import { BurnInFixer } from "@/components/tools/BurnInFixer";
import { MotionBlurTest } from "@/components/tools/MotionBlurTest";
import { ReadingLight } from "@/components/tools/ReadingLight";
import { ReflectionChecker } from "@/components/tools/ReflectionChecker";
import { ScreenRuler } from "@/components/tools/ScreenRuler";
import { BrokenScreen } from "@/components/pranks/BrokenScreen";
import { BSODControls } from "@/components/pranks/BSODControls";
import { FakeUpdateControls } from "@/components/pranks/FakeUpdateControls";
import { HackerTerminalControls } from "@/components/pranks/HackerTerminalControls";
import { DVDControls } from "@/components/ambient/DVDControls";
import { MatrixControls } from "@/components/ambient/MatrixControls";
import { FlipClockControls } from "@/components/ambient/FlipClockControls";
import { NoSignalControls } from "@/components/ambient/NoSignalControls";
import { ZoomLighting } from "@/components/tools/ZoomLighting";
import { QuickNav } from "@/components/QuickNav";
import { SkeletonTerminal } from "@/components/SkeletonTerminal";
import { getToolMeta } from "@/lib/seo";

const TOOL_CONFIG: Record<string, { color?: string; mode?: string; name: string }> = {
  "black-screen": { color: "#000000", name: "Black Screen" },
  "red-screen": { color: "#FF0000", name: "Red Screen" },
  "blue-screen": { color: "#0000FF", name: "Blue Screen" },
  "green-screen": { color: "#00FF00", name: "Green Screen" },
  "yellow-screen": { color: "#FFFF00", name: "Yellow Screen" },
  "orange-screen": { color: "#FFA500", name: "Orange Screen" },
  "pink-screen": { color: "#FFC0CB", name: "Pink Screen" },
  "purple-screen": { color: "#800080", name: "Purple Screen" },
  "white-screen": { color: "#FFFFFF", name: "White Screen" },
  "zoom-lighting": { mode: "zoom-lighting", name: "Zoom Lighting" },
  "tip-screen": { mode: "tip-screen", name: "Tip Screen" },
  "signature-screen": { mode: "signature", name: "Signature Screen" },
  "dvd-screensaver": { mode: "dvd-screensaver", name: "DVD Screensaver" },
  "broken-screen": { mode: "broken-screen", color: "#000000", name: "Broken Screen" },
  "dead-pixel-test": { mode: "dead-pixel", name: "Dead Pixel Test" },
  "bsod": { mode: "bsod", name: "Blue Screen of Death" },
  "matrix-rain": { mode: "matrix-rain", name: "Matrix Rain" },
  "flip-clock": { mode: "flip-clock", name: "Flip Clock" },
  "no-signal": { mode: "no-signal", name: "No Signal" },
  "fake-update": { mode: "fake-update", name: "Fake Update" },
  "hacker-terminal": { mode: "hacker-terminal", name: "Hacker Terminal" },
  "screen-stress-test": { mode: "color-cycle", name: "Screen Stress Test" },
  "burn-in-fixer": { mode: "burn-in-fixer", name: "Burn-In Fixer" },
  "motion-blur-test": { mode: "motion-blur-test", name: "Motion Blur & Ghosting Test" },
  "reading-light": { mode: "reading-light", name: "Reading Light" },
  "reflection-checker": { mode: "reflection-checker", name: "Reflection Checker" },
  "ruler": { mode: "ruler", name: "Screen Ruler" },
};

export default function ToolPage({ params }: { params: { tool: string } }) {
  const t = useTranslation();
  const router = useRouter();
  const {
    currentColor,
    brightness,
    colorTemperature,
    gradient,
    pattern,
    showHint,
    setColor,
    setActiveMode,
    activeMode,
    zoomLighting,
    isFullscreen,
    ecoMode,
    showToast,
  } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [showExitHint, setShowExitHint] = useState(false);
  const [skeletonDone, setSkeletonDone] = useState(false);
  const containerRef = useFullscreen();
  const flickerVisible = useFlicker();
  useKeyboardShortcuts();
  useTimer();
  useAutoCycle();

  const toolSlug = params.tool;
  const toolConfig = TOOL_CONFIG[toolSlug];

  // Track client-side mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Skeleton loader for Matrix Rain and Hacker Terminal (show for 400ms)
  const useSkeleton = toolSlug === "matrix-rain" || toolSlug === "hacker-terminal";
  useEffect(() => {
    if (!useSkeleton) {
      setSkeletonDone(true);
      return;
    }
    const t = setTimeout(() => setSkeletonDone(true), 400);
    return () => clearTimeout(t);
  }, [useSkeleton]);

  // Safety warning toast for tools with flashing / rapid changes (5s)
  useEffect(() => {
    if (
      toolSlug === "dead-pixel-test" ||
      toolSlug === "screen-stress-test" ||
      toolSlug === "burn-in-fixer"
    ) {
      showToast("⚠️ Warning: This tool contains flashing or rapid visual changes. Use with caution.", 5000);
    }
  }, [toolSlug, showToast]);

  useEffect(() => {
    if (!toolSlug) return;
    
    if (!toolConfig) {
      router.push("/");
      return;
    }

    if (toolConfig.color) {
      setColor(toolConfig.color);
    }
    
    if (toolConfig.mode) {
      setActiveMode(toolConfig.mode as any);
    } else {
      setActiveMode("color");
    }
  }, [toolSlug, toolConfig, setColor, setActiveMode, router]);

  // Hide hint after 3 seconds
  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => {
        useAppStore.setState({ showHint: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  // Eco-Mode: use warm off-white instead of pure white to reduce OLED power
  const ECO_WHITE = "#FAFAF5";
  const isWhiteHex = (hex: string) => (hex || "").replace(/#/g, "").toUpperCase() === "FFFFFF";

  // Calculate final color based on active mode
  // Use default white until mounted to prevent hydration mismatch
  let displayColor = mounted ? currentColor : "#FFFFFF";
  
  if (mounted && activeMode === "zoom-lighting") {
    displayColor = zoomLighting.preset === "custom" 
      ? zoomLighting.customColor 
      : getColorFromTemperature(zoomLighting.colorTemperature);
    if (ecoMode && isWhiteHex(displayColor)) displayColor = ECO_WHITE;
    displayColor = getColorString(displayColor, zoomLighting.brightness);
  } else if (mounted) {
    if (ecoMode && isWhiteHex(displayColor)) displayColor = ECO_WHITE;
    if (colorTemperature !== 0) {
      displayColor = adjustColorTemperature(displayColor, colorTemperature);
    }
    displayColor = getColorString(displayColor, brightness);
  }

  const gradientCSS = getGradientCSS(gradient);
  const backgroundColor = mounted && gradient.enabled ? gradientCSS : displayColor;

  const isColorPage = !toolConfig.mode;
  const isZoomLightingPage = toolSlug === "zoom-lighting";
  const isFullPageMode = isColorPage || isZoomLightingPage;

  // ARIA label for screen readers (WCAG 2.1)
  const displayAriaLabel =
    isZoomLightingPage
      ? "Full screen display for video call lighting"
      : isColorPage
        ? `Full screen solid ${toolConfig.name.toLowerCase()} display`
        : "Display area";

  const shouldShowBackground = ![
    "bsod",
    "fake-update",
    "hacker-terminal",
    "dvd-screensaver",
    "matrix-rain",
    "flip-clock",
    "no-signal",
    "color-cycle",
  ].includes(activeMode);

  // Handle ESC key to toggle settings panel for full page mode (when not in fullscreen)
  useEffect(() => {
    if (!isFullPageMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) {
        setShowSettings((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullPageMode]);

  // Show "Press ESC to exit" for 3 seconds when entering fullscreen; clear when exiting
  useEffect(() => {
    if (isFullscreen) {
      setShowExitHint(true);
      const t = setTimeout(() => setShowExitHint(false), 3000);
      return () => clearTimeout(t);
    } else {
      setShowExitHint(false);
      if (isFullPageMode) setShowSettings(true);
    }
  }, [isFullscreen, isFullPageMode]);

  // Burn-In Fixer: full-screen static only (no nav/footer)
  if (toolConfig && toolSlug === "burn-in-fixer") {
    return (
      <div className="fixed inset-0 z-[9998]">
        <BurnInFixer />
      </div>
    );
  }

  // Motion Blur & Ghosting Test: full-screen UFO tracks (no nav/footer)
  if (toolConfig && toolSlug === "motion-blur-test") {
    return (
      <div className="fixed inset-0 z-[9996]">
        <MotionBlurTest />
      </div>
    );
  }

  // Reading Light: full-screen amber light only (no nav/footer, no visible buttons)
  if (toolConfig && toolSlug === "reading-light") {
    return (
      <div className="fixed inset-0 z-[9995]">
        <ReadingLight />
      </div>
    );
  }

  // Reflection Checker: deep black, checkerboard, edge grid (no nav/footer)
  if (toolConfig && toolSlug === "reflection-checker") {
    return (
      <div className="fixed inset-0 z-[9994]">
        <ReflectionChecker />
      </div>
    );
  }

  // Screen Ruler: full-screen rulers + grid (no nav/footer)
  if (toolConfig && toolSlug === "ruler") {
    return (
      <div className="fixed inset-0 z-[9997] bg-page">
        <ScreenRuler />
      </div>
    );
  }

  if (!toolConfig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isFullPageMode ? "fixed inset-0" : "min-h-screen bg-gray-50"}`}>
      {/* Exit fullscreen hint - shown for 3s when entering fullscreen */}
      {isFullscreen && showExitHint && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 bg-black/50 text-white px-5 py-2.5 rounded-full z-[9999] pointer-events-none text-sm font-medium"
          aria-live="polite"
        >
          {t.home.pressEscToExit}
        </div>
      )}
      {!isFullPageMode && <Navigation />}
      
      {/* Back Button - only show if not full page mode */}
      {!isFullPageMode && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>{t.common.backToHome}</span>
          </Link>
        </div>
      )}

      {/* Full Page Display Area for Color Pages and Zoom Lighting */}
      {isFullPageMode ? (
        <div className="relative w-full h-full">
          {/* Full Page Background */}
          <div
            id="screen-container"
            ref={containerRef}
            data-display-area
            role="img"
            aria-label={displayAriaLabel}
            className={`${
              isFullscreen ? "fixed inset-0 z-50" : "fixed inset-0"
            } overflow-hidden group`}
            style={{
              backgroundColor:
                shouldShowBackground && gradient.enabled
                  ? undefined
                  : shouldShowBackground
                  ? backgroundColor
                  : "transparent",
              backgroundImage: shouldShowBackground && gradient.enabled ? gradientCSS : undefined,
              opacity: flickerVisible ? 1 : 1,
              transition: flickerVisible
                ? "opacity 0.1s ease-in-out"
                : "opacity 0.05s ease-in-out",
            }}
            onClick={() => {
              if (!isFullscreen) {
                useAppStore.getState().toggleFullscreen();
              }
              if (showSettings) {
                setShowSettings(false);
              }
            }}
          >
            {shouldShowBackground && <PatternOverlay pattern={pattern} />}
            {shouldShowBackground && <TimerDisplay />}
            {activeMode === "zoom-lighting" && <ZoomLightingDisplay />}
            {shouldShowBackground && showHint && <HintIndicator />}
            
            {/* Click to Fullscreen Overlay - only show when settings are visible */}
            {showSettings && !isFullscreen && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                <div className="px-6 py-3 bg-white/95 text-gray-900 font-semibold rounded-lg shadow-lg backdrop-blur-sm border border-gray-200">
                  {t.home.clickToFullscreen}
                </div>
              </div>
            )}
            
            {/* Settings Toggle Button - show when settings are hidden */}
            {!showSettings && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSettings(true);
                }}
                className="absolute top-4 right-4 z-50 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 font-medium rounded-lg shadow-lg backdrop-blur-sm border border-gray-200 transition-all"
                title="Show Settings"
              >
                ⚙️ Settings
              </button>
            )}
          </div>

          {/* Centered Settings Panel - only show when showSettings is true */}
          {showSettings && (
            <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
              <div className="w-full max-w-md mx-4 pointer-events-auto max-h-[90vh] overflow-y-auto">
                <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{t.common.settings}</h2>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setShowSettings(false);
                          useAppStore.getState().toggleFullscreen();
                        }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Fullscreen"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                        </svg>
                      </button>
                      <Link
                        href="/"
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Back to Home"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Tool-specific controls */}
                  {toolSlug === "zoom-lighting" && <ZoomLighting />}
                  {isColorPage && <ControlPanel showColorTab={true} />}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Regular Layout for Other Tools */
        <>
          {!isFullscreen && <QuickNav />}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Title - h1 matches SEO title when available */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {getToolMeta(toolSlug)?.title ?? toolConfig.name}
            </h1>
            {toolSlug === "broken-screen" && (
              <p className="text-gray-600">
                👆 Click on the display below to enter fullscreen mode
              </p>
            )}
          </div>

          {/* Display Area - Interactive tools have their own standalone layouts */}
          {toolSlug === "signature-screen" ? (
            <div className="flex justify-center mb-6">
              <div className="relative h-[400px] w-full max-w-2xl rounded-xl shadow-md overflow-hidden">
                <SignatureScreen />
              </div>
            </div>
          ) : toolSlug === "dead-pixel-test" ? (
            <>
              <div className="relative h-[500px] rounded-xl shadow-md mb-4 overflow-hidden">
                <DeadPixelTest />
              </div>
              <p className="text-center text-sm text-gray-600 mb-6">
                Found too many dead pixels?{" "}
                <a
                  href="https://www.amazon.com/s?k=4k+monitor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                  style={{ color: "var(--accent-color)" }}
                >
                  View top-rated 4K monitors
                </a>
              </p>
            </>
          ) : toolSlug === "tip-screen" ? (
            <div className="flex justify-center mb-6">
              <div className="relative h-[500px] w-full max-w-md overflow-hidden">
                <TipScreen />
              </div>
            </div>
          ) : toolSlug === "screen-stress-test" ? (
            <div
              ref={containerRef}
              data-display-area
              className={`${
                isFullscreen ? "fixed inset-0 z-50" : "relative h-[500px] rounded-xl shadow-md mb-6 overflow-hidden"
              }`}
              onClick={!isFullscreen ? () => useAppStore.getState().toggleFullscreen() : undefined}
            >
              <ScreenStressTest />
            </div>
          ) : (
            <div
              id="screen-container"
              ref={containerRef}
              data-display-area
              role="img"
              aria-label={displayAriaLabel}
              className={`${
                isFullscreen ? "fixed inset-0 z-50" : "relative h-[500px] rounded-xl shadow-md mb-6 cursor-pointer"
              } overflow-hidden group`}
              style={{
                backgroundColor:
                  shouldShowBackground && gradient.enabled
                    ? undefined
                    : shouldShowBackground
                    ? backgroundColor
                    : "transparent",
                backgroundImage: shouldShowBackground && gradient.enabled ? gradientCSS : undefined,
                opacity: flickerVisible ? 1 : 1,
                transition: flickerVisible
                  ? "opacity 0.1s ease-in-out"
                  : "opacity 0.05s ease-in-out",
              }}
              onClick={!isFullscreen ? () => useAppStore.getState().toggleFullscreen() : undefined}
            >
              {useSkeleton && !skeletonDone && <SkeletonTerminal />}
              {shouldShowBackground && <PatternOverlay pattern={pattern} />}
              {shouldShowBackground && <TimerDisplay />}
              {activeMode === "zoom-lighting" && <ZoomLightingDisplay />}
              {activeMode === "broken-screen" && <BrokenScreenOverlay />}
              {activeMode === "bsod" && <BSOD />}
              {activeMode === "fake-update" && <FakeUpdate />}
              {activeMode === "hacker-terminal" && skeletonDone && <HackerTerminal />}
              {activeMode === "dvd-screensaver" && <DVDScreensaver />}
              {activeMode === "matrix-rain" && skeletonDone && <MatrixRain />}
              {activeMode === "flip-clock" && <FlipClock />}
              {activeMode === "no-signal" && <NoSignal />}
              {shouldShowBackground && showHint && <HintIndicator />}
              
              {/* Fullscreen Button Overlay - hidden for broken-screen (it has its own), hover for others */}
              {!isFullscreen && activeMode !== "broken-screen" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                  <div className="px-6 py-3 bg-white/95 text-gray-900 font-semibold rounded-lg shadow-lg backdrop-blur-sm border border-gray-200">
                    {t.home.clickToFullscreen}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Controls Section */}
          {!["tip-screen", "signature-screen", "dead-pixel-test", "screen-stress-test"].includes(toolSlug) && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t.common.settings}</h2>
              
              {/* Tool-specific controls */}
              {toolSlug === "broken-screen" && <BrokenScreen />}
              {toolSlug === "bsod" && <BSODControls />}
              {toolSlug === "fake-update" && <FakeUpdateControls />}
              {toolSlug === "hacker-terminal" && <HackerTerminalControls />}
              {toolSlug === "dvd-screensaver" && <DVDControls />}
              {toolSlug === "matrix-rain" && <MatrixControls />}
              {toolSlug === "flip-clock" && <FlipClockControls />}
              {toolSlug === "no-signal" && <NoSignalControls />}
            </div>
          )}
        </main>
        </>
      )}

      {!isFullPageMode && <Footer />}
    </div>
  );
}

