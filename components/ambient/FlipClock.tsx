"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export function FlipClock() {
  const { activeMode } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
  }, []);

  useEffect(() => {
    if (activeMode !== "flip-clock" || !mounted) return;

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [activeMode, mounted]);

  if (activeMode !== "flip-clock" || !mounted || !time) return null;

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="absolute inset-0 bg-black text-white flex items-center justify-center p-4">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 font-bold">
        <FlipDigit value={hours[0]} />
        <FlipDigit value={hours[1]} />
        <span className="text-4xl sm:text-5xl md:text-6xl text-gray-400">:</span>
        <FlipDigit value={minutes[0]} />
        <FlipDigit value={minutes[1]} />
        <span className="text-4xl sm:text-5xl md:text-6xl text-gray-400">:</span>
        <FlipDigit value={seconds[0]} />
        <FlipDigit value={seconds[1]} />
      </div>
    </div>
  );
}

function FlipDigit({ value }: { value: string }) {
  return (
    <div className="relative w-12 h-16 sm:w-16 sm:h-24 md:w-20 md:h-32 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ rotateX: -90 }}
          animate={{ rotateX: 0 }}
          exit={{ rotateX: 90 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center text-white text-3xl sm:text-5xl md:text-7xl font-bold"
          style={{ transformStyle: "preserve-3d" }}
        >
          {value}
        </motion.div>
      </AnimatePresence>
      {/* Flip card divider line */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-black/30" />
    </div>
  );
}

