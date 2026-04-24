# Deployment

## Vercel

This repository includes a root `vercel.json` configured for the Next.js app in `apps/web`.

Recommended Vercel project settings:

- Framework preset: Next.js
- Install command: `pnpm install --frozen-lockfile=false`
- Build command: `pnpm build`
- Output directory: `apps/web/.next`

The root `vercel.json` mirrors those settings so the project can deploy from the monorepo root.

## Environment Variables

No required runtime environment variables exist for the current local-first MVP scaffold.

Future Supabase integration should add:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## PWA and Offline Support

The app includes:

- `apps/web/public/manifest.webmanifest`
- `apps/web/public/sw.js`
- `apps/web/public/offline.html`
- `apps/web/public/icons/icon.svg`

The service worker caches the home, play, help, manifest, icon, and offline fallback pages. The app registers the service worker in production through `PwaRegister`.

## GitHub Actions

The CI workflow runs separate jobs for:

- linting
- unit tests
- Next.js build
- Storybook style guide build
- Playwright e2e tests

Playwright reports and generated screenshots are uploaded as workflow artifacts.
