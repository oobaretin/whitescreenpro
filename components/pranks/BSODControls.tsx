"use client";

import { useAppStore } from "@/lib/store";
import { useTranslation } from "@/hooks/useTranslation";

export function BSODControls() {
  const t = useTranslation();
  const { bsod, setBSOD } = useAppStore();

  return (
    <div className="space-y-4 mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">{t.pranks.bsod}</h3>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Windows Version
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["xp", "7", "10", "11"] as const).map((version) => (
            <button
              key={version}
              onClick={() => setBSOD({ version })}
              className={`px-4 py-2 rounded transition-colors ${
                bsod.version === version
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Windows {version === "xp" ? "XP" : version}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          {t.bsod.customError} (Optional)
        </label>
        <input
          type="text"
          value={bsod.customMessage}
          onChange={(e) => setBSOD({ customMessage: e.target.value })}
          placeholder="Enter custom error message"
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          {t.bsod.errorCode} (Optional)
        </label>
        <input
          type="text"
          value={bsod.customCode}
          onChange={(e) => setBSOD({ customCode: e.target.value })}
          placeholder="e.g., 0x0000007E"
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="p-3 bg-blue-900/30 rounded border border-blue-700/50">
        <p className="text-sm text-blue-200">
          💻 <strong>Tip:</strong> Custom messages will appear at the bottom of the screen. Use &quot;Toggle Fullscreen&quot; for the full prank effect!
        </p>
      </div>
    </div>
  );
}

