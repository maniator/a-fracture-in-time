# Fractureline

A dual-perspective text-based narrative web game where choices in the present and future rewrite each other.

## Screenshots

### Home

![Home page](docs/screenshots/home.svg)

### Play

![Play page](docs/screenshots/play.svg)

### Help

![Help page](docs/screenshots/help.svg)

Playwright also captures generated screenshots during CI and uploads them as the `app-screenshots` artifact.

## Stack

- Next.js App Router
- TypeScript
- Material UI
- Tailwind CSS for global utility styling
- Zustand
- Dexie and IndexedDB for local-first saves
- Vitest
- Playwright
- Storybook
- Vercel
- PWA install and offline shell powered by `@ducanh2912/next-pwa` and Workbox

## Repository Structure

```text
apps/web                      Next.js app
packages/shared-types         Shared contracts
packages/narrative-engine     Pure branching logic
.bmad-core                    BMAD agents and workflow files
docs                          Product, architecture, QA, deployment, and planning docs
supabase                      Optional future cloud-sync planning docs and migrations
.github/workflows             CI jobs
```

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm test:coverage
pnpm test:e2e
pnpm codex:bootstrap
pnpm storybook
pnpm build-storybook
```

## Web App

The app currently includes:

- `/` landing page
- `/play` playable Chapter 1 plus unlocked Chapter 2 and Chapter 3 continuation based on ending path
- `/help` gameplay, PWA, and testing help page
- Material UI theme provider
- installable PWA manifest
- generated Workbox service worker in production builds
- offline fallback page

Chapter 2 route packs currently included:

- `The Stable Signal` (`signal-path`)
- `The Firstborn Record` (`family-path`)
- `The Second Future` (`history-path`)

Each Chapter 2 route now targets a 20+ minute reading baseline (minimum 3,000 words at ~150 WPM), with manifest estimates set to 22 minutes per route.

Chapter 3 foundation route packs currently included:

- `The Relay Accord` (`signal-path`)
- `The Witness Ledger` (`family-path`)
- `The Public Memory Trial` (`history-path`)

Chapter 4 consequence packs now branch from Chapter 3 governance outcomes instead of forcing a fixed path:

- `The Relay Covenant` (`relay-legitimacy-path`)
- `The Relay Breach` (`relay-compromised-path`)
- `The Family Guarantee` (`ledger-trust-path`)
- `The Custody Exodus` (`emergency-custody-path`)
- `The Credibility Docket` (`trial-credibility-path`)
- `The Amnesty Faultline` (`amnesty-conflict-path`)

Chapter 5 now begins recombining Chapter 4 outcomes into braided merge hubs:

- `The Cost of Utopia: Governance Reckoning` (from `relay-legitimacy-path` or `relay-compromised-path`)
- `The Cost of Utopia: Lineage Protocol` (from `ledger-trust-path` or `emergency-custody-path`)
- `The Cost of Utopia: Memory Settlement` (from `trial-credibility-path` or `amnesty-conflict-path`)

## Branching Scalability Plan (to avoid exponential path growth)

Fractureline will use a **braided narrative architecture** rather than fully independent trees.

Core rules:

1. **Branch at irreversible decisions, then rejoin at chapter hubs**
   - Chapters can diverge into consequence variants, but major story anchors converge at planned merge scenes.
2. **Carry consequences as state, not duplicated full chapters**
   - Route outcomes are persisted as flags/ending keys and reflected through scene variants, checks, and consequence blocks.
3. **Limit branch fan-out per chapter**
   - Each chapter should introduce at most one primary irreversible split per route and should merge before final chapter handoff when possible.
4. **Use modular scene blocks**
   - Shared scenes remain shared; only high-impact consequence scenes fork.

This keeps player agency meaningful while preventing content complexity from scaling exponentially as chapters increase.

See `docs/NARRATIVE_BRANCHING_STRATEGY.md` for the detailed production/QA model.

## Local-First Saves

Fractureline stores MVP saves locally using Dexie and IndexedDB. Local saves are intended to work offline and without a user account. See `docs/LOCAL_FIRST_STORAGE.md` for the storage plan.

Supabase is kept only as optional future cloud-sync planning. It is not required for MVP play.

## BMAD Method

BMAD files are included in two places:

- `.bmad-core/agents`: individual agent definitions
- `.bmad-core/workflows`: launch workflow and handoff order
- `.bmad-core/modules/nom`: BMAD NOM (Narrative Operations Matrix) review module
- `docs/AGENT_PROMPTS.md`: prompt-facing agent descriptions
- `docs/BMAD_WORKFLOW.md`: broader workflow explanation

Initial agents include:

- Product Manager
- Architect
- Narrative Designer
- UI Agent
- Backend
- QA
- Growth
- Producer

Run the BMAD NOM review pass for Chapters 1-3 with:

```bash
pnpm bmad:nom:review
```

This writes `docs/reviews/CHAPTERS_1_3_AGENT_REVIEW.md` as a durable audit artifact.

## Testing

Unit tests live in package-level test files, including Chapter 2 duration guardrails and cache behavior checks (`apps/web/content/chapter-two-duration.test.ts`, `apps/web/lib/chapter-packs/chapter-pack-cache.test.ts`) plus narrative-engine regression suites (`packages/narrative-engine/src/coverage-regression.test.ts`).

End-to-end tests live in `apps/web/tests/e2e` and cover:

- home page navigation
- play flow from Protector to Dissenter
- IndexedDB save/load behavior
- deterministic Chapter 1 completion
- help page content
- static PWA assets in development
- screenshot capture for documentation

## GitHub Workflows

`.github/workflows/ci.yml` contains separate jobs for:

- linting
- unit tests
- Next.js build
- Storybook style guide build
- Playwright e2e tests

The workflow uploads Playwright reports, generated screenshots, Storybook static output, and Next.js build output as artifacts.

When dependencies change, run the temporary `Refresh pnpm lockfile` workflow before relying on CI or Vercel frozen-lockfile installs.

## Vercel Deployment

The repository includes `vercel.json` for monorepo deployment.

Recommended project settings:

- Framework preset: Next.js
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`

See `docs/DEPLOYMENT.md` for details.

## PWA / Offline

The app uses `@ducanh2912/next-pwa` to generate Workbox service-worker artifacts during production builds. The generated files are ignored because they are build artifacts.

Checked-in PWA assets include:

- `apps/web/public/manifest.webmanifest`
- `apps/web/public/offline.html`
- `apps/web/public/icons/icon.svg`

The app registers the generated service worker with `workbox-window` and shows an update prompt when a new version is waiting.

## Storybook

Storybook is configured in `apps/web/.storybook` and includes Material UI style-guide stories in `apps/web/stories`.

See `docs/STORYBOOK.md` for next style-guide tasks.

## Next Steps

See `docs/NEXT_STEPS.md` for the follow-up roadmap. Immediate priorities are CI/Vercel verification, PWA production validation, Storybook expansion, narrative expansion, and local-first storage hardening.
