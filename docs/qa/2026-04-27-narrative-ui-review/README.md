# Fractureline QA Review — 2026-04-27

## Review Date

2026-04-27

---

## Environment Tested

| Item | Value |
|---|---|
| Production URL | https://fractureline.vercel.app/ |
| Production reachable? | ✅ Yes — verified with `curl`, loads correctly |
| Local build used? | ✅ Yes (also, to allow Playwright MCP deep scripted testing) |
| Local build command | `pnpm build` |
| Local start command | `pnpm start` (bound to port 3456 via `PORT=3456 pnpm start`) |
| Local URL tested | `http://127.0.0.1:3456` |
| Node version | 22 |
| Playwright version | 1.59.1 (Chromium) |
| Viewports tested | 1280×800 (desktop), 390×844 (mobile — iPhone 14 Pro simulation) |
| Unit tests | `pnpm test` — 70 tests, all pass |
| E2E tests | Not re-run during this session (production/local already verified) |

---

## Executive Summary

Fractureline is a well-crafted dual-timeline narrative web game that is **functionally stable for Chapters 1–3**. The writing quality is strong, the branching mechanics work correctly, the save/load/restart flow is reliable, and keyboard/mobile accessibility is partially addressed. The app is suitable for limited release or closed beta through Chapter 3.

However, **the game is not launch-ready for a full public release** due to one critical gap: Chapters 4 and 5 are placeholder stubs (3–4 min and ~1 min respectively) against a project standard of 20–30 minutes. Any player who completes the full Chapter 1–3 arc will hit a dramatic content cliff. Secondary gaps include missing social share metadata, no custom 404, and two accessibility findings (skip-to-content, text contrast).

**Launch readiness rating: Needs meaningful fixes** — specifically, Ch4/Ch5 expansion is blocking.

---

## Methodology

This review was conducted using the BMAD multi-agent framework in six sequential passes:

1. **Analyst / Research Agent** — Playwright MCP scripted testing to map the first-time user journey, all reachable routes, and choice branching
2. **PM Agent** — Product gap assessment against MVP criteria and launch checklist
3. **Narrative / Game Design Agent** — Story quality, dual-timeline clarity, choice consequences, character consistency, replay value
4. **UX / UI Agent** — Visual hierarchy, accessibility, mobile, copy, feedback states
5. **QA Agent** — Happy paths, edge cases, rapid clicks, save/load, keyboard nav, mobile tap, invalid routes, refresh, back/forward
6. **Engineering / Architecture Agent** — Source code review across store, persistence, chapter packs, narrative engine, ink files, test coverage

Playwright testing was performed with custom Node.js scripts using the installed Playwright Chromium binary. All major user flows were scripted and exercised including random/exploratory clicking.

---

## User Journey Map

```
Home (/)
  ↓ "Start Chapter 1" or "Play" nav link
Play (/play)
  ├── [First visit] GameBriefing card
  │     "You are entering Ayker." + character intros
  │     ↓ "Enter the first fracture" or "Dismiss"
  └── SceneRenderer
        Chips: Chapter N | Past/Future | Save status | isChoosing indicator
        Save controls: Save progress | Load progress | Restart chapter
        ↓
        Scene header: Speaker name (H1)
        ↓
        Scene paragraphs (narrative prose)
        ↓
        Choice buttons (2–3 options per scene)
        ↓
        Timeline Signals panel (Order / Truth / Disruption)
        ↓ [after chapter complete]
        "Chapter N complete." alert + "Continue to Chapter N+1" or "Replay"

Help (/help)
  6 informational cards + tips
  No "back to game" link (Finding 010)

Invalid routes → bare Next.js 404 (Finding 003)
```

**Chapter 1 paths confirmed working:**
- Signal Path: Admit → Study → Answer → Start carefully → Ask Zelda → Bring Yve → Tell Ari → End
- Family Path: Joke → Tell Yve → Answer Zelda → Tell Xav truth → Ask what event → Open notebook → End
- History Path: Admit → Ask why Diderram → Answer Zelda → Tell Xav truth → Ask what event → Let Ari help → End

**Timeline signal tracking confirmed:** ORDER rises on institutional/stability choices, DISRUPTION rises on resistance choices, TRUTH rises when Zelda's history is accepted.

---

## Narrative Review Summary

**Strengths:**
- Opening hook is excellent: a broken comm receiving signals from the ruins of a city the player can currently see thriving is elegant and compelling
- The Xav/Yve/Zelda triangle has clear voice differentiation (Xav: cautious interiority, Yve: systemic, Zelda: survivor deadpan)
- Three distinct Ch1 endings (Signal, Family, History) each feel earned and have meaningfully different tones
- Timeline signals ("not scores, but directions") is a thoughtful framing that reduces gamification pressure
- Chapters 2 and 3 maintain narrative depth and character consistency

**Gaps:**
- Chapters 4 and 5 are dramatically underwritten — see Finding 001 (Critical)
- No visual distinction between past and future POV scenes beyond a chip label — see Finding 010 Item B
- The world-briefing card is excellent but permanently dismissed — see Finding 005
- The "Protector vs Changer" framing from earlier STORY_BIBLE versions is not explicit in the current narrative; players derive it implicitly through signals

---

## UI/UX Review Summary

**Strengths:**
- Dark atmospheric visual design is consistent and appropriate for the genre
- Georgia serif typography reinforces the archival/historical tone
- MUI component library used consistently throughout
- Save/Load/Restart flow is intuitive and well-guarded (restart confirmation dialog)
- Mobile layout is clean with no horizontal overflow
- Ambience control is well-positioned and unobtrusive
- Loading state ("Preparing the opening chapter...") is clear

**Gaps:**
- No skip-to-content link (WCAG 2.4.1, Level A) — see Finding 009
- Scene text at 72% opacity may fail WCAG AAA — see Finding 006
- No visual POV differentiation — see Finding 010 Item B
- Help page dead-end (no back link) — see Finding 010 Item D
- Custom 404 missing — see Finding 003
- No save Snackbar feedback — see Finding 010 Item C

---

## Product Gaps

| Gap | Severity | Finding |
|---|---|---|
| Chapters 4/5 are content stubs (3–4 min vs 20–30 min standard) | Critical | 001 |
| No OG/social share metadata | High | 002 |
| No custom 404 page | Medium | 003 |
| No Ch4/Ch5 duration guardrail tests | Medium | 004 |
| Briefing permanently dismissed | Medium | 005 |
| Single autosave slot only (no multiple saves) | Not a finding — acceptable for MVP | — |
| No account system / cloud save | Not a finding — appropriate deferral | — |
| No chapter progress indicator | Not a finding — design choice | — |

---

## Engineering Findings Summary

**Architecture strengths:**
- Clean Zustand store with clear action boundaries
- IndexedDB persistence (Dexie) with localStorage legacy migration
- Ink-based narrative engine abstracted behind `narrative-engine` package
- Chapter pack lazy-loading with CacheStorage offline support
- Duration guardrail tests for Ch2/Ch3 — good process
- `isChoosing` flag prevents double-choice application
- Inline error alerts for story load failures with retry actions
- All 70 unit tests pass; narrative engine at 100% coverage

**Risks:**
- `activeStory` is a module-level variable outside React/Zustand — acceptable for SPA but could cause issues in edge cases (see note in `game-store.ts` comments)
- Chapters 4/5 missing duration tests — Finding 004
- Ink source files publicly readable — Finding 008
- PWA SVG-only icon — Finding 007
- No per-page titles — Finding 010

---

## QA Findings Index

| # | Title | Severity | Finding | Prompt |
|---|---|---|---|---|
| 001 | Chapters 4 and 5 are content stubs | Critical | [001](findings/001-chapters-4-5-content-stubs.md) | [001](next-step-prompts/001-expand-chapters-4-5-content.md) |
| 002 | No OG/social share metadata | High | [002](findings/002-no-og-social-meta.md) | [002](next-step-prompts/002-add-og-social-meta.md) |
| 003 | No custom 404 page | Medium | [003](findings/003-missing-custom-404.md) | [003](next-step-prompts/003-custom-404-page.md) |
| 004 | No Ch4/Ch5 duration guardrail tests | Medium | [004](findings/004-no-ch4-ch5-duration-tests.md) | [004](next-step-prompts/004-ch4-ch5-duration-tests.md) |
| 005 | Briefing permanently dismissed with no re-access | Medium | [005](findings/005-briefing-no-re-access.md) | [005](next-step-prompts/005-briefing-re-access.md) |
| 006 | Scene text 72% opacity may fail WCAG AAA | Medium | [006](findings/006-scene-text-contrast-opacity.md) | [006](next-step-prompts/006-text-contrast-opacity.md) |
| 007 | PWA icon is SVG-only, no PNG fallback | Medium | [007](findings/007-pwa-no-png-icons.md) | [007](next-step-prompts/007-pwa-png-icons.md) |
| 008 | Chapter ink files publicly readable (spoilers) | Medium | [008](findings/008-ink-files-public-spoilers.md) | [008](next-step-prompts/008-ink-files-spoiler-risk.md) |
| 009 | No skip-to-content link (WCAG 2.4.1) | Medium | [009](findings/009-no-skip-to-content.md) | [009](next-step-prompts/009-skip-to-content.md) |
| 010 | Polish group: titles, POV cues, save feedback, help link | Low | [010](findings/010-polish-group.md) | [010](next-step-prompts/010-polish-improvements.md) |

---

## Launch Readiness Rating

### **Needs Meaningful Fixes**

The app is functionally solid for Chapters 1–3 and could support a limited/closed beta at that scope. For a full public launch (Chapters 1–5):

- **Blocking:** Finding 001 (Ch4/Ch5 content) must be resolved
- **Strongly recommended before launch:** Findings 002 (OG meta), 009 (skip-to-content), 006 (contrast), 003 (custom 404)
- **Deferrable post-launch:** Findings 005, 007, 008, 010

---

## Top 10 Recommended Fixes

1. **Expand Ch4/Ch5 content to 20-minute standard** (Finding 001 — Critical — Narrative Designer)
2. **Add duration guardrail tests for Ch4/Ch5** (Finding 004 — Medium — QA) ← do this first; tests before content
3. **Add OG/Twitter Card social share metadata** (Finding 002 — High — UI)
4. **Add skip-to-content link for keyboard access** (Finding 009 — Medium — UI, WCAG 2.4.1)
5. **Create custom 404 page** (Finding 003 — Medium — UI)
6. **Raise scene text contrast** (Finding 006 — Medium — UI)
7. **Allow briefing re-access from play page** (Finding 005 — Medium — UI)
8. **Add PNG icons to PWA manifest** (Finding 007 — Medium — Engineering)
9. **Document or mitigate publicly readable ink files** (Finding 008 — Medium — Engineering)
10. **Polish pass: titles, POV border, save Snackbar, help back link** (Finding 010 — Low — UI)

---

## Recommended GitHub Issues

| Title | Labels | Priority |
|---|---|---|
| `narrative: expand Chapter 4 and Chapter 5 ink packs to 20-minute standard` | narrative, content, critical | P0 |
| `test: add duration guardrail tests for Chapter 4 and Chapter 5 packs` | testing, ci, medium | P0 |
| `seo: add Open Graph and Twitter Card metadata for social sharing` | seo, marketing, high | P1 |
| `a11y: add skip-to-content link (WCAG 2.4.1)` | accessibility, wcag, medium | P1 |
| `ux: add custom 404 not-found page with navigation` | ux, ui, medium | P1 |
| `a11y: raise scene text contrast to WCAG AAA` | accessibility, medium | P2 |
| `ux: allow players to re-access world briefing after dismissing` | ux, onboarding, medium | P2 |
| `pwa: add 192px and 512px PNG icons to manifest` | pwa, mobile, medium | P2 |
| `engineering: document or mitigate chapter pack ink file spoiler risk` | engineering, architecture, medium | P2 |
| `polish: per-page titles, POV border cue, save snackbar, help back link` | polish, low | P3 |

---

## Suggested Next BMAD Workflow

```
Phase 1 (QA + Engineering — immediate):
  → Prompt 004: Add Ch4/Ch5 duration guardrail tests
  → This ensures content expansion in Phase 2 is test-driven

Phase 2 (Narrative Designer — highest impact):
  → Prompt 001: Expand Ch4/Ch5 content to 20-minute standard
  → Architect review of new ink variable usage before authoring

Phase 3 (UI — quick wins):
  → Prompt 002: OG/social meta
  → Prompt 003: Custom 404
  → Prompt 009: Skip-to-content
  → Prompt 006: Text contrast

Phase 4 (UI — medium effort):
  → Prompt 005: Briefing re-access
  → Prompt 010: Polish group

Phase 5 (Engineering):
  → Prompt 007: PWA PNG icons
  → Prompt 008: Ink file documentation or mitigation

Phase 6 (Producer):
  → Acceptance review after Phase 1–5
  → Update chapter estimatedMinutes in manifest
  → QA sign-off on all acceptance criteria
  → Deploy and validate on production URL
```

---

## QA Tests Run During This Review

- ✅ Production URL reachable: `https://fractureline.vercel.app/` — loads correctly
- ✅ Local production build: `pnpm build && PORT=3456 pnpm start`
- ✅ Playwright scripted tests: all flows below
- ✅ Unit tests: `pnpm test` — 70 tests pass

**Playwright flows tested:**
- Home page load and character card display
- Home → Play navigation via "Start Chapter 1" link
- Chapter 1 initial load (briefing card, scene render)
- Path A: Admit → Study → Answer → Start carefully → (5 choice levels explored)
- Path B: Joke → Tell Yve → Answer Zelda → (3 levels explored)
- Signal Path complete end-to-end (8 choices to Chapter 1 completion)
- Family Path complete (7 choices)
- History Path complete (7 choices)
- Save progress → Restart → Confirm → Load progress (round-trip verified)
- Browser back/forward navigation
- Page refresh mid-game (state preserved via IndexedDB)
- Invalid route (404 page)
- Mobile viewport 390×844 — full play flow, ambience, timeline signals
- Keyboard navigation (Tab through nav → save controls → choices)
- Enter key activation of narrative choices
- Rapid click / double-click protection (isChoosing guard verified)
- Volume control expand/collapse
- Mute/unmute button
- Help page load and content check
- PWA manifest, offline.html, ink file HTTP status checks

---

## Screenshots Captured

All screenshots saved to `screenshots/`:

| File | Content |
|---|---|
| `01-home.png` | Homepage |
| `02-play.png` | Play page with briefing |
| `03-after-choice1.png` | After first choice |
| `04-after-choice2.png` | After second choice |
| `05-after-choice3.png` | After third choice (Zelda appears) |
| `06-after-refresh.png` | After page refresh |
| `07-browser-back.png` | After browser back |
| `08-browser-forward.png` | After browser forward |
| `09-not-found.png` | Default 404 page |
| `10-help.png` | Help page |
| `11-mobile-home.png` | Mobile home |
| `12-mobile-play.png` | Mobile play |
| `pathA-01-admit.png` through `pathA-05-fifth.png` | Signal path progression |
| `pathB-01-joke.png`, `pathB-02-second.png` | Family path start |
| `after-load-confirmed.png` | After load progress |
| `after-restart-confirmed.png` | After restart confirmation |
| `restart-dialog.png` | Restart confirmation dialog |
| `keyboard-nav.png` | Keyboard navigation state |
| `mobile-play-detail.png` | Mobile play detail |
| `random-02-signal-path-end.png` | Signal path chapter end |
| `random-03-volume-expanded.png` | Volume control expanded |
| `random-05-mobile-initial.png` | Mobile initial state |
| `random-06-mobile-after-choice.png` | Mobile after choice |
| `random-07-mobile-timeline-signals.png` | Mobile timeline signals |

---

## Limitations

- Audio/ambience testing was structural only (Web Audio API cannot be heard in headless Playwright); visual/structural controls verified
- Cross-browser testing was Chromium only (Firefox and Safari not tested in this session)
- No accessibility scanner (axe-core) run; contrast calculations done manually
- Production deployment not re-tested end-to-end (verified reachable; local build used for deep scripting)
- Chapter 4/5 continuation flows not played through end-to-end (Playwright confirmed ch4/ch5 ink files exist and load; word count measured directly)
