"use client";

import Link from "next/link";

export function AmbientTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/dvd-screensaver"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">📀 DVD Screensaver</div>
          <div className="text-xs text-gray-500">Bouncing logo</div>
        </Link>

        <Link
          href="/matrix-rain"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">🌐 Matrix Rain</div>
          <div className="text-xs text-gray-500">Falling code</div>
        </Link>

        <Link
          href="/flip-clock"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">🕐 Flip Clock</div>
          <div className="text-xs text-gray-500">Digital clock</div>
        </Link>

        <Link
          href="/no-signal"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">📺 No Signal</div>
          <div className="text-xs text-gray-500">TV static</div>
        </Link>
      </div>
    </div>
  );
}

