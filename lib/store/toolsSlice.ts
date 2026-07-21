import { defaultToolConfigs } from "./defaults";
import type { StoreSlice, ToolsSlice } from "./types";

export const createToolsSlice: StoreSlice<ToolsSlice> = (set) => ({
  activeMode: "color",
  ...defaultToolConfigs,

  setActiveMode: (mode) => set({ activeMode: mode }),

  setZoomLighting: (config) => {
    set((state) => ({
      zoomLighting: { ...state.zoomLighting, ...config },
    }));
  },

  setSignature: (config) => {
    set((state) => ({
      signature: { ...state.signature, ...config },
    }));
  },

  setTipScreen: (config) => {
    set((state) => ({
      tipScreen: { ...state.tipScreen, ...config },
    }));
  },

  setDeadPixel: (config) => {
    set((state) => ({
      deadPixel: { ...state.deadPixel, ...config },
    }));
  },

  setBrokenScreen: (config) => {
    set((state) => ({
      brokenScreen: { ...state.brokenScreen, ...config },
    }));
  },

  setBSOD: (config) => {
    set((state) => ({
      bsod: { ...state.bsod, ...config },
    }));
  },

  setFakeUpdate: (config) => {
    set((state) => ({
      fakeUpdate: { ...state.fakeUpdate, ...config },
    }));
  },

  setDVD: (config) => {
    set((state) => ({
      dvd: { ...state.dvd, ...config },
    }));
  },

  setMatrix: (config) => {
    set((state) => ({
      matrix: { ...state.matrix, ...config },
    }));
  },

  setNoSignal: (config) => {
    set((state) => ({
      noSignal: { ...state.noSignal, ...config },
    }));
  },
});
