// Client-side scoring: grading logic + rank thresholds.
// Phase 1 has no backend — this is the single source of truth for both
// challenge grading and rank progression, kept framework-agnostic so it
// can be reused by a future server-side grader without changes.

import type { TaskOption } from "@/data/challenges";

export function gradeSubmission(
  options: TaskOption[],
  selectedIds: string[]
): boolean {
  const correctIds = options
    .filter((o) => o.correct)
    .map((o) => o.id)
    .sort();
  const selected = [...selectedIds].sort();
  return (
    correctIds.length === selected.length &&
    correctIds.every((id, i) => id === selected[i])
  );
}

interface RankTier {
  name: string;
  minPoints: number;
}

// Thresholds are scaled to the MVP's total available points (115).
export const RANKS: RankTier[] = [
  { name: "Yangi boshlovchi", minPoints: 0 },
  { name: "Boshlang'ich testchi", minPoints: 20 },
  { name: "Bug ovchisi", minPoints: 50 },
  { name: "Tajribali QA", minPoints: 80 },
  { name: "QA chempioni", minPoints: 115 },
];

export function getRank(points: number): string {
  let current = RANKS[0].name;
  for (const tier of RANKS) {
    if (points >= tier.minPoints) current = tier.name;
  }
  return current;
}

export interface RankProgress {
  rank: string;
  nextRank: string | null;
  points: number;
  /** Points required to reach nextRank; null when already at the top tier. */
  pointsForNext: number | null;
  /** 0-100, share of the way from the current tier to the next one. 100 at the top tier. */
  percent: number;
  isMaxRank: boolean;
}

export function getRankProgress(points: number): RankProgress {
  let currentIndex = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (points >= RANKS[i].minPoints) currentIndex = i;
  }
  const current = RANKS[currentIndex];
  const next = RANKS[currentIndex + 1] ?? null;

  if (!next) {
    return {
      rank: current.name,
      nextRank: null,
      points,
      pointsForNext: null,
      percent: 100,
      isMaxRank: true,
    };
  }

  const span = next.minPoints - current.minPoints;
  const into = points - current.minPoints;
  return {
    rank: current.name,
    nextRank: next.name,
    points,
    pointsForNext: next.minPoints,
    percent: span === 0 ? 100 : Math.round((into / span) * 100),
    isMaxRank: false,
  };
}
