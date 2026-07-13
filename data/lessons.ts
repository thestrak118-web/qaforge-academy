// data/lessons.ts
// QAForge Academy — Learning content (HTB Academy style).
//
// STRUCTURE:  MODULE  ->  SECTION[]
// A module is a course (e.g. "QA Foundations"). It contains ordered SECTIONS.
// Each section has a TYPE that drives how the page renders it:
//
//   "theory"     -> reading content only (Block[])
//   "practical"  -> reading content + a hands-on task against a REAL external
//                   target (SauceDemo, reqres.in, ...). User confirms completion.
//   "quiz"       -> reading content + questions that must be answered correctly
//                   before the section counts as complete.
//
// NO LOCKING: every section is freely navigable (HTB behaves this way).
// Progress is tracked per-section: "6 / 8 Sections".
//
// Product content = Uzbek (latin). Code/comments = English.

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Level = "beginner" | "junior";
export type SectionType = "theory" | "practical" | "quiz";

/** Ordered content blocks. The UI maps each to a styled component. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "key"; text: string }      // 🔑 lime callout — key takeaway
  | { type: "tip"; text: string }      // 💡 cyan callout
  | { type: "warn"; text: string }     // ⚠️ amber callout
  | { type: "example"; text: string }  // worked example box
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "code"; text: string };    // monospace block

export interface QuizQuestion {
  id: string;
  q: string;
  options: string[];
  /** index of the correct option */
  answer: number;
  explain: string;
}

/** A hands-on task performed on a real external practice site. */
export interface Practical {
  /** Real, public practice target — opened in a NEW TAB, never iframed. */
  targetUrl: string;
  targetName: string;
  /** What the learner must do, in Uzbek. */
  task: string;
  /** Optional checklist the learner ticks off as they work. */
  steps?: string[];
  /** Shown after they mark it done — what they should have observed. */
  debrief?: string;
}

export interface Section {
  id: string;               // globally unique, e.g. "qa-found-01"
  title: string;            // Uzbek
  type: SectionType;
  minutes: number;          // estimated time
  body: Block[];            // reading content (all types have this)
  quiz?: QuizQuestion[];    // required when type === "quiz"
  practical?: Practical;    // required when type === "practical"
}

export interface Module {
  id: string;
  icon: string;             // emoji
  title: string;            // Uzbek
  summary: string;          // one-line description, Uzbek
  level: Level;
  sections: Section[];
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

import { LEVEL_1 } from "./modules/level-1-foundations";
import { LEVEL_2 } from "./modules/level-2-manual-testing";
import { LEVEL_3 } from "./modules/level-3-bug-reporting";
import { LEVEL_4 } from "./modules/level-4-web-fundamentals";
import { LEVEL_5 } from "./modules/level-5-api-testing";
import { LEVEL_6 } from "./modules/level-6-database";
import { LEVEL_7 } from "./modules/level-7-devtools";
import { LEVEL_8 } from "./modules/level-8-automation";
import { LEVEL_9 } from "./modules/level-9-performance";
import { LEVEL_10 } from "./modules/level-10-career";

export const MODULES: Module[] = [
  LEVEL_1,
  LEVEL_2,
  LEVEL_3,
  LEVEL_4,
  LEVEL_5,
  LEVEL_6,
  LEVEL_7,
  LEVEL_8,
  LEVEL_9,
  LEVEL_10,
];

/* ------------------------------------------------------------------ */
/* Helpers (import these instead of recomputing in components)         */
/* ------------------------------------------------------------------ */

export const ALL_SECTIONS: Section[] = MODULES.flatMap((m) => m.sections);

export function getModule(moduleId: string): Module | undefined {
  return MODULES.find((m) => m.id === moduleId);
}

export function getSection(sectionId: string): Section | undefined {
  return ALL_SECTIONS.find((s) => s.id === sectionId);
}

/** The module a given section belongs to. */
export function getModuleOfSection(sectionId: string): Module | undefined {
  return MODULES.find((m) => m.sections.some((s) => s.id === sectionId));
}

/** Previous / next section across the whole curriculum (flat order). */
export function getAdjacentSections(sectionId: string): {
  prev: Section | null;
  next: Section | null;
} {
  const i = ALL_SECTIONS.findIndex((s) => s.id === sectionId);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? ALL_SECTIONS[i - 1] : null,
    next: i < ALL_SECTIONS.length - 1 ? ALL_SECTIONS[i + 1] : null,
  };
}

export const SECTION_TYPE_LABEL: Record<SectionType, string> = {
  theory: "Nazariy",
  practical: "Amaliy",
  quiz: "Test",
};

export const LEVEL_LABEL: Record<Level, string> = {
  beginner: "Boshlang'ich",
  junior: "Junior",
};
