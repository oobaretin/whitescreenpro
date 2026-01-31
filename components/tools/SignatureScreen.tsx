"use client";

import { useRef, useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useTranslation } from "@/hooks/useTranslation";

export function SignatureScreen() {
  const t = useTranslation();
  const { signature, setSignature, showToast } = useAppStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState<Array<{ points: Array<{ x: number; y: number }>; color: string; thickness: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match container
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Set background
    if (signature.backgroundColor === "transparent") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw checkerboard pattern for transparent
      const size = 10;
      for (let x = 0; x < canvas.width; x += size) {
        for (let y = 0; y < canvas.height; y += size) {
          ctx.fillStyle = (x / size + y / size) % 2 === 0 ? "#FFFFFF" : "#E5E5E5";
          ctx.fillRect(x, y, size, size);
        }
      }
    } else {
      ctx.fillStyle = signature.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw grid if enabled
    if (signature.showGrid) {
      ctx.strokeStyle = signature.backgroundColor === "#FFFFFF" ? "#E5E7EB" : "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // Draw signature line
    ctx.strokeStyle = signature.backgroundColor === "#FFFFFF" ? "#CCCCCC" : "rgba(255,255,255,0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, canvas.height - 60);
    ctx.lineTo(canvas.width - 40, canvas.height - 60);
    ctx.stroke();

    // "Sign here" text
    ctx.fillStyle = signature.backgroundColor === "#FFFFFF" ? "#999999" : "rgba(255,255,255,0.4)";
    ctx.font = "14px sans-serif";
    ctx.fillText(t.signature.signHere, 40, canvas.height - 40);

    // Redraw all paths
    paths.forEach((path) => {
      ctx.strokeStyle = path.color;
      ctx.lineWidth = path.thickness;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      path.points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    });
  }, [signature.backgroundColor, signature.showGrid, paths]);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    return { x, y };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.stopPropagation();
    setIsDrawing(true);
    const coords = getCoordinates(e);
    if (!coords) return;

    setPaths([...paths, { points: [coords], color: signature.penColor, thickness: signature.penThickness }]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.stopPropagation();

    const coords = getCoordinates(e);
    if (!coords) return;

    setPaths((prev) => {
      const newPaths = [...prev];
      const lastPath = newPaths[newPaths.length - 1];
      if (lastPath) {
        lastPath.points.push(coords);
      }
      return newPaths;
    });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setPaths([]);
  };

  const undo = () => {
    setPaths((prev) => prev.slice(0, -1));
  };

  const downloadImage = (format: "png" | "jpg") => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `signature.${format}`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("Saved!");
      },
      `image/${format === "jpg" ? "jpeg" : format}`,
      1.0
    );
  };

  const penColors = [
    { color: "#000000", name: "Black" },
    { color: "#1E40AF", name: "Blue" },
    { color: "#DC2626", name: "Red" },
    { color: "#059669", name: "Green" },
  ];

  const penSizes = [2, 4, 6, 8];

  return (
    <div 
      className="absolute inset-0 bg-slate-100 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Canvas Area */}
      <div 
        ref={containerRef}
        className="flex-1 m-3 rounded-lg overflow-hidden shadow-inner border-2 border-slate-300"
        style={{ backgroundColor: signature.backgroundColor === "transparent" ? undefined : signature.backgroundColor }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair"
          style={{ touchAction: "none" }}
        />
      </div>

      {/* Controls */}
      <div className="bg-white border-t border-slate-200 p-3 space-y-3">
        {/* Pen Colors */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {penColors.map((pen) => (
              <button
                key={pen.color}
                onClick={() => setSignature({ penColor: pen.color })}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  signature.penColor === pen.color 
                    ? "border-blue-500 scale-110 shadow-lg" 
                    : "border-slate-300"
                }`}
                style={{ backgroundColor: pen.color }}
                title={pen.name}
              />
            ))}
            <input
              type="color"
              value={signature.penColor}
              onChange={(e) => setSignature({ penColor: e.target.value })}
              className="w-10 h-10 rounded-full border-2 border-slate-300 cursor-pointer"
              title="Custom Color"
            />
          </div>

          {/* Pen Sizes */}
          <div className="flex gap-1">
            {penSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSignature({ penThickness: size })}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  signature.penThickness === size 
                    ? "bg-blue-500 text-white" 
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                }`}
              >
                <div 
                  className="rounded-full bg-current" 
                  style={{ width: size * 2, height: size * 2 }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Background Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 font-medium">{t.signature.background}:</span>
          <div className="flex gap-1">
            {[
              { value: "#FFFFFF", label: t.signature.white },
              { value: "#F8FAFC", label: t.signature.light },
              { value: "transparent", label: t.signature.clear },
            ].map((bg) => (
              <button
                key={bg.value}
                onClick={() => setSignature({ backgroundColor: bg.value })}
                className={`px-3 py-1 rounded text-sm transition-all ${
                  signature.backgroundColor === bg.value 
                    ? "bg-blue-500 text-white" 
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                }`}
              >
                {bg.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-1 ml-auto">
            <input
              type="checkbox"
              checked={signature.showGrid}
              onChange={(e) => setSignature({ showGrid: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-slate-600">{t.signature.grid}</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={paths.length === 0}
            className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ↶ {t.signature.undo}
          </button>
          <button
            onClick={clearCanvas}
            className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all"
          >
            {t.signature.clearAll}
          </button>
          <button
            onClick={() => downloadImage("png")}
            disabled={paths.length === 0}
            className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.signature.savePng}
          </button>
        </div>
      </div>
    </div>
  );
}
