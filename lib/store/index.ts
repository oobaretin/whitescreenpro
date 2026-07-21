import { create } from "zustand";
import { createColorSlice } from "./colorSlice";
import { createUiSlice } from "./uiSlice";
import { createToolsSlice } from "./toolsSlice";
import type { AppState } from "./types";

export type {
  ActiveMode,
  ActiveTab,
  AppState,
  ColorSlice,
  FlickerConfig,
  Language,
  PatternConfig,
  TimerConfig,
  ToolsSlice,
  UiSlice,
} from "./types";

export const useAppStore = create<AppState>()((set, get) => ({
  ...createColorSlice(set, get),
  ...createUiSlice(set, get),
  ...createToolsSlice(set, get),
}));
