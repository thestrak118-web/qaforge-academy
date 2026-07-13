"use client";

// Phase 1 has no backend: points/solved state live entirely in React state
// for the lifetime of the tab. Phase 2 swaps this for Supabase-backed
// persistence without changing the consumer API (useScore()).

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getRank } from "@/lib/scoring";

interface ScoreContextValue {
  points: number;
  rank: string;
  solvedIds: string[];
  isSolved: (challengeId: string) => boolean;
  /** Awards points only the first time a challenge is solved. Returns true if points were newly awarded. */
  recordSolve: (challengeId: string, points: number) => boolean;
}

const ScoreContext = createContext<ScoreContextValue | null>(null);

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);

  const isSolved = (challengeId: string) => solvedIds.includes(challengeId);

  const recordSolve = (challengeId: string, awardedPoints: number) => {
    if (solvedIds.includes(challengeId)) return false;
    setSolvedIds((prev) => [...prev, challengeId]);
    setPoints((prev) => prev + awardedPoints);
    return true;
  };

  const rank = useMemo(() => getRank(points), [points]);

  const value: ScoreContextValue = {
    points,
    rank,
    solvedIds,
    isSolved,
    recordSolve,
  };

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
}

export function useScore() {
  const ctx = useContext(ScoreContext);
  if (!ctx) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return ctx;
}
