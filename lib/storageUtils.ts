const STORAGE_KEYS = {
  FAVORITES: "whitescreentools_favorites",
  SETTINGS: "whitescreentools_settings",
  HISTORY: "whitescreentools_history",
} as const;

export interface StoredSettings {
  brightness: number;
  colorTemperature: number;
  autoHidePanel: boolean;
  panelHideDelay: number;
  lastColor: string;
  gradient: {
    enabled: boolean;
    type: "linear" | "radial";
    startColor: string;
    endColor: string;
    angle?: number;
    position?: { x: number; y: number };
  };
}

export function getStoredFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveFavorite(color: string): void {
  if (typeof window === "undefined") return;
  try {
    const favorites = getStoredFavorites();
    if (!favorites.includes(color)) {
      favorites.push(color);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error("Failed to save favorite:", error);
  }
}

export function removeFavorite(color: string): void {
  if (typeof window === "undefined") return;
  try {
    const favorites = getStoredFavorites();
    const filtered = favorites.filter((c) => c !== color);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to remove favorite:", error);
  }
}

export function getStoredHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addToHistory(color: string, maxItems: number = 20): void {
  if (typeof window === "undefined") return;
  try {
    const history = getStoredHistory();
    const filtered = history.filter((c) => c !== color);
    filtered.unshift(color);
    const trimmed = filtered.slice(0, maxItems);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmed));
  } catch (error) {
    console.error("Failed to add to history:", error);
  }
}

export function getStoredSettings(): Partial<StoredSettings> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveSettings(settings: Partial<StoredSettings>): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredSettings();
    const merged = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
}

