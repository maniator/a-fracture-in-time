# Prompt 007 — Add PNG Icons to PWA Manifest

**Repo:** maniator/a-fracture-in-time  
**Related finding:** [findings/007-pwa-no-png-icons.md](../findings/007-pwa-no-png-icons.md)  
**Task type:** Engineering / PWA  
**BMAD owner agent:** Engineering  

---

## Goal

Add 192×192 and 512×512 PNG icons to the PWA manifest so that Android Chrome and other browsers can reliably show the "Add to Home Screen" install prompt.

---

## Context

`public/manifest.webmanifest` contains only a single SVG icon (`sizes: "any"`). While modern browsers support SVG for favicons, the Android Chrome PWA install flow and Lighthouse PWA audit require at least one PNG icon at 192×192 for the install prompt to trigger. Without it, the PWA install flow may be silently suppressed on Android devices.

The existing `icon.svg` is the source asset. PNGs need to be generated from it.

---

## Scope

- Generate `icon-192.png` and `icon-512.png` from the existing `icon.svg`
- Add both to `public/icons/`
- Update `manifest.webmanifest` to reference all three icons
- Keep the SVG for modern browsers

---

## Non-Goals

- Do not change the icon design
- Do not add animated icons or splash screens
- Do not change the app theme color

---

## Implementation Guidance

1. Generate PNGs from the SVG. You can use `sharp`, `svgexport`, or a CLI tool:
   ```bash
   # Using sharp (already available in the Node ecosystem)
   npx sharp-cli --input apps/web/public/icons/icon.svg --output apps/web/public/icons/icon-192.png --width 192 --height 192
   npx sharp-cli --input apps/web/public/icons/icon.svg --output apps/web/public/icons/icon-512.png --width 512 --height 512
   ```
   Or use any SVG-to-PNG conversion tool available in the environment.

2. Update `public/manifest.webmanifest`:

```json
{
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any"
    }
  ]
}
```

3. Update the E2E test in `app.spec.ts` that checks manifest assets to also verify the PNG icon URLs return 200.

---

## Likely Files

```
apps/web/public/icons/icon-192.png  (new)
apps/web/public/icons/icon-512.png  (new)
apps/web/public/manifest.webmanifest
apps/web/tests/e2e/app.spec.ts  (update to verify PNG icon 200 responses)
```

---

## Acceptance Criteria

- [ ] `public/icons/icon-192.png` exists (192×192 PNG)
- [ ] `public/icons/icon-512.png` exists (512×512 PNG)
- [ ] `manifest.webmanifest` lists all three icons
- [ ] Both PNG routes return HTTP 200 in the production build
- [ ] Lighthouse PWA audit passes the "Icons" check (no warnings about missing PNG icons)
- [ ] E2E manifest test updated and passing

---

## Testing Requirements

- `pnpm build && pnpm start`
- `curl http://localhost:3000/icons/icon-192.png` → 200
- `curl http://localhost:3000/icons/icon-512.png` → 200
- Run `pnpm test:e2e` — no regressions

---

## Commit Hygiene

```
feat(pwa): add 192px and 512px PNG icons to manifest for Android install
```

---

## Final Response Requirements

- Confirm both PNG files exist with correct dimensions
- Confirm manifest.webmanifest was updated
- Confirm Lighthouse or equivalent PWA check shows no icon warnings
