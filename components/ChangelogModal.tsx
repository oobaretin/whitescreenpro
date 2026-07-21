"use client";

import { useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";

const CHANGELOG_SEEN_KEY = "whitescreentools-v2.3-seen";

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
        <p className="text-sm text-page/70 mb-4">Version 2.3</p>
        <div className="max-h-[350px] overflow-y-auto text-left pr-2">
          <h4
            className="text-sm font-semibold mt-4 mb-2 first:mt-0"
            style={{ color: "var(--accent-color)" }}
          >
            Contact &amp; trust
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-page/90 mb-4">
            <li>
              <strong>Contact form</strong> — send messages from the site via
              Web3Forms (no mail app needed).
            </li>
            <li>
              <strong>Redesigned contact page</strong> — form + email, GitHub,
              and tips sidebar.
            </li>
            <li>
              <strong>Updated privacy &amp; about</strong> — accurate policy and
              refreshed layouts.
            </li>
          </ul>
          <h4
            className="text-sm font-semibold mt-4 mb-2"
            style={{ color: "var(--accent-color)" }}
          >
            Discover &amp; learn
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-page/90 mb-4">
            <li>
              <strong>Help &amp; docs</strong> — shortcuts, share links, OBS, and
              multi-monitor guide at <code>/docs</code>.
            </li>
            <li>
              <strong>Start here</strong> — one-click monitor test and video-call
              lighting on the homepage.
            </li>
            <li>
              <strong>Pin star fix</strong> — favorites no longer overlap tool
              names on cards.
            </li>
          </ul>
          <h4
            className="text-sm font-semibold mt-4 mb-2"
            style={{ color: "var(--accent-color)" }}
          >
            Still in v2.2
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-page/90 mb-4">
            <li>Pinned favorites, search, share links, OBS mode, Monitor Health PDF, and 28+ tools.</li>
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
