"use client";

import { useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { KEYBOARD_SHORTCUTS } from "@/lib/keyboardShortcuts";

export function KeyboardShortcutsModal() {
  const shortcutsOpen = useAppStore((s) => s.shortcutsOpen);
  const setShortcutsOpen = useAppStore((s) => s.setShortcutsOpen);

  const handleClose = useCallback(() => {
    setShortcutsOpen(false);
  }, [setShortcutsOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && shortcutsOpen) handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcutsOpen, handleClose]);

  if (!shortcutsOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[20000] bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md rounded-2xl p-6 shadow-2xl bg-card text-page border border-card max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 id="shortcuts-title" className="text-xl font-bold">
            Keyboard shortcuts
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-page/60 hover:text-page text-2xl leading-none px-2"
            aria-label="Close shortcuts"
          >
            ×
          </button>
        </div>
        <ul className="space-y-2">
          {KEYBOARD_SHORTCUTS.map((entry) => (
            <li
              key={entry.keys}
              className="flex items-center justify-between gap-4 text-sm border-b border-card pb-2 last:border-0"
            >
              <span className="text-page/85">{entry.action}</span>
              <kbd className="shrink-0 px-2 py-0.5 rounded bg-page/10 text-page font-mono text-xs">
                {entry.keys}
              </kbd>
            </li>
          ))}
        </ul>
        <p className="text-xs text-page/50 mt-4">
          Shortcuts are disabled while typing in search or input fields.
        </p>
      </div>
    </div>
  );
}
