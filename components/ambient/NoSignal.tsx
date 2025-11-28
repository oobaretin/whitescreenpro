"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";

// Classic 90s TV color bars (SMPTE color bars)
const COLOR_BARS = [
  "#FFFFFF", // White
  "#FFFF00", // Yellow
  "#00FFFF", // Cyan
  "#00FF00", // Green
  "#FF00FF", // Magenta
  "#FF0000", // Red
  "#0000FF", // Blue
  "#000000", // Black
];

export function NoSignal() {
  const { activeMode, noSignal } = useAppStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (activeMode !== "no-signal") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (noSignal.type === "colorbars") {
      // Draw color bars
      const barWidth = canvas.width / COLOR_BARS.length;
      
      COLOR_BARS.forEach((color, index) => {
        ctx.fillStyle = color;
        ctx.fillRect(index * barWidth, 0, barWidth + 1, canvas.height);
      });
      
      return;
    }

    // Static noise
    const noise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      if (noSignal.softStatic) {
        // Soft static - lower contrast, slightly blurred look
        for (let i = 0; i < data.length; i += 4) {
          // Use a narrower range for softer contrast (80-180 instead of 0-255)
          const value = 80 + Math.random() * 100;
          data[i] = value;     // R
          data[i + 1] = value; // G
          data[i + 2] = value; // B
          data[i + 3] = 255;   // A
        }
      } else {
        // Hard static - full contrast
        for (let i = 0; i < data.length; i += 4) {
          const value = Math.random() * 255;
          data[i] = value;     // R
          data[i + 1] = value; // G
          data[i + 2] = value; // B
          data[i + 3] = 255;   // A
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const interval = setInterval(noise, noSignal.softStatic ? 150 : 100);
    noise();

    return () => clearInterval(interval);
  }, [activeMode, noSignal.type, noSignal.softStatic]);

  if (activeMode !== "no-signal") return null;

  return (
    <div className="absolute inset-0 bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
