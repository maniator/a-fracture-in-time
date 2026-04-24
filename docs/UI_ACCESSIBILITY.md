# UI Accessibility Guide

## Goals

Fractureline should be readable, keyboard friendly, and comfortable on mobile devices. The game is text forward, so typography, focus states, spacing, and motion settings are important.

## Current Standards

- Use Material UI components for buttons, cards, navigation, alerts, and layout.
- Preserve visible focus states for interactive controls.
- Keep choice buttons reachable by keyboard.
- Keep body copy large enough for long reading sessions.
- Use high contrast foreground and background pairings.
- Avoid relying on color alone to communicate state.
- Keep touch targets comfortably large on mobile.

## Storybook Coverage

Current Storybook surfaces:

- `Design System/Style Guide`
- `Navigation/SiteNav`
- `Game/SceneRenderer`

Future Storybook states should include:

- focused choice button
- unavailable choice
- chapter complete state
- codex unlocked state
- reduced motion text reveal state
- narrow mobile viewport layout

## E2E Coverage Targets

Future Playwright accessibility smoke tests should cover:

- keyboard only Chapter 1 first choice
- visible focus on navigation links and choice buttons
- Help page semantic heading order
- reduced motion preference behavior once animated reveal is implemented
