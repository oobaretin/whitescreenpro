"use client";

import { useEffect, useRef } from "react";

const IDLE_MS = 3000;

/**
 * On tool routes only: after 3s without mouse/touch/keyboard activity,
 * hides cursor and fades out elements with class `zen-ui`.
 */
export function ZenMode() {
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.classList.add("tool-active");

    const goZen = () => {
      if (!document.body.classList.contains("tool-active")) return;
      document.body.style.cursor = "none";
      document.querySelectorAll<HTMLElement>(".zen-ui").forEach((el) => {
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
      });
    };

    const resetIdleTimer = () => {
      document.body.style.cursor = "";
      document.querySelectorAll<HTMLElement>(".zen-ui").forEach((el) => {
        el.style.opacity = "";
        el.style.pointerEvents = "";
      });

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(goZen, IDLE_MS);
    };

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "touchstart",
      "keydown",
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, resetIdleTimer, { passive: true });
    });
    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      events.forEach((evt) => {
        window.removeEventListener(evt, resetIdleTimer);
      });
      document.body.classList.remove("tool-active");
      document.body.style.cursor = "";
      document.querySelectorAll<HTMLElement>(".zen-ui").forEach((el) => {
        el.style.opacity = "";
        el.style.pointerEvents = "";
      });
    };
  }, []);

  return null;
}
