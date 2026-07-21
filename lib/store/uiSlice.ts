import { storedSettings } from "./defaults";
import type { StoreSlice, UiSlice } from "./types";

export const createUiSlice: StoreSlice<UiSlice> = (set, get) => ({
  panelOpen: false,
  panelAutoHide: storedSettings.autoHidePanel ?? true,
  panelHideDelay: storedSettings.panelHideDelay ?? 3000,
  showHint: true,
  activeTab: "colors",
  language:
    (typeof window !== "undefined" &&
      (localStorage.getItem("whitescreentools-language") as UiSlice["language"])) ||
    "en",
  theme:
    typeof window !== "undefined" &&
    localStorage.getItem("whitescreentools-theme") === "dark"
      ? "dark"
      : "light",
  toastMessage: null,
  pixelShifterEnabled:
    (typeof window !== "undefined" &&
      localStorage.getItem("whitescreentools-pixel-shifter") === "true") ||
    false,
  ecoMode:
    (typeof window !== "undefined" &&
      localStorage.getItem("whitescreentools-eco-mode") === "true") ||
    false,
  changelogOpen: false,
  settingsOpenNonce: 0,
  healthDashboardOpen: false,
  healthDiagnosticStep: 0,
  healthDiagnosticComplete: false,
  shortcutsOpen: false,
  obsOverlayMode: false,

  togglePanel: () => {
    set((state) => ({ panelOpen: !state.panelOpen }));
  },

  setPanelOpen: (open) => set({ panelOpen: open }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setLanguage: (language) => {
    set({ language });
    if (typeof window !== "undefined") {
      localStorage.setItem("whitescreentools-language", language);
    }
  },

  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== "undefined") {
      localStorage.setItem("whitescreentools-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  },

  showToast: (message, duration = 3000) => {
    set({ toastMessage: message });
    if (typeof window !== "undefined") {
      setTimeout(() => set({ toastMessage: null }), duration);
    }
  },

  setPixelShifterEnabled: (enabled) => {
    set({ pixelShifterEnabled: enabled });
    if (typeof window !== "undefined") {
      localStorage.setItem("whitescreentools-pixel-shifter", String(enabled));
    }
  },

  setEcoMode: (enabled) => {
    set({ ecoMode: enabled });
    if (typeof window !== "undefined") {
      localStorage.setItem("whitescreentools-eco-mode", String(enabled));
    }
  },

  setChangelogOpen: (open) => set({ changelogOpen: open }),

  setShortcutsOpen: (open) => set({ shortcutsOpen: open }),

  setObsOverlayMode: (enabled) => set({ obsOverlayMode: enabled }),

  requestOpenSettingsFab: () =>
    set((s) => ({ settingsOpenNonce: s.settingsOpenNonce + 1 })),

  setHealthDashboardOpen: (open) => set({ healthDashboardOpen: open }),

  startHealthDiagnostic: () => {
    set({
      healthDiagnosticComplete: false,
      healthDashboardOpen: false,
      healthDiagnosticStep: 1,
    });
  },

  advanceHealthDiagnostic: () => {
    const s = get().healthDiagnosticStep;
    if (s === 4) {
      set({
        healthDiagnosticStep: 0,
        healthDashboardOpen: true,
        healthDiagnosticComplete: true,
      });
      get().showToast("🎉 Monitor Health Check Complete!", 5000);
    } else if (s >= 1 && s < 4) {
      set({ healthDiagnosticStep: s + 1 });
    }
  },
});
