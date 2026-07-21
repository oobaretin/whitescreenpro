import { COLOR_PRESETS, type GradientConfig } from "../colorUtils";
import { getStoredSettings } from "../storageUtils";
import type {
  FlickerConfig,
  PatternConfig,
  TimerConfig,
} from "./types";

export const defaultGradient: GradientConfig = {
  enabled: false,
  type: "linear",
  startColor: "#FFFFFF",
  endColor: "#000000",
  angle: 0,
  position: { x: 50, y: 50 },
};

export const defaultPattern: PatternConfig = {
  enabled: false,
  type: "grid",
  gridSize: 50,
  opacity: 0.3,
};

export const defaultTimer: TimerConfig = {
  enabled: false,
  duration: 60,
  remaining: 60,
  running: false,
};

export const defaultFlicker: FlickerConfig = {
  enabled: false,
  frequency: 1,
  intensity: 50,
};

export const defaultAutoCycle = {
  enabled: false,
  interval: 5,
  colors: COLOR_PRESETS.map((p) => p.hex),
  currentIndex: 0,
};

export const storedSettings =
  typeof window !== "undefined" ? getStoredSettings() : {};

export function readMasterKelvin(): number {
  if (typeof window === "undefined") return 6500;
  const raw = localStorage.getItem("whitescreentools-master-kelvin");
  const n = raw ? parseInt(raw, 10) : 6500;
  if (Number.isNaN(n)) return 6500;
  return Math.min(10000, Math.max(2000, n));
}

export function readMasterBrightness(): number {
  if (typeof window === "undefined") return 100;
  const raw = localStorage.getItem("whitescreentools-master-brightness");
  const n = raw ? parseInt(raw, 10) : 100;
  if (Number.isNaN(n)) return 100;
  return Math.min(100, Math.max(20, n));
}

export function readMultiMonitorSync(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("whitescreentools-multi-sync") !== "false";
}

export const defaultToolConfigs = {
  zoomLighting: {
    colorTemperature: 5000,
    brightness: 80,
    preset: "neutral" as const,
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
    tipPercent: null as number | null,
    customTip: null as number | null,
    serviceDescription: "",
    showThankYou: false,
  },
  deadPixel: {
    autoCycle: false,
    cycleInterval: 3,
    currentTestColor: 0,
    markedPixels: [] as Array<{ x: number; y: number }>,
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
    version: "10" as const,
    customMessage: "",
    customCode: "",
  },
  fakeUpdate: {
    type: "windows" as const,
    progress: 0,
    frozen: false,
  },
  dvd: {
    speed: 2,
    logoSize: 100,
    cornerHits: 0,
    customLogo: null as string | null,
    customFont: "Arial",
    logoType: "dvd" as const,
  },
  matrix: {
    speed: 50,
    density: 50,
    color: "green" as const,
    characterSet: "latin" as const,
  },
  noSignal: {
    type: "static" as const,
    softStatic: true,
  },
};
