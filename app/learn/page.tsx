"use client";

import Link from "next/link";
import { MODULES, LEVEL_LABEL } from "@/data/lessons";
import { useLessonProgress } from "@/lib/lesson-progress-context";
import { getModuleCompletion } from "@/lib/lessons";
import { IconArrowRight } from "@/lib/icons";

export default function LearnPage() {
  const { isCompleted } = useLessonProgress();

  return (
    <section>
      <div className="page-head">
        <h1>Darslar</h1>
        <p>QA nazariyasini bosqichma-bosqich o&apos;rganing — nazariy, amaliy va test bo&apos;limlari bilan.</p>
      </div>

      {MODULES.length === 0 ? (
        <p style={{ color: "var(--dim-text)" }}>Hozircha modul mavjud emas.</p>
      ) : (
        <div className="module-grid">
          {MODULES.map((module) => {
            const { completed, total, percent, currentSection, isComplete } = getModuleCompletion(
              module,
              isCompleted
            );
            return (
              <div key={module.id} className="card module-card">
                <div className="module-card-top">
                  <div className="module-card-ic" aria-hidden>
                    {module.icon}
                  </div>
                  <span className={`level-badge ${module.level}`}>{LEVEL_LABEL[module.level]}</span>
                </div>

                <div>
                  <h3>{module.title}</h3>
                  <p className="summary">{module.summary}</p>
                </div>

                <div className="module-card-prog">
                  <div className="pt">
                    <span>{completed} / {total} section</span>
                    <b>{percent}%</b>
                  </div>
                  <div className="bar">
                    <i style={{ width: `${percent}%` }} />
                  </div>
                </div>

                <Link href={`/learn/${currentSection.id}`} className="btn btn-ghost btn-block">
                  {isComplete ? "Qayta ko'rish" : completed === 0 ? "Boshlash" : "Davom etish"}
                  <IconArrowRight />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
