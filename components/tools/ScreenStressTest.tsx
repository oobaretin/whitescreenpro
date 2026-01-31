"use client";

import { useState, useEffect, useRef } from "react";

const SPECTRUM = [
  "#FF0000", "#FF3300", "#FF6600", "#FF9900", "#FFCC00", "#FFFF00",
  "#CCFF00", "#99FF00", "#66FF00", "#33FF00", "#00FF00", "#00FF33",
  "#00FF66", "#00FF99", "#00FFCC", "#00FFFF", "#00CCFF", "#0099FF",
  "#0066FF", "#0033FF", "#0000FF", "#3300FF", "#6600FF", "#9900FF",
  "#CC00FF", "#FF00FF", "#FF00CC", "#FF0099", "#FF0066", "#FF0033",
  "#FFFFFF", "#000000",
];

const CYCLE_MS = 150;

export function ScreenStressTest() {
  const [colorIndex, setColorIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setColorIndex((i) => (i + 1) % SPECTRUM.length);
    }, CYCLE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col" role="application" aria-label="Screen stress test - rapid color cycle">
      {/* Epilepsy / flashing lights warning - always visible */}
      <div
        className="relative z-20 flex items-center justify-center gap-2 px-4 py-3 text-center text-sm font-semibold text-black bg-amber-300 border-b-2 border-amber-500"
        role="alert"
      >
        <span className="text-lg" aria-hidden>⚠️</span>
        <span>
          Flashing lights warning: This tool cycles through bright colors rapidly. Do not use if you are sensitive to flashing lights or have photosensitive epilepsy.
        </span>
      </div>
      {/* Cycling color area */}
      <div
        className="flex-1 w-full transition-colors duration-75"
        style={{ backgroundColor: SPECTRUM[colorIndex] }}
        aria-hidden
      />
    </div>
  );
}
