"use client";

import { useAppStore } from "@/lib/store";
import * as Slider from "@radix-ui/react-slider";

export function DVDControls() {
  const { dvd, setDVD } = useAppStore();

  return (
    <div className="space-y-4 mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">DVD Screensaver</h3>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Logo Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["dvd", "bluray", "custom"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setDVD({ logoType: type })}
              className={`px-3 py-2 rounded text-sm transition-colors capitalize ${
                dvd.logoType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {type === "custom" ? "Custom" : type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {dvd.logoType === "custom" && (
        <>
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Custom Logo Text
            </label>
            <input
              type="text"
              value={dvd.customLogo || ""}
              onChange={(e) => setDVD({ customLogo: e.target.value })}
              placeholder="Enter text"
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Font
            </label>
            <select
              value={dvd.customFont}
              onChange={(e) => setDVD({ customFont: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Verdana">Verdana</option>
              <option value="Georgia">Georgia</option>
              <option value="Palatino">Palatino</option>
              <option value="Garamond">Garamond</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
              <option value="Impact">Impact</option>
              <option value="Trebuchet MS">Trebuchet MS</option>
              <option value="Lucida Console">Lucida Console</option>
              <option value="Monaco">Monaco</option>
              <option value="Consolas">Consolas</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Lato">Lato</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Oswald">Oswald</option>
              <option value="Raleway">Raleway</option>
            </select>
          </div>
        </>
      )}

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Speed: {dvd.speed}px/frame
        </label>
        <Slider.Root
          value={[dvd.speed]}
          onValueChange={([value]) => setDVD({ speed: value })}
          min={1}
          max={10}
          step={0.5}
          className="relative flex items-center w-full h-5"
        >
          <Slider.Track className="bg-gray-700 relative flex-1 rounded-full h-2">
            <Slider.Range className="absolute bg-white rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg" />
        </Slider.Root>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Logo Size: {dvd.logoSize}px
        </label>
        <Slider.Root
          value={[dvd.logoSize]}
          onValueChange={([value]) => setDVD({ logoSize: value })}
          min={50}
          max={300}
          step={10}
          className="relative flex items-center w-full h-5"
        >
          <Slider.Track className="bg-gray-700 relative flex-1 rounded-full h-2">
            <Slider.Range className="absolute bg-white rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg" />
        </Slider.Root>
      </div>

      <div className="p-3 bg-purple-900/30 rounded border border-purple-700/50">
        <p className="text-sm text-purple-200">
          📀 <strong>Corner Hits:</strong> {dvd.cornerHits} - Try to hit all four corners!
        </p>
      </div>
    </div>
  );
}


