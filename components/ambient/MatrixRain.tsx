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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = CHARACTER_SETS[matrix.characterSet] || CHARACTER_SETS.latin;
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const colors = {
      green: "#00FF00",
      blue: "#0080FF",
      red: "#FF0000",
      white: "#FFFFFF",
    };

    const color = colors[matrix.color] || colors.green;

    const draw = () => {
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

    return () => clearInterval(interval);
  }, [activeMode, matrix]);

  if (activeMode !== "matrix-rain") return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ background: "#000000" }}
    />
  );
}

