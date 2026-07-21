/** Keyboard shortcut reference — keys shown to users. */

export interface ShortcutEntry {
  keys: string;
  action: string;
}

export const KEYBOARD_SHORTCUTS: ShortcutEntry[] = [
  { keys: "F / F11", action: "Toggle fullscreen" },
  { keys: "Space", action: "Cycle preset colors" },
  { keys: "Esc", action: "Exit fullscreen or close panel" },
  { keys: "C", action: "Open / close control panel" },
  { keys: "G", action: "Toggle grid overlay" },
  { keys: "T", action: "Start / stop timer" },
  { keys: "↑ / ↓", action: "Adjust brightness" },
  { keys: "← / →", action: "Previous / next preset color" },
  { keys: "1 – 9", action: "Select preset color by number" },
  { keys: "R", action: "Random preset color" },
  { keys: "?", action: "Show this shortcuts list" },
];
