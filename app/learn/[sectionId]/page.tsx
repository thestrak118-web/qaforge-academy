"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  getSection,
  getModuleOfSection,
  getAdjacentSections,
  SECTION_TYPE_LABEL,
  LEVEL_LABEL,
} from "@/data/lessons";
import { useLessonProgress } from "@/lib/lesson-progress-context";
import { getModuleCompletion } from "@/lib/lessons";
import BlockRenderer from "@/components/BlockRenderer";
import PracticalTask from "@/components/PracticalTask";
import SectionQuiz from "@/components/SectionQuiz";
import SectionNav from "@/components/SectionNav";
import TableOfContents from "@/components/TableOfContents";
import { BrandIcon, IconArrowLeft, IconClock, IconMenu } from "@/lib/icons";

export default function SectionPage({
  params,
}: {
  params: Promise<{ sectionId: string }>;
}) {
  const { sectionId } = use(params);
  const section = getSection(sectionId);
  const { isCompleted, toggleCompleted } = useLessonProgress();
  const [tocOpen, setTocOpen] = useState(false);

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
  const { percent: modulePercent } = getModuleCompletion(parentModule, isCompleted);

  const markComplete = () => {
    if (!isCompleted(section.id)) toggleCompleted(section.id);
  };

  return (
    <div className="focus-page">
      <header className="focus-header">
        <Link href="/dashboard" className="focus-logo">
          <div className="brand-mark">
            <BrandIcon />
          </div>
          <div className="brand-txt">
            <strong>QAForge</strong>
            <span>Academy</span>
          </div>
        </Link>

        <div className="focus-divider" />

        <div className="focus-header-left">
          <Link href="/learn" className="focus-back" aria-label="Darslarga qaytish">
            <IconArrowLeft />
          </Link>
          <span className="focus-module-icon" aria-hidden>
            {parentModule.icon}
          </span>
          <span className="focus-module-name">{parentModule.title}</span>
          <div className="focus-progress-track">
            <i style={{ width: `${modulePercent}%` }} />
          </div>
          <span className="focus-progress-pct">{modulePercent}%</span>
        </div>

        <button type="button" className="focus-toc-btn" onClick={() => setTocOpen(true)}>
          <IconMenu />
          Barcha darslar
        </button>
      </header>

      <div className="focus-content">
        <div className="lesson-breadcrumb mono">
          Section {indexInModule + 1} / {parentModule.sections.length}
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

      {tocOpen && <TableOfContents currentSectionId={sectionId} onClose={() => setTocOpen(false)} />}
    </div>
  );
}
