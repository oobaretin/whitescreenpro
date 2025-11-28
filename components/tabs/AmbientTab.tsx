"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export function AmbientTab() {
  const t = useTranslation();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/dvd-screensaver"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">📀 {t.ambient.dvdScreensaver}</div>
          <div className="text-xs text-gray-500">Bouncing logo</div>
        </Link>

        <Link
          href="/matrix-rain"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">🌐 {t.ambient.matrixRain}</div>
          <div className="text-xs text-gray-500">Falling code</div>
        </Link>

        <Link
          href="/flip-clock"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">🕐 {t.ambient.flipClock}</div>
          <div className="text-xs text-gray-500">Digital clock</div>
        </Link>

        <Link
          href="/no-signal"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">📺 {t.ambient.noSignal}</div>
          <div className="text-xs text-gray-500">TV static</div>
        </Link>
      </div>
    </div>
  );
}

