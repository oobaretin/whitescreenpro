"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";

const MASTER_BRIGHTNESS_KEY = "whitescreentools-master-brightness";

export function SettingsFab() {
  const { theme, setTheme, isFullscreen, pixelShifterEnabled, setPixelShifterEnabled } = useAppStore();
  const [panelOpen, setPanelOpen] = useState(false);
  const [masterBrightness, setMasterBrightness] = useState(100);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Hydrate master brightness from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(MASTER_BRIGHTNESS_KEY);
    const val = stored ? Math.min(100, Math.max(20, parseInt(stored, 10))) : 100;
    setMasterBrightness(val);
  }, []);

  // Apply master brightness to body and persist
  useEffect(() => {
    document.body.style.filter = `brightness(${masterBrightness}%)`;
    if (typeof window !== "undefined") {
      localStorage.setItem(MASTER_BRIGHTNESS_KEY, String(masterBrightness));
    }
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
        className="fixed bottom-5 right-5 z-[1000] rounded-full w-12 h-12 flex items-center justify-center text-xl text-white border-0 cursor-pointer shadow-lg hover:opacity-90 transition-opacity"
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
