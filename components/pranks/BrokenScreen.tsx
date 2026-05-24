"use client";

import { useAppStore } from "@/lib/store";
import Image from "next/image";

const PATTERNS = [
  { id: "pattern-1", name: "Shattered Web", src: "/images/broken-screen/pattern-1.png" },
  { id: "pattern-2", name: "Crack Pattern 1", src: "/images/broken-screen/A540D4DB-A25F-4FE5-81CE-A2C4825365F1.jpeg" },
  { id: "pattern-3", name: "Impact Point", src: "/images/broken-screen/pattern-3.png" },
  { id: "pattern-4", name: "Spider Crack", src: "/images/broken-screen/pattern-4.png" },
  { id: "pattern-5", name: "Crack Pattern 2", src: "/images/broken-screen/7A515A49-2903-4B2A-A524-A5CCDEC64CE8.jpeg" },
];

export function BrokenScreen() {
  const { brokenScreen, setBrokenScreen, setActiveMode, activeMode } = useAppStore();

  const handlePatternSelect = (patternId: string) => {
    setBrokenScreen({ pattern: patternId });

    // Play a subtle click sound
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.frequency.setValueAtTime(150, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
      osc.start();
      osc.stop(audioContext.currentTime + 0.08);
    } catch (e) {}
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-page">Broken Screen</h3>
        <button
          onClick={() => setActiveMode(activeMode === "broken-screen" ? "color" : "broken-screen")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeMode === "broken-screen"
              ? "bg-red-600 text-white"
              : "bg-page border border-card text-page/90 hover:opacity-90"
          }`}
        >
          {activeMode === "broken-screen" ? "Active" : "Activate"}
        </button>
      </div>

      <p className="text-sm text-page/70">Select a crack pattern:</p>

      {/* Pattern selector */}
      <div className="grid grid-cols-2 gap-3">
        {PATTERNS.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => handlePatternSelect(pattern.id)}
            className={`relative p-2 rounded-xl border-2 transition-all ${
              brokenScreen.pattern === pattern.id
                ? "border-[color:var(--accent-color)] bg-card ring-1 ring-[color:var(--accent-color)]"
                : "border-card bg-page hover:border-page/30 hover:bg-card"
            }`}
          >
            {/* Pattern preview - cropped to hide camera icon */}
            <div className="relative w-full aspect-video rounded-lg bg-black overflow-hidden mb-2">
              <div className="absolute inset-0 scale-110" style={{ top: '-5%', bottom: '-10%' }}>
                <Image
                  src={pattern.src}
                  alt={`Broken screen pattern: ${pattern.name} for monitor prank`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 50vw, 200px"
                />
              </div>
            </div>
            <div className="text-xs font-medium text-page/90 truncate">
              {pattern.name}
            </div>
          </button>
        ))}
      </div>

      {activeMode === "broken-screen" && (
        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            💥 Click <strong>fullscreen</strong> for the best prank effect!
          </p>
        </div>
      )}
    </div>
  );
}
