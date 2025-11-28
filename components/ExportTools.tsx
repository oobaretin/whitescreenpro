"use client";

import { useState, useRef } from "react";
import { useAppStore } from "@/lib/store";
import QRCode from "react-qr-code";
import { COLOR_PRESETS } from "@/lib/colorUtils";
import { getStoredFavorites } from "@/lib/storageUtils";

export function ExportTools() {
  const { currentColor, brightness, gradient, activeMode } = useAppStore();
  const [showQR, setShowQR] = useState(false);
  const [exportResolution, setExportResolution] = useState("1920x1080");
  const [exportType, setExportType] = useState<"screen" | "color">("screen");

  const resolutions = [
    { label: "480p", value: "854x480" },
    { label: "720p", value: "1280x720" },
    { label: "1080p", value: "1920x1080" },
    { label: "1440p", value: "2560x1440" },
    { label: "4K", value: "3840x2160" },
    { label: "5K", value: "5120x2880" },
    { label: "8K", value: "7680x4320" },
  ];

  const downloadImage = async (format: "png" | "jpg") => {
    const [width, height] = exportResolution.split("x").map(Number);
    
    if (exportType === "screen") {
      // Capture the actual display area
      const displayArea = document.querySelector('[data-display-area]') as HTMLElement;
      if (!displayArea) {
        alert("Display area not found. Please ensure the screen is visible.");
        return;
      }

      try {
        // Use html2canvas if available, otherwise fallback to color
        const html2canvas = (await import("html2canvas")).default;
        const canvas = await html2canvas(displayArea, {
          width: width,
          height: height,
          scale: 1,
          useCORS: true,
          backgroundColor: null,
        });

        canvas.toBlob(
          (blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `whitescreen-${activeMode || "color"}-${exportResolution}.${format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          },
          `image/${format}`,
          0.95
        );
      } catch (error) {
        console.error("Failed to capture screen:", error);
        // Fallback to color download
        downloadColorImage(format, width, height);
      }
    } else {
      // Download solid color
      downloadColorImage(format, width, height);
    }
  };

  const downloadColorImage = (format: "png" | "jpg", width: number, height: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set background color
    ctx.fillStyle = currentColor;
    ctx.fillRect(0, 0, width, height);

    // Convert to blob and download
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `whitescreen-${exportResolution}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      `image/${format}`,
      1.0
    );
  };

  const generateShareLink = () => {
    const params = new URLSearchParams({
      color: currentColor,
      brightness: brightness.toString(),
    });
    return `${window.location.origin}?${params.toString()}`;
  };

  const copyShareLink = async () => {
    const link = generateShareLink();
    try {
      await navigator.clipboard.writeText(link);
      alert("Share link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const exportPalette = (format: "css" | "json") => {
    const favorites = getStoredFavorites();

    if (format === "css") {
      const css = `:root {\n${COLOR_PRESETS
        .map((p: any) => `  --color-${p.name.toLowerCase().replace(/\s+/g, "-")}: ${p.hex};`)
        .join("\n")}\n}`;
      const blob = new Blob([css], { type: "text/css" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "whitescreen-palette.css";
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const json = JSON.stringify(
        {
          presets: COLOR_PRESETS,
          favorites,
        },
        null,
        2
      );
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "whitescreen-palette.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-4">
      {/* Download Image */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-300">Download Image</h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Export Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setExportType("screen")}
                className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
                  exportType === "screen"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Screen Capture
              </button>
              <button
                onClick={() => setExportType("color")}
                className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
                  exportType === "color"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Solid Color
              </button>
            </div>
          </div>
          <select
            value={exportResolution}
            onChange={(e) => setExportResolution(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            {resolutions.map((res) => (
              <option key={res.value} value={res.value}>
                {res.label} ({res.value})
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => downloadImage("png")}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Download PNG
            </button>
            <button
              onClick={() => downloadImage("jpg")}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Download JPG
            </button>
          </div>
          {exportType === "screen" && (
            <p className="text-xs text-gray-400 mt-1">
              ⚠️ Screen capture captures what&apos;s currently visible. For animated content (Matrix, DVD, etc.), pause or wait for a good frame.
            </p>
          )}
        </div>
      </div>

      {/* Share Link */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-300">Share</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={generateShareLink()}
            readOnly
            className="flex-1 px-3 py-2 bg-gray-800 text-white rounded text-sm border border-gray-600"
          />
          <button
            onClick={copyShareLink}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
          >
            Copy
          </button>
        </div>
      </div>

      {/* QR Code */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-300">QR Code</h3>
        <button
          onClick={() => setShowQR(!showQR)}
          className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
        >
          {showQR ? "Hide" : "Show"} QR Code
        </button>
        {showQR && (
          <div className="mt-4 flex justify-center p-4 bg-white rounded">
            <QRCode value={generateShareLink()} size={200} />
          </div>
        )}
      </div>

      {/* Export Palette */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-300">Export Palette</h3>
        <div className="flex gap-2">
          <button
            onClick={() => exportPalette("css")}
            className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
          >
            Export CSS
          </button>
          <button
            onClick={() => exportPalette("json")}
            className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
          >
            Export JSON
          </button>
        </div>
      </div>
    </div>
  );
}

