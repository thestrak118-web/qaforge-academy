"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MODULES, SECTION_TYPE_LABEL } from "@/data/lessons";
import { useLessonProgress } from "@/lib/lesson-progress-context";
import { IconCheck, IconX } from "@/lib/icons";

interface TableOfContentsProps {
  currentSectionId: string;
  onClose: () => void;
}

export default function TableOfContents({ currentSectionId, onClose }: TableOfContentsProps) {
  const { isCompleted } = useLessonProgress();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="toc-overlay" onClick={onClose}>
      <div className="toc-modal" onClick={(e) => e.stopPropagation()}>
        <div className="toc-head">
          <h2 style={{ fontSize: 16, fontWeight: 800 }}>Barcha darslar</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Yopish">
            <IconX />
          </button>
        </div>

        {MODULES.map((module) => (
          <div key={module.id} className="toc-module">
            <div className="toc-module-title">
              <span>{module.icon}</span> {module.title}
            </div>
            {module.sections.map((s) => {
              const done = isCompleted(s.id);
              const current = s.id === currentSectionId;
              return (
                <Link
                  key={s.id}
                  href={`/learn/${s.id}`}
                  onClick={onClose}
                  className={`toc-row${current ? " current" : ""}${done ? " done" : ""}`}
                >
                  <span className="section-num" style={{ width: 22, height: 22 }}>
                    {done && <IconCheck />}
                  </span>
                  <span style={{ flex: 1 }}>{s.title}</span>
                  <span className={`sec-type-badge sec-type-${s.type}`}>{SECTION_TYPE_LABEL[s.type]}</span>
                  {current && (
                    <span style={{ color: "var(--lime)", fontSize: 11, fontWeight: 700 }}>Joriy</span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
