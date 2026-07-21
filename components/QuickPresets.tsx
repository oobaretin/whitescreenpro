"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { QUICK_PRESETS } from "@/lib/presets";

export function QuickPresets() {
  const setHealthDashboardOpen = useAppStore((s) => s.setHealthDashboardOpen);

  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-page/70 uppercase tracking-wide mb-3">
        Quick start
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {QUICK_PRESETS.map((preset) => {
          const inner = (
            <>
              <span className="text-2xl mb-2 block" aria-hidden="true">
                {preset.icon}
              </span>
              <span className="font-medium text-page block">{preset.label}</span>
              <span className="text-xs text-page/60 mt-0.5 block">{preset.desc}</span>
            </>
          );
          const className =
            "tool-card text-left p-4 rounded-xl border border-card bg-card/80 hover:bg-card transition-colors";

          if ("href" in preset) {
            return (
              <Link key={preset.id} href={preset.href} className={className}>
                {inner}
              </Link>
            );
          }

          return (
            <button
              key={preset.id}
              type="button"
              className={`${className} w-full cursor-pointer`}
              aria-label={`${preset.label}: ${preset.desc}`}
              onClick={() => setHealthDashboardOpen(true)}
            >
              {inner}
            </button>
          );
        })}
      </div>
    </div>
  );
}
