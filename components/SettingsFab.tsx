"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";

export function SettingsFab() {
  const {
    theme,
    setTheme,
    isFullscreen,
    pixelShifterEnabled,
    setPixelShifterEnabled,
    ecoMode,
    setEcoMode,
    showToast,
    masterKelvin,
    setMasterKelvin,
    masterBrightness,
    setMasterBrightness,
    multiMonitorSyncEnabled,
    setMultiMonitorSyncEnabled,
    setHealthDashboardOpen,
    settingsOpenNonce,
  } = useAppStore();
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const lastSettingsNonceRef = useRef(0);

  useEffect(() => {
    if (settingsOpenNonce > lastSettingsNonceRef.current) {
      lastSettingsNonceRef.current = settingsOpenNonce;
      setPanelOpen(true);
    }
  }, [settingsOpenNonce]);

  // Apply master brightness to body (store holds source of truth; sync can update it)
  useEffect(() => {
    document.body.style.filter = `brightness(${masterBrightness}%)`;
    return () => {
      document.body.style.filter = "";
    };
  }, [masterBrightness]);

  // Pixel Shifter: subtle 1px shift every 30s to reduce burn-in risk
  useEffect(() => {
    if (!pixelShifterEnabled) {
      document.body.style.paddingLeft = "";
      document.body.style.paddingTop = "";
      return;
    }
    const id = setInterval(() => {
      document.body.style.paddingLeft = `${Math.random() * 2}px`;
      document.body.style.paddingTop = `${Math.random() * 2}px`;
    }, 30000);
    return () => {
      clearInterval(id);
      document.body.style.paddingLeft = "";
      document.body.style.paddingTop = "";
    };
  }, [pixelShifterEnabled]);

  // Close panel when clicking outside
  useEffect(() => {
    if (!panelOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        btnRef.current?.contains(target)
      )
        return;
      setPanelOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [panelOpen]);

  const handleThemeClick = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    showToast(next === "dark" ? "Dark mode enabled" : "Light mode enabled");
  };

  if (isFullscreen) return null;

  return (
    <>
      <button
        ref={btnRef}
        id="settings-btn"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setPanelOpen((prev) => !prev);
        }}
        className="zen-ui fixed bottom-5 right-5 z-[1000] rounded-full w-12 h-12 flex items-center justify-center text-xl text-white border-0 cursor-pointer shadow-lg hover:opacity-90 transition-opacity"
        style={{
          background: "var(--accent-color)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
        aria-label="Open settings"
      >
        ⚙️
      </button>

      {panelOpen && (
        <div
          ref={panelRef}
          id="settings-panel"
          className="fixed bottom-20 right-5 w-[280px] rounded-xl p-5 shadow-xl z-[1000] border"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border-color)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          }}
        >
          <h3 className="mt-0 mb-4 text-lg font-semibold text-page">
            Master Controls
          </h3>

          <div className="mb-5">
            <label className="block text-page text-sm mb-1">Brightness</label>
            <input
              type="range"
              id="brightness-slider"
              min={20}
              max={100}
              value={masterBrightness}
              onChange={(e) =>
                setMasterBrightness(parseInt(e.target.value, 10))
              }
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) ${(masterBrightness - 20) / 80 * 100}%, var(--border-color) ${(masterBrightness - 20) / 80 * 100}%, var(--border-color) 100%)`,
              }}
            />
          </div>

          <div
            className="zen-ui mt-5 mb-5 border-t pt-4"
            style={{ borderColor: "var(--border-color)" }}
          >
            <label className="flex justify-between items-center text-sm text-page mb-2">
              <span>Warmth (Kelvin)</span>
              <span className="tabular-nums">{masterKelvin}K</span>
            </label>
            <input
              type="range"
              id="kelvin-slider"
              min={2000}
              max={10000}
              step={100}
              value={masterKelvin}
              onChange={(e) =>
                setMasterKelvin(parseInt(e.target.value, 10))
              }
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ff8c42 0%, #fff5e6 50%, #cfe8ff 100%)`,
              }}
              aria-valuemin={2000}
              aria-valuemax={10000}
              aria-valuenow={masterKelvin}
              aria-label="Color temperature in Kelvin"
            />
            <div className="flex justify-between text-[10px] text-page/60 mt-1.5">
              <span>Warm</span>
              <span>Cool</span>
            </div>
            <p className="text-page/60 text-[11px] mt-2 leading-snug">
              Sets display color from 2000K (warm) to 10000K (cool daylight).
            </p>
          </div>

          <div
            className="zen-ui flex justify-between items-center gap-3 mb-5 pb-5 border-b"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="min-w-0">
              <span className="text-page text-sm font-medium block">
                Multi-Monitor Sync
              </span>
              <span className="text-page/60 text-[10px] leading-tight block mt-0.5">
                Sync color, Kelvin & brightness across open tabs (local only).
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={multiMonitorSyncEnabled}
              onClick={() =>
                setMultiMonitorSyncEnabled(!multiMonitorSyncEnabled)
              }
              className={`relative shrink-0 w-11 h-6 rounded-full transition-colors border border-transparent ${
                multiMonitorSyncEnabled ? "" : "bg-page/25"
              }`}
              style={
                multiMonitorSyncEnabled
                  ? { background: "var(--accent-color)" }
                  : undefined
              }
              aria-label="Toggle multi-monitor sync"
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                  multiMonitorSyncEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setHealthDashboardOpen(true)}
            className="zen-ui w-full py-2.5 px-4 mb-5 rounded-lg border text-sm font-medium text-page cursor-pointer transition-opacity hover:opacity-90"
            style={{ borderColor: "var(--border-color)", background: "var(--card-bg)" }}
          >
            Monitor Health Check
          </button>

          <div className="flex justify-between items-center mb-5">
            <span className="text-page text-sm">OLED Eco-Mode</span>
            <button
              type="button"
              onClick={() => setEcoMode(!ecoMode)}
              className="px-3 py-1 rounded text-sm border border-card text-page hover:opacity-80"
            >
              {ecoMode ? "On" : "Off"}
            </button>
          </div>
          <p className="text-page/70 text-xs mb-4 -mt-2">
            Uses warm off-white instead of pure white to reduce battery drain on OLED/laptops.
          </p>

          <div className="flex justify-between items-center mb-5">
            <span className="text-page text-sm">Pixel Shifter</span>
            <button
              type="button"
              onClick={() => setPixelShifterEnabled(!pixelShifterEnabled)}
              className="px-3 py-1 rounded text-sm border border-card text-page hover:opacity-80"
            >
              {pixelShifterEnabled ? "On" : "Off"}
            </button>
          </div>
          <p className="text-page/70 text-xs mb-4 -mt-2">
            Shifts content by 1px every 30s to help prevent screen burn-in (OLED).
          </p>

          <div className="flex justify-between items-center mb-5">
            <span className="text-page text-sm">Night Mode</span>
            <button
              type="button"
              id="panel-theme-toggle"
              onClick={handleThemeClick}
              className="border-0 bg-transparent text-2xl cursor-pointer p-0 leading-none hover:opacity-80 transition-opacity"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => useAppStore.getState().toggleFullscreen()}
            className="w-full py-2.5 px-4 rounded-lg border-0 text-white cursor-pointer text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ background: "var(--accent-color)" }}
          >
            Toggle Fullscreen (F)
          </button>

          <p className="text-center text-page/70 text-xs mt-4">
            Press <b>ESC</b> to exit any tool.
          </p>
        </div>
      )}
    </>
  );
}
