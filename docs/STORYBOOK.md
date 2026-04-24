# Storybook Style Guide

Fractureline uses Storybook for visual UI documentation.

## Commands

```bash
pnpm storybook
pnpm build-storybook
```

## Current Stories

- `Design System/Style Guide`: Material UI buttons, chips, cards, typography, and choice patterns.

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

- Add isolated SceneRenderer stories with mocked state.
- Add SiteNav story.
- Add choice button variants.
- Add metric card variants.
- Add accessibility notes for typography, contrast, and reduced motion.
