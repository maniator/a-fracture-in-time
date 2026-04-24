# Technical Architecture

## Overview
Fractureline uses a Next.js frontend, a portable narrative engine package, and a shared types package. The product direction is local-first: the game should work offline, store saves locally, and treat server sync as optional future work.

## Frontend
- Next.js App Router
- TypeScript
- Material UI for standard UI primitives
- Tailwind CSS for global utility styling
- Zustand for current game/session state

## Persistence
- MVP: local-first saves using Dexie and IndexedDB.
- Save implementation: `apps/web/lib/persistence/save-service.ts`.
- Legacy migration: old localStorage autosave data is migrated into IndexedDB.
- Future optional sync: a server adapter may mirror local records later, but local IndexedDB remains the offline source of truth.

## Monorepo Design

### apps/web
Contains routes, UI components, Zustand store, gameplay shell, local persistence, PWA registration, and platform integrations.

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
- Platform persistence lives behind services in `apps/web/lib/persistence`.
- Any later server sync should be added behind the same persistence boundary.

## Testing Strategy
- Unit tests for condition/effect resolution.
- Unit tests for Dexie IndexedDB persistence and migration behavior.
- Integration tests for scene progression.
- E2E tests for playthroughs and save/load flows.

## Technical Risks
- Content authoring without validation.
- Effect ordering bugs.
- Scene graph dead ends.
- Save incompatibility after schema changes.
- Browser storage migration mistakes.

## Mitigations
- Schema validation at load time.
- Dead-end detector in narrative engine.
- Versioned save format.
- Fixture-driven test playthroughs.
- Persistence adapter tests and migration tests.
