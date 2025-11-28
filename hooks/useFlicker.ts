import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";

export function useFlicker() {
  const { flicker, currentColor } = useAppStore();
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (flicker.enabled && flicker.frequency > 0) {
      const period = 1000 / flicker.frequency; // milliseconds
      const onTime = period * (flicker.intensity / 100);
      const offTime = period - onTime;

      let isOn = true;
      setIsVisible(true);

      const toggle = () => {
        isOn = !isOn;
        setIsVisible(isOn);
      };

      intervalRef.current = setInterval(toggle, isOn ? onTime : offTime);
    } else {
      setIsVisible(true);
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
  }, [flicker.enabled, flicker.frequency, flicker.intensity]);

  return isVisible;
}

