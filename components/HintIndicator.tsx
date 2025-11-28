"use client";

import { useAppStore } from "@/lib/store";

export function HintIndicator() {
  const { showHint } = useAppStore();

  if (!showHint) return null;

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
      <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm animate-fade-out">
        Press <kbd className="px-2 py-1 bg-white/20 rounded">Space</kbd> for
        colors • <kbd className="px-2 py-1 bg-white/20 rounded">C</kbd> for
        controls
      </div>
    </div>
  );
}

