# Prompt 006 — Improve Scene Text Contrast

**Repo:** maniator/a-fracture-in-time  
**Related finding:** [findings/006-scene-text-contrast-opacity.md](../findings/006-scene-text-contrast-opacity.md)  
**Task type:** Accessibility / UI  
**BMAD owner agent:** UI  

---

## Goal

Raise the contrast of narrative scene paragraphs from the current ~5.6:1 (WCAG AA marginal pass) to at least 7:1 (WCAG AAA), improving readability for all players and eliminating the opacity-based approach on primary reading content.

---

## Context

Scene text paragraphs use MUI's `text.secondary` color which is configured as `rgba(246, 239, 228, 0.72)` (72% opacity warm white). On the `#08070b` background this gives approximately 5.6:1 contrast — marginally passing WCAG AA but failing AAA. For a text-heavy narrative game where players read thousands of words per session, this is the most important text to optimise for readability.

The opacity approach also means contrast can silently drop if intermediate containers are not fully opaque.

**Source:**
- `apps/web/lib/theme.ts` — defines `text.secondary`
- `apps/web/components/scene-renderer.tsx` line 205 — uses `color: 'text.secondary'` for paragraphs

---

## Scope

- Raise the `text.secondary` opacity in the MUI theme OR override the color specifically for scene paragraphs in `scene-renderer.tsx`
- Target: ≥7:1 contrast for scene paragraphs on the `#08070b` background
- Do not change the color of secondary UI elements (chips, overlines, captions) unless they also benefit from the change

---

## Non-Goals

- Do not change scene heading (speaker name) color — currently full-brightness, fine
- Do not change timeline signal card colors
- Do not redesign the theme broadly

---

## Implementation Guidance

**Option A (preferred):** In `scene-renderer.tsx`, override the paragraph color with a higher-opacity value rather than relying on `text.secondary`:

```tsx
<Typography 
  key={index} 
  sx={{ 
    color: 'rgba(246, 239, 228, 0.88)',   // was 0.72
    fontSize: { xs: '1.1rem', md: '1.35rem' }, 
    lineHeight: 1.75 
  }}
>
  {paragraph}
</Typography>
```

**Option B:** In `apps/web/lib/theme.ts`, change `text.secondary` to `rgba(246, 239, 228, 0.86)` globally. Review how this affects all other components using `text.secondary`.

Contrast check:
- `rgba(246, 239, 228, 0.88)` on `#08070b` ≈ `#cdc5b9` → ~7.3:1 ✓

---

## Likely Files

```
apps/web/components/scene-renderer.tsx
apps/web/lib/theme.ts  (if using Option B)
```

---

## Acceptance Criteria

- [ ] Scene paragraph text has ≥7:1 contrast ratio against `#08070b`
- [ ] Contrast verified manually using a contrast checker (e.g., WebAIM or browser DevTools)
- [ ] Visual review: text remains warm/atmospheric, not stark white
- [ ] `pnpm build` passes
- [ ] No regressions to existing tests

---

## Testing Requirements

- Manual visual check in browser at `/play`
- Contrast ratio check: paragraph text color on `#08070b`
- `pnpm test` passes

---

## Commit Hygiene

```
fix(a11y): raise scene text contrast to WCAG AAA (≥7:1)
```

---

## Final Response Requirements

- State the color value chosen
- State the computed contrast ratio
- Confirm no other UI areas were unintentionally affected
