"use client";

import { useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";

const CHANGELOG_SEEN_KEY = "whitescreentools-v2.1-seen";

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
        <p className="text-sm text-page/70 mb-4">Version 2.1</p>
        <div className="max-h-[350px] overflow-y-auto text-left pr-2">
          <h4 className="text-sm font-semibold mt-4 mb-2 first:mt-0" style={{ color: "var(--accent-color)" }}>
            Zen Mode, warmth, sync &amp; help
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-page/90 mb-4">
            <li>
              <strong>Zen Mode:</strong> On tool pages, after a few seconds without input the cursor hides and extra UI fades away; move the mouse or use the keyboard to bring everything back (smooth transitions).
            </li>
            <li>
              <strong>Master warmth (Kelvin):</strong> Fine-tune white balance with a Kelvin-based warmth slider in Master Controls.
            </li>
            <li>
              <strong>Multi-monitor sync:</strong> Optionally match color, brightness, and warmth across other tabs or windows on this device—local only, nothing sent to a server.
            </li>
            <li>
              <strong>Monitor Health Check:</strong> Step-by-step wizard (dead pixels, bleed, gray uniformity, motion blur), including the gray screen tool—open from the footer or settings.
            </li>
            <li>
              <strong>Context help:</strong> Bottom-left <strong>?</strong> button with short tips for each tool; a quick pulse when you change page or mode.
            </li>
          </ul>
          <h4 className="text-sm font-semibold mt-4 mb-2" style={{ color: "var(--accent-color)" }}>
            🚀 New Power Tools
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-page/90 mb-4">
            <li><strong>OLED Burn-In Fixer:</strong> Restore stuck pixels with high-speed RGB static.</li>
            <li><strong>Motion Blur Test:</strong> High-refresh-rate UFO test for gamers.</li>
            <li><strong>Pro Screen Ruler:</strong> Calibrated units (px, in, cm) for designers.</li>
          </ul>
          <h4 className="text-sm font-semibold mt-4 mb-2" style={{ color: "var(--accent-color)" }}>
            ✨ UX & Performance
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-page/90 mb-4">
            <li><strong>Master Settings:</strong> Control brightness and themes from one central hub.</li>
            <li><strong>Offline Mode (PWA):</strong> Install the app and use tools without Wi-Fi.</li>
            <li><strong>Reading Light:</strong> New &quot;Amber Mode&quot; with breathing animation for eye comfort.</li>
          </ul>
          <h4 className="text-sm font-semibold mt-4 mb-2" style={{ color: "var(--accent-color)" }}>
            🛡️ Safety & Tools
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-page/90">
            <li><strong>Reflection Checker:</strong> Identify glare and screen smudges instantly.</li>
            <li><strong>Ghosting Test:</strong> Check your monitor&apos;s response time.</li>
            <li><strong>New Shortcuts:</strong> Press <b>F</b> for Fullscreen and <b>Esc</b> to exit.</li>
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
