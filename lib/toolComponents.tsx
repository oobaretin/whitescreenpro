"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const loading = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  </div>
);

function dyn(loader: () => Promise<{ default: ComponentType<unknown> }>) {
  return dynamic(loader, { ssr: false, loading });
}

// Pranks
export const BSOD = dyn(() =>
  import("@/components/pranks/BSOD").then((m) => ({ default: m.BSOD })),
);
export const BrokenScreenOverlay = dyn(() =>
  import("@/components/pranks/BrokenScreenOverlay").then((m) => ({
    default: m.BrokenScreenOverlay,
  })),
);
export const FakeUpdate = dyn(() =>
  import("@/components/pranks/FakeUpdate").then((m) => ({ default: m.FakeUpdate })),
);
export const HackerTerminal = dyn(() =>
  import("@/components/pranks/HackerTerminal").then((m) => ({
    default: m.HackerTerminal,
  })),
);
export const BrokenScreen = dyn(() =>
  import("@/components/pranks/BrokenScreen").then((m) => ({
    default: m.BrokenScreen,
  })),
);
export const BSODControls = dyn(() =>
  import("@/components/pranks/BSODControls").then((m) => ({
    default: m.BSODControls,
  })),
);
export const FakeUpdateControls = dyn(() =>
  import("@/components/pranks/FakeUpdateControls").then((m) => ({
    default: m.FakeUpdateControls,
  })),
);
export const HackerTerminalControls = dyn(() =>
  import("@/components/pranks/HackerTerminalControls").then((m) => ({
    default: m.HackerTerminalControls,
  })),
);

// Ambient
export const DVDScreensaver = dyn(() =>
  import("@/components/ambient/DVDScreensaver").then((m) => ({
    default: m.DVDScreensaver,
  })),
);
export const MatrixRain = dyn(() =>
  import("@/components/ambient/MatrixRain").then((m) => ({ default: m.MatrixRain })),
);
export const FlipClock = dyn(() =>
  import("@/components/ambient/FlipClock").then((m) => ({ default: m.FlipClock })),
);
export const NoSignal = dyn(() =>
  import("@/components/ambient/NoSignal").then((m) => ({ default: m.NoSignal })),
);
export const DVDControls = dyn(() =>
  import("@/components/ambient/DVDControls").then((m) => ({ default: m.DVDControls })),
);
export const MatrixControls = dyn(() =>
  import("@/components/ambient/MatrixControls").then((m) => ({
    default: m.MatrixControls,
  })),
);
export const FlipClockControls = dyn(() =>
  import("@/components/ambient/FlipClockControls").then((m) => ({
    default: m.FlipClockControls,
  })),
);
export const NoSignalControls = dyn(() =>
  import("@/components/ambient/NoSignalControls").then((m) => ({
    default: m.NoSignalControls,
  })),
);

// Tools
export const SignatureScreen = dyn(() =>
  import("@/components/tools/SignatureScreen").then((m) => ({
    default: m.SignatureScreen,
  })),
);
export const TipScreen = dyn(() =>
  import("@/components/tools/TipScreen").then((m) => ({ default: m.TipScreen })),
);
export const DeadPixelTest = dyn(() =>
  import("@/components/tools/DeadPixelTest").then((m) => ({
    default: m.DeadPixelTest,
  })),
);
export const ScreenStressTest = dyn(() =>
  import("@/components/tools/ScreenStressTest").then((m) => ({
    default: m.ScreenStressTest,
  })),
);
export const BurnInFixer = dyn(() =>
  import("@/components/tools/BurnInFixer").then((m) => ({ default: m.BurnInFixer })),
);
export const MotionBlurTest = dyn(() =>
  import("@/components/tools/MotionBlurTest").then((m) => ({
    default: m.MotionBlurTest,
  })),
);
export const ReadingLight = dyn(() =>
  import("@/components/tools/ReadingLight").then((m) => ({ default: m.ReadingLight })),
);
export const ReflectionChecker = dyn(() =>
  import("@/components/tools/ReflectionChecker").then((m) => ({
    default: m.ReflectionChecker,
  })),
);
export const ScreenRuler = dyn(() =>
  import("@/components/tools/ScreenRuler").then((m) => ({ default: m.ScreenRuler })),
);
export const ZoomLighting = dyn(() =>
  import("@/components/tools/ZoomLighting").then((m) => ({ default: m.ZoomLighting })),
);
