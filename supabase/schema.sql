-- ============================================================================
-- Ch3nOff Research Lab  --  Supabase schema (run in Supabase SQL Editor)
-- Table: public.lab_benches   (shared research stream: experiments / thoughts)
-- ============================================================================

create table if not exists public.lab_benches (
  id          uuid primary key default gen_random_uuid(),
  author      text        not null check (char_length(author) between 1 and 40),
  kind        text        not null default 'THOUGHT'
              check (kind in ('EXPERIMENT','THOUGHT','RESEARCH','PROTOTYPE')),
  status      text        not null default 'HYPOTHESIS'
              check (status in ('HYPOTHESIS','RUNNING','PEER_REVIEW','SETTLED','FAILED')),
  title       text        not null check (char_length(title) between 1 and 160),
  body        text        not null check (char_length(body) between 1 and 8000),
  tags        text[]      not null default '{}',
  reactions   jsonb       not null default '{"replicate":0,"insight":0,"question":0}'::jsonb,
  created_at  timestamptz not null default now()
);

-- Fast chronological feed + filtered feeds (kind/status) in one index pass
create index if not exists lab_benches_created_at_desc
  on public.lab_benches (created_at desc);
create index if not exists lab_benches_kind_status_idx
  on public.lab_benches (kind, status, created_at desc);
create index if not exists lab_benches_tags_gin
  on public.lab_benches using gin (tags);

-- ---------------------------------------------------------------------------
-- Row Level Security: anonymous visitors may read + post their own entries.
-- (Public guestbook model; tighten to auth.uid() ownership later if you add
--  Supabase Auth sign-in.)
-- ---------------------------------------------------------------------------
alter table public.lab_benches enable row level security;

drop policy if exists "lab_read_all" on public.lab_benches;
create policy "lab_read_all" on public.lab_benches
  for select using (true);

drop policy if exists "lab_insert_anon" on public.lab_benches;
create policy "lab_insert_anon" on public.lab_benches
  for insert with check (char_length(author) between 1 and 40);

drop policy if exists "lab_react_any" on public.lab_benches;
create policy "lab_react_any" on public.lab_benches
  for update using (true) with check (reactions is not null);

-- ---------------------------------------------------------------------------
-- Reaction counter bump (atomic, avoids read-modify-write races):
--   select bump_reaction('<uuid>', 'replicate');
-- ---------------------------------------------------------------------------
create or replace function public.bump_reaction(
  bench_id uuid,
  which    text
) returns void
language sql security definer set search_path = public as $$
  update lab_benches
     set reactions = jsonb_set(
           reactions,
           array[which],
           to_jsonb(coalesce((reactions->>which)::int, 0) + 1)
         )
   where id = bench_id
     and which in ('replicate','insight','question');
$$;

-- Optional realtime feed (enable in Dashboard -> Database -> Publications,
-- or run:):
alter publication supabase_realtime add table public.lab_benches;
