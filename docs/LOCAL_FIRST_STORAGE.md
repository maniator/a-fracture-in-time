# Local-First Storage Plan

## Direction

Fractureline should support local play and local saves first. The game is an installable PWA, so a player should be able to install it, go offline, play, save, and resume without an account or server dependency.

## Current Implementation

The current save path uses Dexie and IndexedDB through `apps/web/lib/persistence/save-service.ts`.

The Zustand game store calls the save service. It does not need to know whether the data comes from IndexedDB, a migration layer, or a later sync adapter.

## Current Local Database

IndexedDB database name: `fractureline-local`

Current table:

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

Current slot:

```ts
id: 'autosave'
slotName: 'Autosave'
```

## Legacy Migration

The save service migrates the old localStorage key `fractureline:save:v1` into IndexedDB when no IndexedDB autosave exists. After a successful migration, the legacy key is removed.

## Testing

`apps/web/lib/persistence/save-service.test.ts` uses `fake-indexeddb` and covers:

- write/read from IndexedDB
- migration from legacy localStorage
- malformed legacy localStorage data
- clearing IndexedDB and legacy localStorage

Playwright covers the user-facing save/load flow on `/play`.

## Cloud Sync Position

A server backend is optional future work. Local-first IndexedDB storage matches the PWA requirement, works offline, and lets players save without an account.

Supabase may still be useful later for optional cloud sync, cross-device saves, auth, analytics, or backups. It should be added as an adapter behind the local persistence boundary.

## Next Storage Steps

- Add multiple save slots.
- Add save metadata UI, including timestamp and current chapter.
- Add storage migration tests whenever the save schema changes.
- Add import/export of local save files.
- Consider optional cloud sync after the local save model is stable.
