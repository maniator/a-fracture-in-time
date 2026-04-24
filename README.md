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
- Vitest
- Playwright
- Storybook
- Vercel
- PWA install and offline shell

## Repository Structure

```text
apps/web                      Next.js app
packages/shared-types         Shared contracts
packages/narrative-engine     Pure branching logic
.bmad-core                    BMAD agents and workflow files
docs                          Product, architecture, QA, deployment, and planning docs
supabase                      Future Supabase docs and migrations
.github/workflows             CI jobs
```

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm test:e2e
pnpm storybook
pnpm build-storybook
```

## Web App

The app currently includes:

- `/` landing page
- `/play` playable Chapter 1 vertical slice
- `/help` gameplay, PWA, and testing help page
- Material UI theme provider
- installable PWA manifest
- service worker
- offline fallback page

## BMAD Method

BMAD files are included in two places:

- `.bmad-core/agents`: individual agent definitions
- `.bmad-core/workflows`: launch workflow and handoff order
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

## Testing

Unit tests live in package-level test files, especially `packages/narrative-engine/src/index.test.ts`.

End-to-end tests live in `apps/web/tests/e2e` and cover:

- home page navigation
- play flow from Protector to Dissenter
- help page content
- PWA manifest and service worker availability
- screenshot capture for documentation

## GitHub Workflows

`.github/workflows/ci.yml` contains separate jobs for:

- linting
- unit tests
- Next.js build
- Storybook style guide build
- Playwright e2e tests

The workflow uploads Playwright reports, generated screenshots, Storybook static output, and Next.js build output as artifacts.

## Vercel Deployment

The repository includes `vercel.json` for monorepo deployment.

Recommended project settings:

- Framework preset: Next.js
- Install command: `pnpm install --frozen-lockfile=false`
- Build command: `pnpm build`
- Output directory: `apps/web/.next`

See `docs/DEPLOYMENT.md` for details.

## PWA / Offline

The app includes:

- `apps/web/public/manifest.webmanifest`
- `apps/web/public/sw.js`
- `apps/web/public/offline.html`
- `apps/web/public/icons/icon.svg`

The service worker caches the app shell in production.

## Storybook

Storybook is configured in `apps/web/.storybook` and includes an initial Material UI style guide story in `apps/web/stories/StyleGuide.stories.tsx`.

See `docs/STORYBOOK.md` for next style-guide tasks.

## Next Steps

See `docs/NEXT_STEPS.md` for the follow-up roadmap. Immediate priorities are CI/Vercel verification, local save/load, expanded Chapter 1 QA coverage, PWA hardening, Storybook expansion, and Supabase planning.
