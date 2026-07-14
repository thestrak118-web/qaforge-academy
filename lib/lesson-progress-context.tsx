"use client";

// Tracks which lesson SECTIONS the user has completed, backed by the
// lesson_progress table (one row per completed section; deleting the row
// un-completes it). Not scoring-sensitive, so writes go straight from the
// browser client under RLS — no server round trip needed.

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";

export interface CompletedSection {
  sectionId: string;
  completedAt: string;
}

interface LessonProgressContextValue {
  completedIds: string[];
  completions: CompletedSection[];
  isCompleted: (sectionId: string) => boolean;
  toggleCompleted: (sectionId: string) => void;
}

const LessonProgressContext = createContext<LessonProgressContextValue | null>(
  null
);

export function LessonProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [completions, setCompletions] = useState<CompletedSection[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!user) {
        if (!cancelled) setCompletions([]);
        return;
      }
      const supabase = createClient();
      const { data } = await supabase
        .from("lesson_progress")
        .select("section_id, completed_at")
        .eq("user_id", user.id);
      if (cancelled || !data) return;
      setCompletions(
        data.map((r) => ({ sectionId: r.section_id, completedAt: r.completed_at }))
      );
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const completedIds = completions.map((c) => c.sectionId);
  const isCompleted = useCallback(
    (sectionId: string) => completedIds.includes(sectionId),
    [completedIds]
  );

  const toggleCompleted = useCallback(
    (sectionId: string) => {
      if (!user) return;
      const supabase = createClient();
      const alreadyDone = completedIds.includes(sectionId);

      if (alreadyDone) {
        setCompletions((prev) => prev.filter((c) => c.sectionId !== sectionId));
        void supabase
          .from("lesson_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("section_id", sectionId);
      } else {
        setCompletions((prev) => [
          ...prev,
          { sectionId, completedAt: new Date().toISOString() },
        ]);
        void supabase
          .from("lesson_progress")
          .insert({ user_id: user.id, section_id: sectionId });
      }
    },
    [user, completedIds]
  );

  return (
    <LessonProgressContext.Provider
      value={{ completedIds, completions, isCompleted, toggleCompleted }}
    >
      {children}
    </LessonProgressContext.Provider>
  );
}

export function useLessonProgress() {
  const ctx = useContext(LessonProgressContext);
  if (!ctx) {
    throw new Error(
      "useLessonProgress must be used within a LessonProgressProvider"
    );
  }
  return ctx;
}
