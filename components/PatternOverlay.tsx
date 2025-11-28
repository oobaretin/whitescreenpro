"use client";

import { PatternConfig } from "@/lib/store";

interface PatternOverlayProps {
  pattern: PatternConfig;
}

export function PatternOverlay({ pattern }: PatternOverlayProps) {
  if (!pattern.enabled) return null;

  const opacity = pattern.opacity ?? 0.3;
  const gridSize = pattern.gridSize ?? 50;

  if (pattern.type === "grid") {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
    );
  }

  if (pattern.type === "crosshair") {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white transform -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white transform -translate-x-1/2" />
      </div>
    );
  }

  if (pattern.type === "test-pattern") {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        {/* Test pattern with color blocks */}
        <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-white" />
        <div className="absolute top-0 left-1/4 w-1/4 h-1/4 bg-red-500" />
        <div className="absolute top-0 left-2/4 w-1/4 h-1/4 bg-green-500" />
        <div className="absolute top-0 left-3/4 w-1/4 h-1/4 bg-blue-500" />
        <div className="absolute top-1/4 left-0 w-1/4 h-1/4 bg-yellow-500" />
        <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-cyan-500" />
        <div className="absolute top-1/4 left-2/4 w-1/4 h-1/4 bg-magenta-500" />
        <div className="absolute top-1/4 left-3/4 w-1/4 h-1/4 bg-black" />
        {/* Add more test pattern blocks as needed */}
      </div>
    );
  }

  return null;
}

