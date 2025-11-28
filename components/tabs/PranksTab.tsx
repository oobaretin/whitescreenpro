"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export function PranksTab() {
  const t = useTranslation();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/broken-screen"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">💥 {t.pranks.brokenScreen}</div>
          <div className="text-xs text-gray-500">Click-to-crack prank</div>
        </Link>

        <Link
          href="/bsod"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">💻 {t.pranks.bsod}</div>
          <div className="text-xs text-gray-500">Blue screen of death</div>
        </Link>

        <Link
          href="/fake-update"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">⏳ {t.pranks.fakeUpdate}</div>
          <div className="text-xs text-gray-500">System update screens</div>
        </Link>

        <Link
          href="/hacker-terminal"
          className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-gray-300 transition-all text-left block"
        >
          <div className="text-gray-900 font-medium mb-1">💻 {t.pranks.hackerTerminal}</div>
          <div className="text-xs text-gray-500">Matrix-style terminal</div>
        </Link>
      </div>
    </div>
  );
}

