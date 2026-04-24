# Next Steps

## Completed Foundation Items

- BMAD docs and agent files are scaffolded.
- Next.js monorepo foundation is in place.
- Material UI theme and Storybook style guide are configured.
- PWA manifest, service worker, icon, and offline fallback are present.
- Local-first save/load is available in the play UI.
- Unit tests cover the narrative engine and Chapter 1 gameplay graph.
- Playwright e2e tests cover home navigation, gameplay progression, save/load, Chapter 1 completion, help, PWA assets, and screenshots.
- GitHub Actions jobs are split across lint, unit tests, app build, Storybook build, and Playwright e2e.
- `pnpm-lock.yaml` is committed and CI/Vercel use frozen-lockfile installs.

## Immediate Follow-Up Tasks

### 1. Verify CI and Vercel build
- Confirm lint, unit tests, app build, Storybook build, and Playwright e2e pass in GitHub Actions.
- Confirm Vercel detects the Next.js app from the monorepo and deploys `apps/web`.
- If Vercel requires project-level overrides, set the project root to `apps/web` or keep root with the included `vercel.json`.

### 2. Harden PWA behavior
- Add service worker update messaging.
- Add offline Playwright test coverage.
- Consider Lighthouse PWA audit in CI once deployment URL exists.

### 3. Grow Storybook style guide
- Add isolated stories for SceneRenderer, SiteNav, game metric cards, and choice buttons.
- Add accessibility docs for color, typography, mobile spacing, and reduced-motion behavior.

### 4. Expand narrative coverage
- Add alternate branch path tests through Chapter 1.
- Add Chapter 2 outline and scene graph.
- Add codex review for unlock pacing and wording.

### 5. Prepare Supabase integration
- Define save table migration.
- Add environment variable docs.
- Add backend service boundary and mocked tests.

## BMAD Agent Routing
- Product Manager: scope, KPIs, and MVP tradeoffs.
- Producer: sequencing and dependency cleanup.
- Architect: save model, package boundaries, deployment constraints.
- Narrative Designer: chapter content and branch notes.
- UI Agent: MUI app surfaces and Storybook.
- Backend Agent: persistence and analytics.
- QA Agent: unit, e2e, PWA, and release gates.
- Growth Agent: onboarding, replay loops, and analytics.
