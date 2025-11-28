import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";

export function useAutoCycle() {
  const { autoCycle, setAutoCycle, setColor } = useAppStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoCycle.enabled && autoCycle.colors.length > 0) {
      intervalRef.current = setInterval(() => {
        setAutoCycle({
          currentIndex:
            (autoCycle.currentIndex + 1) % autoCycle.colors.length,
        });
        setColor(autoCycle.colors[autoCycle.currentIndex]);
      }, autoCycle.interval * 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    autoCycle.enabled,
    autoCycle.interval,
    autoCycle.colors,
    autoCycle.currentIndex,
    setAutoCycle,
    setColor,
  ]);

  return autoCycle;
}

