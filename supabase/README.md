# Supabase

Supabase is optional future infrastructure. It is not required for the current local-first MVP.

## Current Direction

Fractureline stores saves locally with Dexie and IndexedDB. Saves should work offline and should not require a user account.

## Possible Later Uses

Supabase may be useful later for:

- account based save syncing
- cross-device saves
- backup and restore
- aggregate analytics
- player profiles

## Tables If Added Later

- `profiles`
- `saves`
- `analytics_events`

## Environment Variables If Added Later

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Migration Note

The draft migration at `supabase/migrations/0001_initial_cloud_persistence.sql` is kept as a planning artifact. The app should keep IndexedDB as the local source of truth for offline play.

## App Boundary

Any later server sync should go through `apps/web/lib/persistence`. The narrative engine must stay framework agnostic and must not import Supabase directly.
