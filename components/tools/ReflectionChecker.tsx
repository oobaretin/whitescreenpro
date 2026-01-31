"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

type ReflectMode = "black" | "checkerboard" | "grid";

const MODE_LABELS: Record<ReflectMode, string> = {
  black: "Deep Black",
  checkerboard: "Checkerboard",
  grid: "Edge-to-Edge Grid",
};

export function ReflectionChecker() {
  const router = useRouter();
  const showToast = useAppStore((s) => s.showToast);
  const [mode, setMode] = useState<ReflectMode>("black");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  function setReflectMode(m: ReflectMode) {
    setMode(m);
    showToast(`Mode: ${MODE_LABELS[m]}`);
  }

  return (
    <div
      id="reflection-checker"
      className="fixed inset-0 z-[9994] bg-black"
      role="application"
      aria-label="Reflection and distortion checker"
    >
      {/* Deep Black: nothing else. Checkerboard: pattern. Grid: lines overlay. */}
      {mode === "checkerboard" && (
        <div
          id="checker-pattern"
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #111 25%, transparent 25%),
              linear-gradient(-45deg, #111 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #111 75%),
              linear-gradient(-45deg, transparent 75%, #111 75%)
            `,
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 0 20px, 20px 20px, 20px 0",
          }}
          aria-hidden
        />
      )}

      {mode === "grid" && (
        <div
          id="edge-grid"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />
      )}

      {/* Top bar */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-4 px-5 py-2.5 rounded-full border border-white/20"
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(5px)",
        }}
      >
        <button
          type="button"
          onClick={() => setReflectMode("black")}
          className="bg-transparent text-white border-none cursor-pointer font-semibold hover:opacity-90"
          aria-pressed={mode === "black"}
        >
          ⚫ Deep Black
        </button>
        <button
          type="button"
          onClick={() => setReflectMode("checkerboard")}
          className="bg-transparent text-white border-none cursor-pointer font-semibold hover:opacity-90"
          aria-pressed={mode === "checkerboard"}
        >
          🏁 Checkerboard
        </button>
        <button
          type="button"
          onClick={() => setReflectMode("grid")}
          className="bg-transparent text-white border-none cursor-pointer font-semibold hover:opacity-90"
          aria-pressed={mode === "grid"}
        >
          ⊞ Edge Grid
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="bg-transparent text-red-400 border-none cursor-pointer hover:opacity-90"
        >
          Exit
        </button>
      </div>

      {/* Bottom hint */}
      <div
        id="reflect-hint"
        className="absolute bottom-10 left-0 w-full text-center text-gray-500 font-sans text-sm"
      >
        Tip: Turn off your room lights to see micro-scratches, or turn them ON to find desk lamp glare.
      </div>
    </div>
  );
}
