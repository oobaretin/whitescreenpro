/** Encode/decode shareable URL params for color screen settings. */

const HEX_RE = /^#?[0-9A-Fa-f]{6}$/;

export interface ShareLinkState {
  color?: string;
  brightness?: number;
  kelvin?: number;
  colorTemperature?: number;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function parseShareLinkParams(
  search: string | URLSearchParams,
): ShareLinkState | null {
  const params =
    typeof search === "string"
      ? new URLSearchParams(search.startsWith("?") ? search.slice(1) : search)
      : search;

  const rawColor = params.get("color");
  const rawBrightness = params.get("brightness");
  const rawKelvin = params.get("kelvin");
  const rawTemp = params.get("temp");

  if (!rawColor && !rawBrightness && !rawKelvin && !rawTemp) return null;

  const result: ShareLinkState = {};

  if (rawColor) {
    const normalized = rawColor.startsWith("#") ? rawColor : `#${rawColor}`;
    if (HEX_RE.test(normalized)) {
      result.color = normalized.toUpperCase();
    }
  }

  if (rawBrightness) {
    const n = parseInt(rawBrightness, 10);
    if (!Number.isNaN(n)) {
      result.brightness = clamp(n, 0, 100);
    }
  }

  if (rawKelvin) {
    const n = parseInt(rawKelvin, 10);
    if (!Number.isNaN(n)) {
      result.kelvin = clamp(n, 2000, 10000);
    }
  }

  if (rawTemp) {
    const n = parseInt(rawTemp, 10);
    if (!Number.isNaN(n)) {
      result.colorTemperature = clamp(n, -100, 100);
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}

export function buildShareLinkParams(state: {
  color: string;
  brightness: number;
  kelvin?: number;
  colorTemperature?: number;
}): URLSearchParams {
  const params = new URLSearchParams({
    color: state.color,
    brightness: state.brightness.toString(),
  });
  if (state.kelvin !== undefined) {
    params.set("kelvin", state.kelvin.toString());
  }
  if (state.colorTemperature !== undefined && state.colorTemperature !== 0) {
    params.set("temp", state.colorTemperature.toString());
  }
  return params;
}

export function buildShareLink(state: {
  color: string;
  brightness: number;
  kelvin?: number;
  colorTemperature?: number;
  pathname?: string;
}): string {
  if (typeof window === "undefined") return "";
  const params = buildShareLinkParams(state);
  const path = state.pathname ?? window.location.pathname;
  return `${window.location.origin}${path}?${params.toString()}`;
}
