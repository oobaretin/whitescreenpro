import { COLOR_PRESETS, kelvinToHex } from "../colorUtils";
import { postWhiteScreenSync } from "../broadcastSync";
import { saveSettings } from "../storageUtils";
import {
  defaultAutoCycle,
  defaultFlicker,
  defaultGradient,
  defaultPattern,
  defaultTimer,
  readMasterBrightness,
  readMasterKelvin,
  readMultiMonitorSync,
  storedSettings,
} from "./defaults";
import type { ColorSlice, StoreSlice } from "./types";

export const createColorSlice: StoreSlice<ColorSlice> = (set, get) => ({
  currentColor: storedSettings.lastColor || COLOR_PRESETS[0].hex,
  brightness: storedSettings.brightness ?? 100,
  colorTemperature: storedSettings.colorTemperature ?? 0,
  gradient: storedSettings.gradient || defaultGradient,
  isFullscreen: false,
  isPiP: false,
  resolution: "native",
  customDimensions: null,
  aspectRatioLock: false,
  pattern: defaultPattern,
  timer: defaultTimer,
  flicker: defaultFlicker,
  autoCycle: defaultAutoCycle,
  masterKelvin: readMasterKelvin(),
  masterBrightness: readMasterBrightness(),
  multiMonitorSyncEnabled: readMultiMonitorSync(),

  setColor: (color, opts) => {
    set({ currentColor: color });
    if (typeof window !== "undefined") {
      saveSettings({ lastColor: color });
    }
    const { multiMonitorSyncEnabled } = get();
    if (
      multiMonitorSyncEnabled &&
      !opts?.fromSync &&
      !opts?.internalFromKelvin
    ) {
      postWhiteScreenSync("color", color);
    }
  },

  setBrightness: (brightness) => {
    set({ brightness });
    if (typeof window !== "undefined") {
      saveSettings({ brightness });
    }
  },

  setColorTemperature: (temp) => {
    set({ colorTemperature: temp });
    if (typeof window !== "undefined") {
      saveSettings({ colorTemperature: temp });
    }
  },

  setGradient: (gradient) => {
    set((state) => ({ gradient: { ...state.gradient, ...gradient } }));
  },

  toggleFullscreen: () => {
    set({ isFullscreen: !get().isFullscreen });
  },

  togglePiP: () => {
    set({ isPiP: !get().isPiP });
  },

  setResolution: (resolution) => set({ resolution }),

  setCustomDimensions: (dims) => set({ customDimensions: dims }),

  toggleAspectRatioLock: () => {
    set((state) => ({ aspectRatioLock: !state.aspectRatioLock }));
  },

  setPattern: (pattern) => {
    set((state) => ({ pattern: { ...state.pattern, ...pattern } }));
  },

  setTimer: (timer) => {
    set((state) => ({ timer: { ...state.timer, ...timer } }));
  },

  startTimer: () => {
    set((state) => ({ timer: { ...state.timer, running: true } }));
  },

  stopTimer: () => {
    set((state) => ({ timer: { ...state.timer, running: false } }));
  },

  resetTimer: () => {
    set((state) => ({
      timer: {
        ...state.timer,
        remaining: state.timer.duration,
        running: false,
      },
    }));
  },

  setFlicker: (flicker) => {
    set((state) => ({ flicker: { ...state.flicker, ...flicker } }));
  },

  setAutoCycle: (autoCycle) => {
    set((state) => ({ autoCycle: { ...state.autoCycle, ...autoCycle } }));
  },

  setMasterKelvin: (kelvin, opts) => {
    const k = Math.min(10000, Math.max(2000, kelvin));
    set({ masterKelvin: k });
    const hex = kelvinToHex(k);
    get().setColor(hex, { fromSync: opts?.fromSync, internalFromKelvin: true });
    if (typeof window !== "undefined") {
      localStorage.setItem("whitescreentools-master-kelvin", String(k));
    }
    if (get().multiMonitorSyncEnabled && !opts?.fromSync) {
      postWhiteScreenSync("kelvin", k);
    }
  },

  setMasterBrightness: (value, opts) => {
    const b = Math.min(100, Math.max(20, value));
    set({ masterBrightness: b });
    if (typeof window !== "undefined") {
      localStorage.setItem("whitescreentools-master-brightness", String(b));
    }
    if (get().multiMonitorSyncEnabled && !opts?.fromSync) {
      postWhiteScreenSync("brightness", b);
    }
  },

  setMultiMonitorSyncEnabled: (enabled) => {
    set({ multiMonitorSyncEnabled: enabled });
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "whitescreentools-multi-sync",
        enabled ? "true" : "false",
      );
    }
  },

  cycleColor: () => {
    const { currentColor } = get();
    const currentIndex = COLOR_PRESETS.findIndex(
      (p) => p.hex.toUpperCase() === currentColor.toUpperCase(),
    );
    const nextIndex = (currentIndex + 1) % COLOR_PRESETS.length;
    get().setColor(COLOR_PRESETS[nextIndex].hex);
  },

  cycleToNextPreset: () => {
    get().cycleColor();
  },

  cycleToPreviousPreset: () => {
    const { currentColor } = get();
    const currentIndex = COLOR_PRESETS.findIndex(
      (p) => p.hex.toUpperCase() === currentColor.toUpperCase(),
    );
    const prevIndex =
      currentIndex === 0 ? COLOR_PRESETS.length - 1 : currentIndex - 1;
    get().setColor(COLOR_PRESETS[prevIndex].hex);
  },
});
