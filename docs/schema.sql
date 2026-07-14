-- docs/schema.sql
-- Documents the LIVE Phase 2 Supabase schema for this project. This is a
-- reference of what is already applied — table/column names, RLS, grants,
-- and trigger names are exact; the trigger function bodies below are a
-- best-effort reconstruction of the deployed behavior, not the literal
-- source (re-verify in the Supabase SQL editor before re-running anywhere).

-- 1) Profiles: one row per user, holds public game state.
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'QA Tester',
  points       integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 2) Lesson progress: one row per completed section (data/lessons.ts Section.id).
--    Un-completing a section deletes the row rather than flipping a flag.
create table if not exists public.lesson_progress (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  section_id   text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, section_id)
);

-- 3) Challenge submissions: one row per SOLVED challenge (data/challenges.ts
--    Challenge.id). points_earned is written by the server (app/api/submit/route.ts),
--    never by the client. The unique constraint is what prevents double-awarding.
create table if not exists public.challenge_submissions (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  challenge_id   text not null,
  points_earned  integer not null default 0,
  solved_at      timestamptz not null default now(),
  unique (user_id, challenge_id)
);

-- 4) Leaderboard view: global ranking by points.
create or replace view public.leaderboard as
  select
    rank() over (order by points desc) as rank,
    id,
    display_name,
    points
  from public.profiles
  order by points desc;

-- ---------- Row Level Security ----------
alter table public.profiles              enable row level security;
alter table public.lesson_progress       enable row level security;
alter table public.challenge_submissions enable row level security;

create policy "profiles are readable by everyone"
  on public.profiles for select using (true);
create policy "user updates own profile"
  on public.profiles for update using (auth.uid() = id);
create policy "user inserts own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "user reads own lesson progress"
  on public.lesson_progress for select using (auth.uid() = user_id);
create policy "user inserts own lesson progress"
  on public.lesson_progress for insert with check (auth.uid() = user_id);
create policy "user deletes own lesson progress"
  on public.lesson_progress for delete using (auth.uid() = user_id);

create policy "user reads own submissions"
  on public.challenge_submissions for select using (auth.uid() = user_id);
create policy "user inserts own submissions"
  on public.challenge_submissions for insert with check (auth.uid() = user_id);

-- ---------- Grants ----------
-- RLS only restricts rows; PostgREST also requires table-level GRANTs for
-- the anon/authenticated roles, or every request 42501s ("permission denied")
-- before RLS is even evaluated.
grant usage on schema public to anon, authenticated;
grant select, insert, update on public.profiles              to authenticated;
grant select, insert, delete on public.lesson_progress        to authenticated;
grant select, insert         on public.challenge_submissions  to authenticated;
grant select                 on public.leaderboard            to authenticated;

-- ---------- Triggers ----------
-- on_auth_user_created (auth.users AFTER INSERT) -> handle_new_user():
--   creates the profiles row for a new signup, reading display_name from
--   the signUp() call's `options.data.display_name` (falls back to 'QA Tester').
--
-- on_submission_created (challenge_submissions AFTER INSERT) -> add_points_on_submission():
--   adds NEW.points_earned onto profiles.points for NEW.user_id.
--   This is the ONLY place profiles.points changes — the app never issues
--   an UPDATE on profiles.points directly.

-- ---------- Known limitation ----------
-- The insert policy on challenge_submissions only checks auth.uid() =
-- user_id; it does not itself validate points_earned against a source of
-- truth. In practice the app only ever inserts through app/api/submit/route.ts,
-- which recomputes points_earned server-side from data/challenges.ts and
-- ignores any point value the client might send. A user could still bypass
-- the UI and call PostgREST directly with a forged points_earned. Closing
-- that fully needs either a service-role-only insert path or a DB-side
-- check (e.g. a lookup table + CHECK/trigger validation) — out of scope for
-- the MVP.
