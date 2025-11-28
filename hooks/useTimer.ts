import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";

export function useTimer() {
  const { timer, setTimer, stopTimer } = useAppStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer.running && timer.remaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimer({ remaining: Math.max(0, timer.remaining - 1) });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timer.remaining === 0 && timer.running) {
        stopTimer();
        // Play notification sound or show alert
        if (typeof window !== "undefined" && "Notification" in window) {
          new Notification("Timer Complete", {
            body: "Your timer has finished.",
            icon: "/icon-192x192.png",
          });
        }
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.running, timer.remaining, setTimer, stopTimer]);

  return timer;
}

