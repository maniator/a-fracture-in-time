# Finding 010 — Low/Polish Group: Metadata, POV Visual Cues, Save Feedback, Page Titles

**Severity:** Low / Polish  
**Area:** UX / Engineering / Narrative  
**Owner agent:** UI  
**Related next-step prompt:** [010-polish-improvements.md](../next-step-prompts/010-polish-improvements.md)

---

## Summary

This finding groups four low-severity polish items identified across the BMAD agent review passes. None are blocking, but each contributes to overall product quality and player experience.

---

## Item A — No Per-Page `<title>` Metadata

**Area:** SEO / UX  
All pages share the same `<title>Fractureline</title>`. Browser tabs and history show "Fractureline" regardless of which page is active. There are no page-specific titles like "Play · Fractureline" or "Help · Fractureline".

**Source:** `apps/web/app/layout.tsx` (only root metadata), no `generateMetadata` or `metadata` export on individual pages.

**Fix:** Export `metadata` from `apps/web/app/play/page.tsx`, `apps/web/app/help/page.tsx` with descriptive titles.

---

## Item B — No Visual Distinction Between Past and Future POV

**Area:** Narrative UX  
Scene POV (past 874cy vs future 23ac) is indicated only by the "Past"/"Future" chip in the save-controls row. The scene content, background, typography, and layout are visually identical across both eras. Players reading quickly may lose track of which timeline they are in.

**Observed during:** Playwright tests of PATH A and PATH B — switching from Xav (Past) to Zelda (Future) in scene 3 produced no visual change beyond the chip label.

**Fix:** Consider a subtle colour tint or typographic shift to distinguish past from future. For example: a warm amber tint for past scenes, a cold blue/purple tint for future. This aligns with the existing `globals.css` gradient (`rgba(139,92,246,0.24)` top-left, `rgba(245,158,11,0.16)` bottom-right) which could be inverted by POV.

---

## Item C — No Transient Save Feedback (Snackbar)

**Area:** UX / Feedback  
After clicking "Save progress", only the `hasSave` chip changes from "No save" to "Local save ready". There is no toast, Snackbar, or transient confirmation that the save was successful. First-time players may not notice the chip change and re-click unnecessarily.

This was previously identified as F-07 in `POST_PR16_QA_REVIEW.md` and deferred.

**Source:** `apps/web/components/scene-renderer.tsx` — `save()` action updates `hasSave` but triggers no notification component.

**Fix:** Add a MUI `Snackbar` that briefly shows "Progress saved" after a successful `save()` call.

---

## Item D — Help Page Is a Dead End (No Back-to-Game Link)

**Area:** UX / Navigation  
The Help page at `/help` provides gameplay guidance but no button or link back to `/play`. The only navigation is the SiteNav header. A player who arrives at Help mid-game (e.g., via the nav bar) must remember to click "Play" in the nav to return rather than having an obvious "Back to game" CTA.

**Source:** `apps/web/app/help/page.tsx` — renders static cards with no outbound link to `/play`.

**Fix:** Add a "Back to game" or "Start playing" button at the bottom of the help page.

---

## Evidence

- `screenshots/10-help.png` — no back-to-game link visible
- `screenshots/random-03-volume-expanded.png` — ambience controls layout
- Source review of `apps/web/app/layout.tsx`, `apps/web/components/scene-renderer.tsx`

---

## Suggested GitHub Issue Title

`polish: per-page titles, POV visual cues, save feedback snackbar, help page back link`

## Suggested Labels

`polish`, `low`, `ux`, `ui`
