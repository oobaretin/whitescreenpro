"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";

const TEST_COLORS = [
  { name: "Red", hex: "#FF0000", icon: "🔴" },
  { name: "Green", hex: "#00FF00", icon: "🟢" },
  { name: "Blue", hex: "#0000FF", icon: "🔵" },
  { name: "White", hex: "#FFFFFF", icon: "⚪" },
  { name: "Black", hex: "#000000", icon: "⚫" },
  { name: "Cyan", hex: "#00FFFF", icon: "🔵" },
  { name: "Magenta", hex: "#FF00FF", icon: "🟣" },
  { name: "Yellow", hex: "#FFFF00", icon: "🟡" },
];

export function DeadPixelTest() {
  const { deadPixel, setDeadPixel, setColor, activeMode } = useAppStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [markedPixels, setMarkedPixels] = useState<Array<{ x: number; y: number }>>([]);

  const currentColor = TEST_COLORS[deadPixel.currentTestColor];

  useEffect(() => {
    if (!deadPixel.autoCycle || activeMode !== "dead-pixel") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      const nextIndex = (deadPixel.currentTestColor + 1) % TEST_COLORS.length;
      setDeadPixel({ currentTestColor: nextIndex });
      setColor(TEST_COLORS[nextIndex].hex);
    }, deadPixel.cycleInterval * 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    deadPixel.autoCycle,
    deadPixel.cycleInterval,
    deadPixel.currentTestColor,
    activeMode,
    setDeadPixel,
    setColor,
  ]);

  useEffect(() => {
    if (activeMode === "dead-pixel") {
      setColor(TEST_COLORS[deadPixel.currentTestColor].hex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMode, deadPixel.currentTestColor]);

  const handleColorSelect = (index: number) => {
    setDeadPixel({ currentTestColor: index, autoCycle: false });
    setColor(TEST_COLORS[index].hex);
  };

  const nextColor = () => {
    const nextIndex = (deadPixel.currentTestColor + 1) % TEST_COLORS.length;
    handleColorSelect(nextIndex);
  };

  const prevColor = () => {
    const prevIndex = (deadPixel.currentTestColor - 1 + TEST_COLORS.length) % TEST_COLORS.length;
    handleColorSelect(prevIndex);
  };

  const handleDisplayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (deadPixel.zoomMode) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMarkedPixels([...markedPixels, { x, y }]);
    }
  };

  return (
    <div 
      className="absolute inset-0 flex flex-col bg-slate-900"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Color Display Area */}
      <div 
        className="flex-1 relative cursor-crosshair"
        style={{ backgroundColor: currentColor.hex }}
        onClick={handleDisplayClick}
      >
        {/* Grid Overlay */}
        {deadPixel.showGrid && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(128,128,128,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(128,128,128,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
        )}

        {/* Marked Pixels */}
        {markedPixels.map((pixel, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 border-2 border-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{ left: `${pixel.x}%`, top: `${pixel.y}%` }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-red-500 font-bold whitespace-nowrap bg-black/50 px-1 rounded">
              #{i + 1}
            </div>
          </div>
        ))}

        {/* Current Color Indicator */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
          <div className="text-white font-bold text-lg">{currentColor.name}</div>
          <div className="text-gray-300 text-sm font-mono">{currentColor.hex}</div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prevColor(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-2xl transition-all"
        >
          ←
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextColor(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-2xl transition-all"
        >
          →
        </button>

        {/* Color Index */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white font-medium">
            {deadPixel.currentTestColor + 1} / {TEST_COLORS.length}
          </span>
        </div>

        {/* Instruction when marking mode is on */}
        {deadPixel.zoomMode && (
          <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-sm rounded-lg px-3 py-2 animate-pulse">
            <span className="text-white text-sm font-medium">Click to mark dead pixels</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-slate-800 border-t border-slate-700 p-3">
        {/* Color Selection */}
        <div className="flex gap-1 mb-3 overflow-x-auto pb-1">
          {TEST_COLORS.map((color, index) => (
            <button
              key={color.name}
              onClick={() => handleColorSelect(index)}
              className={`flex-shrink-0 w-10 h-10 rounded-lg border-2 transition-all ${
                deadPixel.currentTestColor === index
                  ? "border-white scale-110 shadow-lg shadow-white/20"
                  : "border-slate-600 hover:border-slate-400"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setDeadPixel({ autoCycle: !deadPixel.autoCycle })}
            className={`py-3 rounded-lg font-semibold text-sm transition-all ${
              deadPixel.autoCycle
                ? "bg-green-600 text-white"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600"
            }`}
          >
            {deadPixel.autoCycle ? "⏸ Stop" : "▶ Auto"}
          </button>
          <button
            onClick={() => setDeadPixel({ showGrid: !deadPixel.showGrid })}
            className={`py-3 rounded-lg font-semibold text-sm transition-all ${
              deadPixel.showGrid
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600"
            }`}
          >
            {deadPixel.showGrid ? "▦ Grid On" : "▢ Grid Off"}
          </button>
          <button
            onClick={() => setDeadPixel({ zoomMode: !deadPixel.zoomMode })}
            className={`py-3 rounded-lg font-semibold text-sm transition-all ${
              deadPixel.zoomMode
                ? "bg-red-600 text-white"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600"
            }`}
          >
            {deadPixel.zoomMode ? "📍 Marking" : "📍 Mark"}
          </button>
          <button
            onClick={() => setMarkedPixels([])}
            disabled={markedPixels.length === 0}
            className="py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
          >
            Clear ({markedPixels.length})
          </button>
        </div>

        {/* Auto-Cycle Speed */}
        {deadPixel.autoCycle && (
          <div className="mt-3 flex items-center gap-3">
            <span className="text-slate-400 text-sm">Speed:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 5].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setDeadPixel({ cycleInterval: sec })}
                  className={`px-3 py-1 rounded text-sm ${
                    deadPixel.cycleInterval === sec
                      ? "bg-green-600 text-white"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
