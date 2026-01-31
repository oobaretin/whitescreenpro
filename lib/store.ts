import { create } from "zustand";
import { COLOR_PRESETS, GradientConfig } from "./colorUtils";
import { getStoredSettings, saveSettings } from "./storageUtils";

export interface PatternConfig {
  enabled: boolean;
  type: "grid" | "crosshair" | "test-pattern";
  gridSize?: number;
  opacity?: number;
}

export interface TimerConfig {
  enabled: boolean;
  duration: number; // seconds
  remaining: number;
  running: boolean;
}

export interface FlickerConfig {
  enabled: boolean;
  frequency: number; // Hz
  intensity: number; // 0-100%
}

export interface AppState {
  // Color state
  currentColor: string;
  brightness: number;
  colorTemperature: number;
  
  // Gradient state
  gradient: GradientConfig;
  
  // Display state
  isFullscreen: boolean;
  isPiP: boolean;
  resolution: string;
  customDimensions: { width: number; height: number } | null;
  aspectRatioLock: boolean;
  
  // Pattern state
  pattern: PatternConfig;
  
  // Timer state
  timer: TimerConfig;
  
  // Flicker state
  flicker: FlickerConfig;
  
  // Auto-cycle state
  autoCycle: {
    enabled: boolean;
    interval: number; // seconds
    colors: string[];
    currentIndex: number;
  };
  
  // UI state
  panelOpen: boolean;
  panelAutoHide: boolean;
  panelHideDelay: number;
  showHint: boolean;
  activeTab: "colors" | "tools" | "pranks" | "ambient" | "settings";
  language: "en" | "es" | "fr" | "de" | "it" | "pt" | "zh" | "ja" | "ko" | "ar" | "ru" | "hi" | "tr";
  theme: "light" | "dark";
  toastMessage: string | null;
  pixelShifterEnabled: boolean;
  
  // Active mode/tool
  activeMode: "color" | "zoom-lighting" | "signature" | "tip-screen" | "dead-pixel" | "broken-screen" | "bsod" | "fake-update" | "hacker-terminal" | "dvd-screensaver" | "matrix-rain" | "flip-clock" | "no-signal" | "quote" | "white-noise" | "radar";
  
  // Tool-specific configs
  zoomLighting: {
    colorTemperature: number; // 3000-6500K
    brightness: number;
    preset: "warm" | "neutral" | "cool" | "custom";
    customColor: string;
  };
  
  signature: {
    penThickness: number;
    penColor: string;
    backgroundColor: string;
    showGrid: boolean;
  };
  
  tipScreen: {
    baseAmount: number;
    tipPercent: number | null;
    customTip: number | null;
    serviceDescription: string;
    showThankYou: boolean;
  };
  
  deadPixel: {
    autoCycle: boolean;
    cycleInterval: number;
    currentTestColor: number; // index
    markedPixels: Array<{ x: number; y: number }>;
    showGrid: boolean;
    zoomMode: boolean;
  };
  
  brokenScreen: {
    pattern: string; // "pattern-1" | "pattern-2" | "pattern-3" | "pattern-4" | "pattern-5"
    soundEnabled: boolean;
    timedActivation: number; // seconds, 0 = instant
    shakeEnabled: boolean;
  };
  
  bsod: {
    version: "xp" | "7" | "10" | "11";
    customMessage: string;
    customCode: string;
  };
  
  fakeUpdate: {
    type: "windows" | "macos" | "ubuntu" | "chromeos" | "bios" | "format";
    progress: number;
    frozen: boolean;
  };
  
  dvd: {
    speed: number;
    logoSize: number;
    cornerHits: number;
    customLogo: string | null;
    customFont: string;
    logoType: "dvd" | "bluray" | "custom";
  };
  
  matrix: {
    speed: number;
    density: number;
    color: "green" | "blue" | "red" | "white";
    characterSet: "latin" | "japanese" | "numbers" | "binary";
  };
  
  noSignal: {
    type: "static" | "colorbars";
    softStatic: boolean;
  };
  
  // Actions
  setColor: (color: string) => void;
  setBrightness: (brightness: number) => void;
  setColorTemperature: (temp: number) => void;
  setGradient: (gradient: Partial<GradientConfig>) => void;
  toggleFullscreen: () => void;
  togglePiP: () => void;
  setResolution: (resolution: string) => void;
  setCustomDimensions: (dims: { width: number; height: number } | null) => void;
  toggleAspectRatioLock: () => void;
  setPattern: (pattern: Partial<PatternConfig>) => void;
  setTimer: (timer: Partial<TimerConfig>) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  setFlicker: (flicker: Partial<FlickerConfig>) => void;
  setAutoCycle: (autoCycle: Partial<AppState["autoCycle"]>) => void;
  togglePanel: () => void;
  setPanelOpen: (open: boolean) => void;
  setActiveTab: (tab: AppState["activeTab"]) => void;
  setLanguage: (language: AppState["language"]) => void;
  setTheme: (theme: AppState["theme"]) => void;
  showToast: (message: string) => void;
  setPixelShifterEnabled: (enabled: boolean) => void;
  cycleColor: () => void;
  cycleToNextPreset: () => void;
  cycleToPreviousPreset: () => void;
  
  // Mode actions
  setActiveMode: (mode: AppState["activeMode"]) => void;
  setZoomLighting: (config: Partial<AppState["zoomLighting"]>) => void;
  setSignature: (config: Partial<AppState["signature"]>) => void;
  setTipScreen: (config: Partial<AppState["tipScreen"]>) => void;
  setDeadPixel: (config: Partial<AppState["deadPixel"]>) => void;
  setBrokenScreen: (config: Partial<AppState["brokenScreen"]>) => void;
  setBSOD: (config: Partial<AppState["bsod"]>) => void;
  setFakeUpdate: (config: Partial<AppState["fakeUpdate"]>) => void;
  setDVD: (config: Partial<AppState["dvd"]>) => void;
  setMatrix: (config: Partial<AppState["matrix"]>) => void;
  setNoSignal: (config: Partial<AppState["noSignal"]>) => void;
}

const defaultGradient: GradientConfig = {
  enabled: false,
  type: "linear",
  startColor: "#FFFFFF",
  endColor: "#000000",
  angle: 0,
  position: { x: 50, y: 50 },
};

const defaultPattern: PatternConfig = {
  enabled: false,
  type: "grid",
  gridSize: 50,
  opacity: 0.3,
};

const defaultTimer: TimerConfig = {
  enabled: false,
  duration: 60,
  remaining: 60,
  running: false,
};

const defaultFlicker: FlickerConfig = {
  enabled: false,
  frequency: 1,
  intensity: 50,
};

const defaultAutoCycle = {
  enabled: false,
  interval: 5,
  colors: COLOR_PRESETS.map((p) => p.hex),
  currentIndex: 0,
};

// Load initial settings from localStorage
const storedSettings = typeof window !== "undefined" ? getStoredSettings() : {};

export const useAppStore = create<AppState>()((set, get) => ({
      // Initial state
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
      panelOpen: false, // Will be set based on screen size in component
      panelAutoHide: storedSettings.autoHidePanel ?? true,
      panelHideDelay: storedSettings.panelHideDelay ?? 3000,
      showHint: true,
      activeTab: "colors",
      language: (typeof window !== "undefined" && localStorage.getItem("whitescreentools-language")) as AppState["language"] || "en",
      theme: (typeof window !== "undefined" && localStorage.getItem("whitescreentools-theme") === "dark") ? "dark" : "light",
      toastMessage: null,
      pixelShifterEnabled: (typeof window !== "undefined" && localStorage.getItem("whitescreentools-pixel-shifter") === "true") || false,
      
      // Active mode
      activeMode: "color",
      
      // Tool configs
      zoomLighting: {
        colorTemperature: 5000,
        brightness: 80,
        preset: "neutral",
        customColor: "#FFFFFF",
      },
      
      signature: {
        penThickness: 3,
        penColor: "#000000",
        backgroundColor: "#FFFFFF",
        showGrid: false,
      },
      
      tipScreen: {
        baseAmount: 0,
        tipPercent: null,
        customTip: null,
        serviceDescription: "",
        showThankYou: false,
      },
      
      deadPixel: {
        autoCycle: false,
        cycleInterval: 3,
        currentTestColor: 0,
        markedPixels: [],
        showGrid: false,
        zoomMode: false,
      },
      
      brokenScreen: {
        pattern: "pattern-1",
        soundEnabled: false,
        timedActivation: 0,
        shakeEnabled: false,
      },
      
      bsod: {
        version: "10",
        customMessage: "",
        customCode: "",
      },
      
      fakeUpdate: {
        type: "windows",
        progress: 0,
        frozen: false,
      },
      
      dvd: {
        speed: 2,
        logoSize: 100,
        cornerHits: 0,
        customLogo: null,
        customFont: "Arial",
        logoType: "dvd",
      },
      
      matrix: {
        speed: 50,
        density: 50,
        color: "green",
        characterSet: "latin",
      },
      
      noSignal: {
        type: "static",
        softStatic: true,
      },

      // Actions
      setColor: (color: string) => {
        set({ currentColor: color });
        if (typeof window !== "undefined") {
          saveSettings({ lastColor: color });
        }
      },

      setBrightness: (brightness: number) => {
        set({ brightness });
        if (typeof window !== "undefined") {
          saveSettings({ brightness });
        }
      },

      setColorTemperature: (temp: number) => {
        set({ colorTemperature: temp });
        if (typeof window !== "undefined") {
          saveSettings({ colorTemperature: temp });
        }
      },

      setGradient: (gradient: Partial<GradientConfig>) => {
        set((state) => ({
          gradient: { ...state.gradient, ...gradient },
        }));
      },

      toggleFullscreen: () => {
        const { isFullscreen } = get();
        set({ isFullscreen: !isFullscreen });
      },

      togglePiP: () => {
        const { isPiP } = get();
        set({ isPiP: !isPiP });
      },

      setResolution: (resolution: string) => {
        set({ resolution });
      },

      setCustomDimensions: (dims: { width: number; height: number } | null) => {
        set({ customDimensions: dims });
      },

      toggleAspectRatioLock: () => {
        set((state) => ({ aspectRatioLock: !state.aspectRatioLock }));
      },

      setPattern: (pattern: Partial<PatternConfig>) => {
        set((state) => ({
          pattern: { ...state.pattern, ...pattern },
        }));
      },

      setTimer: (timer: Partial<TimerConfig>) => {
        set((state) => ({
          timer: { ...state.timer, ...timer },
        }));
      },

      startTimer: () => {
        set((state) => ({
          timer: { ...state.timer, running: true },
        }));
      },

      stopTimer: () => {
        set((state) => ({
          timer: { ...state.timer, running: false },
        }));
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

      setFlicker: (flicker: Partial<FlickerConfig>) => {
        set((state) => ({
          flicker: { ...state.flicker, ...flicker },
        }));
      },

      setAutoCycle: (autoCycle: Partial<AppState["autoCycle"]>) => {
        set((state) => ({
          autoCycle: { ...state.autoCycle, ...autoCycle },
        }));
      },

      togglePanel: () => {
        set((state) => ({ panelOpen: !state.panelOpen }));
      },

      setPanelOpen: (open: boolean) => {
        set({ panelOpen: open });
      },

      setActiveTab: (tab: AppState["activeTab"]) => {
        set({ activeTab: tab });
      },
      setLanguage: (language: AppState["language"]) => {
        set({ language });
        if (typeof window !== "undefined") {
          localStorage.setItem("whitescreentools-language", language);
        }
      },
      setTheme: (theme: AppState["theme"]) => {
        set({ theme });
        if (typeof window !== "undefined") {
          localStorage.setItem("whitescreentools-theme", theme);
          document.documentElement.setAttribute("data-theme", theme);
        }
      },
      showToast: (message: string) => {
        set({ toastMessage: message });
        if (typeof window !== "undefined") {
          setTimeout(() => set({ toastMessage: null }), 3000);
        }
      },
      setPixelShifterEnabled: (enabled: boolean) => {
        set({ pixelShifterEnabled: enabled });
        if (typeof window !== "undefined") {
          localStorage.setItem("whitescreentools-pixel-shifter", String(enabled));
        }
      },

      cycleColor: () => {
        const { currentColor } = get();
        const currentIndex = COLOR_PRESETS.findIndex(
          (p) => p.hex.toUpperCase() === currentColor.toUpperCase()
        );
        const nextIndex = (currentIndex + 1) % COLOR_PRESETS.length;
        get().setColor(COLOR_PRESETS[nextIndex].hex);
      },

      cycleToNextPreset: () => {
        const { currentColor } = get();
        const currentIndex = COLOR_PRESETS.findIndex(
          (p) => p.hex.toUpperCase() === currentColor.toUpperCase()
        );
        const nextIndex = (currentIndex + 1) % COLOR_PRESETS.length;
        get().setColor(COLOR_PRESETS[nextIndex].hex);
      },

      cycleToPreviousPreset: () => {
        const { currentColor } = get();
        const currentIndex = COLOR_PRESETS.findIndex(
          (p) => p.hex.toUpperCase() === currentColor.toUpperCase()
        );
        const prevIndex =
          currentIndex === 0 ? COLOR_PRESETS.length - 1 : currentIndex - 1;
        get().setColor(COLOR_PRESETS[prevIndex].hex);
      },
      
      // Mode actions
      setActiveMode: (mode: AppState["activeMode"]) => {
        set({ activeMode: mode });
      },
      
      setZoomLighting: (config: Partial<AppState["zoomLighting"]>) => {
        set((state) => ({
          zoomLighting: { ...state.zoomLighting, ...config },
        }));
      },
      
      setSignature: (config: Partial<AppState["signature"]>) => {
        set((state) => ({
          signature: { ...state.signature, ...config },
        }));
      },
      
      setTipScreen: (config: Partial<AppState["tipScreen"]>) => {
        set((state) => ({
          tipScreen: { ...state.tipScreen, ...config },
        }));
      },
      
      setDeadPixel: (config: Partial<AppState["deadPixel"]>) => {
        set((state) => ({
          deadPixel: { ...state.deadPixel, ...config },
        }));
      },
      
      setBrokenScreen: (config: Partial<AppState["brokenScreen"]>) => {
        set((state) => ({
          brokenScreen: { ...state.brokenScreen, ...config },
        }));
      },
      
      setBSOD: (config: Partial<AppState["bsod"]>) => {
        set((state) => ({
          bsod: { ...state.bsod, ...config },
        }));
      },
      
      setFakeUpdate: (config: Partial<AppState["fakeUpdate"]>) => {
        set((state) => ({
          fakeUpdate: { ...state.fakeUpdate, ...config },
        }));
      },
      
      setDVD: (config: Partial<AppState["dvd"]>) => {
        set((state) => ({
          dvd: { ...state.dvd, ...config },
        }));
      },
      
      setMatrix: (config: Partial<AppState["matrix"]>) => {
        set((state) => ({
          matrix: { ...state.matrix, ...config },
        }));
      },
      
      setNoSignal: (config: Partial<AppState["noSignal"]>) => {
        set((state) => ({
          noSignal: { ...state.noSignal, ...config },
        }));
      },
    })
);

