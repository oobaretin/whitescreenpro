"use client";

import { useAppStore } from "@/lib/store";

export function FlipClockControls() {
  return (
    <div className="space-y-4 mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Flip Clock</h3>
      <div className="p-3 bg-blue-900/30 rounded border border-blue-700/50">
        <p className="text-sm text-blue-200">
          🕐 <strong>Note:</strong> Displays a beautiful flip clock animation showing the current time.
        </p>
      </div>
    </div>
  );
}


