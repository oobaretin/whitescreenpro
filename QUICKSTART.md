# Quick Start Guide

## Installation

1. Install dependencies:
```bash
npm install
```

2. (Optional) Generate PWA icons:
   - Create `public/icon-192x192.png` (192x192 pixels)
   - Create `public/icon-512x512.png` (512x512 pixels)
   - See `app/icon-placeholder.md` for details

## Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Key Features

### Keyboard Shortcuts
- `Space` - Cycle through colors
- `C` - Toggle control panel
- `F` or `F11` - Toggle fullscreen
- `G` - Toggle grid overlay
- `T` - Start/stop timer
- `1-9` - Quick select colors
- `↑↓` - Adjust brightness
- `←→` - Cycle colors

### Usage Tips

1. **Fullscreen Mode**: Press `F` or `F11` for distraction-free viewing
2. **Color Selection**: Click preset colors or use the custom color picker
3. **Gradients**: Enable gradient mode for smooth color transitions
4. **Patterns**: Use grid or crosshair overlays for alignment
5. **Timer**: Set a countdown timer for photography sessions
6. **Export**: Download screens at various resolutions or share via link

## Troubleshooting

### Icons Not Showing
- Ensure `icon-192x192.png` and `icon-512x512.png` exist in `/public/`
- Icons are optional for basic functionality

### Fullscreen Not Working
- Some browsers require user interaction before allowing fullscreen
- Try clicking the fullscreen button instead of using keyboard shortcut

### PWA Installation
- Chrome/Edge: Click install prompt or use browser menu
- Safari (iOS): Use "Add to Home Screen"
- Firefox: Not fully supported yet

## Next Steps

- Customize colors in `lib/colorUtils.ts`
- Adjust default settings in `lib/store.ts`
- Modify UI styling in `app/globals.css` and Tailwind config

