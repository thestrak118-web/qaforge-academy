"use client";

import { use } from "react";
import Link from "next/link";
import {
  getSection,
  getModuleOfSection,
  getAdjacentSections,
  SECTION_TYPE_LABEL,
  LEVEL_LABEL,
} from "@/data/lessons";
import { useLessonProgress } from "@/lib/lesson-progress-context";
import SectionSidebar from "@/components/SectionSidebar";
import BlockRenderer from "@/components/BlockRenderer";
import PracticalTask from "@/components/PracticalTask";
import SectionQuiz from "@/components/SectionQuiz";
import SectionNav from "@/components/SectionNav";
import { IconClock } from "@/lib/icons";

export default function SectionPage({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}) {
  const { sectionId } = use(params);
  const section = getSection(sectionId);
  const { isCompleted, toggleCompleted } = useLessonProgress();

  if (!section) {
    return (
      <section style={{ textAlign: "center", padding: "64px 0" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Bo&apos;lim topilmadi</h1>
        <Link
          href="/learn"
          className="link"
          style={{ marginTop: 16, display: "inline-flex", justifyContent: "center" }}
        >
          ← Darslarga qaytish
        </Link>
      </section>
    );
  }

  const parentModule = getModuleOfSection(sectionId)!;
  const indexInModule = parentModule.sections.findIndex((s) => s.id === sectionId);
  const { prev, next } = getAdjacentSections(sectionId);
  const done = isCompleted(section.id);

  const markComplete = () => {
    if (!isCompleted(section.id)) toggleCompleted(section.id);
  };

  return (
    <section>
      <div className="section-layout">
        <SectionSidebar currentSectionId={sectionId} />

        <div style={{ minWidth: 0 }}>
          <div className="lesson-breadcrumb">
            <span>{parentModule.title}</span>
            <span>›</span>
            <b>
              Section {indexInModule + 1} / {parentModule.sections.length}
            </b>
          </div>

          <div className="lesson-header">
            <h1>{section.title}</h1>
            <div className="lesson-meta">
              <span className={`sec-type-badge sec-type-${section.type}`}>
                {SECTION_TYPE_LABEL[section.type]}
              </span>
              <span>
                <IconClock /> {section.minutes} daqiqa
              </span>
              <span>{LEVEL_LABEL[parentModule.level]}</span>
            </div>
          </div>

          <div className="lesson-body">
            <BlockRenderer body={section.body} />
          </div>

          {section.type === "practical" && section.practical && (
            <div style={{ marginTop: 22 }}>
              <PracticalTask data={section.practical} alreadyCompleted={done} onComplete={markComplete} />
            </div>
          )}

          {section.type === "quiz" && section.quiz && (
            <div style={{ marginTop: 22 }}>
              <SectionQuiz questions={section.quiz} alreadyCompleted={done} onAllCorrect={markComplete} />
            </div>
          )}

          <SectionNav
            section={section}
            prev={prev}
            next={next}
            indexInModule={indexInModule}
            totalInModule={parentModule.sections.length}
            isDone={done}
            onComplete={markComplete}
          />
        </div>
      </div>
    </section>
  );
}
