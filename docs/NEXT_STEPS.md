# Next Steps

## Completed Foundation Items

- BMAD docs and agent files are scaffolded.
- Next.js monorepo foundation is in place.
- Material UI theme and Storybook style guide are configured.
- Component stories now cover the style guide, SiteNav, and SceneRenderer.
- PWA manifest, icon, and offline fallback are present.
- PWA service-worker generation uses `@ducanh2912/next-pwa` and Workbox instead of a handwritten worker.
- The app registers the generated service worker with `workbox-window` and includes an update-ready prompt.
- Local-first save/load is available in the play UI and routed through a save-service boundary.
- Unit tests cover the narrative engine, Chapter 1 gameplay graph, and local save service.
- Playwright e2e tests cover home navigation, gameplay progression, save/load, Chapter 1 completion, help, static PWA assets, and screenshots.
- GitHub Actions jobs are split across lint, unit tests, app build, Storybook build, and Playwright e2e.
- `pnpm-lock.yaml` is committed and CI/Vercel use frozen-lockfile installs.
- Supabase planning includes an initial cloud persistence migration and schema documentation.

## Immediate Follow-Up Tasks

### 1. Verify CI and Vercel build
- Confirm lint, unit tests, app build, Storybook build, and Playwright e2e pass in GitHub Actions.
- Confirm Vercel detects the Next.js app from the monorepo and deploys `apps/web`.
- If Vercel requires project-level overrides, set the project root to `apps/web` or keep root with the included `vercel.json`.

### 2. Validate production PWA behavior
- Confirm generated `sw.js` and `workbox-*.js` exist after `pnpm build`.
- Confirm installability and offline fallback on a Vercel preview URL.
- Consider Lighthouse PWA audit in CI once deployment URL exists.

### 3. Grow Storybook style guide
- Add mocked state variants for SceneRenderer, including codex unlocked, chapter complete, and error states.
- Extract and add isolated stories for choice buttons and metric cards if those components become reusable.
- Add accessibility docs for color, typography, mobile spacing, and reduced-motion behavior.

### 4. Expand narrative coverage
- Add alternate branch path tests through Chapter 1.
- Add deterministic continuation tests for Chapter 3 -> Chapter 4 consequence routing.
- Add merge-hub tests for future chapters to ensure braided narrative recombination remains reachable.
- Add codex review for unlock pacing and wording across Chapters 2-4.
- **Duration standard**: all new chapter routes must target **20–30 minutes** (3,000–4,500 words at ~150 WPM). Duration tests enforce the 3,000-word floor and `estimatedMinutes <= 30`; routes over 4,500 words are flagged by QA for manual pacing review (no automated max-word gate).

### 5. Implement branching complexity controls
- Adopt the braided-branch architecture documented in `docs/STORY_ROADMAP.md`.
- Define per-chapter branch budgets before writing new packs (max active branches before merge).
- Require each new irreversible split to include an explicit planned merge point.
- Track shared-scene percentage and consequence-insert coverage as QA metrics.

### 6. Wire Supabase integration
- Add Supabase client dependency and app service adapter when ready to move beyond local-first saves.
- Replace or augment local save service with authenticated cloud saves.
- Add mocked tests for cloud save service behavior.

### 7. Free-form text input
- Design the `freeFormPrompt` scene field and `playerNotes` state key with the Architect before writing any content or UI.
- Add `storePlayerNote` effect type to the narrative engine.
- Build the `FreeFormInput` UI component (text field, character limit, submit, reduced-motion-safe echo).
- Add `playerNotes` to `TimelineState` in `shared-types`, bump save record version, write migration test.
- Add Storybook stories for the new component.
- Add unit tests for the engine effect and persistence; add Playwright test for the save/load round-trip.

## BMAD Agent Routing
- Product Manager: scope, KPIs, and MVP tradeoffs.
- Producer: sequencing and dependency cleanup.
- Architect: save model, package boundaries, deployment constraints.
- Narrative Designer: chapter content and branch notes.
- UI Agent: MUI app surfaces and Storybook.
- Backend Agent: persistence and analytics.
- QA Agent: unit, e2e, PWA, and release gates.
- Growth Agent: onboarding, replay loops, and analytics.
