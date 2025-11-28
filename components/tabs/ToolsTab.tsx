"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { useTranslation } from "@/hooks/useTranslation";
import { ZoomLighting } from "../tools/ZoomLighting";

export function ToolsTab() {
  const t = useTranslation();
  const { activeMode, setActiveMode } = useAppStore();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {/* Zoom Lighting - activates inline with display screen */}
        <button
          onClick={() => setActiveMode(activeMode === "zoom-lighting" ? "color" : "zoom-lighting")}
          className={`p-4 rounded-lg border-2 transition-all text-left ${
            activeMode === "zoom-lighting"
              ? "border-blue-500 bg-blue-500/10"
              : "border-gray-200 bg-gray-50 hover:border-gray-300"
          }`}
        >
          <div className="text-gray-900 font-medium mb-1">💡 {t.tools.zoomLighting}</div>
          <div className="text-xs text-gray-500">{t.tools.videoCallFillLight}</div>
        </button>

        {/* Signature - navigates to dedicated page */}
        <Link
          href="/signature-screen"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">✍️ {t.tools.signature}</div>
          <div className="text-xs text-gray-500">{t.tools.digitalSignatureCapture}</div>
        </Link>

        {/* Tip Screen - navigates to dedicated page */}
        <Link
          href="/tip-screen"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">💰 {t.tools.tipScreen}</div>
          <div className="text-xs text-gray-500">{t.tools.posTippingInterface}</div>
        </Link>

        {/* Dead Pixel Test - navigates to dedicated page */}
        <Link
          href="/dead-pixel-test"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">🔍 {t.tools.deadPixelTest}</div>
          <div className="text-xs text-gray-500">{t.tools.monitorTesting}</div>
        </Link>
      </div>

      {/* Only Zoom Lighting shows inline controls */}
      {activeMode === "zoom-lighting" && <ZoomLighting />}
    </div>
  );
}

