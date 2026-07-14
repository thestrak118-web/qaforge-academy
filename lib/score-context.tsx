"use client";

// Points live in profiles.points (server-authoritative, bumped by the
// add_points_on_submission trigger). This context never writes points
// itself — submitChallenge posts to /api/submit, which grades server-side
// and inserts challenge_submissions; the trigger does the actual award.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getRank } from "@/lib/scoring";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";

export interface SolvedSubmission {
  challengeId: string;
  pointsEarned: number;
  solvedAt: string;
}

export interface SubmitResult {
  correct: boolean;
  alreadySolved: boolean;
  pointsAwarded: number;
}

interface ScoreContextValue {
  points: number;
  rank: string;
  solvedIds: string[];
  submissions: SolvedSubmission[];
  isSolved: (challengeId: string) => boolean;
  /** Grades + persists a submission server-side. Awards points only on first solve. */
  submitChallenge: (challengeId: string, selectedIds: string[]) => Promise<SubmitResult>;
}

const ScoreContext = createContext<ScoreContextValue | null>(null);

export function ScoreProvider({ children }: { children: ReactNode }) {
  const { user, profile, bumpPoints } = useAuth();
  const [submissions, setSubmissions] = useState<SolvedSubmission[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!user) {
        if (!cancelled) setSubmissions([]);
        return;
      }
      const supabase = createClient();
      const { data } = await supabase
        .from("challenge_submissions")
        .select("challenge_id, points_earned, solved_at")
        .eq("user_id", user.id);
      if (cancelled || !data) return;
      setSubmissions(
        data.map((r) => ({
          challengeId: r.challenge_id,
          pointsEarned: r.points_earned,
          solvedAt: r.solved_at,
        }))
      );
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const solvedIds = useMemo(() => submissions.map((s) => s.challengeId), [submissions]);
  const isSolved = useCallback((id: string) => solvedIds.includes(id), [solvedIds]);

  const submitChallenge = useCallback(
    async (challengeId: string, selectedIds: string[]): Promise<SubmitResult> => {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, selectedIds }),
      });
      const result: SubmitResult = await res.json();

      if (result.correct && result.pointsAwarded > 0) {
        bumpPoints(result.pointsAwarded);
        setSubmissions((prev) =>
          prev.some((s) => s.challengeId === challengeId)
            ? prev
            : [
                ...prev,
                {
                  challengeId,
                  pointsEarned: result.pointsAwarded,
                  solvedAt: new Date().toISOString(),
                },
              ]
        );
      }

      return result;
    },
    [bumpPoints]
  );

  const points = profile?.points ?? 0;
  const rank = useMemo(() => getRank(points), [points]);

  const value: ScoreContextValue = {
    points,
    rank,
    solvedIds,
    submissions,
    isSolved,
    submitChallenge,
  };

  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>;
}

export function useScore() {
  const ctx = useContext(ScoreContext);
  if (!ctx) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return ctx;
}
