"use client";

import { useAppStore } from "@/lib/store";

export function Toast() {
  const toastMessage = useAppStore((state) => state.toastMessage);

  if (!toastMessage) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10002] px-5 py-3 rounded-lg bg-gray-900 text-white text-sm font-medium shadow-lg animate-fade-in"
      role="status"
      aria-live="polite"
    >
      {toastMessage}
    </div>
  );
}
