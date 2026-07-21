const STORAGE_KEY = "whitescreentools-pinned-tools";
const MAX_PINNED = 8;

export function getToolPinId(entry: {
  type: string;
  slug?: string;
}): string | null {
  if (entry.type === "route" && entry.slug) return entry.slug;
  if (entry.type === "open-health" || entry.type === "open-settings") {
    return entry.type;
  }
  return null;
}

export function getPinnedTools(): string[] {
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

export function isPinnedTool(id: string): boolean {
  return getPinnedTools().includes(id);
}

/** Toggle pin state; returns true if now pinned. */
export function togglePinnedTool(id: string): boolean {
  if (typeof localStorage === "undefined" || !id) return false;
  try {
    const pinned = getPinnedTools();
    const exists = pinned.includes(id);
    const next = exists
      ? pinned.filter((s) => s !== id)
      : [id, ...pinned.filter((s) => s !== id)].slice(0, MAX_PINNED);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return !exists;
  } catch {
    return false;
  }
}
