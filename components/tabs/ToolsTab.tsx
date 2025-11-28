"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { ZoomLighting } from "../tools/ZoomLighting";

export function ToolsTab() {
  const { activeMode, setActiveMode } = useAppStore();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {/* Zoom Lighting - activates inline with display screen */}
        <button
          onClick={() => setActiveMode(activeMode === "zoom-lighting" ? null : "zoom-lighting")}
          className={`p-4 rounded-lg border-2 transition-all text-left ${
            activeMode === "zoom-lighting"
              ? "border-blue-500 bg-blue-500/10"
              : "border-gray-200 bg-gray-50 hover:border-gray-300"
          }`}
        >
          <div className="text-gray-900 font-medium mb-1">💡 Zoom Lighting</div>
          <div className="text-xs text-gray-500">Video call fill light</div>
        </button>

        {/* Signature - navigates to dedicated page */}
        <Link
          href="/signature-screen"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">✍️ Signature</div>
          <div className="text-xs text-gray-500">Digital signature capture</div>
        </Link>

        {/* Tip Screen - navigates to dedicated page */}
        <Link
          href="/tip-screen"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">💰 Tip Screen</div>
          <div className="text-xs text-gray-500">POS tipping interface</div>
        </Link>

        {/* Dead Pixel Test - navigates to dedicated page */}
        <Link
          href="/dead-pixel-test"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">🔍 Dead Pixel Test</div>
          <div className="text-xs text-gray-500">Monitor testing</div>
        </Link>
      </div>

      {/* Only Zoom Lighting shows inline controls */}
      {activeMode === "zoom-lighting" && <ZoomLighting />}
    </div>
  );
}

