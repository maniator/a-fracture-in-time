# Post-PR16 QA Review: Fractureline

**Review date:** 2026-04-27  
**Reviewed against:** `main` after PR #16 (`test: 100% narrative-engine coverage, ≥90% CI enforcement, dead code removal, and security upgrade`)  
**Reviewer agents:** Frontend, QA, Accessibility, Architect, Narrative, Product/UX, Producer

---

## 1. Executive Summary

The app is **functionally stable and ready for a fix pass.** All 38 Playwright e2e tests pass across Chromium and mobile-Chrome. Unit tests (92 total), lint, build, and coverage all clear their thresholds. The narrative engine is at 100% coverage and three Chapter 1 paths, Chapters 2 and 3 continuation, and save/load are all verified end-to-end.

**Top 5 risks:**

1. **`GameBriefing` was built but orphaned** — new players arrive on `/play` with no in-app orientation before the story begins. Now resolved: the component should be integrated with a localStorage dismiss mechanism.
2. **`reset()` lacks an `isChoosing` guard** — the only store action that allows concurrent invocation, risking state corruption mid-choice.
3. **`nth(3)` brittle Playwright selector** — silently tests the wrong button if any UI button is added, removed, or reordered.
4. **`STORY_BIBLE.md` describes the old auto-generated Lattice/Protector/Dissenter narrative** — not the current Xav/Yve/Zelda/Ayker/Cybol canon. Misleads any agent or contributor reading it.
5. **Narrative coherence gaps in `chapter-1.ink`** — at least two scene transitions are abrupt enough that a first-time player would notice a jump (detailed below under Narrative Agent findings).

**Is the existing Playwright suite enough?** No. It covers happy-path flows well but has zero coverage of: double-click/rapid tap, save-before-any-choice, page-reload save, offline/storage failure, keyboard navigation, ambience mute/unmute, and Chapter 4+ paths.

**Recommendation:** Multiple targeted PRs rather than one large sweep, organized as the fix phases below.

---

## 2. Commands Run

| Command | Result | Notes |
|---|---|---|
| `pnpm install --frozen-lockfile` | ✅ Pass | Already up to date, 326 ms |
| `pnpm lint` | ✅ Pass | ESLint + tsc --noEmit clean |
| `pnpm test` | ✅ Pass | 92 tests (23 narrative-engine, 69 web unit) |
| `pnpm test:coverage` | ✅ Pass | Narrative-engine 100%; web lib: 100% stmts, 95.65% branch; all ≥90% |
| `pnpm build` | ✅ Pass | Compiled in 9.5 s; cross-origin dev warning noted (see F-17); PWA sw.js generated |
| `pnpm test:e2e` | ✅ Pass | 38 tests × 2 projects (chromium + mobile-chrome), ~1 min |

**Notable warnings:**
- Dev server prints `Cross origin request detected from 127.0.0.1 to /_next/* resource` — Next.js future-compat notice. Not a failure, but should be addressed with `allowedDevOrigins`.
- PWA build prints `Service worker won't be automatically registered as per the config` — handled by `PwaRegister` component.

---

## 3. Agent Findings

### 3.1 Frontend Agent

**F-01 · High · UX** — **`GameBriefing` was orphaned.** `apps/web/components/game-briefing.tsx` is a fully implemented component (character intros, world briefing, "Enter the first fracture" CTA) that was never imported on `/play`. New players arrived mid-story with no orientation. **Resolved in this PR:** integrated with localStorage dismiss so returning players are not interrupted.

**F-02 · Medium · UI** — **"Volume"/"Hide" toggle label is confusing.** The expand/collapse button says "Volume" when closed and "Hide" when open. "Hide" is too abrupt. **Resolved in this PR:** changed to "Close".

**F-03 · Medium · Mobile** — **Ambience control may overlap last choice on short viewports.** The fixed `AmbienceControl` sits at `bottom: { xs: 12 }`. The play container compensates with `pb: { xs: 20 }`, but this is not validated by any e2e assertion. Remains open — needs a Playwright scroll/overlap check for mobile.

**F-04 · Low · UI** — **Volume slider range was 0–0.22 (raw gain).** Non-intuitive. **Resolved in this PR:** normalized to 0–1, translated to gain internally.

**F-05 · Low · UI** — **`endingKey` chip showed raw key strings** (`signal-path`). **Resolved in this PR:** now displays formatted names ("Signal Path", "Family Path", "History Path").

**F-06 · Low · UI** — **"Checking saves" chip flickered on fast devices.** **Resolved in this PR:** chip is now suppressed until `isPersistenceReady` is true.

**F-07 · Low · UI** — **No save feedback beyond chip state change.** After clicking "Save progress," only the `hasSave` chip changes. No transient success message. Remains open as low priority — add a `Snackbar` in a future pass.

**F-08 · Medium · UX** — **"Restart chapter" was destructive with no confirmation.** **Resolved in this PR:** MUI Dialog confirmation added.

**F-09 · Low · UX** — **Chapter complete "no next chapter" message read as a dead end.** "Your choices will shape which future chapters become available" is accurate but potentially frustrating if it reads as permanent. Remains open — needs product input on exact wording.

---

### 3.2 QA Agent

**F-10 · High · Testing** — **`nth(3)` brittle selector.** `advanceByClickingFirstChoiceUntil` in both e2e files uses `page.getByRole('button').nth(3)`. Assumes Save=0, Load=1, Restart=2, Choice=3. Any UI button change breaks this silently. Remains open — should use `page.locator('[aria-label="Choices"] >> button').first()`.

**F-11 · High · Testing** — **No double-click / rapid-tap test.** `choose()` has an `isChoosing` guard but there is no e2e test verifying it holds under rapid interaction. Remains open.

**F-12 · Medium · State** — **`reset()` lacked an `isChoosing` guard.** **Resolved in this PR.**

**F-13 · Medium · Testing** — **No Playwright tests for mute/unmute or volume expand/collapse.** Remains open.

**F-14 · Medium · Persistence** — **No e2e test for corrupted / version-mismatched save.** Remains open.

**F-15 · Medium · Persistence** — **No e2e test for page-reload save round-trip.** The existing save/load test stays in-page. Remains open.

**F-16 · Low · Testing** — **Coverage thresholds don't apply to `store/` or `components/`.** `game-store.ts` has zero unit test enforcement. Remains open — expand `include` in vitest.config.ts in a future pass.

**F-17 · Low · Testing** — **Next.js cross-origin dev warning in CI output.** **Resolved in this PR:** `allowedDevOrigins` added to `next.config.ts`.

---

### 3.3 Accessibility Agent

**F-18 · High · Accessibility** — **SiteNav has no `<nav>` landmark.** `AppBar` does not emit `role="navigation"`. Remains open — add `component="nav"` to the `AppBar`.

**F-19 · Medium · Accessibility** — **No skip navigation link.** WCAG 2.4.1. Remains open.

**F-20 · Medium · Accessibility** — **Ambience "Volume"/"Close" button lacks `aria-expanded`.** Remains open — add `aria-expanded={isOpen}` and `aria-controls`.

**F-21 · Medium · Accessibility** — **"Restart chapter" button had no accessible warning.** **Resolved in this PR:** MUI Dialog confirmation provides warning context, which assistive technologies will announce.

**F-22 · Low · Accessibility** — **`aria-label` on `dd` in `SignalCard`.** Intentional and beneficial. Test with a real screen reader to verify natural reading.

**F-23 · Low · Accessibility** — **Choice buttons have no explicit `type="button"`.** Low risk (MUI defaults correctly). Remains open as polish.

**F-24 · Low · Accessibility** — **No `aria-live` region for choice application state.** Remains open.

---

### 3.4 Architect Agent

**F-25 · Medium · State** — **Module-level mutable singletons (`activeStory`, etc.) in `game-store.ts` block unit testing.** Any unit test would share state between cases. Remains open — needs a factory/encapsulation refactor before `game-store.ts` unit tests can be written.

**F-26 · Medium · State** — **`getActiveStoryForChoice()` discards the `continueInkStory()` return value on the restore-fallback path.** Lines 182–184 call `continueInkStory(restored)` to advance the story pointer but discard the snapshot (and thus any intermediate text). This means paragraphs appearing between a save point and the first choice can be lost on reload. A comment has been added in this PR; a proper fix requires deliberate product and narrative review.

**F-27 · Low · State** — **No React error boundary around `SceneRenderer`.** An unhandled exception would blank the entire page. Remains open.

**F-28 · Low · Performance** — **`getEligibleNextChapterPack()` called on every render.** Trivially fast today; worth memoizing when the manifest grows. Remains open.

**F-29 · Low · State** — **`continueToNextChapter()` clears `inkStateJson` from `previous`.** Intentional chapter-boundary reset — a comment has been added in this PR.

---

### 3.5 Narrative Agent

**N-01 · High · Narrative** — **`STORY_BIBLE.md` describes a completely different game.** The current document describes Lattice, The Keepers, The Fringe, "Protector" and "Dissenter" archetypes, and a 10-chapter spine about magical memory editing. None of this reflects the live narrative (Xav Reivax, Yve Ettevy, Zelda Adlez, Ayker, Cybol, Diderram, the family notebook, the broken com). **Resolved in this PR:** rewritten to match the canon documented in `STORY_CANON.md` and the live ink packs.

**N-02 · High · Narrative** — **`apps/web/content/chapter-one-ink.ts` contains entirely superseded narrative.** Mira Vale, Bell Square, Protector uniform, civic record — 257 lines from the auto-generated prototype. The live chapter is `public/chapter-packs/chapter-1.ink`. The `.ts` file is not imported anywhere (`chapter-one.test.ts` was already updated in a prior PR to read from the public file). **Resolved in this PR:** file removed.

**N-03 · Medium · Narrative** — **Abrupt home-notebook jump in Chapter 1.** On paths that route through `ch1_xav_future_truth → ch1_family_notebook`, Xav is on the university campus discussing Cybol's fall with Zelda, then the next scene immediately opens "The notebook was exactly where Da said it would be." No travel beat, no decision to go home, no acknowledgment of leaving campus. The notebook retrieval makes narrative sense only because Ari asked about it at the very start — but this setup is too far back to carry the weight. **Deferred to Narrative Designer:** the `ch1_xav_future_truth` knot needs a short bridging beat (one or two sentences establishing travel home) before the jump to `ch1_family_notebook`.

**N-04 · Medium · Narrative** — **`ch1_exam_doubt` context is ambiguous on the tease path.** From `ch1_yve_tease` (the com shows a ruined cityscape), choosing "Tell Yve exactly what appeared on the screen" leads to `ch1_exam_doubt` where Yve immediately says "Careful, questions about Diderram make people boring." Xav described seeing ruins — he did not ask about Diderram. Yve's inference is plausible but the leap is not shown. A reader on this path may not understand why Diderram is being mentioned. **Deferred to Narrative Designer:** insert one line from Yve connecting the ruins image to Diderram before her warning.

**N-05 · Low · Narrative** — **Zelda's knowledge of Yve is convenient on first contact.** In `ch1_yve_signal`, Zelda says "Yve is probably telling you not to answer. She is usually right, but not this time." This implies Zelda knows Yve exists and has an opinion about her at the moment of first contact, which has not been established. The line works as a mystery hook but may read as a continuity error. **Deferred to Narrative Designer:** either foreshadow how Zelda knows, or soften to "whoever you are with is probably telling you not to answer."

**N-06 · Low · Narrative** — **Stale Protector/Dissenter chip labels and example text in `StyleGuide.stories.tsx`.** The style guide showed Protector and Dissenter chips as sample states and included Lattice-era prose. **Resolved in this PR:** updated to Xav/Zelda/Ayker examples.

**N-07 · Low · Narrative** — **`docs/STARTER_PROMPTS.md` still contains an auto-generated prompt referencing Protector/Dissenter alternation.** **Resolved in this PR:** updated to reflect current character set.

**N-08 · Question · Narrative** — **Chapters 4 and 5 ink packs exist but have not been reviewed for narrative coherence.** These packs branch from Chapter 3 governance outcomes. A full narrative audit by the Narrative Designer agent is required before these are promoted to production-tested content. The chapter pack manifest references six Chapter 4 routes and three Chapter 5 routes; none currently has e2e coverage.

---

### 3.6 Product/UX Agent

**F-30 · High · UX** — **GameBriefing integrated.** New players now see the orientation card before the story begins. Returning players who dismissed it are not interrupted. The briefing uses the accurate character roster and world context from `STORY_CANON.md`.

**F-31 · Medium · UX** — **Save/load model remains opaque.** No save timestamp displayed. Overwriting an existing save is silent. Remains open — add a Tooltip or small timestamp display to the save button in a future pass.

**F-32 · Medium · UX** — **"Replay" vs. "Restart chapter" label inconsistency remains.** Both reset to Chapter 1 but appear in different contexts with different labels. Remains open.

**F-33 · Medium · Docs** — **E2E_TESTING.md "Protector to Dissenter" stale reference.** **Resolved in this PR.**

**F-34 · Low · Docs** — **`chapter-one-ink.ts` removed.** See N-02.

**F-35 · Low · UX** — **Loading state text is developer-facing.** "Preparing the opening chapter. Once it loads, it can be available for offline play." Remains open as low priority — update to narrative-toned copy in a future pass.

**F-36 · Low · Docs** — **Help page doesn't direct confused users to the homepage lore section.** Remains open.

---

### 3.7 Producer Agent

| Phase | Scope | Status |
|---|---|---|
| Phase 1 | State reliability: `reset()` guard, comment on discarded snapshot, `continueToNextChapter()` comment | **Done in this PR** |
| Phase 2 | GameBriefing integration, volume normalization, restart dialog, storyLoadError inline, chip fixes | **Done in this PR** |
| Phase 3 | Stale content removal, Story Bible rewrite, cross-origin config, stale ref cleanup | **Done in this PR** |
| Phase 4 | Playwright: brittle selectors, double-click, reload-save, error UI, keyboard nav, ambience tests | **Open — next PR** |
| Phase 5 | Accessibility: nav landmark, skip link, aria-expanded, aria-live | **Open — next PR** |
| Phase 6 | Narrative: chapter-1.ink bridging beats (N-03, N-04, N-05), Chapters 4–5 narrative audit | **Deferred to Narrative Designer** |

---

## 4. Playwright Review

### 4.1 Existing Coverage Summary

19 tests × 2 projects (chromium + mobile-chrome) = 38 runs. All green.

| Test | What it validates |
|---|---|
| Home page loads and links to play | Headings, no chapter-pack prefetch, CTA click |
| Play route downloads Chapter 1 | Network request, first choice, no errors |
| Play flow branches (Xav → Yve → Zelda) | 3-choice branch navigation |
| Ambience control visible | Component present, mute button present |
| Save and load from IndexedDB | Save → Restart → Load round-trip |
| Can complete Signal Path | Full Chapter 1 via 8 named choices |
| Can continue to Chapter 2 Signal | Chapter 1 → 2 handoff |
| Full Signal Path → Chapter 3 | 3-chapter continuous progression |
| Can complete Family Path | Full Chapter 1 via 7 named choices |
| Can complete History Path | Full Chapter 1 via 7 named choices |
| Help page | Headings, character names, signal labels, no "playwright" text |
| Static PWA assets | Manifest, chapter-1.ink, offline.html, chapters 2–3 packs |
| Can continue Family Path → Chapter 2 | |
| Can continue History Path → Chapter 2 | |
| Narrative stats update | Order signal rises after first choice |
| Screenshots (home, play, help, chapter 3) | Documentation capture |

### 4.2 Coverage Gaps

| Scenario | Covered? | Risk |
|---|---|---|
| Double-click / rapid tap on choice | ❌ | isChoosing guard untested in UI |
| Save before first choice | ❌ | Initial-state save behavior untested |
| Page reload after save (full navigation cycle) | ❌ | IndexedDB persistence tested by unit tests only |
| Corrupt or version-mismatched save | ❌ | storyLoadError UI path untested |
| Chapter 4+ paths | ❌ | No coverage; packs exist but narrative unaudited |
| Mute / Unmute ambience | ❌ | Only checks presence |
| Volume expand/collapse | ❌ | |
| Keyboard-only navigation | ❌ | Promised in UI_ACCESSIBILITY.md, not implemented |
| Skip navigation link | ❌ | Not present and not tested |
| Mobile: long choice overflow | ❌ | Mobile project runs same tests, no layout assertions |
| GameBriefing dismiss (localStorage) | ❌ | New flow needs Playwright coverage |
| storyLoadError inline display | ❌ | Error paths not tested at UI level |
| Restart dialog: cancel and confirm | ❌ | New dialog needs tests |

### 4.3 Brittle / Flaky Selector Notes

| Location | Issue | Recommended fix |
|---|---|---|
| `app.spec.ts:11`, `screenshots.spec.ts:26` | `page.getByRole('button').nth(3)` — assumes button order is fixed | Replace with `page.locator('[aria-label="Choices"] >> button').first()` |
| `app.spec.ts:323` | `page.getByText('Quiet').first()` — relies on signal order | Scope to a specific signal card container |
| `app.spec.ts:323–324` | Two chained `.locator('..')` parent walks | Assign a test-stable `data-testid` to the signal card |

### 4.4 Suggested New Tests (next PR)

1. **Rapid double-click on choice** — assert single state transition and no error.
2. **Save before first choice** — save at initial state, verify `hasSave` chip, verify load works.
3. **Page reload after save** — navigate to `/play` → choice → save → navigate to `/play` → load → assert progress.
4. **GameBriefing shows for new user, hidden for returning user** — clear localStorage → assert briefing visible; dismiss → reload → assert briefing absent.
5. **Restart dialog cancel** — click Restart → dialog opens → click Cancel → dialog closes, story continues.
6. **Restart dialog confirm** — click Restart → dialog opens → click Restart → story resets to Xav Reivax.
7. **Ambience mute/unmute** — click mute → label becomes "Unmute"; click again → label becomes "Mute".
8. **Volume expand/collapse** — click "Volume" → slider appears; click "Close" → slider hidden.
9. **storyLoadError inline** — story loaded → trigger choice error → alert appears alongside scene text (not replacing it).
10. **Replace `nth(3)` with semantic selector** throughout.

### 4.5 Screenshots Captured

All 8 screenshot tests passed (chromium + mobile-chrome for home, play, help, chapter-3).

### 4.6 Mobile Review Notes

Mobile-Chrome runs all tests and passes. No mobile-specific assertions exist for:
- Long choice button overflow
- Ambience/content overlap on short viewports
- Touch target sizing

### 4.7 CI Notes

CI uses `workers: 2` with `retries: 2`. 38-test suite completes in ~1 minute. No sharding needed yet; reconsider if suite grows past ~60 tests.

---

## 5. Findings List

| ID | Severity | Category | Finding | Evidence | Status |
|---|---|---|---|---|---|
| F-01 | High | UX | GameBriefing orphaned — new players get no orientation | `game-briefing.tsx` not imported in `play/page.tsx` | ✅ Resolved |
| F-02 | Medium | UI | "Hide" label on ambience volume toggle is confusing | `ambience-control.tsx:362` | ✅ Resolved |
| F-03 | Medium | Mobile | Ambience control may overlap last choice on short viewports | `pb: { xs: 20 }` not validated | 🔲 Open |
| F-04 | Low | UI | Volume slider range is 0–0.22 (raw gain) | `ambience-control.tsx:368` | ✅ Resolved |
| F-05 | Low | UI | endingKey chip shows raw keys ("signal-path") | `scene-renderer.tsx:161` | ✅ Resolved |
| F-06 | Low | UI | "Checking saves" chip flickers on fast devices | `scene-renderer.tsx:162` | ✅ Resolved |
| F-07 | Low | UX | No transient feedback after save succeeds | No snackbar on save | 🔲 Open |
| F-08 | Medium | UX | "Restart chapter" is destructive with no confirmation | `scene-renderer.tsx:169` | ✅ Resolved |
| F-09 | Low | UX | Chapter complete "no next chapter" message reads as dead end | `scene-renderer.tsx:221` | 🔲 Open |
| F-10 | High | Testing | `nth(3)` brittle selector silently breaks on button count change | `app.spec.ts:11`, `screenshots.spec.ts:26` | 🔲 Open |
| F-11 | High | Testing | No rapid double-click / rapid tap e2e test | No such test | 🔲 Open |
| F-12 | Medium | State | `reset()` had no `isChoosing` guard | `game-store.ts:305` | ✅ Resolved |
| F-13 | Medium | Playwright | No e2e tests for ambience mute/unmute or volume expand/collapse | `app.spec.ts` only checks presence | 🔲 Open |
| F-14 | Medium | Persistence | No e2e test for corrupted/stale save showing storyLoadError | UI path untested | 🔲 Open |
| F-15 | Medium | Persistence | No e2e test for page-reload after save | In-page test only | 🔲 Open |
| F-16 | Low | Testing | Coverage `include` excludes `store/` and `components/` | `vitest.config.ts:18` | 🔲 Open |
| F-17 | Low | Testing | Cross-origin dev warning in CI output | `pnpm test:e2e` output | ✅ Resolved |
| F-18 | High | Accessibility | SiteNav has no `<nav>` landmark | `site-nav.tsx` | 🔲 Open |
| F-19 | Medium | Accessibility | No skip navigation link | Not present in layout | 🔲 Open |
| F-20 | Medium | Accessibility | Ambience toggle lacks `aria-expanded` | `ambience-control.tsx:362` | 🔲 Open |
| F-21 | Medium | Accessibility | "Restart chapter" had no accessible destructive warning | `scene-renderer.tsx:169` | ✅ Resolved (Dialog) |
| F-22 | Low | Accessibility | `aria-label` on `dd` in SignalCard — verify with real screen reader | `scene-renderer.tsx:268` | 🔲 Open |
| F-23 | Low | Accessibility | Choice buttons lack explicit `type="button"` | `scene-renderer.tsx:187` | 🔲 Open |
| F-24 | Low | Accessibility | No `aria-live` region for scene loading state | No live region | 🔲 Open |
| F-25 | Medium | State | Module-level singletons in `game-store.ts` block unit testing | `game-store.ts:36–38` | 🔲 Open |
| F-26 | Medium | State | `getActiveStoryForChoice()` discards `continueInkStory` result | `game-store.ts:182–184` | ✅ Comment added |
| F-27 | Low | State | No React error boundary around SceneRenderer | `play/page.tsx` | 🔲 Open |
| F-28 | Low | Performance | `getEligibleNextChapterPack()` called every render | `scene-renderer.tsx:121` | 🔲 Open |
| F-29 | Low | State | `continueToNextChapter()` clears `inkStateJson` without comment | `game-store.ts:269` | ✅ Comment added |
| F-31 | Medium | UX | Save/load model is opaque — no timestamp, no overwrite warning | `scene-renderer.tsx:167–168` | 🔲 Open |
| F-32 | Medium | UX | "Replay" vs. "Restart chapter" label inconsistency | `scene-renderer.tsx:213` vs `169` | 🔲 Open |
| F-33 | Medium | Docs | "Protector to Dissenter" stale in E2E_TESTING.md, README.md | Both files | ✅ Resolved |
| N-01 | High | Narrative | STORY_BIBLE.md describes wrong game (Lattice/Protector/Dissenter) | `docs/STORY_BIBLE.md` | ✅ Resolved |
| N-02 | High | Narrative | `chapter-one-ink.ts` contains Mira Vale / superseded narrative | `apps/web/content/chapter-one-ink.ts` | ✅ Resolved (deleted) |
| N-03 | Medium | Narrative | Abrupt campus→home jump in `ch1_xav_future_truth → ch1_family_notebook` | `chapter-1.ink` scenes | 🔲 Deferred (Narrative Designer) |
| N-04 | Medium | Narrative | `ch1_exam_doubt` Diderram reference is unmotivated on the tease path | `chapter-1.ink` `ch1_exam_doubt` | 🔲 Deferred (Narrative Designer) |
| N-05 | Low | Narrative | Zelda knows Yve exists at first contact without prior setup | `chapter-1.ink` `ch1_yve_signal` | 🔲 Deferred (Narrative Designer) |
| N-06 | Low | Narrative | StyleGuide.stories.tsx used Protector/Dissenter examples | `StyleGuide.stories.tsx` | ✅ Resolved |
| N-07 | Low | Narrative | STARTER_PROMPTS.md references Protector/Dissenter alternation | `docs/STARTER_PROMPTS.md` | ✅ Resolved |
| N-08 | Question | Narrative | Chapters 4 and 5 ink packs not audited for coherence | 6 Ch4 packs, 3 Ch5 packs | 🔲 Deferred (Narrative Designer) |

---

## 6. Edge Cases Checklist

**Save / Load / Restart**
- [x] Save after first choice
- [x] Load after restart (in same session)
- [?] Save before first choice (unit-tested only)
- [?] Load after full page reload (unit-tested only)
- [ ] Overwrite existing save
- [ ] Load with corrupt save (unit-tested, not UI-tested)
- [ ] Load with version-mismatched save (unit-tested, not UI-tested)
- [x] Load button disabled when no save exists
- [ ] Save immediately after chapter completion
- [x] Restart dialog: new confirmation flow added

**Choice Handling**
- [x] Single choice advances story
- [x] Multiple branch paths (Signal, Family, History)
- [ ] Rapid double-click on choice
- [x] `isChoosing` guard on `choose()`, `reset()` (now both guarded)
- [x] Choice index out of bounds (handled in store)

**Chapter Progression**
- [x] Chapter 1 → 2 (Signal, Family, History)
- [x] Chapter 2 → 3 (Signal)
- [ ] Chapter 3 → 4
- [ ] Chapter 4 → 5
- [ ] No next chapter available (complete, no next pack)

**Mobile**
- [x] Mobile viewport runs same tests
- [ ] Long choice buttons don't overflow card
- [ ] Ambience control doesn't overlap last choice
- [ ] Touch targets are adequate size

**Keyboard / Accessibility**
- [ ] Keyboard-only navigation through choices
- [ ] Skip navigation link works
- [ ] Focus order correct after choice selection
- [?] Screen reader announcements for scene updates

**Offline / PWA**
- [x] Offline fallback page exists
- [x] Manifest is reachable
- [ ] Service worker registered (production only)
- [ ] Offline chapter pack cache behavior
- [ ] Storage quota exceeded
- [ ] IndexedDB unavailable (Safari private mode)

**Audio**
- [x] Ambience control visible
- [ ] Mute/unmute toggles label
- [ ] Volume slider appears and affects audio
- [ ] AudioContext requires gesture on iOS

**Error States**
- [ ] `storyLoadError` inline display (new behavior — needs test)
- [ ] Chapter pack fetch failure
- [ ] React render error (no error boundary)

**New Player Onboarding**
- [x] GameBriefing shown to new users
- [x] GameBriefing dismissible
- [ ] GameBriefing hidden for returning users (localStorage — needs Playwright test)

---

## 7. Fix Plan

### Done in This PR

- `reset()` `isChoosing` guard
- Comment on discarded `continueInkStory` snapshot in `getActiveStoryForChoice()`
- Comment on intentional `inkStateJson` clear in `continueToNextChapter()`
- GameBriefing integrated on `/play` with localStorage dismiss
- MUI Dialog for restart chapter confirmation
- storyLoadError shown as inline Alert when story is already loaded
- Volume slider normalized 0–1
- "Hide" → "Close" label
- `endingKey` chip formatted ("Signal Path" etc.)
- "Checking saves" chip suppressed until `isPersistenceReady`
- `chapter-one-ink.ts` deleted
- `STORY_BIBLE.md` rewritten with Xav/Yve/Zelda/Ayker canon
- `README.md`, `E2E_TESTING.md`, `StyleGuide.stories.tsx`, `STARTER_PROMPTS.md` stale references updated
- `allowedDevOrigins` added to `next.config.ts`

### Phase 4: Playwright Stabilization (next PR)

**Scope:** Replace `nth(3)`, add reload-save, error-UI, GameBriefing dismiss, restart-dialog, ambience interaction, and keyboard nav tests.

**Files:** `app.spec.ts`, `screenshots.spec.ts`

**Acceptance criteria:** No `nth(3)` selectors remain; 10 new tests pass on both projects.

**Risks:** storyLoadError mock requires `page.route()` for the chapter-pack fetch.

### Phase 5: Accessibility Hardening (next PR)

**Scope:** `<nav>` landmark, skip link, `aria-expanded` on ambience toggle, `aria-live` for scene updates.

**Files:** `site-nav.tsx`, `layout.tsx`, `ambience-control.tsx`, `scene-renderer.tsx`

**Acceptance criteria:** Playwright accessibility snapshot includes `navigation` landmark; skip link moves focus to main content.

### Phase 6: Narrative Coherence (Narrative Designer)

**Scope:** `chapter-1.ink` bridging beats for N-03, N-04, N-05; full audit of Chapters 4 and 5 ink packs.

**Acceptance criteria:** No abrupt scene jumps flagged by QA; Chapter 4 and 5 packs have e2e coverage.

---

## 8. Proposed GitHub Issues / Copilot Tasks

### Issue 1: Playwright — replace nth(3) and add double-click test
**Files:** `app.spec.ts`, `screenshots.spec.ts`  
**Criteria:** Semantic selector; double-click test passes both projects.

### Issue 2: Playwright — page-reload save round-trip and storyLoadError UI
**Files:** `app.spec.ts`  
**Criteria:** Reload test passes; error-alert test passes with `page.route()` mock.

### Issue 3: Playwright — GameBriefing dismiss and restart dialog
**Files:** `app.spec.ts`  
**Criteria:** Briefing hidden after dismiss+reload; dialog cancel and confirm both tested.

### Issue 4: Playwright — ambience mute/unmute and volume expand/collapse
**Files:** `app.spec.ts`  
**Criteria:** Label changes verified; slider visibility verified; both projects pass.

### Issue 5: Accessibility — nav landmark and skip link
**Files:** `site-nav.tsx`, `layout.tsx`  
**Criteria:** `<nav>` present; skip link moves keyboard focus to main content.

### Issue 6: Accessibility — ambience aria-expanded and scene aria-live
**Files:** `ambience-control.tsx`, `scene-renderer.tsx`  
**Criteria:** `aria-expanded` toggles correctly; `aria-live` region announces scene changes.

### Issue 7: Narrative — chapter-1.ink bridging beats
**Files:** `public/chapter-packs/chapter-1.ink`  
**Criteria:** N-03, N-04, N-05 resolved; all existing Chapter 1 e2e tests still pass.

### Issue 8: Narrative — Chapter 4 and 5 audit
**Files:** `chapter-4-*.ink`, `chapter-5-*.ink`  
**Criteria:** All packs reviewed by Narrative Designer; at least one e2e test per Chapter 4 route.

---

## 9. App Update Recommendations

1. **Help page: explain the route system.** Players don't know that completing Chapter 1 unlocks a different Chapter 2 pack based on their ending. A brief "Your Chapter 1 ending unlocks a different Chapter 2" note would prevent confusion.
2. **Save UI: show last-saved timestamp.** Even "Saved 2 min ago" in a Tooltip on the Save button would dramatically improve trust in the autosave.
3. **Offline page: reassure returning players.** "If you've played before, your downloaded chapters are still available" would reduce the cold-start fear when offline.
4. **Loading state copy.** "Preparing the opening chapter. Once it loads, it can be available for offline play." is technical. Consider narrative-toned copy: "Entering Ayker…" with the offline note appearing only if the load is unusually slow.
5. **Storybook SceneRenderer stories.** Currently only `ChapterOneOpening`. Add: loading state, error state, chapter-complete (with next), chapter-complete (terminal), codex unlocked. These make component states reviewable without the full app.
6. **README: describe all three Chapter 1 paths explicitly.** Currently describes "play flow from Protector to Dissenter" (stale). Should describe Signal, Family, and History paths with the chapter continuation model.

---

## 10. Follow-up Questions for Naftali

| Question | Why it matters | Suggested default |
|---|---|---|
| Should the GameBriefing dismiss persist only for the current browser, or should it sync to the save? | Syncing to the save would show the briefing on a new device even if previously dismissed. Syncing is more correct but adds complexity. | Persist to `localStorage` only (current implementation). Accept that a new browser shows the briefing again. |
| Should "Replay" (chapter-complete alert) and "Restart chapter" (toolbar) both reset to Chapter 1? | Currently they both call `reset()`. If replaying from the chapter-complete state should only replay the current chapter, the behavior needs to diverge. | Both reset to Chapter 1 for now. Address if chapters 4+ create confusion. |
| Chapter 4 and 5 packs: are they production-ready narrative, or are they placeholder/stub content? | If stubs, e2e tests would resolve immediately with a chapter-complete state rather than realistic gameplay. Testing stubs can give false confidence. | Flag as unaudited in the manifest; defer e2e coverage until Narrative Designer signs off. |
| Should `storyLoadError` be auto-dismissed when the player makes a successful next action? | Currently the error stays visible until another error or a page reload clears it. For errors from `choose()`, it should probably clear when the next choice succeeds. | Yes — clear `storyLoadError` on any successful state transition. |
| For the save timestamp, should it be relative ("2 min ago") or absolute ("Saved at 3:42 pm")? | Affects how the save metadata is stored. Relative requires a refresh interval; absolute is simpler. | Absolute time, no refresh interval needed. |
