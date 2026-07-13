"use client";

import Link from "next/link";
import { MODULES } from "@/data/lessons";
import { useLessonProgress } from "@/lib/lesson-progress-context";
import { getModuleCompletion } from "@/lib/lessons";
import { IconArrowRight } from "@/lib/icons";

export default function CoursesCard() {
  const { isCompleted } = useLessonProgress();

  if (MODULES.length === 0) return null;

  return (
    <div className="card" style={{ padding: "22px 24px" }}>
      <div className="sec-head">
        <h2>Kurslaringiz</h2>
        <Link href="/learn" className="link">
          Barchasini ko&apos;rish <IconArrowRight />
        </Link>
      </div>
      <div className="course-list">
        {MODULES.map((module) => {
          const { percent, currentSection, isComplete } = getModuleCompletion(
            module,
            isCompleted
          );
          return (
            <div key={module.id} className="course-row">
              <div className="course-ic" aria-hidden>
                {module.icon}
              </div>
              <div className="course-name">
                <b>{module.title}</b>
                <span>{isComplete ? "Yakunlandi" : currentSection.title}</span>
              </div>
              <div className="course-prog">
                <div className="pt">
                  <span>Progress</span>
                  <b>{percent}%</b>
                </div>
                <div className="bar">
                  <i style={{ width: `${percent}%` }} />
                </div>
              </div>
              <Link href={`/learn/${currentSection.id}`} className="btn btn-ghost btn-sm">
                Davom etish
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
