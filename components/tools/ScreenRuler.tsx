"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";

const PPI = 96;

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    function update() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

type Unit = "px" | "in" | "cm";

export function ScreenRuler() {
  const { width, height } = useWindowSize();
  const [unit, setUnit] = useState<Unit>("px");
  const [gridVisible, setGridVisible] = useState(false);
  const [hRulerY, setHRulerY] = useState(0);
  const [vRulerX, setVRulerX] = useState(0);
  const dragRef = useRef<{ type: "h" | "v"; start: number } | null>(null);

  const stepPx = useMemo(() => {
    if (unit === "px") return 50;
    if (unit === "in") return PPI;
    return PPI / 2.54;
  }, [unit]);

  const minorStepPx = stepPx / 10;
  const labelStep = unit === "px" ? 1 : 1;

  const hMarks = useMemo(() => {
    const marks: { x: number; major: boolean; label?: number }[] = [];
    for (let i = 0; i <= width; i += minorStepPx) {
      const major = Math.round(i % stepPx) === 0 || i === 0;
      const labelVal = unit === "px" ? Math.round(i) : unit === "in" ? i / PPI : i / (PPI / 2.54);
      marks.push({
        x: i,
        major,
        label: major ? (unit === "px" ? Math.round(i) : Math.round(labelVal * 10) / 10) : undefined,
      });
    }
    return marks;
  }, [width, unit, stepPx, minorStepPx]);

  const vMarks = useMemo(() => {
    const marks: { y: number; major: boolean; label?: number }[] = [];
    for (let i = 0; i <= height; i += minorStepPx) {
      const major = Math.round(i % stepPx) === 0 || i === 0;
      const labelVal = unit === "px" ? Math.round(i) : unit === "in" ? i / PPI : i / (PPI / 2.54);
      marks.push({
        y: i,
        major,
        label: major ? (unit === "px" ? Math.round(i) : Math.round(labelVal * 10) / 10) : undefined,
      });
    }
    return marks;
  }, [height, unit, stepPx, minorStepPx]);

  const gridSize = useMemo(() => {
    const w = width * 0.8;
    return { width: w, height: w * (9 / 16) };
  }, [width]);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      const start = dragRef.current.start;
      if (dragRef.current.type === "h") setHRulerY(Math.max(0, e.clientY - start));
      else setVRulerX(Math.max(0, e.clientX - start));
    };
    const onPointerUp = () => { dragRef.current = null; };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9997] pointer-events-none"
      style={{ top: 0, left: 0, width: "100vw", height: "100vh" }}
      role="application"
      aria-label="Screen ruler and aspect ratio grid"
    >
      {/* Horizontal ruler - draggable */}
      <div
        className="absolute left-0 w-full border-b border-gray-800 pointer-events-auto cursor-move flex items-end overflow-hidden"
        style={{
          top: hRulerY,
          height: 40,
          background: "rgba(255,255,255,0.95)",
        }}
        onPointerDown={(e) => { e.preventDefault(); dragRef.current = { type: "h", start: e.clientY - hRulerY }; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); }}
      >
        <div className="relative w-full h-full" style={{ minWidth: width }}>
          {hMarks.map((m, i) => (
            <div
              key={i}
              className="absolute bottom-0 bg-gray-800"
              style={{
                left: m.x,
                width: 1,
                height: m.major ? 20 : 10,
              }}
            />
          ))}
          {hMarks.filter((m) => m.label !== undefined).map((m, i) => (
            <span
              key={`l-${i}`}
              className="absolute text-[10px] text-gray-800 font-mono"
              style={{ left: m.x + 2, top: 2 }}
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* Vertical ruler - draggable */}
      <div
        className="absolute top-0 border-r border-gray-800 pointer-events-auto cursor-move overflow-hidden"
        style={{
          left: vRulerX,
          width: 40,
          height: "100vh",
          background: "rgba(255,255,255,0.95)",
        }}
        onPointerDown={(e) => { e.preventDefault(); dragRef.current = { type: "v", start: e.clientX - vRulerX }; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); }}
      >
        <div className="relative w-full" style={{ minHeight: height }}>
          {vMarks.map((m, i) => (
            <div
              key={i}
              className="absolute left-0 bg-gray-800"
              style={{
                top: m.y,
                height: 1,
                width: m.major ? 20 : 10,
              }}
            />
          ))}
          {vMarks.filter((m) => m.label !== undefined).map((m, i) => (
            <span
              key={`l-${i}`}
              className="absolute text-[10px] text-gray-800 font-mono transform -rotate-90 origin-left"
              style={{ left: 22, top: m.y + 2 }}
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* 16:9 Aspect ratio grid */}
      {gridVisible && (
        <div
          className="absolute border-2 border-dashed pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: gridSize.width,
            height: gridSize.height,
            borderColor: "var(--accent-color)",
          }}
        >
          <span
            className="absolute font-bold text-sm"
            style={{ top: -24, left: 0, color: "var(--accent-color)" }}
          >
            16:9
          </span>
        </div>
      )}

      {/* Controls panel */}
      <div
        className="absolute right-5 top-[60px] z-[9999] pointer-events-auto rounded-xl shadow-lg p-4 border border-card"
        style={{ background: "var(--card-bg)" }}
      >
        <div className="flex flex-col gap-3 text-page text-sm">
          <div className="flex items-center gap-2">
            <label htmlFor="ruler-unit">Unit:</label>
            <select
              id="ruler-unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
              className="px-2 py-1 rounded border border-card bg-card text-page"
            >
              <option value="px">Pixels (px)</option>
              <option value="in">Inches (in)</option>
              <option value="cm">Centimeters (cm)</option>
            </select>
          </div>
          <hr className="border-card" />
          <button
            type="button"
            onClick={() => setGridVisible((v) => !v)}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--accent-color)", color: "white" }}
          >
            {gridVisible ? "Hide" : "Show"} 16:9 Grid
          </button>
        </div>
      </div>

      {/* Exit */}
      <Link
        href="/"
        className="absolute top-4 right-4 z-[9999] px-3 py-2 rounded-lg text-page text-sm font-medium pointer-events-auto hover:opacity-80 transition-opacity border border-card"
        style={{ background: "var(--card-bg)" }}
      >
        ✕ Exit
      </Link>
    </div>
  );
}
