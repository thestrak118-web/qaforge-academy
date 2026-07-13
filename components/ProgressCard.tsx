"use client";

import { ALL_SECTIONS } from "@/data/lessons";
import { useLessonProgress } from "@/lib/lesson-progress-context";
import { getOverallProgress } from "@/lib/lessons";

export default function ProgressCard() {
  const { isCompleted } = useLessonProgress();

  if (ALL_SECTIONS.length === 0) return null;

  const { completed, total, percent } = getOverallProgress(isCompleted);

  return (
    <div className="card progress-card">
      <div className="sec-head">
        <h2>Umumiy progress</h2>
      </div>
      <div className="xp-mini-top">
        <span>Yakunlangan section&apos;lar</span>
        <b className="mono">
          {completed} / {total}
        </b>
      </div>
      <div className="bar">
        <i style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
