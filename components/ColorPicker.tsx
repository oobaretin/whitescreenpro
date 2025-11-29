"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { isValidColor, formatColor } from "@/lib/colorUtils";
import { getStoredFavorites, saveFavorite, removeFavorite } from "@/lib/storageUtils";

export function ColorPicker() {
  const { currentColor, setColor } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [inputValue, setInputValue] = useState("#FFFFFF");
  const [inputFormat, setInputFormat] = useState<"hex" | "rgb" | "hsl">("hex");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Handle client-side mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Initialize with HEX representation of the current color
    setInputValue(formatColor(currentColor, "hex"));
    setFavorites(getStoredFavorites());
  }, []);

  // Sync input value when currentColor or format changes
  useEffect(() => {
    if (mounted) {
      // Always format the store color into the currently selected format
      setInputValue(formatColor(currentColor, inputFormat));
    }
  }, [currentColor, inputFormat, mounted]);

  const handleColorChange = (color: string) => {
    if (isValidColor(color)) {
      // Normalize stored color to HEX for consistency and <input type="color">
      const hexColor = formatColor(color, "hex");
      setColor(hexColor);
      // Show the value in the currently selected format
      setInputValue(formatColor(hexColor, inputFormat));
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (isValidColor(value)) {
      handleColorChange(value);
    }
  };

  const toggleFavorite = (color: string) => {
    if (favorites.includes(color)) {
      removeFavorite(color);
      setFavorites(favorites.filter(c => c !== color));
    } else {
      saveFavorite(color);
      setFavorites([...favorites, color]);
    }
  };

  // Use default color until mounted to prevent hydration mismatch
  const displayColor = mounted ? currentColor : "#FFFFFF";

  return (
    <div className="space-y-4">
      {/* Favorites */}
      {mounted && favorites.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2 text-gray-300">Favorites</h3>
          <div className="grid grid-cols-6 gap-2">
            {favorites.map((color) => (
              <div key={color} className="relative group">
                <button
                  onClick={() => handleColorChange(color)}
                  className={`w-10 h-10 rounded border-2 transition-all ${
                    displayColor.toUpperCase() === color.toUpperCase()
                      ? "border-white scale-110"
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select favorite color ${color}`}
                />
                <button
                  onClick={() => toggleFavorite(color)}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  aria-label="Remove from favorites"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Color Input */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-300">Custom Color</h3>
        <div className="flex gap-2">
          <input
            type="color"
            value={displayColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-16 h-10 rounded border border-gray-600 cursor-pointer"
            aria-label="Color picker"
          />
          <div className="flex-1 flex gap-2">
            <select
              value={inputFormat}
              onChange={(e) => {
                const newFormat = e.target.value as "hex" | "rgb" | "hsl";
                setInputFormat(newFormat);
                // The useEffect will automatically update inputValue when inputFormat changes
              }}
              className="px-2 py-1 bg-gray-800 text-white rounded text-sm border border-gray-600"
            >
              <option value="hex">HEX</option>
              <option value="rgb">RGB</option>
              <option value="hsl">HSL</option>
            </select>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                inputFormat === "hex"
                  ? "#FFFFFF"
                  : inputFormat === "rgb"
                  ? "rgb(255, 255, 255)"
                  : "hsl(0, 0%, 100%)"
              }
              className="flex-1 px-3 py-1 bg-gray-800 text-white rounded text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <button
          onClick={() => toggleFavorite(displayColor)}
          className="mt-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
        >
          {mounted && favorites.includes(displayColor) ? "★ Remove Favorite" : "☆ Add Favorite"}
        </button>
      </div>

      {/* Current Color Info */}
      <div className="pt-2 border-t border-gray-700">
        <div className="text-xs text-gray-400 space-y-1">
          <div>
            <strong>HEX:</strong> {mounted && currentColor ? formatColor(currentColor, "hex") : "#FFFFFF"}
          </div>
          <div>
            <strong>RGB:</strong> {mounted && currentColor ? formatColor(currentColor, "rgb") : "rgb(255, 255, 255)"}
          </div>
          <div>
            <strong>HSL:</strong> {mounted && currentColor ? formatColor(currentColor, "hsl") : "hsl(0, 0%, 100%)"}
          </div>
        </div>
      </div>
    </div>
  );
}
