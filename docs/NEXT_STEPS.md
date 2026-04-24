# Next Steps

## Immediate Follow-Up Tasks

### 1. Verify CI and Vercel build
- Confirm lint, unit tests, app build, Storybook build, and Playwright e2e pass in GitHub Actions.
- Confirm Vercel detects the Next.js app from the monorepo and deploys `apps/web`.
- If Vercel requires project-level overrides, set the project root to `apps/web` or keep root with the included `vercel.json`.

### 2. Add local save/load
- Add a versioned save payload type.
- Add browser localStorage persistence service.
- Add Continue route and save/reset controls.
- Add Playwright coverage for resume behavior.

### 3. Expand Chapter 1 QA coverage
- Add deterministic e2e path through all 8 scenes.
- Add tests for codex unlocks and variable changes.
- Add validation for chapter completion state.

### 4. Harden PWA behavior
- Add service worker update messaging.
- Add offline Playwright test coverage.
- Consider Lighthouse PWA audit in CI once deployment URL exists.

### 5. Grow Storybook style guide
- Add stories for SceneRenderer, SiteNav, game metric cards, and choice buttons.
- Add accessibility docs for color, typography, mobile spacing, and reduced-motion behavior.

### 6. Prepare Supabase integration
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
