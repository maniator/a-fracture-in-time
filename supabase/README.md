# Supabase

Supabase is planned for post-foundation persistence and analytics.

## Planned Tables

- profiles
- saves
- analytics_events

## Current State

The current scaffold is local-first and does not require Supabase environment variables.

## Next Step

When persistence moves beyond the local browser, add migrations under `supabase/migrations` and wire the app through service functions in `apps/web/lib`.
