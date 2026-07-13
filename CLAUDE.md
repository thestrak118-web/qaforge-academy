# QAForge Academy — Project Guide for Claude Code

> This file is the source of truth for how to build this project.
> Read it fully before writing code. Follow the phases in order.

## What we are building

**QAForge Academy** — a gamified, hands-on QA/QC practice platform for the
**Uzbek market**. Think "Hack The Box, but for QA testers."

Users solve **challenges** built around **real, existing practice apps on the
internet** (e.g. SauceDemo, reqres.in). Each challenge gives an **Uzbek-language
mission** ("find the bugs", "test this API"), the user submits their findings,
earns **points**, climbs **ranks**, and appears on a **leaderboard**.

**We do NOT build the buggy apps ourselves.** We build the *layer on top*:
missions, scoring, an AI mentor, progression, and localization. That layer is
our moat.

### Two kinds of targets
1. **Linked targets** — public practice sites we link out to (SauceDemo, DemoQA,
   automationexercise, reqres.in). We never rehost these — only link + mission.
2. **Self-hosted targets** (later phases) — open-source apps we legally deploy
   ourselves (OWASP Juice Shop, ParaBank, restful-booker) so we can inject bugs.
   NOT in scope for the MVP. MVP uses linked targets only.

## Tech stack (do not change without asking)

- **Next.js 14+ (App Router)** + **TypeScript**
- **Tailwind CSS** for styling
- **Supabase** for auth + Postgres database
- Deploy target: **Vercel**
- Package manager: **npm**

## Language convention

- **Code, comments, commits, docs → English.**
- **Product content shown to users (challenge titles, missions, hints, UI
  labels) → Uzbek (latin).** See `data/challenges.ts` for the pattern.

## Coding conventions

- TypeScript strict mode on. No `any` unless truly unavoidable.
- Components in `components/`, one component per file, PascalCase.
- Server logic in Next.js Route Handlers (`app/api/.../route.ts`) or Server
  Actions. Keep secrets server-side only.
- Never put the Supabase service-role key or any API key in client code.
- Keep the design dark-themed, lime/cyan accent (matches brand). Reuse tokens
  from `app/globals.css` — don't hardcode colors per component.
- Small, focused commits. Descriptive messages.

## Folder structure (target)

```
app/
  layout.tsx
  page.tsx                 # landing / home
  challenges/
    page.tsx               # challenge hub (grid + filters)
    [id]/page.tsx          # single challenge (mission + submit)
  leaderboard/page.tsx
  profile/page.tsx
  api/
    submit/route.ts        # grade a submission, award points
    mentor/route.ts        # AI mentor endpoint (STUB in MVP, real later)
components/
  ChallengeCard.tsx
  MissionPanel.tsx
  SubmitTask.tsx
  MentorPanel.tsx          # shows hint ladder; calls /api/mentor
  RankBadge.tsx
  Leaderboard.tsx
data/
  challenges.ts            # seed challenges (source of truth for MVP)
lib/
  supabase/                # client + server helpers
  scoring.ts               # points, ranks
  types.ts
docs/
  ROADMAP.md
  schema.sql
```

## Build phases — DO THESE IN ORDER

### Phase 1 — Challenge Hub (NO auth, NO db yet)
Goal: a visitor can browse challenges, open one, read the Uzbek mission, open the
real target in a new tab, submit answers, and get scored **client-side**.
- Scaffold Next.js + Tailwind.
- Load challenges from `data/challenges.ts` (already provided).
- Challenge hub grid with difficulty/domain filters.
- Challenge detail: mission, "Open target ↗" button, task (multi/single choice),
  submit → grade against `groundTruth` in the data → show verdict + explanations.
- Rank/points shown in a top bar, held in React state for now.
- Mentor panel present but shows the **static hint ladder** from the data
  (reveal one hint at a time). No LLM yet.

### Phase 2 — Auth + persistence + leaderboard
- Supabase auth (email magic link).
- Apply `docs/schema.sql` (profiles, submissions).
- Persist points/solved to `submissions` + `profiles`.
- Real leaderboard (global; later filter by country/university/company).
- Profile page: rank progress, solved list, stats, badges.

### Phase 3 — Real AI Mentor (LAST)
- Replace the mentor stub in `app/api/mentor/route.ts` with a real LLM call.
- The mentor MUST: give graduated hints, never reveal the full answer outright,
  analyze the user's found bug, grade their test case, suggest better tests.
- Ground the LLM with the challenge's `groundTruth` + `mentorHints` so it stays
  accurate. Keep the LLM key server-side only.
- Keep a `provider` abstraction so the model can be swapped.

## Important notes
- Points are only awarded the FIRST time a challenge is solved (no farming).
- The mentor stub and the real mentor share the SAME request/response shape, so
  Phase 3 is a drop-in replacement. Design the interface now.
- Do not scrape or embed third-party sites in an iframe if their terms forbid it
  — link out in a new tab instead.
- When unsure about scope, prefer the smallest working version and ask.
