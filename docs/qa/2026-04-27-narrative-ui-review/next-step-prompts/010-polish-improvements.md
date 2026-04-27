# Prompt 010 — Polish: Per-Page Titles, POV Visual Cues, Save Feedback, Help Back Link

**Repo:** maniator/a-fracture-in-time  
**Related finding:** [findings/010-polish-group.md](../findings/010-polish-group.md)  
**Task type:** Frontend / Polish  
**BMAD owner agent:** UI  

---

## Goal

Address four low-severity polish items in one focused pass: per-page metadata titles, a visual cue for timeline POV switches, a transient save confirmation, and a back-to-game link on the help page.

---

## Context

These items were identified during the 2026-04-27 BMAD QA review. Each is small in scope but contributes to overall polish and player experience. They are grouped into one task to avoid trivially small commits.

---

## Scope

### A. Per-Page `<title>` Metadata

All pages share `<title>Fractureline</title>`. Add descriptive per-page titles.

**Files:** `apps/web/app/play/page.tsx`, `apps/web/app/help/page.tsx`

```ts
// play/page.tsx
export const metadata: Metadata = {
  title: 'Play',
  // Uses root template '%s · Fractureline' → "Play · Fractureline"
};

// help/page.tsx
export const metadata: Metadata = {
  title: 'Player Guide',
};
```

Note: The root `layout.tsx` must use `title: { default: 'Fractureline', template: '%s · Fractureline' }` for this to work. Coordinate with Prompt 002 if that has already been done.

---

### B. POV Visual Cue for Timeline Switches

When the POV switches between Past and Future, only the chip label changes. Add a subtle CSS class or sx override on the page background or card to hint at the era.

**Approach:** In `scene-renderer.tsx`, read `state.currentPOV` and apply a conditional `sx` override on the main `Card`:

```tsx
<Card 
  component="section"
  sx={{
    boxShadow: '0 28px 80px rgba(0,0,0,0.45)',
    borderTop: state.currentPOV === 'future'
      ? '2px solid rgba(139, 92, 246, 0.6)'   // purple = future
      : '2px solid rgba(245, 158, 11, 0.4)',   // amber = past
    transition: 'border-top-color 0.4s ease',
  }}
>
```

This is a minimal, non-distracting cue that aligns with the existing global gradient palette.

---

### C. Transient Save Feedback (Snackbar)

After "Save progress" is clicked, add a brief MUI `Snackbar` that shows "Progress saved" and auto-dismisses after 2.5 seconds. This was previously deferred as F-07 in `POST_PR16_QA_REVIEW.md`.

**File:** `apps/web/components/scene-renderer.tsx`

Add `const [savedSnack, setSavedSnack] = useState(false);` and call `setSavedSnack(true)` inside the `onClick` handler. Render a `Snackbar` component with a 2500ms `autoHideDuration`.

---

### D. "Back to game" Button on Help Page

Add a CTA at the bottom of the help page that links back to `/play`.

**File:** `apps/web/app/help/page.tsx`

```tsx
<Box sx={{ mt: 6 }}>
  <Button component={Link} href="/play" variant="contained" color="secondary" size="large">
    Start playing
  </Button>
</Box>
```

---

## Non-Goals

- Do not redesign the POV visual identity broadly (a future Narrative + UI pass)
- Do not add complex animation or background changes
- Do not change gameplay or narrative logic

---

## Likely Files

```
apps/web/app/layout.tsx         (update title template — coordinate with Prompt 002)
apps/web/app/play/page.tsx      (add metadata)
apps/web/app/help/page.tsx      (add metadata + back link)
apps/web/components/scene-renderer.tsx  (POV border cue + Snackbar)
```

---

## Acceptance Criteria

- [ ] Browser tab shows "Play · Fractureline" on `/play`
- [ ] Browser tab shows "Player Guide · Fractureline" on `/help`
- [ ] Scene card has a subtle color border that changes between Past (amber) and Future (purple)
- [ ] "Save progress" click shows a "Progress saved" Snackbar for ~2.5s
- [ ] Help page has a "Start playing" button linking to `/play`
- [ ] `pnpm build` passes
- [ ] `pnpm test:e2e` passes

---

## Testing Requirements

- Manual visual check of POV border on past and future scenes
- Manual check of Snackbar appearing after save
- Manual check of help page back link
- `pnpm test:e2e` — no regressions

---

## Commit Hygiene

```
feat(polish): per-page titles, POV border cue, save snackbar, help back link
```

---

## Final Response Requirements

- Confirm all four items were addressed
- Note any decisions made (e.g., POV border colors chosen)
- Confirm no regressions
