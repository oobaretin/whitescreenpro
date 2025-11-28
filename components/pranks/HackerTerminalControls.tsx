"use client";

import { useAppStore } from "@/lib/store";

export function HackerTerminalControls() {
  return (
    <div className="space-y-4 mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Hacker Terminal</h3>
      <div className="p-3 bg-green-900/30 rounded border border-green-700/50">
        <p className="text-sm text-green-200">
          💻 <strong>Note:</strong> The terminal will display fake hacking commands automatically. 
          Perfect for pranks and content creation!
        </p>
      </div>
    </div>
  );
}


