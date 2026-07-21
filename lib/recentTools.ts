const STORAGE_KEY = "whitescreentools-recent-tools";
const MAX_RECENT = 6;

export function recordRecentTool(slug: string): void {
  if (typeof localStorage === "undefined" || !slug) return;
  try {
    const existing = getRecentTools().filter((s) => s !== slug);
    const next = [slug, ...existing].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* noop */
  }
}

export function getRecentTools(): string[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((s): s is string => typeof s === "string")
      : [];
  } catch {
    return [];
  }
}
