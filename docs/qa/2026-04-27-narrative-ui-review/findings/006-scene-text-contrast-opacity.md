# Finding 006 — Scene Body Text at 72% Opacity May Fail WCAG AA Contrast

**Severity:** Medium  
**Area:** Accessibility / UX  
**Owner agent:** UI  
**Related next-step prompt:** [006-text-contrast-opacity.md](../next-step-prompts/006-text-contrast-opacity.md)

---

## Summary

All scene narrative paragraphs use `color: 'text.secondary'` which resolves to `rgba(246, 239, 228, 0.72)` — a warm white at 72% opacity. On the `#08070b` near-black background this approximates `#b8b0a1`. WCAG AA requires 4.5:1 contrast for normal text. The computed contrast ratio for this pair is approximately 5.6:1 — passing WCAG AA but failing WCAG AAA (7:1). However, this is the PRIMARY reading content of the game (multi-paragraph story text at `1.1rem–1.35rem`), and the slight opacity softening may reduce legibility for users with low-vision conditions or on screens with low brightness.

Additionally, the use of opacity (rgba) rather than a fixed color means the effective contrast can drop if any intermediate container has a non-opaque background — as is the case in the `SignalCard` subcomponent (`background: 'rgba(8,7,11,0.32)'`).

---

## Evidence

Playwright captured computed styles:

```json
{
  "tag": "P",
  "text": "The quad looked exactly the way the city brochures...",
  "color": "rgba(246, 239, 228, 0.72)"
}
```

Body background: `#08070b` (from `globals.css`).

Using the WCAG contrast formula:
- Full white `#f6efe4` on `#08070b`: ~12.9:1 (AAA)
- `rgba(246, 239, 228, 0.72)` composited on `#08070b` ≈ `#b8b0a1`: ~5.6:1 (AA pass, AAA fail)

The `SceneRenderer` source:
```tsx
<Typography sx={{ color: 'text.secondary', fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.75 }}>
  {paragraph}
</Typography>
```

`theme.ts` configures `text.secondary` as `rgba(246, 239, 228, 0.72)`.

**Source reference:** `apps/web/lib/theme.ts`, `apps/web/components/scene-renderer.tsx`

---

## Steps to Reproduce

1. Visit `/play` and read the scene text.
2. Inspect the paragraph elements in DevTools.
3. Observe `color: rgba(246, 239, 228, 0.72)` on all narrative paragraphs.
4. Run a contrast checker: #b8b0a1 on #08070b ≈ 5.6:1.

---

## Expected Behavior

Primary narrative reading content should meet at minimum WCAG AA (4.5:1). Ideally the main story prose — which is the core product — should approach WCAG AAA (7:1) at its stated font sizes.

---

## Actual Behavior

Story text is rendered at 72% opacity (~5.6:1 contrast), marginally passing WCAG AA. The opacity approach risks unintended contrast drops if container backgrounds change.

---

## Why It Matters

This is a text-heavy game. Readability is the core experience. A player reading 3,000+ words per chapter on a dim display or with any vision impairment will encounter avoidable fatigue. Switching from opacity-based coloring to a fixed hex value for body text is a minimal change with meaningful accessibility benefit.

---

## Recommendation

In `apps/web/lib/theme.ts`, consider raising `text.secondary` opacity from 0.72 to 0.82–0.88 for the play page body text, or override the `sx` color directly in `scene-renderer.tsx` for paragraphs. Avoid opacity on primary reading content; use a fixed color instead.

---

## Acceptance Criteria

- [ ] Scene narrative paragraphs have a minimum 7:1 contrast ratio (WCAG AAA) against the page background
- [ ] Or: documented decision that 5.6:1 (WCAG AA) is acceptable for this design context
- [ ] Contrast verified with axe-core or similar in CI

---

## Suggested GitHub Issue Title

`a11y: raise scene text contrast from 72% opacity to meet WCAG AA clearly`

## Suggested Labels

`accessibility`, `medium`, `ux`

---

## Screenshot References

- `screenshots/pathA-01-admit.png` — scene text visible (check contrast on-screen)
