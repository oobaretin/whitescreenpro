"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function BurnInFixer() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runningRef = useRef(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    function resize() {
      const w = Math.floor(window.innerWidth / 2);
      const h = Math.floor(window.innerHeight / 2);
      canvas.width = w;
      canvas.height = h;
    }

    resize();
    window.addEventListener("resize", resize);

    function renderStatic() {
      if (!runningRef.current || !canvas.width || !canvas.height) return;

      const idata = ctx.createImageData(canvas.width, canvas.height);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        buffer32[i] = 0xff000000 | (Math.random() * 0xffffff);
      }

      ctx.putImageData(idata, 0, 0);
      requestAnimationFrame(renderStatic);
    }

    renderStatic();

    return () => {
      runningRef.current = false;
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black z-[9998] flex flex-col"
      role="application"
      aria-label="OLED Burn-In Fixer - random static to help reduce burn-in"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
        style={{ width: "100vw", height: "100vh" }}
        aria-hidden
      />
      {/* Exit - top corner */}
      <Link
        href="/"
        className="absolute top-4 right-4 z-10 px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-colors"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        ✕ Exit
      </Link>
      {/* Bottom overlay */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg text-center text-white text-sm"
        style={{ background: "rgba(0,0,0,0.7)" }}
      >
        <strong>OLED Burn-In Fixer Active</strong>
        <br />
        <small>Recommended use: 10–30 minutes. Press <b>ESC</b> to exit.</small>
      </div>
    </div>
  );
}
