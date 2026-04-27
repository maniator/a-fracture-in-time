# Fractureline — Next Phases Implementation Guide

This document turns the findings from `docs/reviews/POST_PR16_QA_REVIEW.md` into ready-to-execute tasks.

Each phase includes:
- Scope and files likely to change
- What can run in parallel with other phases
- A ready-to-paste Copilot prompt
- Which BMAD agent owns the work
- Acceptance criteria

---

## Parallelism Map

```
Phase 4 (Playwright)    ─────────────────────────────┐
Phase 5 (Accessibility) ─────────────────────────────┤ can all run in parallel
Phase 6 (Narrative)     ─────────────────────────────┤
Phase 8 (Error Boundary)─────────────────────────────┘

Phase 7 (Save UI)        depends on Phase 5 (needs aria work done first)
Phase 9 (Storybook)      depends on Phase 4 + 5 (documents the stable components)
```

Phases 4, 5, 6, and 8 are fully independent. Assign them to different agents or PRs at the same time.

---

## Phase 4 — Playwright Stabilization

**Owner:** QA Agent  
**Parallel-safe:** Yes — no shared files with Phases 5, 6, or 8  
**Findings addressed:** F-10, F-11, F-13, F-14, F-15

### Scope

- Replace all `nth(3)` brittle selectors with semantic ones scoped to the Choices region
- Add test: rapid double-click on a choice fires only one state transition
- Add test: page-reload save round-trip (navigate away and back, then load)
- Add test: `storyLoadError` inline alert appears when a chapter pack fetch fails
- Add test: GameBriefing is shown to a new user, hidden after dismiss and reload
- Add test: restart dialog cancel leaves the story running; confirm resets to Chapter 1
- Add test: ambience mute/unmute toggles button label
- Add test: volume expand/collapse shows and hides the slider
- Verify all new tests pass in both `chromium` and `mobile-chrome` projects

### Files likely to change

- `apps/web/tests/e2e/app.spec.ts`
- `apps/web/tests/e2e/screenshots.spec.ts`

### Acceptance criteria

- No `getByRole('button').nth(N)` calls remain in either e2e file
- 10+ new tests added and green in CI across both projects
- Double-click test confirms `isChoosing` guard holds in the UI
- Reload-save test uses a real `page.goto()` navigation, not an in-page restart
- `storyLoadError` test uses `page.route()` to simulate a failed chapter pack fetch
- GameBriefing tests clear and set `localStorage` before each scenario

### Copilot prompt

```
You are working on the Fractureline repository (maniator/a-fracture-in-time).

Your task is Playwright stabilization. Do not touch application code. Only modify test files.

Context:
- The QA review doc is at docs/reviews/POST_PR16_QA_REVIEW.md
- E2e tests are in apps/web/tests/e2e/app.spec.ts and screenshots.spec.ts
- The app runs on Next.js 15 with Playwright configured in apps/web/playwright.config.ts
- There are two test projects: chromium and mobile-chrome

Required changes:

1. Replace every instance of `page.getByRole('button').nth(3)` with a selector that
   targets only the Choices region: use `page.locator('[aria-label="Choices"] button').first()`

2. Add a rapid double-click test:
   - Navigate to /play, wait for first choices to appear
   - Double-click the first choice button rapidly
   - Assert only one state transition occurred (choices list changes once, not twice)
   - Assert no storyLoadError alert is visible

3. Add a page-reload save round-trip test:
   - Navigate to /play, make one choice, click "Save progress"
   - Navigate away (page.goto('/')) then back to /play
   - Click "Load progress"
   - Assert the chapter is still at 1 and the story has advanced past the opening scene

4. Add a storyLoadError inline test:
   - Use page.route() to intercept the chapter-1.ink fetch and return a 500
   - Navigate to /play
   - Assert an Alert with severity="warning" is visible
   - Assert it contains a "Try again" button

5. Add GameBriefing dismiss tests:
   - Test A: clear localStorage key 'fractureline:briefing-dismissed', navigate to /play,
     assert the "Before you start" heading is visible
   - Test B: dismiss the briefing, then navigate away and back,
     assert "Before you start" heading is NOT visible

6. Add restart dialog tests:
   - Click "Restart chapter", assert the dialog title "Restart from Chapter 1?" is visible
   - Click "Cancel", assert the dialog closes and the story is still running (choices visible)
   - Start again, click "Restart chapter", click "Restart",
     assert the story resets (speaker reads "Xav Reivax")

7. Add ambience interaction tests:
   - Click "Mute", assert button label becomes "Unmute"
   - Click again, assert button label becomes "Mute"
   - Click "Volume", assert the slider becomes visible
   - Click "Close", assert the slider is not visible

All tests must pass in both the chromium and mobile-chrome Playwright projects.
Run: pnpm test:e2e from apps/web to verify before finishing.
```

---

## Phase 5 — Accessibility Hardening

**Owner:** UI Agent  
**Parallel-safe:** Yes — no shared files with Phases 4, 6, or 8  
**Findings addressed:** F-18, F-19, F-20, F-24

### Scope

- Add `role="navigation"` (via MUI `component="nav"`) to the `AppBar` in `SiteNav`
- Add a visually hidden skip navigation link at the top of the layout that moves keyboard focus to `#main-content`
- Add `id="main-content"` to the main content landmark on `/play` and `/`
- Add `aria-expanded={isOpen}` and `aria-controls="ambience-volume-panel"` to the Volume/Close toggle button in `AmbienceControl`
- Add `id="ambience-volume-panel"` to the `Collapse` wrapper
- Add an `aria-live="polite"` region to `SceneRenderer` that announces the current speaker name whenever the scene changes

### Files likely to change

- `apps/web/components/site-nav.tsx`
- `apps/web/app/layout.tsx` or `apps/web/app/play/page.tsx` (skip link placement)
- `apps/web/components/ambience-control.tsx`
- `apps/web/components/scene-renderer.tsx`

### Acceptance criteria

- A Playwright accessibility snapshot includes a landmark with role `navigation`
- Pressing Tab from the browser chrome reaches the skip link before any nav item
- Activating the skip link moves focus to `#main-content`
- AmbienceControl Volume/Close button has `aria-expanded` that toggles correctly
- `aria-live` region updates when the scene speaker changes
- All existing e2e tests still pass

### Copilot prompt

```
You are working on the Fractureline repository (maniator/a-fracture-in-time).

Your task is accessibility hardening. Do not change any narrative content or visual styles.

Context:
- The QA review doc is at docs/reviews/POST_PR16_QA_REVIEW.md (findings F-18, F-19, F-20, F-24)
- Component files are in apps/web/components/
- The layout is at apps/web/app/layout.tsx

Required changes:

1. SiteNav (apps/web/components/site-nav.tsx):
   - The AppBar or its immediate wrapper must emit role="navigation"
   - In MUI, pass component="nav" to AppBar or wrap its content in a <nav> element

2. Skip navigation link:
   - Add a visually hidden link as the very first child of <body> (in layout.tsx or a new SkipLink component)
   - The link text should be "Skip to main content"
   - It should be focusable by keyboard (not display:none) but hidden until focused
   - It should point to href="#main-content"
   - On the play page and home page, add id="main-content" to the main content region

3. AmbienceControl (apps/web/components/ambience-control.tsx):
   - The Volume/Close toggle Button needs aria-expanded={isOpen} and aria-controls="ambience-volume-panel"
   - The Collapse wrapper needs id="ambience-volume-panel"

4. SceneRenderer (apps/web/components/scene-renderer.tsx):
   - Add a visually hidden <div aria-live="polite" aria-atomic="true"> that contains the current speaker name
   - Update it whenever the speaker changes so screen readers announce scene transitions
   - The element should be positioned off-screen (not display:none) so it is announced

Run: pnpm lint && pnpm test && pnpm build to verify before finishing.
```

---

## Phase 6 — Narrative Coherence

**Owner:** Narrative Designer Agent  
**Parallel-safe:** Yes — only modifies `.ink` files; no overlap with Phases 4, 5, or 8  
**Findings addressed:** N-03, N-04, N-05, N-08

### Scope

**Part A — chapter-1.ink bridging fixes (3 targeted edits):**

1. **N-03 — Campus-to-home jump:** In `ch1_xav_future_truth`, both choices (`Warn Zelda…` and `Ask what event starts the fall`) jump directly to `ch1_family_notebook`. Xav is on campus at this point. Add 1–2 sentences of travel beat inside `ch1_xav_future_truth` (before the choices, or as a new micro-knot between the choice and the notebook scene) that establishes Xav going home — enough to bridge the geography without slowing the scene.

2. **N-04 — Diderram leap in ch1_exam_doubt:** The scene opens with Yve saying "Careful, questions about Diderram make people boring." The player just came from `ch1_yve_tease` where Xav described seeing ruined buildings on his com screen. Yve's inference to Diderram is plausible but unexplained. Add one line from Yve (or Xav's internal narration) connecting the vision of ruins to Diderram before her warning.

3. **N-05 — Zelda knows Yve at first contact:** In `ch1_yve_signal`, Zelda says "Yve is probably telling you not to answer." Soften this: change to something like "Whoever is with you is probably telling you not to answer" — Zelda can reference the presence of another person without naming someone she cannot yet know.

**Part B — Chapters 4 and 5 audit:** Full narrative review of all nine existing packs (`chapter-4-*.ink` and `chapter-5-*.ink`) against the Story Bible (`docs/STORY_BIBLE.md`) and Story Canon (`docs/STORY_CANON.md`). Flag any scene that:
- References Lattice, Keepers, Fringe, Protector, or Dissenter
- Contradicts established character arcs for Xav, Yve, Zelda, or Ari
- Contains an abrupt scene transition with no bridging context
- Uses the word "magic" or any overt magic framing (violates the No Magic Rule)

### Files likely to change

- `apps/web/public/chapter-packs/chapter-1.ink`
- `apps/web/public/chapter-packs/chapter-4-*.ink` (review, fix as needed)
- `apps/web/public/chapter-packs/chapter-5-*.ink` (review, fix as needed)

### Acceptance criteria

- All existing `chapter-one.test.ts` paths (Signal, Family, History) still pass
- N-03, N-04, N-05 transitions are smooth when read aloud
- Chapter 4 and 5 packs contain no old-narrative terminology
- At least one Playwright e2e test covers a Chapter 4 path (can be a single happy path)

### Copilot prompt — Part A (chapter-1.ink)

```
You are working on the Fractureline repository (maniator/a-fracture-in-time).

Your task is narrative coherence fixes to apps/web/public/chapter-packs/chapter-1.ink.
Read docs/STORY_BIBLE.md and docs/STORY_CANON.md first so you understand the canon.
Do NOT change any choice labels — those are tested by name in apps/web/content/chapter-one.test.ts.
Do NOT add new knots or change -> routing. Only add bridging prose within existing knots.

Three targeted fixes required:

Fix 1 — N-03 (campus-to-home jump):
In the knot === ch1_xav_future_truth ===, after the scene text and before the choices,
add 1-2 sentences that establish Xav leaving campus and heading home to retrieve the notebook.
The tone should match the surrounding scene: brief, matter-of-fact, slightly urgent.

Fix 2 — N-04 (Diderram leap in ch1_exam_doubt):
In the knot === ch1_exam_doubt ===, the scene opens with Yve saying
"Careful, questions about Diderram make people boring."
Add one line of narration or dialogue (from Xav's POV) before Yve's warning
that connects the ruined-buildings vision on the com screen to the mention of Diderram.
Example direction: Xav notices the ruins looked like old civic buildings, or Yve recognises
something about the image that makes her think of the Diderram question.

Fix 3 — N-05 (Zelda names Yve at first contact):
In the knot === ch1_yve_signal ===, Zelda says:
"Xav, if you are there, the date should be 3.14.874cy. You are at the University of Brinkton.
Yve is probably telling you not to answer. She is usually right, but not this time."
Change the third sentence to avoid naming Yve specifically, since Zelda cannot yet know
who Xav is with. Keep the tone — Zelda is still demonstrating uncanny knowledge.
Suggested replacement: "Whoever is with you is probably telling you not to answer.
They are usually right. Not this time."

After making changes, run: pnpm test from the repo root to confirm all Chapter 1 tests pass.
```

### Copilot prompt — Part B (Chapters 4–5 audit)

```
You are working on the Fractureline repository (maniator/a-fracture-in-time).

Your task is a narrative audit of the Chapter 4 and Chapter 5 ink packs.

Read these files first:
- docs/STORY_BIBLE.md — the authoritative canon
- docs/STORY_CANON.md — character and world details
- apps/web/public/chapter-packs/chapter-3-signal.ink (for context on how ch3 ends)

Then read every ink file matching chapter-4-*.ink and chapter-5-*.ink in
apps/web/public/chapter-packs/.

For each file, check for:
1. Any reference to Lattice, The Keepers, The Fringe, Protector, Dissenter, or Bell Square
2. Any character named Mira Vale, Soren, or similar old-narrative names
3. Any use of the word "magic" or overt magical framing (violates the No Magic Rule)
4. Any scene transition where a character changes location with no bridging beat
5. Any dialogue that contradicts established character arcs:
   - Xav should be cautious, family-oriented, not heroic or reckless
   - Yve should be methodical and sceptical; she needs evidence before acting
   - Zelda should be strategic and survival-focused; she carries the weight of two timelines
   - Ari should be curious and observant; not a sidekick, not comic relief

For each issue found:
- Record the file name, knot name, and the exact problematic text
- Provide a one-sentence fix or flag as "needs narrative designer review"

Produce a markdown report at docs/reviews/CHAPTER_4_5_NARRATIVE_AUDIT.md.
Do NOT modify any .ink files in this pass — report only. A follow-up PR will apply fixes.
```

---

## Phase 7 — Save UI Enhancement

**Owner:** UI Agent + Backend Agent  
**Parallel-safe:** No — depends on Phase 5 (accessibility markup should be in place first)  
**Findings addressed:** F-07, F-31

### Scope

- Add a save timestamp to the save service metadata and surface it as a Tooltip on the Save button
- After a successful save, show a MUI `Snackbar` with "Progress saved" that auto-dismisses after 3 s
- Clear `storyLoadError` on any successful state transition (successful `choose()`, `load()`, or `continueToNextChapter()`) — currently the error persists until the next error or page reload

### Files likely to change

- `apps/web/lib/persistence/save-service.ts`
- `packages/shared-types/src/game.ts` (add `savedAt?: string` to `TimelineState` or a wrapper type)
- `apps/web/store/game-store.ts`
- `apps/web/components/scene-renderer.tsx`

### Acceptance criteria

- Save button Tooltip shows the last-saved time (absolute, e.g. "Saved at 3:42 pm") when a save exists
- Snackbar appears and auto-dismisses after a successful save
- `storyLoadError` is cleared after a successful `choose()`, `load()`, or `continueToNextChapter()`
- Existing save/load e2e tests still pass

### Copilot prompt

```
You are working on the Fractureline repository (maniator/a-fracture-in-time).

Your task is Save UI Enhancement. Read the existing save-service at
apps/web/lib/persistence/save-service.ts and the game store at apps/web/store/game-store.ts
before making any changes.

Required changes:

1. Save timestamp:
   - Add a savedAt field (ISO string) to the data written by save-service.ts
   - Read it back in load() and expose it from the store as savedAt?: string
   - In SceneRenderer, wrap the "Save progress" Button in a MUI Tooltip
     that shows "Saved at <time>" (formatted as local time, e.g. "3:42 pm") when savedAt exists,
     or nothing when there is no save yet

2. Save success Snackbar:
   - After a successful save(), show a MUI Snackbar with message "Progress saved"
   - Auto-dismiss after 3000 ms
   - Do not add global state to the store for this — use local component state in SceneRenderer

3. Clear storyLoadError on success:
   - In game-store.ts, any action that sets isChoosing: false and succeeds
     (choose, load, continueToNextChapter) should also set storyLoadError: undefined
   - This already happens in the success paths; confirm it also happens in the error-recovery
     path (e.g. if choose() errors, then succeeds on the next attempt, the error clears)

Run: pnpm lint && pnpm test && pnpm build to verify before finishing.
```

---

## Phase 8 — React Error Boundary

**Owner:** UI Agent  
**Parallel-safe:** Yes — no overlap with Phases 4, 5, or 6  
**Findings addressed:** F-27

### Scope

- Create a `StoryErrorBoundary` React class component (or use a library like `react-error-boundary`)
- Wrap `<SceneRenderer />` in the error boundary on the play page
- The fallback UI should show an MUI Alert with a "Reload page" button and a short human-readable message
- No new dependencies unless `react-error-boundary` is already in the project

### Files likely to change

- `apps/web/components/story-error-boundary.tsx` (new)
- `apps/web/app/play/page.tsx`

### Acceptance criteria

- A thrown error inside `SceneRenderer` renders the fallback instead of a blank page
- The fallback contains a "Reload page" button that calls `window.location.reload()`
- No new npm dependencies added (use a native class component)
- `pnpm lint && pnpm build` passes

### Copilot prompt

```
You are working on the Fractureline repository (maniator/a-fracture-in-time).

Your task is to add a React error boundary around the SceneRenderer component.

Requirements:
1. Create apps/web/components/story-error-boundary.tsx as a React class component
   that implements componentDidCatch and getDerivedStateFromError
2. The fallback UI should use MUI components matching the existing dark theme:
   - An MUI Alert with severity="error"
   - Message: "Something went wrong loading the story."
   - A Button labelled "Reload page" that calls window.location.reload()
3. Wrap <SceneRenderer /> with <StoryErrorBoundary> in apps/web/app/play/page.tsx
4. The component must be a 'use client' component
5. Do not add react-error-boundary or any other new npm dependency

Run: pnpm lint && pnpm build to verify before finishing.
```

---

## Phase 9 — Storybook Expansion

**Owner:** UI Agent  
**Parallel-safe:** No — run after Phase 5 (documents the accessible components)  
**Findings addressed:** F-35 (app update recommendation from review doc)

### Scope

- Add story variants to `SceneRenderer.stories.tsx`:
  - `Loading` — `isStoryReady: false`, no scene text
  - `ErrorNotLoaded` — `!isStoryReady && storyLoadError` set
  - `ErrorInline` — `isStoryReady: true && storyLoadError` set (story shows with inline alert)
  - `ChapterComplete` — `chapterOneComplete: true`, next pack available
  - `ChapterCompleteTerminal` — `chapterOneComplete: true`, no next pack
  - `WithCodex` — `state.codex` has entries
- Add story variants to `GameBriefing.stories.tsx`:
  - `Dismissed` — mocks `localStorage` so briefing renders null (documents the hidden state)

### Files likely to change

- `apps/web/stories/SceneRenderer.stories.tsx`
- `apps/web/stories/GameBriefing.stories.tsx`

### Acceptance criteria

- All new stories render without console errors in Storybook
- `pnpm build-storybook` succeeds
- The Loading and Error variants can be reviewed without running the full app

### Copilot prompt

```
You are working on the Fractureline repository (maniator/a-fracture-in-time).

Your task is to expand the Storybook stories for SceneRenderer and GameBriefing.

Read the existing stories in apps/web/stories/ first.
Read apps/web/components/scene-renderer.tsx and apps/web/components/game-briefing.tsx.
Read apps/web/store/game-store.ts to understand what state the store exposes.

The stories must mock the Zustand store (useGameStore). Use the pattern already
established in SceneRenderer.stories.tsx if mocking is already present there,
otherwise use the `mockReturnValue` / `jest.mock` pattern appropriate for Vitest + Storybook.

Required new stories for SceneRenderer.stories.tsx:
1. Loading — isStoryReady: false, sceneText: [], choices: []
2. ErrorNotLoaded — isStoryReady: false, storyLoadError: "Chapter 1 is not available yet."
3. ErrorInline — isStoryReady: true, storyLoadError: "That choice could not be applied.", plus sample scene text and choices
4. ChapterComplete — isStoryReady: true, state.flags["chapter-one-complete"]: true, next chapter pack available
5. ChapterCompleteTerminal — isStoryReady: true, state.flags["chapter-one-complete"]: true, no next pack
6. WithCodex — isStoryReady: true, state.codex: ["Diderram: The second major power on Ayker"]

Required new stories for GameBriefing.stories.tsx:
1. Dismissed — use a Storybook decorator or beforeEach to set
   localStorage.setItem('fractureline:briefing-dismissed', '1') so the component renders null,
   then document that the null render is intentional for returning players

Run: pnpm storybook to visually verify, then pnpm build-storybook to confirm the build passes.
```

---

## Quick-reference: who owns what

| Phase | Agent | Can start now? |
|---|---|---|
| 4 — Playwright | QA Agent | ✅ Yes |
| 5 — Accessibility | UI Agent | ✅ Yes |
| 6A — chapter-1.ink | Narrative Designer | ✅ Yes |
| 6B — Ch4/5 audit | Narrative Designer | ✅ Yes (parallel with 6A) |
| 7 — Save UI | UI + Backend | ⏳ After Phase 5 |
| 8 — Error Boundary | UI Agent | ✅ Yes |
| 9 — Storybook | UI Agent | ⏳ After Phases 4 + 5 |

## What is deliberately out of scope

The following remain open questions requiring product-owner input before implementation:

| Topic | Why deferred |
|---|---|
| Multiple save slots | Product decision: does the game model support branched saves? |
| Save sync across devices | Requires Supabase or similar — out of scope for local-first MVP |
| Chapter 4/5 e2e coverage | Blocked until narrative audit (Phase 6B) confirms content is production-ready |
| Offline chapter pack cache tests | Requires service worker in production mode; currently skipped in dev-mode Playwright |
| `game-store.ts` unit tests | Blocked by module-level singleton architecture (F-25); needs factory refactor first |
