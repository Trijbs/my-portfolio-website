-- Run this in the Supabase SQL Editor before enabling persistent analytics storage.
-- The Vercel function uses the service role key, so no public read/write policy is created here.

create table if not exists public.analytics_events (
    id text primary key,
    event_type text not null,
    path text,
    user_id text,
    session_id text,
    timestamp bigint not null,
    server_timestamp bigint not null,
    ip text,
    payload jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default timezone('utc', now())
);

create index if not exists analytics_events_timestamp_idx
    on public.analytics_events (timestamp desc);

create index if not exists analytics_events_event_type_idx
    on public.analytics_events (event_type);

create index if not exists analytics_events_path_idx
    on public.analytics_events (path);

alter table public.analytics_events enable row level security;
