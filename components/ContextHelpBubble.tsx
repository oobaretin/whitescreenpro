"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { resolveContextHelp } from "@/lib/contextHelp";

/**
 * Bottom-left ? bubble + contextual tooltip (zen-ui: fades with Zen Mode).
 * Pulse briefly when route / tool context changes.
 */
export function ContextHelpBubble() {
  const pathname = usePathname();
  const activeMode = useAppStore((s) => s.activeMode);
  const isFullscreen = useAppStore((s) => s.isFullscreen);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastContextKey = useRef<string>("");

  const help = resolveContextHelp(pathname ?? "/", activeMode);
  const contextKey = `${pathname}|${activeMode}`;

  useEffect(() => {
    if (contextKey === lastContextKey.current) return;
    lastContextKey.current = contextKey;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 6500);
    return () => clearTimeout(t);
  }, [contextKey]);

  const showTooltip = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setTooltipOpen(true);
  }, []);

  const scheduleHideTooltip = useCallback(() => {
    hideTimer.current = setTimeout(() => {
      setTooltipOpen(false);
      hideTimer.current = null;
    }, 280);
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  if (isFullscreen) return null;

  const tooltipId = "context-help-tooltip";

  return (
    <>
      <button
        type="button"
        id="info-trigger"
        className={`zen-ui fixed bottom-8 left-8 z-[10004] flex h-10 w-10 cursor-help items-center justify-center rounded-full border transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-color)] ${
          pulse ? "hint-pulse" : ""
        }`}
        style={{
          background: "rgba(255,255,255,0.12)",
          borderColor: "rgba(255,255,255,0.22)",
          backdropFilter: "blur(5px)",
          boxShadow: pulse ? undefined : "0 2px 12px rgba(0,0,0,0.15)",
        }}
        aria-label="Context help"
        aria-expanded={tooltipOpen}
        aria-describedby={tooltipOpen ? tooltipId : undefined}
        onMouseEnter={showTooltip}
        onMouseLeave={scheduleHideTooltip}
        onFocus={showTooltip}
        onBlur={scheduleHideTooltip}
      >
        <span
          className="font-serif text-lg font-bold leading-none text-white drop-shadow-sm"
          aria-hidden
        >
          ?
        </span>
      </button>

      <div
        id={tooltipId}
        role="tooltip"
        className={`zen-ui pointer-events-none fixed bottom-[5.5rem] left-8 z-[10005] w-[280px] rounded-[15px] border border-card p-5 shadow-2xl transition-opacity duration-300 bg-card text-page ${
          tooltipOpen ? "opacity-100" : "opacity-0 invisible"
        }`}
        aria-hidden={!tooltipOpen}
        style={{
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          borderLeftWidth: 4,
          borderLeftColor: "var(--accent-color)",
        }}
      >
        <h4 className="m-0 mb-2.5 text-base font-semibold text-page">
          {help.title}
        </h4>
        <p className="m-0 text-[13px] leading-relaxed text-page/70">
          {help.text}
        </p>
      </div>
    </>
  );
}
