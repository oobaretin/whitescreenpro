export interface MonitorLayoutLink {
  label: string;
  href: string;
}

export interface MonitorLayoutPreset {
  id: string;
  label: string;
  desc: string;
  monitors: MonitorLayoutLink[];
}

/** One link per monitor — open each on the matching display with sync enabled. */
export const MONITOR_LAYOUT_PRESETS: MonitorLayoutPreset[] = [
  {
    id: "calibration",
    label: "Calibration",
    desc: "White + 50% gray for panel comparison",
    monitors: [
      { label: "M1 White", href: "/white-screen?color=FFFFFF&brightness=100" },
      { label: "M2 Gray", href: "/gray-screen?brightness=100" },
    ],
  },
  {
    id: "video-call",
    label: "Video call",
    desc: "Ring light + neutral reference screen",
    monitors: [
      { label: "M1 Lighting", href: "/zoom-lighting" },
      { label: "M2 Gray", href: "/gray-screen?brightness=80&kelvin=6500" },
    ],
  },
  {
    id: "dead-pixel",
    label: "Pixel test",
    desc: "Auto-cycle colors on both displays",
    monitors: [
      { label: "M1 Test", href: "/dead-pixel-test?cycle=1&interval=5" },
      { label: "M2 Test", href: "/dead-pixel-test?cycle=1&interval=5&grid=1" },
    ],
  },
];
