# PWA Icons

Icons live in `/public/` and `/app/`:

- `favicon.ico` (32×32, tab icon)
- `app/icon.png` (Next.js metadata icon)
- `icon-192.png` (192×192)
- `icon-512.png` (512×512)

Regenerate with:

```bash
npm run icons
# or
python3 scripts/generate-icons.py
```

These paths match `public/manifest.json`.
