// Progress-aware helpers built on top of data/lessons.ts. These need
// isCompleted() from lesson-progress-context, so they can't live in the
// pure data file — everything that doesn't need progress state (getModule,
// getSection, getModuleOfSection, getAdjacentSections, SECTION_TYPE_LABEL,
// LEVEL_LABEL) is exported directly from "@/data/lessons" instead.

import { MODULES } from "@/data/lessons";
import type { Module, Section } from "@/data/lessons";

export interface ModuleCompletion {
  completed: number;
  total: number;
  percent: number;
  /** First section in the module that isn't marked complete, or the last section if the module is fully done. */
  currentSection: Section;
  isComplete: boolean;
}

export function getModuleCompletion(
  module: Module,
  isCompleted: (sectionId: string) => boolean
): ModuleCompletion {
  const total = module.sections.length;
  const completed = module.sections.filter((s) => isCompleted(s.id)).length;
  const nextSection = module.sections.find((s) => !isCompleted(s.id));
  const currentSection = nextSection ?? module.sections[module.sections.length - 1];
  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    currentSection,
    isComplete: completed === total,
  };
}

/** The module the learner should resume: the first module with an incomplete section, else the last module. */
export function getCurrentModule(
  isCompleted: (sectionId: string) => boolean
): Module | undefined {
  return (
    MODULES.find((m) => m.sections.some((s) => !isCompleted(s.id))) ??
    MODULES[MODULES.length - 1]
  );
}

export interface OverallProgress {
  completed: number;
  total: number;
  percent: number;
}

/** Section-level progress across every module. */
export function getOverallProgress(
  isCompleted: (sectionId: string) => boolean
): OverallProgress {
  const total = MODULES.reduce((sum, m) => sum + m.sections.length, 0);
  const completed = MODULES.reduce(
    (sum, m) => sum + m.sections.filter((s) => isCompleted(s.id)).length,
    0
  );
  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}
