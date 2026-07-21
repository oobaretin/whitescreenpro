"use client";

import { useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";

const CHANGELOG_SEEN_KEY = "whitescreentools-v2.2-seen";

export function ChangelogModal() {
  const changelogOpen = useAppStore((s) => s.changelogOpen);
  const setChangelogOpen = useAppStore((s) => s.setChangelogOpen);

  const handleClose = useCallback(() => {
    setChangelogOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(CHANGELOG_SEEN_KEY, "true");
    }
  }, [setChangelogOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && changelogOpen) handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changelogOpen, handleClose]);

  if (!changelogOpen) return null;

  return (
    <div
      id="changelog-modal"
      className="fixed inset-0 z-[20000] bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="changelog-title"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] rounded-2xl p-8 shadow-2xl bg-card text-page border border-card"
        style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="changelog-title" className="text-xl font-bold mt-0 mb-1 text-page">
          Release Notes
        </h2>
        <p className="text-sm text-page/70 mb-4">Version 2.2</p>
        <div className="max-h-[350px] overflow-y-auto text-left pr-2">
          <h4
            className="text-sm font-semibold mt-4 mb-2 first:mt-0"
            style={{ color: "var(--accent-color)" }}
          >
            Discover &amp; personalize
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-page/90 mb-4">
            <li>
              <strong>Tool search &amp; categories</strong> — filter 28+ tools on the
              homepage.
            </li>
            <li>
              <strong>Pinned favorites</strong> — star tools for quick access (up to 8).
            </li>
            <li>
              <strong>Recently used</strong> — jump back to tools you opened lately.
            </li>
            <li>
              <strong>Quick start presets</strong> — Photography, video call, monitor
              test, chroma key.
            </li>
          </ul>
          <h4 className="text-sm font-semibold mt-4 mb-2" style={{ color: "var(--accent-color)" }}>
            Share, stream &amp; sync
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-page/90 mb-4">
            <li>
              <strong>Share links restore settings</strong> — color, brightness, Kelvin
              from the URL.
            </li>
            <li>
              <strong>Tool deep links</strong> — e.g. dead-pixel auto-cycle, flicker
              params.
            </li>
            <li>
              <strong>OBS overlay mode</strong> — add <code>?obs=1</code> for a clean
              browser source.
            </li>
            <li>
              <strong>Multi-monitor layout presets</strong> — open matched pairs from
              settings.
            </li>
          </ul>
          <h4 className="text-sm font-semibold mt-4 mb-2" style={{ color: "var(--accent-color)" }}>
            Quality &amp; accessibility
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-page/90 mb-4">
            <li>
              <strong>Keyboard shortcuts modal</strong> — press <b>?</b> or use the
              footer link.
            </li>
            <li>
              <strong>Monitor Health PDF</strong> — export a report after the wizard.
            </li>
            <li>
              <strong>Reduced motion</strong> — respects system preference site-wide.
            </li>
            <li>
              <strong>Per-tool social previews</strong> — unique OG images when sharing.
            </li>
            <li>
              <strong>Faster loads</strong> — lazy-loaded translations and code-split
              tools.
            </li>
          </ul>
        </div>
        <button
          id="close-changelog"
          type="button"
          onClick={handleClose}
          className="mt-6 w-full py-3 rounded-lg font-semibold text-white border-none cursor-pointer transition-opacity hover:opacity-90"
          style={{ background: "var(--accent-color)" }}
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

export { CHANGELOG_SEEN_KEY };
