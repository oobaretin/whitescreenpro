/** OBS / streaming browser-source overlay mode (?obs=1). */

export function parseObsOverlay(search: string | URLSearchParams): boolean {
  const params =
    typeof search === "string"
      ? new URLSearchParams(search.startsWith("?") ? search.slice(1) : search)
      : search;
  const v = params.get("obs") ?? params.get("overlay");
  return v === "1" || v === "true" || v === "yes";
}

export function appendObsParam(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("obs", "1");
    return parsed.toString();
  } catch {
    const join = url.includes("?") ? "&" : "?";
    return `${url}${join}obs=1`;
  }
}
