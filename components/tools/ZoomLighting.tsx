"use client";

import { useAppStore } from "@/lib/store";
import { getColorFromTemperature } from "@/lib/colorUtils";
import * as Slider from "@radix-ui/react-slider";

export function ZoomLighting() {
  const { zoomLighting, setZoomLighting } = useAppStore();

  const handlePreset = (preset: "warm" | "neutral" | "cool") => {
    const temps = { warm: 3000, neutral: 5000, cool: 6500 };
    setZoomLighting({
      preset,
      colorTemperature: temps[preset],
      customColor: getColorFromTemperature(temps[preset]),
    });
  };

  const displayColor =
    zoomLighting.preset === "custom"
      ? zoomLighting.customColor
      : getColorFromTemperature(zoomLighting.colorTemperature);

  return (
    <div className="space-y-4 mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Zoom Lighting Setup</h3>

      {/* Presets */}
      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Preset Lighting
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handlePreset("warm")}
            className={`flex-1 px-4 py-2 rounded transition-colors ${
              zoomLighting.preset === "warm"
                ? "bg-orange-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Warm (3000K)
          </button>
          <button
            onClick={() => handlePreset("neutral")}
            className={`flex-1 px-4 py-2 rounded transition-colors ${
              zoomLighting.preset === "neutral"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Neutral (5000K)
          </button>
          <button
            onClick={() => handlePreset("cool")}
            className={`flex-1 px-4 py-2 rounded transition-colors ${
              zoomLighting.preset === "cool"
                ? "bg-cyan-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Cool (6500K)
          </button>
        </div>
      </div>

      {/* Color Temperature */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">
            Color Temperature
          </label>
          <span className="text-sm text-gray-400">
            {zoomLighting.colorTemperature}K
          </span>
        </div>
        <Slider.Root
          value={[zoomLighting.colorTemperature]}
          onValueChange={([value]) =>
            setZoomLighting({
              colorTemperature: value,
              preset: "custom",
              customColor: getColorFromTemperature(value),
            })
          }
          min={3000}
          max={6500}
          step={100}
          className="relative flex items-center w-full h-5"
        >
          <Slider.Track className="bg-gray-700 relative flex-1 rounded-full h-2">
            <Slider.Range className="absolute bg-gradient-to-r from-orange-500 via-white to-cyan-500 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black" />
        </Slider.Root>
      </div>

      {/* Brightness */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-300">Brightness</label>
          <span className="text-sm text-gray-400">{zoomLighting.brightness}%</span>
        </div>
        <Slider.Root
          value={[zoomLighting.brightness]}
          onValueChange={([value]) => setZoomLighting({ brightness: value })}
          min={0}
          max={100}
          step={1}
          className="relative flex items-center w-full h-5"
        >
          <Slider.Track className="bg-gray-700 relative flex-1 rounded-full h-2">
            <Slider.Range className="absolute bg-white rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black" />
        </Slider.Root>
      </div>

      {/* Custom Color */}
      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Custom Color (HEX)
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={displayColor}
            onChange={(e) =>
              setZoomLighting({
                customColor: e.target.value,
                preset: "custom",
              })
            }
            className="w-16 h-10 rounded border border-gray-600 cursor-pointer"
          />
          <input
            type="text"
            value={displayColor}
            onChange={(e) =>
              setZoomLighting({
                customColor: e.target.value,
                preset: "custom",
              })
            }
            placeholder="#FFFFFF"
            className="flex-1 px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Position Guide */}
      <div className="mt-4 p-3 bg-blue-900/30 rounded border border-blue-700/50">
        <p className="text-sm text-blue-200">
          💡 <strong>Tip:</strong> Place your screen behind your camera for optimal
          fill lighting. Adjust brightness based on your environment.
        </p>
      </div>
    </div>
  );
}

