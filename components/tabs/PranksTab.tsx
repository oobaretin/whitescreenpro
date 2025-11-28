"use client";

import Link from "next/link";

export function PranksTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/broken-screen"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">💥 Broken Screen</div>
          <div className="text-xs text-gray-500">Click-to-crack prank</div>
        </Link>

        <Link
          href="/bsod"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">💻 BSOD</div>
          <div className="text-xs text-gray-500">Blue screen of death</div>
        </Link>

        <Link
          href="/fake-update"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">⏳ Fake Update</div>
          <div className="text-xs text-gray-500">System update screens</div>
        </Link>

        <Link
          href="/hacker-terminal"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">💻 Hacker Terminal</div>
          <div className="text-xs text-gray-500">Matrix-style terminal</div>
        </Link>
      </div>
    </div>
  );
}

