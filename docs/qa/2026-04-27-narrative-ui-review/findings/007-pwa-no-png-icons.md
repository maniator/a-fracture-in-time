# Finding 007 — PWA Icon Is SVG-Only; No PNG Fallback

**Severity:** Medium  
**Area:** Engineering / PWA / Platform Support  
**Owner agent:** Engineering  
**Related next-step prompt:** [007-pwa-png-icons.md](../next-step-prompts/007-pwa-png-icons.md)

---

## Summary

The web app manifest (`public/manifest.webmanifest`) declares only a single SVG icon. Several browsers and operating systems (notably Chrome on Android, some iOS Safari versions, and Windows PWA prompts) require PNG icons at specific sizes (192×192 and 512×512) for PWA installation prompts to work correctly. The SVG-only approach may silently suppress install prompts or produce low-quality icons in app launchers.

---

## Evidence

`public/manifest.webmanifest` icons array:

```json
{
  "icons": [
    {
      "src": "/icons/icon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
}
```

Only one icon entry, SVG format only. No 192×192 or 512×512 PNG entries.

`public/icons/` directory contains only `icon.svg`.

Chrome's PWA installability requirements include a 192×192 PNG or WebP icon to trigger the "Add to Home Screen" prompt reliably.

**Source reference:**
- `apps/web/public/manifest.webmanifest`
- `apps/web/public/icons/` (contains only `icon.svg`)

---

## Steps to Reproduce

1. Open Chrome DevTools → Application → Manifest.
2. Observe only the SVG icon is listed.
3. Check Lighthouse PWA audit — may report "Does not have a 512px icon" warning.

---

## Expected Behavior

The manifest includes:
- `icon-192.png` (192×192 PNG, purpose: "any")
- `icon-512.png` (512×512 PNG, purpose: "maskable")
- SVG retained as "any" for modern browsers

---

## Actual Behavior

Only one SVG icon. Android Chrome install prompts and Lighthouse PWA audits may fail or warn.

---

## Why It Matters

PWA installability is part of the project's offline-first strategy (`sw.js`, `PwaRegister`, manifest shortcut links). If install prompts don't appear on Android Chrome (the primary mobile browser), the PWA benefit is largely hidden from the target audience. This is a low-effort fix with meaningful reach.

---

## Recommendation

Export 192×192 and 512×512 PNGs from the existing SVG icon. Add both to `public/icons/` and reference them in the manifest alongside the SVG. The maskable icon should have a safe-zone background matching `#08070b`.

---

## Acceptance Criteria

- [ ] `public/icons/icon-192.png` exists (192×192 PNG)
- [ ] `public/icons/icon-512.png` exists (512×512 PNG, maskable)
- [ ] `manifest.webmanifest` references all three icons
- [ ] Lighthouse PWA audit passes "Icons" check without warnings
- [ ] E2E test in `app.spec.ts` verifies manifest icons response codes

---

## Suggested GitHub Issue Title

`pwa: add 192px and 512px PNG icons to manifest for Android install prompt`

## Suggested Labels

`pwa`, `engineering`, `medium`, `mobile`
