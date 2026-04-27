# Finding 005 — World Briefing Is Permanently Dismissed with No Re-Access

**Severity:** Medium  
**Area:** UX / Player Onboarding  
**Owner agent:** UI + Narrative Designer  
**Related next-step prompt:** [005-briefing-re-access.md](../next-step-prompts/005-briefing-re-access.md)

---

## Summary

The `GameBriefing` component on `/play` shows character introductions and world context to first-time players. Once dismissed (via either "Enter the first fracture" or "Dismiss"), it is permanently hidden via a `localStorage` flag. There is no way to re-access it from within the play page. Players who want to revisit character descriptions or the world setup must navigate to the homepage or help page, or clear their browser storage.

Both buttons ("Enter the first fracture" and "Dismiss") call the same `dismiss()` function with no semantic difference in behavior, which is confusing on initial read.

---

## Evidence

Source: `apps/web/components/game-briefing.tsx`

```ts
const BRIEFING_DISMISSED_KEY = 'fractureline:briefing-dismissed';

const dismiss = () => {
  safeLocalStorageSet(BRIEFING_DISMISSED_KEY, '1');
  setDismissed(true);
};
// ...
<Button onClick={dismiss}>Enter the first fracture</Button>
<Button onClick={dismiss}>Dismiss</Button>
```

Both buttons call the same handler. Once dismissed, `if (dismissed !== false) return null;` means the component renders nothing.

From Playwright testing: after visiting `/play`, clicking "Dismiss", and then reloading — the briefing is not shown again.

**Source reference:** `apps/web/components/game-briefing.tsx`

---

## Steps to Reproduce

1. Visit `/play` for the first time (or clear `fractureline:briefing-dismissed` from localStorage).
2. Read the briefing.
3. Click "Enter the first fracture" or "Dismiss".
4. Reload the page.
5. Observe: briefing is gone and cannot be re-displayed without clearing localStorage.

---

## Expected Behavior

Players can re-access the character/world briefing at any time from the play page, even after dismissing it once. A secondary option: make the briefing accessible from a "?" icon or a "Review characters" button in the save controls area.

---

## Actual Behavior

Briefing is permanently hidden after first dismissal. No re-access path.

---

## Why It Matters

Players who rushed through the briefing, returned after days, or recommended the game to a friend who shares their device will have no orientation once the briefing is gone. The help page covers mechanics but not character depth. This is a meaningful onboarding gap for a narrative game where character investment drives engagement.

---

## Recommendation

Option A: Add a collapsible "Character Guide" or "Before you start" section below the save controls — always visible, collapsed by default after first dismissal.

Option B: Keep the permanent dismissal but add a "Review characters" button in the play page (e.g., a small text button near the Save/Load row).

The two-button pattern (Enter vs Dismiss) should be clarified: "Enter the first fracture" starts the player (primary CTA); "Dismiss" should note it can be re-accessed rather than implying it's gone forever.

---

## Acceptance Criteria

- [ ] Players can re-access character and world context from the `/play` page after dismissing the briefing
- [ ] The re-access path is visible without scrolling on desktop
- [ ] "Dismiss" tooltip or sub-text clarifies it can be revisited
- [ ] E2E test verifies briefing is dismissible and re-accessible

---

## Suggested GitHub Issue Title

`ux: allow players to re-access world and character briefing after dismissing it`

## Suggested Labels

`ux`, `onboarding`, `medium`

---

## Screenshot References

- `screenshots/02-play.png` — briefing shown on initial visit
- `screenshots/after-load-confirmed.png` — play page with no briefing after dismissal
