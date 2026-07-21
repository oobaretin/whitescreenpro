/** Tool-specific URL deep link params (?cycle=1, ?grid=1, etc.) */

export interface DeadPixelDeepLink {
  autoCycle?: boolean;
  cycleInterval?: number;
  showGrid?: boolean;
  zoomMode?: boolean;
}

export interface FlickerDeepLink {
  enabled: boolean;
  frequency?: number;
  intensity?: number;
}

export type ToolDeepLinkState =
  | { tool: "dead-pixel-test"; config: DeadPixelDeepLink }
  | { tool: "flicker"; config: FlickerDeepLink };

function truthy(v: string | null): boolean {
  return v === "1" || v === "true" || v === "yes";
}

function parseIntParam(v: string | null, min: number, max: number): number | undefined {
  if (!v) return undefined;
  const n = parseInt(v, 10);
  if (Number.isNaN(n)) return undefined;
  return Math.min(max, Math.max(min, n));
}

export function parseToolDeepLinks(
  slug: string,
  search: string | URLSearchParams,
): ToolDeepLinkState | null {
  const params =
    typeof search === "string"
      ? new URLSearchParams(search.startsWith("?") ? search.slice(1) : search)
      : search;

  if (slug === "dead-pixel-test") {
    const hasAny =
      params.has("cycle") ||
      params.has("auto") ||
      params.has("interval") ||
      params.has("grid") ||
      params.has("zoom");
    if (!hasAny) return null;

    const config: DeadPixelDeepLink = {};
    if (params.has("cycle") || params.has("auto")) {
      config.autoCycle = truthy(params.get("cycle") ?? params.get("auto"));
    }
    const interval = parseIntParam(params.get("interval"), 1, 30);
    if (interval !== undefined) config.cycleInterval = interval;
    if (params.has("grid")) config.showGrid = truthy(params.get("grid"));
    if (params.has("zoom")) config.zoomMode = truthy(params.get("zoom"));
    return { tool: "dead-pixel-test", config };
  }

  if (params.has("flicker") || params.has("hz") || params.has("intensity")) {
    const enabled = params.has("flicker") ? truthy(params.get("flicker")) : true;
    const config: FlickerDeepLink = { enabled };
    const hz = parseIntParam(params.get("hz"), 1, 30);
    if (hz !== undefined) config.frequency = hz;
    const intensity = parseIntParam(params.get("intensity"), 0, 100);
    if (intensity !== undefined) config.intensity = intensity;
    return { tool: "flicker", config };
  }

  return null;
}

export function buildDeadPixelShareParams(config: {
  autoCycle?: boolean;
  cycleInterval?: number;
}): URLSearchParams {
  const params = new URLSearchParams();
  if (config.autoCycle) params.set("cycle", "1");
  if (config.cycleInterval !== undefined) {
    params.set("interval", String(config.cycleInterval));
  }
  return params;
}
