import { colord, Colord } from "colord";

export interface ColorPreset {
  name: string;
  hex: string;
  category?: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  { name: "White", hex: "#FFFFFF", category: "basic" },
  { name: "Black", hex: "#000000", category: "basic" },
  { name: "Red", hex: "#FF0000", category: "primary" },
  { name: "Green", hex: "#00FF00", category: "primary" },
  { name: "Blue", hex: "#0000FF", category: "primary" },
  { name: "Yellow", hex: "#FFFF00", category: "primary" },
  { name: "Purple", hex: "#800080", category: "secondary" },
  { name: "Orange", hex: "#FFA500", category: "secondary" },
  { name: "Pink", hex: "#FFC0CB", category: "secondary" },
  { name: "Cyan", hex: "#00FFFF", category: "secondary" },
  { name: "Light Gray", hex: "#D3D3D3", category: "grayscale" },
  { name: "Dark Gray", hex: "#A9A9A9", category: "grayscale" },
];

export interface GradientConfig {
  enabled: boolean;
  type: "linear" | "radial";
  startColor: string;
  endColor: string;
  angle?: number; // For linear gradients (0-360 degrees)
  position?: { x: number; y: number }; // For radial gradients (0-100%)
}

export function getColorString(color: string, brightness: number): string {
  const c = colord(color);
  if (brightness === 100) return c.toHex();
  
  // Simple brightness adjustment: mix with black based on brightness percentage
  // brightness 100 = original color, brightness 0 = black
  const brightnessRatio = brightness / 100;
  const rgb = c.toRgb();
  
  return colord({
    r: Math.round(rgb.r * brightnessRatio),
    g: Math.round(rgb.g * brightnessRatio),
    b: Math.round(rgb.b * brightnessRatio),
  }).toHex();
}

export function getGradientCSS(gradient: GradientConfig): string {
  if (!gradient.enabled) return "";
  
  const start = colord(gradient.startColor).toHex();
  const end = colord(gradient.endColor).toHex();
  
  if (gradient.type === "linear") {
    const angle = gradient.angle ?? 0;
    return `linear-gradient(${angle}deg, ${start}, ${end})`;
  } else {
    const x = gradient.position?.x ?? 50;
    const y = gradient.position?.y ?? 50;
    return `radial-gradient(circle at ${x}% ${y}%, ${start}, ${end})`;
  }
}

export function adjustColorTemperature(color: string, temperature: number): string {
  // temperature: -100 (cool/blue) to +100 (warm/orange)
  const c = colord(color);
  const hsl = c.toHsl();
  
  if (temperature > 0) {
    // Warm: shift hue towards orange/red
    hsl.h = (hsl.h + (temperature / 100) * 30) % 360;
  } else {
    // Cool: shift hue towards blue
    hsl.h = (hsl.h + (temperature / 100) * 30 + 360) % 360;
  }
  
  return colord(hsl).toHex();
}

export function isValidColor(color: string): boolean {
  try {
    return colord(color).isValid();
  } catch {
    return false;
  }
}

export function formatColor(color: string, format: "hex" | "rgb" | "hsl"): string {
  const c = colord(color);
  switch (format) {
    case "hex":
      return c.toHex();
    case "rgb":
      const rgb = c.toRgb();
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    case "hsl":
      const hsl = c.toHsl();
      // colord returns s and l as 0-100 already, not 0-1
      return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
    default:
      return c.toHex();
  }
}

export function getColorFromTemperature(temp: number): string {
  // Convert Kelvin to RGB approximation
  // Warm (3000K) = orange, Neutral (5000K) = white, Cool (6500K) = blue-white
  if (temp <= 3000) {
    return colord({ r: 255, g: 147, b: 41 }).toHex(); // Warm orange
  } else if (temp >= 6500) {
    return colord({ r: 201, g: 226, b: 255 }).toHex(); // Cool blue-white
  } else {
    // Interpolate between warm and cool
    const ratio = (temp - 3000) / 3500;
    const r = Math.round(255 - 54 * ratio);
    const g = Math.round(147 + 79 * ratio);
    const b = Math.round(41 + 214 * ratio);
    return colord({ r, g, b }).toHex();
  }
}

