# Exploratory QA Review — 2026-04-27

**Reviewer:** QA Lead  
**Scope:** Full codebase exploratory pass beyond the existing 38 Playwright tests  
**Status:** Complete — 32 new tests written, all passing

---

## Summary

The existing suite covers the three main Chapter 1 paths (Signal / Family / History), basic
save/load, ambience control presence, PWA assets, and the help page. This exploratory pass
audited what was **not** covered and produced 32 new tests across 10 concern areas.

---

## Findings

### 1. GameBriefing — zero test coverage

**Gap:** The `GameBriefing` component (shown on the play page for first-time visitors) had no
test coverage at all. The component reads and writes `localStorage` to control its visibility.

**What was checked:**
- Briefing renders when `fractureline:briefing-dismissed` is absent from localStorage.
- "Enter the first fracture" button hides the briefing AND persists the flag so a reload also
  hides it.
- "Dismiss" button (alternate dismiss path) also hides the briefing.
- Briefing is absent when the flag is already set before page load.

**Tests added:** 4 tests in `GameBriefing` describe block.

---

### 2. Site navigation links — not covered

**Gap:** No test verified that the navigation links (`Play`, `Help`, `Fractureline` logo,
home-page "How it works") actually navigate to the correct pages.

**Tests added:** 4 navigation tests in `site navigation` describe block.

---

### 3. UI state chips — partially covered

**Gap:** The existing suite tested that `Order` signal shows "Rising" after the first choice
(one chip test), but did not cover:
- The `Chapter N` chip changing from "Chapter 1" to "Chapter 2".
- The `Past`/`Future` POV chip changing when entering Zelda's scenes.
- The "No save" → "Local save ready" chip transition after saving.
- The ending-key chip appearing after Chapter 1 completion.

**Tests added:** 4 chip-state tests in `UI state chips` describe block.

---

### 4. Restart dialog — cancel path not covered

**Gap:** The existing save/load test opens the restart dialog and clicks "Restart", but never
exercised the "Cancel" path. The cancel button should close the dialog without any state reset.

Also the dialog's accessible label and description text were untested.

**Tests added:** 2 tests in `restart dialog` describe block.

---

### 5. Ambience volume panel — not covered

**Gap:** The existing test confirmed the ambience control exists and has a mute button, but
the collapsible volume slider panel was never opened or verified.

**Tests added:** 1 test in `ambience volume panel` describe block.

---

### 6. Accessibility landmarks — not explicitly tested

**Gap:** Several key ARIA attributes in `scene-renderer.tsx` were untested:
- `aria-labelledby="scene-title"` on the main scene card.
- `aria-label="Choices"` on the choices region.
- `aria-labelledby="timeline-signals-title"` on the signals section.
- `aria-label="Ambience controls"` on the aside.
- Button keyboard focus.

**Tests added:** 5 tests in `accessibility landmarks` describe block.

---

### 7. Timeline signal levels — minimal coverage

**Gap:** Only the `Order` → `Rising` transition was tested. `Truth` and `Disruption` signals
had no test at all.

**Note on signal aria-labels:** The `SignalCard` renders the signal level element as a `<dd>`
with `aria-label="{label} signal {level} ({value})"` (e.g., `"Truth signal Rising (3)"`). This
is a robust handle for accessibility tooling and was used in the new tests.

**Tests added:** 2 tests in `timeline signal levels` describe block.

---

### 8. Family and History paths — Chapter 2 and 3 completion not tested

**Gap:** The suite confirmed you can *enter* Chapter 2 on the Family and History paths, but
never verified that Chapter 2 could be *completed* on those paths, nor that Chapter 3 was
reachable and completable.

**Tests added:** 6 tests across `family path Chapter 2 and 3` and `history path Chapter 2 and 3`
describe blocks.

---

### 9. Unknown route handling — not tested

**Gap:** No test verified that navigating to a nonexistent path does not cause a server crash
(5xx). Next.js serves its own 404, but this was never asserted.

**Tests added:** 1 test in `unknown routes` describe block.

---

### 10. Offline fallback page content — partially tested

**Gap:** The existing suite checked that `/offline.html` contains "timeline is offline" text,
but did not verify that the page provides a link back into the app.

**Tests added:** 1 test in `offline fallback page` describe block.

---

## Code Analysis — No Blockers Found

Reading the source carefully surfaced the following observations (none are blocking bugs):

| Area | Observation |
|---|---|
| `snapshotToChoices` | Does not populate `effects` on `Choice` — `getChoiceCue` falls back to tag-based detection, which is correct since the ink files use `# cue:*` tags. No bug. |
| `getActiveStoryForChoice` | Intentionally discards `continueInkStory` result when restoring to choices (see F-26 comment). Text between save point and next choice is lost on restore — known limitation, not a regression. |
| `sceneText` fallback | When `snapshot.text.length === 0` and `previous.currentText` is undefined, `sceneText` is `[]` → loading screen shows. This can only happen at initial mount before the first `continueInkStory` resolves, which is correct behaviour. |
| `updateVolume` | MUI Slider `onChange` receives an extra `activeThumb` third param not declared — TypeScript accepts this safely. No bug. |
| Page `<title>` | Static `"Fractureline"` title across all pages. Minor SEO/accessibility gap (screen readers cannot distinguish pages by title). Not a blocker. |
| `seenScenes` on chapter transition | Carries over between chapters. Scene IDs use chapter-scoped prefixes (`ch1_*`, `ch2_*`) so no collision risk with the current content. |

---

## New Test File

**Path:** `apps/web/tests/e2e/exploratory.spec.ts`  
**Tests:** 32 (all passing, chromium project)

### Test groups

| Describe block | Tests |
|---|---|
| GameBriefing | 4 |
| site navigation | 4 |
| UI state chips | 4 |
| restart dialog | 2 |
| ambience volume panel | 1 |
| accessibility landmarks | 5 |
| timeline signal levels | 2 |
| family path Chapter 2 and 3 | 3 |
| history path Chapter 2 and 3 | 3 |
| unknown routes | 1 |
| offline fallback page | 1 |
| save chip state after restart | 1 |
| **Total** | **32** |

---

## Remaining / Future Work

1. **Mobile-specific layout tests** — The Pixel 7 project runs existing tests, but there are
   no tests that assert mobile-specific layout differences (e.g., the restart dialog uses
   `flexDirection: { xs: 'column-reverse', sm: 'row' }` on its action row). Consider adding a
   dedicated `mobile-chrome` describe block once the layout has stabilised.

2. **Keyboard-only navigation flow** — Tab order through the full scene card (save buttons →
   choice buttons → timeline signals) is untested. A tab-sequence test would strengthen
   accessibility coverage.

3. **Chapter 4 and 5 availability** — Ink files for chapters 4 and 5 exist in the public
   directory. No test verifies completing Chapter 3 and entering Chapter 4. Add tests once those
   routes are narratively stable.

4. **Codex section rendering** — The codex aside only appears when `state.codex.length > 0`.
   No test exercises this path. Identify which choices add codex entries and add a targeted test.

5. **Error state display and dismissal** — The inline `storyLoadError` alert with a "Dismiss"
   button cannot be triggered in a normal happy-path flow. Consider a unit test that injects
   an error into the store and verifies the alert renders and clears.
