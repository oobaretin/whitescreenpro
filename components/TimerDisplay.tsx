"use client";

import { useAppStore } from "@/lib/store";

export function TimerDisplay() {
  const { timer } = useAppStore();

  if (!timer.enabled || !timer.running) return null;

  const minutes = Math.floor(timer.remaining / 60);
  const seconds = timer.remaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
      <div className="bg-black/80 text-white px-6 py-3 rounded-lg text-2xl font-mono backdrop-blur-sm">
        {formattedTime}
      </div>
    </div>
  );
}

