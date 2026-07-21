# WhiteScreen Tools

Professional full-screen color utilities, monitor tests, video-call lighting, and 28+ tools — free at [whitescreentools.com](https://whitescreentools.com).

**Version 2.2**

## Highlights

- **28+ tools** — color screens, dead-pixel test, zoom lighting, pranks, ambient modes
- **Homepage** — search, categories, pinned favorites, recently used, quick-start presets
- **Share & restore** — URL params for color, brightness, Kelvin; tool deep links; OBS overlay (`?obs=1`)
- **Multi-monitor** — local tab sync + layout presets (calibration, video call, pixel test)
- **Monitor Health** — step-by-step wizard + PDF report export
- **Accessibility** — keyboard shortcuts modal (`?`), reduced motion, `lang`/`dir` sync, aria labels
- **SEO & PWA** — per-tool OG images, JSON-LD, installable app with icons
- **Performance** — code-split tools, lazy-loaded translations, SSR-safe store hydration

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `F` / `F11` | Toggle fullscreen |
| `Space` | Cycle preset colors |
| `Esc` | Exit fullscreen / close panel |
| `C` | Open / close control panel |
| `G` | Toggle grid overlay |
| `T` | Start / stop timer |
| `↑` / `↓` | Adjust brightness |
| `←` / `→` | Previous / next preset |
| `1`–`9` | Select preset by number |
| `?` | Show shortcuts list |

## Tech stack

- **Next.js 14** (App Router)
- **Tailwind CSS**, **Radix UI**, **Zustand**, **colord**
- **Vitest** (unit) + **Playwright** (e2e)
- **GitHub Actions** CI

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run dev:clean    # clear .next cache if dev acts stale
```

### Scripts

```bash
npm run build        # production build
npm test             # Vitest unit/smoke tests
npm run test:e2e     # Playwright (build first; uses port 3099)
npm run icons        # regenerate PWA icons
npm run lint
```

## Project layout

```
app/                 # Routes (home, [tool], legal pages, opengraph-image)
components/          # UI (ToolGrid, ControlPanel, modals, tool modes)
lib/                 # Store slices, SEO, share links, translations/
hooks/               # Keyboard, fullscreen, timers, share restore
e2e/                 # Playwright smoke tests
public/              # manifest, service worker, icons
```

## Browser support

Chrome, Edge, Firefox, Safari (desktop & mobile). PWA install supported.

## License

MIT
