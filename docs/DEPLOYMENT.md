# Deployment

## Vercel

This repository includes a root `vercel.json` configured for the Next.js app in `apps/web`.

Recommended Vercel project settings:

- Framework preset: Next.js
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`

The root `vercel.json` mirrors those settings so the project can deploy from the monorepo root. The lockfile is committed, so CI and Vercel should use strict frozen-lockfile installs.

## Environment Variables

No required runtime environment variables exist for the current local-first MVP scaffold.

Future Supabase integration should add:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## PWA and Offline Support

The app uses `@ducanh2912/next-pwa` to generate a Workbox-powered service worker during production builds. The app registers the generated worker through `workbox-window` in `PwaRegister` and shows an update-ready prompt when a new version is waiting.

The checked-in PWA assets are:

- `apps/web/public/manifest.webmanifest`
- `apps/web/public/offline.html`
- `apps/web/public/icons/icon.svg`

Generated Workbox files such as `apps/web/public/sw.js` and `apps/web/public/workbox-*.js` are intentionally ignored because they are build artifacts.

## GitHub Actions

The CI workflow runs separate jobs for:

- linting
- unit tests
- Next.js build
- Storybook style guide build
- Playwright e2e tests

Playwright reports and generated screenshots are uploaded as workflow artifacts.
