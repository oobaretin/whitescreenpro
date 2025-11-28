"use client";

import { useAppStore } from "@/lib/store";

const PATTERNS = [
  { id: "pattern-1", src: "/images/broken-screen/pattern-1.png" },
  { id: "pattern-2", src: "/images/broken-screen/pattern-2.png" },
  { id: "pattern-3", src: "/images/broken-screen/pattern-3.png" },
  { id: "pattern-4", src: "/images/broken-screen/pattern-4.png" },
];

export function BrokenScreenOverlay() {
  const { activeMode, brokenScreen } = useAppStore();

  if (activeMode !== "broken-screen") return null;

  const selectedPattern = PATTERNS.find(p => p.id === brokenScreen.pattern) || PATTERNS[0];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      {/* Scale up slightly and position to crop out bottom camera icon */}
      <div className="absolute inset-0 scale-105" style={{ top: '-2%', bottom: '-5%' }}>
        <img
          src={selectedPattern.src}
          alt="Broken screen crack pattern"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}
