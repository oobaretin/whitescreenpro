export type QuickPreset =
  | { id: string; label: string; desc: string; icon: string; href: string }
  | { id: string; label: string; desc: string; icon: string; action: "health" };

export const QUICK_PRESETS: QuickPreset[] = [
  {
    id: "photography",
    label: "Photography",
    desc: "Bright white, warm light",
    icon: "📷",
    href: "/white-screen?color=FFFFFF&brightness=100&kelvin=5500",
  },
  {
    id: "video-call",
    label: "Video call",
    desc: "Ring-light style lighting",
    icon: "🎥",
    href: "/zoom-lighting",
  },
  {
    id: "monitor-test",
    label: "Monitor test",
    desc: "Dead pixels & panel check",
    icon: "🖥️",
    action: "health",
  },
  {
    id: "chroma-key",
    label: "Chroma key",
    desc: "Green screen for editing",
    icon: "🎬",
    href: "/green-screen",
  },
];
