"use client";

// Tracks which lesson SECTIONS the user has completed. Client state only,
// scoped to the tab — no localStorage, mirrors lib/score-context.tsx.
// Keeps the provider/hook name (lesson-progress) but operates on section ids
// from data/lessons.ts's Module -> Section structure.

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface LessonProgressContextValue {
  completedIds: string[];
  isCompleted: (sectionId: string) => boolean;
  toggleCompleted: (sectionId: string) => void;
}

const LessonProgressContext = createContext<LessonProgressContextValue | null>(
  null
);

export function LessonProgressProvider({ children }: { children: ReactNode }) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const isCompleted = (sectionId: string) => completedIds.includes(sectionId);

  const toggleCompleted = (sectionId: string) => {
    setCompletedIds((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <LessonProgressContext.Provider
      value={{ completedIds, isCompleted, toggleCompleted }}
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
