"use client";

import { useAppStore } from "@/lib/store";
import * as Slider from "@radix-ui/react-slider";

export function MatrixControls() {
  const { matrix, setMatrix } = useAppStore();

  return (
    <div className="space-y-4 mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Matrix Rain</h3>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Color
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(["green", "blue", "red", "white"] as const).map((color) => (
            <button
              key={color}
              onClick={() => setMatrix({ color })}
              className={`px-4 py-2 rounded capitalize transition-colors ${
                matrix.color === color
                  ? `bg-${color}-600 text-white`
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Character Set
        </label>
        <select
          value={matrix.characterSet}
          onChange={(e) =>
            setMatrix({
              characterSet: e.target.value as "latin" | "japanese" | "numbers" | "binary",
            })
          }
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="latin">Latin (A-Z, 0-9)</option>
          <option value="japanese">Japanese</option>
          <option value="numbers">Numbers Only</option>
          <option value="binary">Binary (0-1)</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Speed: {matrix.speed} FPS
        </label>
        <Slider.Root
          value={[matrix.speed]}
          onValueChange={([value]) => setMatrix({ speed: value })}
          min={10}
          max={120}
          step={5}
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
          Density: {matrix.density}%
        </label>
        <Slider.Root
          value={[matrix.density]}
          onValueChange={([value]) => setMatrix({ density: value })}
          min={10}
          max={100}
          step={5}
          className="relative flex items-center w-full h-5"
        >
          <Slider.Track className="bg-gray-700 relative flex-1 rounded-full h-2">
            <Slider.Range className="absolute bg-white rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg" />
        </Slider.Root>
      </div>
    </div>
  );
}


