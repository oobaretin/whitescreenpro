"use client";

import { useAppStore } from "@/lib/store";
import * as Switch from "@radix-ui/react-switch";

export function NoSignalControls() {
  const { noSignal, setNoSignal } = useAppStore();

  return (
    <div className="space-y-4 mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">No Signal</h3>
      
      {/* Signal Type */}
      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Signal Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setNoSignal({ type: "static" })}
            className={`px-4 py-3 rounded transition-colors ${
              noSignal.type === "static"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <div className="font-medium">📺 TV Static</div>
            <div className="text-xs opacity-70">Classic noise</div>
          </button>
          <button
            onClick={() => setNoSignal({ type: "colorbars" })}
            className={`px-4 py-3 rounded transition-colors ${
              noSignal.type === "colorbars"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <div className="font-medium">🌈 Color Bars</div>
            <div className="text-xs opacity-70">90s test pattern</div>
          </button>
        </div>
      </div>
      
      {/* Soft Static Toggle - only show when static is selected */}
      {noSignal.type === "static" && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">
            Soft Static
          </label>
          <Switch.Root
            checked={noSignal.softStatic}
            onCheckedChange={(checked) => setNoSignal({ softStatic: checked })}
            className="w-11 h-6 bg-gray-700 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
          >
            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
      )}
      
      <div className="p-3 bg-gray-900/30 rounded border border-gray-700/50">
        <p className="text-sm text-gray-200">
          📺 <strong>Tip:</strong> {noSignal.type === "colorbars" 
            ? "Classic SMPTE color bars from 90s television!" 
            : "Toggle 'Soft Static' for a gentler, less harsh noise effect."}
        </p>
      </div>
    </div>
  );
}
