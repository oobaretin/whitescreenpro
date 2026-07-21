"use client";

import Link from "next/link";
import { MONITOR_LAYOUT_PRESETS } from "@/lib/monitorLayouts";

export function MonitorLayoutPresets() {
  return (
    <div
      className="zen-ui mb-5 pb-5 border-b space-y-3"
      style={{ borderColor: "var(--border-color)" }}
    >
      <div>
        <span className="text-page text-sm font-medium block">Layout presets</span>
        <span className="text-page/60 text-[10px] leading-tight block mt-0.5">
          Open one link per monitor. Enable sync above so color changes match.
        </span>
      </div>
      <ul className="space-y-2">
        {MONITOR_LAYOUT_PRESETS.map((preset) => (
          <li
            key={preset.id}
            className="rounded-lg border p-2.5"
            style={{ borderColor: "var(--border-color)" }}
          >
            <p className="text-page text-xs font-medium">{preset.label}</p>
            <p className="text-page/55 text-[10px] mb-2">{preset.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {preset.monitors.map((mon) => (
                <Link
                  key={mon.href}
                  href={mon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] px-2 py-1 rounded border text-page hover:opacity-90"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  {mon.label}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
