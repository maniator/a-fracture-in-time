-- Fractureline initial cloud persistence schema.
-- This migration is planned for future Supabase integration and is not required for the current local-first app.

create table if not exists public.profiles (
  id uuid primary key,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saves (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  slot_name text not null default 'autosave',
  save_version integer not null default 1,
  state_json jsonb not null,
  current_scene_id text not null,
  chapter integer not null,
  ending_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists saves_user_id_updated_at_idx on public.saves(user_id, updated_at desc);
create index if not exists saves_current_scene_id_idx on public.saves(current_scene_id);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  session_id text not null,
  event_name text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_session_id_idx on public.analytics_events(session_id);
create index if not exists analytics_events_event_name_created_at_idx on public.analytics_events(event_name, created_at desc);

alter table public.profiles enable row level security;
alter table public.saves enable row level security;
alter table public.analytics_events enable row level security;

-- RLS policies should be finalized when Supabase Auth is wired into the app.
-- Planned direction:
-- - profiles: users may read/update their own profile.
-- - saves: users may manage their own saves.
-- - analytics_events: authenticated users may insert their own events, service role may read aggregate analytics.
