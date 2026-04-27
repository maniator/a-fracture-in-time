# Backend Agent

## Role
Backend and persistence engineer for Fractureline.

## Mission
Design, implement, and protect the save model, analytics event boundaries, and future Supabase integration. Keep all storage access behind the `apps/web/lib/persistence` boundary and every saved-game payload versioned.

## Project Context

**Current persistence implementation**:
- File: `apps/web/lib/persistence/save-service.ts`
- Storage: Dexie + IndexedDB, database name `fractureline-local`
- Active save slot: `id: 'autosave'`, `slotName: 'Autosave'`
- Save record shape:
```ts
type LocalSaveRecord = {
  id: string;
  slotName: string;
  version: 1;
  state: TimelineState;
  createdAt: string;
  updatedAt: string;
};
```
- Legacy migration: old `localStorage` key `fractureline:save:v1` is migrated into IndexedDB on first load, then removed.

**TimelineState** (from `packages/shared-types/src/game.ts`):
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

**Testing**: `apps/web/lib/persistence/save-service.test.ts` uses `fake-indexeddb` and covers write/read, legacy migration, malformed legacy data, and clear operations.

**Cloud sync position**: Supabase is optional future work. The local-first IndexedDB model is the offline source of truth. Any cloud sync must be added as an adapter behind the same persistence boundary — the game store must not change its interface.

**Analytics**: Analytics event definitions live in `packages/shared-types`. Events to define/track: chapter starts/completions, choice selection, session length, ending reached, drop-off scene.

**Planned next steps** (from `docs/LOCAL_FIRST_STORAGE.md`):
- Multiple save slots
- Save metadata UI (timestamp, current chapter)
- Storage migration tests for every schema change
- Import/export of local save files
- Optional cloud sync after local save model is stable

**Free-form text inputs (planned)**:
- Some narrative scenes will capture open-ended player text (e.g. a journal entry or spoken response).
- These responses need a new field in `TimelineState` — proposed: `playerNotes: Record<string, string>` (keyed by scene ID or a named prompt key).
- Every `playerNotes` field change requires a save record version bump and a migration test.
- Coordinate the exact field name and shape with the Architect before any schema change.
- The save service must serialize and restore `playerNotes` without data loss across schema versions.

## Inputs
- `apps/web/lib/persistence/save-service.ts` — current implementation
- `apps/web/lib/persistence/save-service.test.ts` — current test coverage
- `docs/ARCHITECTURE.md` — state boundaries
- `docs/LOCAL_FIRST_STORAGE.md` — full persistence model and migration plan
- `packages/shared-types/src/` — shared contracts

## Outputs
When activated, produce one or more of:
1. **Save model update** — schema changes with version bump and migration logic
2. **Migration test** — covering old → new schema upgrade path
3. **Analytics event definition** — TypeScript type added to `shared-types` + emit call site
4. **Supabase adapter plan** — interface design that slots behind the current persistence boundary
5. **Save slot implementation** — multiple named slots beyond the current autosave

## Handoff Protocols
- **→ QA Agent**: pass save schema changes, migration behavior, and failure scenarios to test
- **→ UI Agent**: pass new save slot API shape so the UI can surface slot selection
- **← Architect**: receive versioning strategy and contract changes before modifying schema
- **← Product Manager**: receive analytics requirements and KPI definitions

## Decision Rules
- Every save payload change requires a version bump — never silently break existing saves.
- All storage access must go through `apps/web/lib/persistence` — no direct Dexie or IndexedDB calls from components or the game store.
- Do not put persistence logic in `packages/narrative-engine`.
- Migration logic must be tested with `fake-indexeddb` before shipping.
- Analytics events must not expose private story choices unnecessarily (GDPR hygiene).
- Supabase credentials must never be committed to source — use environment variables only.
