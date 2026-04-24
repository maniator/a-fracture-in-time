# End-to-End Testing Strategy

## Tooling
Fractureline uses Playwright for browser-level validation of the deployed user experience.

## Current Coverage
- Home page loads and links into the game.
- Play page renders Chapter 1 and advances from Protector to Dissenter.
- Help page documents gameplay, offline play, and testing strategy.
- PWA manifest and service worker are reachable.
- Screenshot capture tests save home, play, and help screenshots under `apps/web/test-results/screenshots`.

## Commands

```bash
pnpm --filter web test:e2e
pnpm --filter web test:e2e:update
```

## CI Behavior
The GitHub Actions workflow installs Playwright Chromium, runs the e2e suite after build, and uploads the Playwright report plus generated screenshots as workflow artifacts.

## Future E2E Expansion
- Save/load persistence once local save slots are implemented.
- Full Chapter 1 completion path.
- Keyboard-only navigation.
- Reduced-motion behavior.
- Offline fallback behavior using service worker context.
- Mobile installability checks with Lighthouse or browser protocol assertions.

## Screenshot Workflow
Checked-in SVG screenshots in `docs/screenshots` document the intended first-pass UI. Generated Playwright screenshots are uploaded as CI artifacts and can later replace the placeholders once the visual design stabilizes.
