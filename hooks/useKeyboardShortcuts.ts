import { useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { COLOR_PRESETS } from "@/lib/colorUtils";

export function useKeyboardShortcuts() {
  const {
    toggleFullscreen,
    togglePanel,
    cycleColor,
    cycleToNextPreset,
    cycleToPreviousPreset,
    setPanelOpen,
    setBrightness,
    brightness,
    setPattern,
    pattern,
    startTimer,
    stopTimer,
    timer,
    setColor,
    setActiveMode,
    activeMode,
  } = useAppStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ignore shortcuts when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "f":
        case "F":
        case "F11":
          if (e.key === "F11") {
            e.preventDefault();
          }
          toggleFullscreen();
          break;

        case " ":
          e.preventDefault();
          cycleColor();
          break;

        case "Escape":
          setPanelOpen(false);
          break;

        case "c":
        case "C":
          e.preventDefault();
          togglePanel();
          break;

        case "b":
        case "B":
          e.preventDefault();
          // Toggle brightness slider visibility (handled in UI)
          break;

        case "g":
        case "G":
          e.preventDefault();
          setPattern({ enabled: !pattern.enabled });
          break;

        case "t":
        case "T":
          e.preventDefault();
          if (timer.running) {
            stopTimer();
          } else {
            startTimer();
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          setBrightness(Math.min(100, brightness + 5));
          break;

        case "ArrowDown":
          e.preventDefault();
          setBrightness(Math.max(0, brightness - 5));
          break;

        case "ArrowRight":
          e.preventDefault();
          cycleToNextPreset();
          break;

        case "ArrowLeft":
          e.preventDefault();
          cycleToPreviousPreset();
          break;

        // Number keys 1-9 for quick color selection
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          e.preventDefault();
          const index = parseInt(e.key) - 1;
          if (COLOR_PRESETS[index]) {
            setColor(COLOR_PRESETS[index].hex);
            setActiveMode("color");
          }
          break;

        case "r":
        case "R":
          e.preventDefault();
          // Random color
          const randomColor = COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)];
          setColor(randomColor.hex);
          setActiveMode("color");
          break;

        case "h":
        case "H":
          e.preventDefault();
          togglePanel();
          break;

        case "?":
          e.preventDefault();
          // Show keyboard shortcuts help (handled in UI)
          break;
      }
    },
    [
      toggleFullscreen,
      togglePanel,
      cycleColor,
      cycleToNextPreset,
      cycleToPreviousPreset,
      setPanelOpen,
      setBrightness,
      brightness,
      setPattern,
      pattern,
      startTimer,
      stopTimer,
      timer,
      setColor,
      setActiveMode,
      activeMode,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}

