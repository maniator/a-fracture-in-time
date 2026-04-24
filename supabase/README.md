# Supabase

Supabase is planned for cloud persistence and analytics after the local-first MVP foundation is stable.

## Planned Tables

- `profiles`: optional user profile metadata
- `saves`: versioned saved-game payloads
- `analytics_events`: gameplay and funnel telemetry

## Current State

The current scaffold is local-first and does not require Supabase environment variables.

## Planned Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Migration Plan

The first migration lives at `supabase/migrations/0001_initial_cloud_persistence.sql`. It defines the expected schema for profiles, saves, and analytics events, including row-level security placeholders.

## App Boundary

Cloud persistence should be wired through service functions in `apps/web/lib/persistence`. The narrative engine should remain framework-agnostic and must not import Supabase directly.
