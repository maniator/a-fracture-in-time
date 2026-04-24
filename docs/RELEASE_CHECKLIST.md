# Release Checklist

## Product
- Campaign playable start to finish
- Three endings reachable
- Save/load functioning
- Codex/history visible and coherent

## Engineering
- Build passes
- Lint passes
- Unit/integration/e2e suites pass
- No known critical progression blockers
- Save schema version documented

## UX
- Mobile layout verified
- Keyboard navigation works
- Reduced motion option works
- Contrast and readability acceptable

## Narrative
- Chapter intros and endings reviewed
- Contradiction moments intact
- No dead-end scenes
- No broken choice links

## Analytics
- Key gameplay events captured
- Ending events captured
- Chapter funnel measurable

## Deployment
- Vercel project points at `apps/web`
- Root install command uses pnpm
- Build command uses `pnpm build`
- Output is Next.js managed output
- Required environment variables configured
- Production smoke test completed
