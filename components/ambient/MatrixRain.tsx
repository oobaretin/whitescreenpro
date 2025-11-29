"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";

const CHARACTER_SETS = {
  latin: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()",
  japanese: "アイウエオカキクケコサシスセソタチツテトナニヌネノ",
  numbers: "0123456789",
  binary: "01",
};

export function MatrixRain() {
  const { matrix, activeMode } = useAppStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (activeMode !== "matrix-rain") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      // Get the actual container dimensions, not just window
      const container = canvas.parentElement;
      const width = container?.clientWidth || window.innerWidth;
      const height = container?.clientHeight || window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;
    };

    updateCanvasSize();
    
    // Update on resize
    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener("resize", handleResize);
    
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      window.removeEventListener("resize", handleResize);
      return;
    }

    const chars = CHARACTER_SETS[matrix.characterSet] || CHARACTER_SETS.latin;
    const fontSize = 14;
    
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    const colors = {
      green: "#00FF00",
      blue: "#0080FF",
      red: "#FF0000",
      white: "#FFFFFF",
    };

    const color = colors[matrix.color] || colors.green;

    const draw = () => {
      // Recalculate columns if canvas size changed
      const newColumns = Math.floor(canvas.width / fontSize);
      if (newColumns !== columns) {
        columns = newColumns;
        drops = Array(columns).fill(1);
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() < matrix.density / 100) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 1000 / matrix.speed);
    draw();

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeMode, matrix]);

  if (activeMode !== "matrix-rain") return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "#000000", display: "block" }}
    />
  );
}

