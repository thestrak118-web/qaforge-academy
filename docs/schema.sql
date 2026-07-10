-- docs/schema.sql
-- Apply this in Supabase (SQL Editor) during Phase 2.
-- Uses Supabase auth.users as the identity source.

-- 1) Profiles: one row per user, holds public game state.
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique not null,
  country     text default 'UZ',
  university  text,
  company     text,
  points      integer not null default 0,
  created_at  timestamptz not null default now()
);

-- 2) Submissions: every attempt (we award points on first correct solve only).
create table if not exists public.submissions (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references public.profiles(id) on delete cascade,
  challenge_id   text not null,          -- matches Challenge.id in data/challenges.ts
  correct        boolean not null,
  points_awarded integer not null default 0,
  answer         jsonb,                  -- selected option ids, etc.
  created_at     timestamptz not null default now()
);

-- Prevent double-awarding: at most one correct solve per (user, challenge).
create unique index if not exists uniq_solved
  on public.submissions (user_id, challenge_id)
  where correct = true;

-- 3) Leaderboard is just an ordered query on profiles.points.
--    Example (used by the leaderboard page):
--    select username, country, university, company, points
--    from public.profiles order by points desc limit 100;

-- ---------- Row Level Security ----------
alter table public.profiles    enable row level security;
alter table public.submissions enable row level security;

-- Anyone can read profiles (leaderboard is public).
create policy "profiles are readable by everyone"
  on public.profiles for select using (true);

-- A user can update only their own profile.
create policy "user updates own profile"
  on public.profiles for update using (auth.uid() = id);

-- A user can insert their own profile row (on first login).
create policy "user inserts own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- A user can read and insert only their own submissions.
create policy "user reads own submissions"
  on public.submissions for select using (auth.uid() = user_id);
create policy "user inserts own submissions"
  on public.submissions for insert with check (auth.uid() = user_id);

-- NOTE: Point awarding + profiles.points update should happen SERVER-SIDE
-- (in app/api/submit/route.ts using the service role key), NOT from the client,
-- so users cannot fake points. Validate the answer against groundTruth on the
-- server before writing points.
