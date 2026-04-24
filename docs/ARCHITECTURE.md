# Technical Architecture

## Overview
Fractureline uses a Next.js frontend, a portable narrative engine package, and a shared types package. Supabase is planned for persistence and analytics after the local-first MVP foundation is stable.

## Frontend
- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand for local game/session state

## Backend
- MVP: local-first saves using browser storage
- Future: Supabase Auth, Postgres saves, analytics events, and storage for content artifacts

## Monorepo Design

### apps/web
Contains routes, UI components, Zustand store, gameplay shell, and platform integrations.

### packages/narrative-engine
Contains scene graph types, condition evaluator, effect applier, next-scene resolver, and serializer helpers. This package must remain framework-agnostic.

### packages/shared-types
Contains save payload types, analytics event types, and shared API contracts.

## Core Game State

```ts
type TimelineState = {
  stability: number;
  controlIndex: number;
  rebellion: number;
  memoryFracture: number;
  magicEntropy: number;
  flags: Record<string, boolean>;
  seenScenes: string[];
  chapter: number;
  currentSceneId: string;
  currentPOV: 'protector' | 'dissenter';
};
```

## Narrative Schema

```ts
type Scene = {
  id: string;
  chapter: number;
  pov: 'protector' | 'dissenter';
  speaker?: string;
  text: string[];
  choices: Choice[];
  conditions?: Condition[];
  onEnterEffects?: Effect[];
  nextSceneId?: string;
  tags?: string[];
};
```

## State Boundaries
- Zustand handles current client session state.
- `narrative-engine` performs pure logic only.
- Platform persistence lives behind services in `apps/web/lib`.

## Testing Strategy
- Unit tests for condition/effect resolution
- Integration tests for scene progression
- E2E tests for playthroughs and save/load flows

## Technical Risks
- Content authoring without validation
- Effect ordering bugs
- Scene graph dead ends
- Save incompatibility after schema changes

## Mitigations
- Schema validation at load time
- Dead-end detector in narrative engine
- Versioned save format
- Fixture-driven test playthroughs
