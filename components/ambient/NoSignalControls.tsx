"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import * as Switch from "@radix-ui/react-switch";

export function NoSignalControls() {
  const { noSignal, setNoSignal } = useAppStore();
  const [panelHidden, setPanelHidden] = useState(false);

  if (panelHidden) {
    return (
      <div className="flex justify-center border-t border-gray-600 bg-gray-950/90 py-2 px-3 rounded-t-xl backdrop-blur-md shadow-[0_-8px_24px_rgba(0,0,0,0.45)]">
        <button
          type="button"
          onClick={() => setPanelHidden(false)}
          className="rounded-full border border-gray-600 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100 shadow-md transition-colors hover:bg-gray-700"
          aria-expanded={false}
        >
          Show No Signal options
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-3 rounded-t-xl border-t border-gray-600 bg-gray-950/95 backdrop-blur-md shadow-[0_-12px_32px_rgba(0,0,0,0.55)]">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-white leading-tight">
          No Signal
        </h3>
        <button
          type="button"
          onClick={() => setPanelHidden(true)}
          className="shrink-0 rounded-md border border-gray-600 bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-200 transition-colors hover:bg-gray-700"
          aria-expanded
        >
          Hide
        </button>
      </div>
      <p className="text-[11px] text-gray-500 -mt-1 mb-1">
        Docked for fullscreen; use Hide for an unobstructed view.
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
