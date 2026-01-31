"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";

export function Toast() {
  const toastMessage = useAppStore((state) => state.toastMessage);
  const [displayMsg, setDisplayMsg] = useState<string | null>(null);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setExiting(false);
      setDisplayMsg(toastMessage);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (!toastMessage && displayMsg) {
      setExiting(true);
      const t = setTimeout(() => setDisplayMsg(null), 400);
      return () => clearTimeout(t);
    }
  }, [toastMessage, displayMsg]);

  if (!displayMsg) return null;

  return (
    <div id="toast-container">
      <div
        className={`toast success ${!exiting ? "show" : ""}`}
        role="status"
        aria-live="polite"
      >
        <span>✔️</span>
        {displayMsg}
      </div>
    </div>
  );
}
