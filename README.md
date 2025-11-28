# WhiteScreen Pro

A professional, feature-rich whitescreen utility web application for photography, videography, monitor testing, animation tracing, and focus/productivity use cases.

## Features

### Core Features
- **Full-screen color display** - Edge-to-edge solid color display
- **Pre-set color palette** - 12+ preset colors including white, black, primary colors, and grayscale variations
- **Custom color picker** - HEX, RGB, and HSL input support
- **Color history & favorites** - Save frequently used colors
- **Gradient mode** - Linear and radial gradients between two colors
- **Brightness adjustment** - 0-100% brightness control
- **Color temperature** - Warm to cool adjustment (-100 to +100)

### Display Controls
- **Resolution presets** - 480p, 720p, 1080p, 1440p, 4K, 5K, 8K, and native
- **Fullscreen toggle** - F11 or dedicated button
- **Picture-in-Picture mode** - Browser PiP support
- **Aspect ratio lock** - Maintain aspect ratio when resizing

### Advanced Features
- **Pattern overlays** - Grid lines, crosshairs, test patterns for monitor calibration
- **Timer/Countdown** - Built-in timer for timed exposure in photography
- **Flicker/Strobe mode** - Adjustable frequency (0.1-30 Hz) and intensity
- **Auto-cycle mode** - Rotate through colors at set intervals
- **Screen burn-in prevention** - Subtle pixel shifting option

### Export & Sharing
- **Download images** - PNG/JPG export at various resolutions
- **Shareable links** - Generate links with current settings
- **QR code generator** - Easy mobile access
- **Export color palette** - CSS/JSON format

### Keyboard Shortcuts
- `F` or `F11` - Toggle fullscreen
- `Space` - Cycle through preset colors
- `ESC` - Exit fullscreen / Close panel
- `C` - Open/close control panel
- `B` - Toggle brightness slider visibility
- `G` - Toggle grid overlay
- `T` - Start/stop timer
- `1-9` - Quick select first 9 preset colors
- `Arrow Up/Down` - Fine-tune brightness
- `Arrow Left/Right` - Cycle colors

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Radix UI
- **Color Manipulation**: colord
- **QR Codes**: qrcode.react

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
/app
  /page.tsx          # Main whitescreen display
  /layout.tsx        # Root layout
  /globals.css       # Global styles
/components
  /ControlPanel.tsx  # Main control panel with tabs
  /ColorPicker.tsx   # Color selection component
  /ExportTools.tsx   # Export and sharing tools
  /PatternOverlay.tsx # Pattern overlay component
  /TimerDisplay.tsx  # Timer display component
  /HintIndicator.tsx # Initial hint indicator
/lib
  /colorUtils.ts     # Color manipulation utilities
  /storageUtils.ts   # LocalStorage utilities
  /store.ts          # Zustand state store
/hooks
  /useKeyboardShortcuts.ts # Keyboard shortcuts hook
  /useFullscreen.ts  # Fullscreen API hook
  /useTimer.ts       # Timer logic hook
  /useAutoCycle.ts   # Auto-cycle hook
  /useFlicker.ts     # Flicker effect hook
/public
  /manifest.json     # PWA manifest
```

## Performance

- Optimized for 60fps rendering
- Lazy-loaded control panel
- Minimal bundle size
- Fast initial load (<1s target)
- PWA support for offline use

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

