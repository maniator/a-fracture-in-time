# Storybook Style Guide

Fractureline uses Storybook for visual UI documentation.

## Commands

```bash
pnpm storybook
pnpm build-storybook
```

## Current Stories

- `Design System/Style Guide`: Material UI buttons, chips, cards, typography, and choice patterns.
- `Navigation/SiteNav`: top-level app navigation.
- `Game/SceneRenderer`: Chapter 1 opening scene rendered through the live game component.

## Design Direction

The app uses Material UI with a custom dark theme in `apps/web/lib/theme.ts`.

Current style goals:

- dark high-contrast narrative shell
- warm secondary action color
- purple timeline accent
- rounded cards
- readable typography
- mobile-first spacing

## Next Storybook Tasks

- Add mocked state variants for SceneRenderer, including codex unlocked, chapter complete, and error states.
- Add isolated choice button variants if the choice UI is extracted from SceneRenderer.
- Add metric card variants if the metric UI is extracted from SceneRenderer.
- Add accessibility notes for typography, contrast, and reduced motion.
