# QAForge — Build Roadmap

Tick items as you finish. Do phases in order. Keep each phase shippable.

## Phase 1 — Challenge Hub (no auth, no db)
- [ ] Scaffold Next.js + TypeScript + Tailwind
- [ ] Global design tokens in `app/globals.css` (dark bg, lime/cyan accent)
- [ ] `lib/types.ts` re-exports Challenge types from `data/challenges.ts`
- [ ] `lib/scoring.ts` — points + rank tiers:
      Trainee(0) → Junior Tester(40) → QA Engineer(100) → Senior QA(190)
      → QA Lead(300) → QA Master(450)
- [ ] Top bar: brand (QAForge), points, current rank (React state for now)
- [ ] `/challenges` — grid of `ChallengeCard`, filters by difficulty + domain
- [ ] `/challenges/[id]` — mission, "Open target ↗" (new tab), task, submit
- [ ] Client-side grading against `groundTruth`/options → verdict + explanations
- [ ] `MentorPanel` — reveal `mentorHints` one level at a time (static, no LLM)
- [ ] Points awarded once per challenge (track solved set in state)
- [ ] Mobile responsive
- [ ] Manual QA pass on all challenges

## Phase 2 — Auth + persistence + leaderboard
- [ ] Supabase project created; keys in `.env.local`
- [ ] Apply `docs/schema.sql`
- [ ] `lib/supabase/client.ts` + `lib/supabase/server.ts`
- [ ] Email magic-link auth (sign in / sign out)
- [ ] On first login: create `profiles` row (pick username)
- [ ] `POST /api/submit` — grade SERVER-SIDE, write `submissions`, bump points
      (award only on first correct solve; enforce with the unique index)
- [ ] `/leaderboard` — top 100 by points (global)
- [ ] `/profile` — rank progress bar, solved list, stats, badges
- [ ] Move points/rank in top bar to read from the DB

## Phase 3 — Real AI Mentor (LAST)
- [ ] `POST /api/mentor` stub already returns the static hint ladder — keep shape
- [ ] Add LLM provider (server-side key only)
- [ ] Prompt design: graduated hints, NEVER reveal full answer at level 1–2,
      analyze the user's reported bug, grade their test case, suggest improvements
- [ ] Ground the model with the challenge `groundTruth` + `mentorHints`
- [ ] Rate limit + basic abuse protection
- [ ] Fallback to static hints if the LLM call fails

## Later (post-MVP)
- [ ] Leaderboard filters: country / university / company / weekly / monthly
- [ ] Portfolio generator (CV blurb, GitHub README, public profile)
- [ ] Self-hosted targets with real bug injection (Juice Shop, ParaBank)
- [ ] Sprint mode, team mode, recruiter mode
- [ ] Bug evolution (randomized targets), automation playground
