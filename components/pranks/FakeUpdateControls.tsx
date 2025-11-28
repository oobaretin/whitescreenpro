"use client";

import { useAppStore } from "@/lib/store";

export function FakeUpdateControls() {
  const { fakeUpdate, setFakeUpdate } = useAppStore();

  return (
    <div className="space-y-4 mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Fake System Update</h3>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Update Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["windows", "macos"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFakeUpdate({ type, progress: 0 })}
              className={`px-4 py-2 rounded capitalize transition-colors ${
                fakeUpdate.type === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {type === "macos" ? "macOS" : "Windows"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">
          Freeze Progress
        </label>
        <input
          type="checkbox"
          checked={fakeUpdate.frozen}
          onChange={(e) => setFakeUpdate({ frozen: e.target.checked })}
          className="w-4 h-4"
        />
      </div>

      <div className="p-3 bg-yellow-900/30 rounded border border-yellow-700/50">
        <p className="text-sm text-yellow-200">
          ⏳ <strong>Note:</strong> The progress bar will automatically advance. Enable &quot;Freeze Progress&quot; to stop it.
        </p>
      </div>
    </div>
  );
}


