"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import * as Tabs from "@radix-ui/react-tabs";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import { ColorPicker } from "./ColorPicker";
import { ExportTools } from "./ExportTools";
import { ToolsTab } from "./tabs/ToolsTab";
import { PranksTab } from "./tabs/PranksTab";
import { AmbientTab } from "./tabs/AmbientTab";
import { getColorString, getGradientCSS, COLOR_PRESETS } from "@/lib/colorUtils";

interface ControlPanelProps {
  showColorTab?: boolean;
}

export function ControlPanel({ showColorTab = true }: ControlPanelProps) {
  const {
    panelOpen,
    togglePanel,
    brightness,
    setBrightness,
    colorTemperature,
    setColorTemperature,
    gradient,
    setGradient,
    pattern,
    setPattern,
    timer,
    setTimer,
    startTimer,
    stopTimer,
    resetTimer,
    flicker,
    setFlicker,
    autoCycle,
    setAutoCycle,
    toggleFullscreen,
    togglePiP,
    isPiP,
    resolution,
    setResolution,
    aspectRatioLock,
    toggleAspectRatioLock,
    panelAutoHide,
    panelHideDelay,
    setPanelOpen,
    currentColor,
    setColor,
    activeMode,
    setActiveMode,
    activeTab,
    setActiveTab,
  } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set initial panel state based on screen size (desktop: open by default, mobile: closed)
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Check if this is the first load (no stored preference)
    const storedPanelState = localStorage.getItem("whitescreenpro-panel-open");
    
    if (storedPanelState === null) {
      // First load: open on desktop, closed on mobile
      const isDesktop = window.innerWidth >= 768;
      setPanelOpen(isDesktop);
    }
    
    // Handle window resize
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768;
      // Only auto-adjust if user hasn't manually set a preference
      if (storedPanelState === null) {
        setPanelOpen(isDesktop);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setPanelOpen]);
  
  // Save panel state preference
  useEffect(() => {
    localStorage.setItem("whitescreenpro-panel-open", panelOpen.toString());
  }, [panelOpen]);

  // Close panel when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isMobile = window.innerWidth < 768;
      if (
        isMobile &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        panelOpen
      ) {
        // Don't close if clicking the toggle button
        const target = event.target as HTMLElement;
        if (!target.closest('[data-panel-toggle]')) {
          setPanelOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [panelOpen, setPanelOpen]);

  const resolutions = [
    { label: "Native", value: "native" },
    { label: "480p", value: "854x480" },
    { label: "720p", value: "1280x720" },
    { label: "1080p", value: "1920x1080" },
    { label: "1440p", value: "2560x1440" },
    { label: "4K", value: "3840x2160" },
    { label: "5K", value: "5120x2880" },
    { label: "8K", value: "7680x4320" },
  ];

  return (
    <div ref={panelRef} className="w-full">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {showColorTab ? "Screen Controls" : "Settings"}
        </h2>
      </div>

      {/* Content */}
      <div className="space-y-4">
          <Tabs.Root 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as typeof activeTab)} 
            className="space-y-3"
          >
            <Tabs.List className="flex gap-1 border-b border-gray-300 overflow-x-auto text-sm">
              {/* Only show Colors tab for color-based screens */}
              {showColorTab && (
                <Tabs.Trigger
                  value="colors"
                  onClick={() => {
                    setColor(COLOR_PRESETS[0].hex); // Reset to white
                    setActiveMode("color");
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 transition-colors whitespace-nowrap"
                >
                  Colors
                </Tabs.Trigger>
              )}
              <Tabs.Trigger
                value="tools"
                className="px-3 py-1.5 text-xs font-medium text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 transition-colors whitespace-nowrap"
              >
                🛠️ Tools
              </Tabs.Trigger>
              <Tabs.Trigger
                value="pranks"
                className="px-3 py-1.5 text-xs font-medium text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 transition-colors whitespace-nowrap"
              >
                🎭 Pranks
              </Tabs.Trigger>
              <Tabs.Trigger
                value="ambient"
                className="px-3 py-1.5 text-xs font-medium text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 transition-colors whitespace-nowrap"
              >
                🌟 Ambient
              </Tabs.Trigger>
              <Tabs.Trigger
                value="export"
                className="px-3 py-1.5 text-xs font-medium text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 transition-colors whitespace-nowrap"
              >
                Export
              </Tabs.Trigger>
              <Tabs.Trigger
                value="settings"
                className="px-3 py-1.5 text-xs font-medium text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 transition-colors whitespace-nowrap"
              >
                Settings
              </Tabs.Trigger>
            </Tabs.List>

            {/* Colors Tab */}
            <Tabs.Content value="colors" className="space-y-4">
              <ColorPicker />

              {/* Brightness */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Brightness
                  </label>
                  <span className="text-sm text-gray-600">{mounted ? brightness : 100}%</span>
                </div>
                <Slider.Root
                  value={[mounted ? brightness : 100]}
                  onValueChange={([value]) => setBrightness(value)}
                  min={0}
                  max={100}
                  step={1}
                  className="relative flex items-center w-full h-5"
                >
                  <Slider.Track className="bg-gray-200 relative flex-1 rounded-full h-2">
                    <Slider.Range className="absolute bg-gray-800 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb className="block w-5 h-5 bg-gray-800 rounded-full shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-white" />
                </Slider.Root>
              </div>

              {/* Color Temperature */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Color Temperature
                  </label>
                  <span className="text-sm text-gray-600">
                    {mounted ? (colorTemperature > 0 ? "+" : "") : ""}
                    {mounted ? colorTemperature : 0}
                  </span>
                </div>
                <Slider.Root
                  value={[mounted ? colorTemperature : 0]}
                  onValueChange={([value]) => setColorTemperature(value)}
                  min={-100}
                  max={100}
                  step={1}
                  className="relative flex items-center w-full h-5"
                >
                  <Slider.Track className="bg-gray-200 relative flex-1 rounded-full h-2">
                    <Slider.Range className="absolute bg-gradient-to-r from-blue-500 via-white to-orange-500 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb className="block w-5 h-5 bg-gray-800 rounded-full shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-white" />
                </Slider.Root>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Cool</span>
                  <span>Warm</span>
                </div>
              </div>

              {/* Gradient */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Gradient Mode
                  </label>
                  <Switch.Root
                    checked={gradient.enabled}
                    onCheckedChange={(checked) =>
                      setGradient({ enabled: checked })
                    }
                    className="w-11 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>

                {gradient.enabled && (
                  <div className="space-y-3 pl-4 border-l-2 border-gray-300">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setGradient({ type: "linear" })}
                        className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
                          gradient.type === "linear"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Linear
                      </button>
                      <button
                        onClick={() => setGradient({ type: "radial" })}
                        className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
                          gradient.type === "radial"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Radial
                      </button>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">
                        Start Color
                      </label>
                      <input
                        type="color"
                        value={gradient.startColor}
                        onChange={(e) =>
                          setGradient({ startColor: e.target.value })
                        }
                        className="w-full h-10 rounded border border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">
                        End Color
                      </label>
                      <input
                        type="color"
                        value={gradient.endColor}
                        onChange={(e) =>
                          setGradient({ endColor: e.target.value })
                        }
                        className="w-full h-10 rounded border border-gray-600"
                      />
                    </div>

                    {gradient.type === "linear" && (
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">
                          Angle: {gradient.angle ?? 0}°
                        </label>
                        <Slider.Root
                          value={[gradient.angle ?? 0]}
                          onValueChange={([value]) =>
                            setGradient({ angle: value })
                          }
                          min={0}
                          max={360}
                          step={1}
                          className="relative flex items-center w-full h-5"
                        >
                          <Slider.Track className="bg-gray-700 relative flex-1 rounded-full h-2">
                            <Slider.Range className="absolute bg-white rounded-full h-full" />
                          </Slider.Track>
                          <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black" />
                        </Slider.Root>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Display Settings Section */}
              <div className="pt-4 mt-4 border-t border-gray-300">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Display Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Resolution Preset
                      </label>
                      <select
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                      >
                        {resolutions.map((res) => (
                          <option key={res.value} value={res.value}>
                            {res.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2 items-end">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block text-xs">
                          Width
                        </label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={resolution.split("x")[0]}
                            onChange={(e) => {
                              const width = e.target.value;
                              const height = resolution.split("x")[1];
                              setResolution(`${width}x${height}`);
                            }}
                            className="w-24 px-3 py-2 bg-white text-gray-900 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                            placeholder="1920"
                          />
                          <span className="ml-1 text-sm text-gray-600">px</span>
                        </div>
                      </div>
                      <span className="text-gray-400 mb-2">x</span>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block text-xs">
                          Height
                        </label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={resolution.split("x")[1]}
                            onChange={(e) => {
                              const width = resolution.split("x")[0];
                              const height = e.target.value;
                              setResolution(`${width}x${height}`);
                            }}
                            className="w-24 px-3 py-2 bg-white text-gray-900 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                            placeholder="1080"
                          />
                          <span className="ml-1 text-sm text-gray-600">px</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const canvas = document.createElement("canvas");
                        const [width, height] = resolution.split("x").map(Number);
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext("2d");
                        if (ctx) {
                          const displayColor = getColorString(currentColor, brightness);
                          const gradientCSS = gradient.enabled ? getGradientCSS(gradient) : null;
                          if (gradientCSS && gradient.enabled) {
                            // For gradients, we'll use a solid color approximation
                            ctx.fillStyle = displayColor;
                          } else {
                            ctx.fillStyle = displayColor;
                          }
                          ctx.fillRect(0, 0, width, height);
                          canvas.toBlob((blob) => {
                            if (blob) {
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = `whitescreen-${resolution}.png`;
                              a.click();
                              URL.revokeObjectURL(url);
                            }
                          });
                        }
                      }}
                      className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors font-medium whitespace-nowrap"
                    >
                      Download
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Aspect Ratio Lock
                    </label>
                    <Switch.Root
                      checked={aspectRatioLock}
                      onCheckedChange={toggleAspectRatioLock}
                      className="w-11 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                    >
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={toggleFullscreen}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Toggle Fullscreen
                    </button>
                    <button
                      onClick={togglePiP}
                      disabled={typeof document !== "undefined" && !document.pictureInPictureEnabled}
                      className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                        isPiP
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : typeof document !== "undefined" && !document.pictureInPictureEnabled
                          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                          : "bg-gray-700 hover:bg-gray-600 text-white"
                      }`}
                      title={typeof document !== "undefined" && !document.pictureInPictureEnabled ? "Picture-in-Picture is not supported in this browser" : ""}
                    >
                      {isPiP ? "Exit PiP" : "Picture-in-Picture"}
                    </button>
                  </div>
                </div>
              </div>
            </Tabs.Content>

            {/* Tools Tab */}
            <Tabs.Content value="tools">
              <ToolsTab />
            </Tabs.Content>

            {/* Pranks Tab */}
            <Tabs.Content value="pranks">
              <PranksTab />
            </Tabs.Content>

            {/* Ambient Tab */}
            <Tabs.Content value="ambient">
              <AmbientTab />
            </Tabs.Content>

            {/* Old Tools Tab - Hidden, keeping for reference */}
            <Tabs.Content value="tools-old" className="space-y-6 hidden">
              {/* Patterns */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Pattern Overlay
                  </label>
                  <Switch.Root
                    checked={pattern.enabled}
                    onCheckedChange={(checked) =>
                      setPattern({ enabled: checked })
                    }
                    className="w-11 h-6 bg-gray-700 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>

                {pattern.enabled && (
                  <div className="space-y-3 pl-4 border-l-2 border-gray-700">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">
                        Pattern Type
                      </label>
                      <select
                        value={pattern.type}
                        onChange={(e) =>
                          setPattern({
                            type: e.target.value as "grid" | "crosshair" | "test-pattern",
                          })
                        }
                        className="w-full px-3 py-2 bg-gray-800 text-white rounded text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="grid">Grid</option>
                        <option value="crosshair">Crosshair</option>
                        <option value="test-pattern">Test Pattern</option>
                      </select>
                    </div>

                    {pattern.type === "grid" && (
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">
                          Grid Size: {pattern.gridSize ?? 50}px
                        </label>
                        <Slider.Root
                          value={[pattern.gridSize ?? 50]}
                          onValueChange={([value]) =>
                            setPattern({ gridSize: value })
                          }
                          min={10}
                          max={200}
                          step={10}
                          className="relative flex items-center w-full h-5"
                        >
                          <Slider.Track className="bg-gray-700 relative flex-1 rounded-full h-2">
                            <Slider.Range className="absolute bg-white rounded-full h-full" />
                          </Slider.Track>
                          <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black" />
                        </Slider.Root>
                      </div>
                    )}

                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">
                        Opacity: {mounted ? Math.round((pattern.opacity ?? 0.3) * 100) : 30}%
                      </label>
                      <Slider.Root
                        value={[mounted ? (pattern.opacity ?? 0.3) * 100 : 30]}
                        onValueChange={([value]) =>
                          setPattern({ opacity: value / 100 })
                        }
                        min={0}
                        max={100}
                        step={1}
                        className="relative flex items-center w-full h-5"
                      >
                        <Slider.Track className="bg-gray-700 relative flex-1 rounded-full h-2">
                          <Slider.Range className="absolute bg-white rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black" />
                      </Slider.Root>
                    </div>
                  </div>
                )}
              </div>

              {/* Timer */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Timer
                  </label>
                  <Switch.Root
                    checked={timer.enabled}
                    onCheckedChange={(checked) =>
                      setTimer({ enabled: checked })
                    }
                    className="w-11 h-6 bg-gray-700 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>

                {timer.enabled && (
                  <div className="space-y-3 pl-4 border-l-2 border-gray-700">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">
                        Duration: {timer.duration}s
                      </label>
                      <Slider.Root
                        value={[timer.duration]}
                        onValueChange={([value]) =>
                          setTimer({ duration: value, remaining: value })
                        }
                        min={1}
                        max={3600}
                        step={1}
                        className="relative flex items-center w-full h-5"
                      >
                        <Slider.Track className="bg-gray-700 relative flex-1 rounded-full h-2">
                          <Slider.Range className="absolute bg-white rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black" />
                      </Slider.Root>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={timer.running ? stopTimer : startTimer}
                        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                      >
                        {timer.running ? "Stop" : "Start"}
                      </button>
                      <button
                        onClick={resetTimer}
                        className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Flicker */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Flicker/Strobe
                  </label>
                  <Switch.Root
                    checked={flicker.enabled}
                    onCheckedChange={(checked) =>
                      setFlicker({ enabled: checked })
                    }
                    className="w-11 h-6 bg-gray-700 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>

                {flicker.enabled && (
                  <div className="space-y-3 pl-4 border-l-2 border-gray-700">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">
                        Frequency: {flicker.frequency} Hz
                      </label>
                      <Slider.Root
                        value={[flicker.frequency]}
                        onValueChange={([value]) =>
                          setFlicker({ frequency: value })
                        }
                        min={0.1}
                        max={30}
                        step={0.1}
                        className="relative flex items-center w-full h-5"
                      >
                        <Slider.Track className="bg-gray-700 relative flex-1 rounded-full h-2">
                          <Slider.Range className="absolute bg-white rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black" />
                      </Slider.Root>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">
                        Intensity: {flicker.intensity}%
                      </label>
                      <Slider.Root
                        value={[flicker.intensity]}
                        onValueChange={([value]) =>
                          setFlicker({ intensity: value })
                        }
                        min={0}
                        max={100}
                        step={1}
                        className="relative flex items-center w-full h-5"
                      >
                        <Slider.Track className="bg-gray-700 relative flex-1 rounded-full h-2">
                          <Slider.Range className="absolute bg-white rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black" />
                      </Slider.Root>
                    </div>
                  </div>
                )}
              </div>

              {/* Auto-Cycle */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Auto-Cycle Colors
                  </label>
                  <Switch.Root
                    checked={autoCycle.enabled}
                    onCheckedChange={(checked) =>
                      setAutoCycle({ enabled: checked })
                    }
                    className="w-11 h-6 bg-gray-700 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                </div>

                {autoCycle.enabled && (
                  <div className="pl-4 border-l-2 border-gray-700">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">
                        Interval: {autoCycle.interval}s
                      </label>
                      <Slider.Root
                        value={[autoCycle.interval]}
                        onValueChange={([value]) =>
                          setAutoCycle({ interval: value })
                        }
                        min={1}
                        max={60}
                        step={1}
                        className="relative flex items-center w-full h-5"
                      >
                        <Slider.Track className="bg-gray-700 relative flex-1 rounded-full h-2">
                          <Slider.Range className="absolute bg-white rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black" />
                      </Slider.Root>
                    </div>
                  </div>
                )}
              </div>
            </Tabs.Content>

            {/* Export Tab */}
            <Tabs.Content value="export">
              <ExportTools />
            </Tabs.Content>

            {/* Settings Tab */}
            <Tabs.Content value="settings" className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                  Auto-hide Panel
                </label>
                <Switch.Root
                  checked={panelAutoHide}
                  onCheckedChange={(checked) =>
                    useAppStore.setState({ panelAutoHide: checked })
                  }
                  className="w-11 h-6 bg-gray-700 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
                </Switch.Root>
              </div>

              {panelAutoHide && (
                <div className="pl-4 border-l-2 border-gray-700">
                  <label className="text-xs text-gray-400 mb-1 block">
                    Hide Delay: {mounted ? panelHideDelay / 1000 : 3}s
                  </label>
                  <Slider.Root
                    value={[mounted ? panelHideDelay : 3000]}
                    onValueChange={([value]) =>
                      useAppStore.setState({ panelHideDelay: value })
                    }
                    min={1000}
                    max={10000}
                    step={500}
                    className="relative flex items-center w-full h-5"
                  >
                    <Slider.Track className="bg-gray-700 relative flex-1 rounded-full h-2">
                      <Slider.Range className="absolute bg-white rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black" />
                  </Slider.Root>
                </div>
              )}

              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Keyboard Shortcuts
                </h3>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>
                    <kbd className="px-2 py-1 bg-gray-800 rounded">F</kbd> or{" "}
                    <kbd className="px-2 py-1 bg-gray-800 rounded">F11</kbd>{" "}
                    - Toggle Fullscreen
                  </div>
                  <div>
                    <kbd className="px-2 py-1 bg-gray-800 rounded">Space</kbd>{" "}
                    - Cycle Colors
                  </div>
                  <div>
                    <kbd className="px-2 py-1 bg-gray-800 rounded">C</kbd> -
                    Toggle Controls
                  </div>
                  <div>
                    <kbd className="px-2 py-1 bg-gray-800 rounded">G</kbd> -
                    Toggle Grid
                  </div>
                  <div>
                    <kbd className="px-2 py-1 bg-gray-800 rounded">T</kbd> -
                    Start/Stop Timer
                  </div>
                  <div>
                    <kbd className="px-2 py-1 bg-gray-800 rounded">↑↓</kbd> -
                    Adjust Brightness
                  </div>
                  <div>
                    <kbd className="px-2 py-1 bg-gray-800 rounded">←→</kbd> -
                    Cycle Colors
                  </div>
                  <div>
                    <kbd className="px-2 py-1 bg-gray-800 rounded">1-9</kbd> -
                    Quick Select Colors
                  </div>
                </div>
              </div>
            </Tabs.Content>
          </Tabs.Root>
      </div>
    </div>
  );
}

