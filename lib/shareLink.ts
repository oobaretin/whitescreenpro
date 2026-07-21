/** Encode/decode shareable URL params for color screen settings. */

const HEX_RE = /^#?[0-9A-Fa-f]{6}$/;

export interface ShareLinkState {
  color?: string;
  brightness?: number;
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

  if (!rawColor && !rawBrightness) return null;

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
      result.brightness = Math.min(100, Math.max(0, n));
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}

export function buildShareLinkParams(state: {
  color: string;
  brightness: number;
}): URLSearchParams {
  return new URLSearchParams({
    color: state.color,
    brightness: state.brightness.toString(),
  });
}

export function buildShareLink(state: {
  color: string;
  brightness: number;
  pathname?: string;
}): string {
  if (typeof window === "undefined") return "";
  const params = buildShareLinkParams(state);
  const path = state.pathname ?? window.location.pathname;
  return `${window.location.origin}${path}?${params.toString()}`;
}
