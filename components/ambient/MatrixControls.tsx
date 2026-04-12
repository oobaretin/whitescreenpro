"use client";

import { useAppStore } from "@/lib/store";
import * as Slider from "@radix-ui/react-slider";

/** Tailwind cannot purge-build `bg-${name}-600`; keep full static strings */
const MATRIX_COLOR_ACTIVE: Record<
  "green" | "blue" | "red" | "white",
  string
> = {
  green: "bg-green-600 text-white ring-2 ring-green-400/80",
  blue: "bg-blue-600 text-white ring-2 ring-blue-400/80",
  red: "bg-red-600 text-white ring-2 ring-red-400/80",
  white: "bg-white text-gray-900 ring-2 ring-gray-400",
};

type MatrixCharset = "latin" | "japanese" | "numbers" | "binary";

const CHARSET_OPTIONS: {
  id: MatrixCharset;
  label: string;
  sample: string;
  activeClass: string;
}[] = [
  {
    id: "latin",
    label: "Latin & symbols",
    sample: "A-Z 0-9 @#",
    activeClass:
      "bg-slate-500 text-white ring-2 ring-slate-300/90",
  },
  {
    id: "japanese",
    label: "Japanese",
    sample: "アイウエオ…",
    activeClass:
      "bg-violet-600 text-white ring-2 ring-violet-300/90",
  },
  {
    id: "numbers",
    label: "Numbers only",
    sample: "0123456789",
    activeClass:
      "bg-cyan-600 text-white ring-2 ring-cyan-300/90",
  },
  {
    id: "binary",
    label: "Binary",
    sample: "01",
    activeClass:
      "bg-emerald-700 text-white ring-2 ring-emerald-400/80",
  },
];

export function MatrixControls() {
  const { matrix, setMatrix } = useAppStore();

  return (
    <div className="space-y-4 mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Matrix Rain</h3>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Color
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(["green", "blue", "red", "white"] as const).map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setMatrix({ color })}
              className={`px-4 py-2 rounded capitalize transition-colors ${
                matrix.color === color
                  ? MATRIX_COLOR_ACTIVE[color]
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
          Character set
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Same four sets as always; tap a row to switch.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CHARSET_OPTIONS.map(({ id, label, sample, activeClass }) => {
            const on = matrix.characterSet === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setMatrix({ characterSet: id })}
                className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  on
                    ? `${activeClass} border-transparent`
                    : "border-gray-600 bg-gray-800/80 text-gray-200 hover:bg-gray-700"
                }`}
              >
                <div className="text-sm font-semibold text-inherit">{label}</div>
                <div
                  className={`mt-0.5 font-mono text-xs ${
                    on ? "text-white/90" : "text-gray-400"
                  }`}
                >
                  {sample}
                </div>
              </button>
            );
          })}
        </div>
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


