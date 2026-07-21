import type { GradientConfig } from "../colorUtils";

export interface PatternConfig {
  enabled: boolean;
  type: "grid" | "crosshair" | "test-pattern";
  gridSize?: number;
  opacity?: number;
}

export interface TimerConfig {
  enabled: boolean;
  duration: number;
  remaining: number;
  running: boolean;
}

export interface FlickerConfig {
  enabled: boolean;
  frequency: number;
  intensity: number;
}

export type ActiveMode =
  | "color"
  | "zoom-lighting"
  | "signature"
  | "tip-screen"
  | "dead-pixel"
  | "broken-screen"
  | "bsod"
  | "fake-update"
  | "hacker-terminal"
  | "dvd-screensaver"
  | "matrix-rain"
  | "flip-clock"
  | "no-signal"
  | "quote"
  | "white-noise"
  | "radar"
  | "color-cycle"
  | "burn-in-fixer"
  | "ruler"
  | "motion-blur-test"
  | "reading-light"
  | "reflection-checker";

export type Language =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "zh"
  | "ja"
  | "ko"
  | "ar"
  | "ru"
  | "hi"
  | "tr";

export type ActiveTab = "colors" | "tools" | "pranks" | "ambient" | "settings";

export interface ColorSlice {
  currentColor: string;
  brightness: number;
  colorTemperature: number;
  gradient: GradientConfig;
  pattern: PatternConfig;
  timer: TimerConfig;
  flicker: FlickerConfig;
  autoCycle: {
    enabled: boolean;
    interval: number;
    colors: string[];
    currentIndex: number;
  };
  isFullscreen: boolean;
  isPiP: boolean;
  resolution: string;
  customDimensions: { width: number; height: number } | null;
  aspectRatioLock: boolean;
  masterKelvin: number;
  masterBrightness: number;
  multiMonitorSyncEnabled: boolean;
  setColor: (
    color: string,
    opts?: { fromSync?: boolean; internalFromKelvin?: boolean },
  ) => void;
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
  setAutoCycle: (autoCycle: Partial<ColorSlice["autoCycle"]>) => void;
  setMasterKelvin: (kelvin: number, opts?: { fromSync?: boolean }) => void;
  setMasterBrightness: (value: number, opts?: { fromSync?: boolean }) => void;
  setMultiMonitorSyncEnabled: (enabled: boolean) => void;
  cycleColor: () => void;
  cycleToNextPreset: () => void;
  cycleToPreviousPreset: () => void;
}

export interface UiSlice {
  panelOpen: boolean;
  panelAutoHide: boolean;
  panelHideDelay: number;
  showHint: boolean;
  activeTab: ActiveTab;
  language: Language;
  theme: "light" | "dark";
  toastMessage: string | null;
  pixelShifterEnabled: boolean;
  ecoMode: boolean;
  changelogOpen: boolean;
  settingsOpenNonce: number;
  healthDashboardOpen: boolean;
  healthDiagnosticStep: number;
  healthDiagnosticComplete: boolean;
  shortcutsOpen: boolean;
  togglePanel: () => void;
  setPanelOpen: (open: boolean) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setLanguage: (language: Language) => void;
  setTheme: (theme: "light" | "dark") => void;
  showToast: (message: string, duration?: number) => void;
  setPixelShifterEnabled: (enabled: boolean) => void;
  setEcoMode: (enabled: boolean) => void;
  setChangelogOpen: (open: boolean) => void;
  setShortcutsOpen: (open: boolean) => void;
  requestOpenSettingsFab: () => void;
  setHealthDashboardOpen: (open: boolean) => void;
  startHealthDiagnostic: () => void;
  advanceHealthDiagnostic: () => void;
}

export interface ToolsSlice {
  activeMode: ActiveMode;
  zoomLighting: {
    colorTemperature: number;
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
    currentTestColor: number;
    markedPixels: Array<{ x: number; y: number }>;
    showGrid: boolean;
    zoomMode: boolean;
  };
  brokenScreen: {
    pattern: string;
    soundEnabled: boolean;
    timedActivation: number;
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
  setActiveMode: (mode: ActiveMode) => void;
  setZoomLighting: (config: Partial<ToolsSlice["zoomLighting"]>) => void;
  setSignature: (config: Partial<ToolsSlice["signature"]>) => void;
  setTipScreen: (config: Partial<ToolsSlice["tipScreen"]>) => void;
  setDeadPixel: (config: Partial<ToolsSlice["deadPixel"]>) => void;
  setBrokenScreen: (config: Partial<ToolsSlice["brokenScreen"]>) => void;
  setBSOD: (config: Partial<ToolsSlice["bsod"]>) => void;
  setFakeUpdate: (config: Partial<ToolsSlice["fakeUpdate"]>) => void;
  setDVD: (config: Partial<ToolsSlice["dvd"]>) => void;
  setMatrix: (config: Partial<ToolsSlice["matrix"]>) => void;
  setNoSignal: (config: Partial<ToolsSlice["noSignal"]>) => void;
}

export type AppState = ColorSlice & UiSlice & ToolsSlice;

export type StoreSlice<T> = (
  set: (
    partial:
      | Partial<AppState>
      | ((state: AppState) => Partial<AppState>),
  ) => void,
  get: () => AppState,
) => T;
