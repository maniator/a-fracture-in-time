# Prompt 005 — Allow Players to Re-Access the World Briefing

**Repo:** maniator/a-fracture-in-time  
**Related finding:** [findings/005-briefing-no-re-access.md](../findings/005-briefing-no-re-access.md)  
**Task type:** Frontend / UX  
**BMAD owner agent:** UI  

---

## Goal

Give players a way to re-access the world and character briefing from the `/play` page after they have dismissed it, without clearing browser storage.

---

## Context

`apps/web/components/game-briefing.tsx` shows a full character introduction and world setup card to first-time visitors on `/play`. Once dismissed via `localStorage` flag `fractureline:briefing-dismissed`, the card is permanently hidden. Players who want to revisit character descriptions must navigate to the homepage or help page.

The component uses `if (dismissed !== false) return null;` — dismissal is permanent.

Additionally, both "Enter the first fracture" and "Dismiss" call the same `dismiss()` function. While this is intentional UX (both lead to playing), the semantic isn't obvious.

---

## Scope

- Add a mechanism for returning players to re-open the briefing from the play page
- The solution should not interrupt the returning player's flow
- Options: a small "Review characters" button in the save controls row, OR a collapsible section below the save row

---

## Non-Goals

- Do not change the logic of the "Enter the first fracture" CTA
- Do not change the `localStorage` key or the first-visit logic
- Do not change Chapter 1 gameplay or save mechanics

---

## Implementation Guidance

**Recommended approach:** Add a small "Characters & world" text button to the save-controls `Stack` in `scene-renderer.tsx` that opens the `GameBriefing` card in a Modal or Drawer, or scrolls to a persistent (but visually collapsed) briefing section.

**Simpler approach:** Extract the briefing content into a `<Dialog>` that can be opened from a button, independent of the `GameBriefing` first-visit logic.

**Minimal approach:** In `game-briefing.tsx`, change the permanent dismiss to a "session hide" (set to localStorage on dismiss, but add a second button in `scene-renderer.tsx` that sets the key back to null). The briefing is still hidden by default on return, but a visible button can restore it.

The button label should be understated: "Characters" or "World guide" rather than "Back to briefing".

---

## Likely Files

```
apps/web/components/game-briefing.tsx
apps/web/components/scene-renderer.tsx
```

---

## Acceptance Criteria

- [ ] After dismissing the briefing, players can re-open character/world context from the play page
- [ ] The re-access mechanism is visible without scrolling on desktop
- [ ] The mechanism does not interfere with save/load/restart controls
- [ ] First-time visit flow is unchanged (briefing auto-shows, is dismissible)
- [ ] `pnpm build` passes
- [ ] E2E test: dismiss briefing → click "Characters" button → briefing content visible

---

## Testing Requirements

- `pnpm test:e2e` — no regressions
- Manual test: dismiss briefing, reload, click re-access button, verify character content visible

---

## Commit Hygiene

```
feat(ux): allow players to re-access world and character briefing after dismissing it
```

---

## Final Response Requirements

- Describe the chosen approach (Modal, Drawer, or button-toggle)
- Confirm the first-visit auto-show still works
- Confirm e2e test coverage
