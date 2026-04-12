"use client";

import { useAppStore } from "@/lib/store";
import * as Switch from "@radix-ui/react-switch";

export function NoSignalControls() {
  const { noSignal, setNoSignal } = useAppStore();

  return (
    <div className="space-y-3 p-3 rounded-t-xl border-t border-gray-600 bg-gray-950/95 backdrop-blur-md shadow-[0_-12px_32px_rgba(0,0,0,0.55)]">
      <h3 className="text-base font-semibold text-white mb-1">No Signal</h3>
      <p className="text-[11px] text-gray-500 mb-2">
        Docked on the canvas so these controls stay visible in browser fullscreen.
      </p>

      {/* Signal Type */}
      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Signal type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setNoSignal({ type: "static" })}
            className={`px-4 py-3 rounded-lg text-left transition-colors ${
              noSignal.type === "static"
                ? "bg-blue-600 text-white ring-2 ring-blue-300/80"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <div className="font-medium">📺 TV static</div>
            <div className="text-xs opacity-80">Classic noise</div>
          </button>
          <button
            type="button"
            onClick={() => setNoSignal({ type: "colorbars" })}
            className={`px-4 py-3 rounded-lg text-left transition-colors ${
              noSignal.type === "colorbars"
                ? "bg-violet-600 text-white ring-2 ring-violet-300/80"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <div className="font-medium">🌈 Color bars</div>
            <div className="text-xs opacity-80">SMPTE-style pattern</div>
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
