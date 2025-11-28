"use client";

import { useAppStore } from "@/lib/store";
import { getColorFromTemperature } from "@/lib/colorUtils";

export function ZoomLightingDisplay() {
  const { zoomLighting } = useAppStore();

  const displayColor =
    zoomLighting.preset === "custom"
      ? zoomLighting.customColor
      : getColorFromTemperature(zoomLighting.colorTemperature);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="w-full h-full"
        style={{
          backgroundColor: displayColor,
          opacity: zoomLighting.brightness / 100,
        }}
      />
      {/* Position guide overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="bg-black/70 text-white px-6 py-4 rounded-lg backdrop-blur-sm">
          <div className="text-lg font-semibold mb-2">💡 Zoom Lighting Active</div>
          <div className="text-sm text-gray-300">
            Place screen behind camera for optimal fill lighting
          </div>
        </div>
      </div>
    </div>
  );
}

