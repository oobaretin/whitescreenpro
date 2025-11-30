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
    <div className="space-y-4">
      {/* Presets */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Preset Lighting
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handlePreset("warm")}
            className={`flex-1 px-4 py-2 rounded transition-colors ${
              zoomLighting.preset === "warm"
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Warm (3000K)
          </button>
          <button
            onClick={() => handlePreset("neutral")}
            className={`flex-1 px-4 py-2 rounded transition-colors ${
              zoomLighting.preset === "neutral"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Neutral (5000K)
          </button>
          <button
            onClick={() => handlePreset("cool")}
            className={`flex-1 px-4 py-2 rounded transition-colors ${
              zoomLighting.preset === "cool"
                ? "bg-cyan-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Cool (6500K)
          </button>
        </div>
      </div>

      {/* Color Temperature */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Color Temperature
          </label>
          <span className="text-sm text-gray-600">
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
          <Slider.Track className="bg-gray-200 relative flex-1 rounded-full h-2">
            <Slider.Range className="absolute bg-gradient-to-r from-orange-500 via-white to-cyan-500 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-gray-800 rounded-full shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-white" />
        </Slider.Root>
      </div>

      {/* Brightness */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Brightness</label>
          <span className="text-sm text-gray-600">{zoomLighting.brightness}%</span>
        </div>
        <Slider.Root
          value={[zoomLighting.brightness]}
          onValueChange={([value]) => setZoomLighting({ brightness: value })}
          min={0}
          max={100}
          step={1}
          className="relative flex items-center w-full h-5"
        >
          <Slider.Track className="bg-gray-200 relative flex-1 rounded-full h-2">
            <Slider.Range className="absolute bg-gray-800 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-gray-800 rounded-full shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-white" />
        </Slider.Root>
      </div>

      {/* Custom Color */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
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
            className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
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
            className="flex-1 px-3 py-2 bg-white text-gray-900 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Position Guide */}
      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Place your screen behind your camera for optimal
          fill lighting. Adjust brightness based on your environment.
        </p>
      </div>
    </div>
  );
}

