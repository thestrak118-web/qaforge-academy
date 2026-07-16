"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MODULES, SECTION_TYPE_LABEL, getModuleOfSection } from "@/data/lessons";
import { useLessonProgress } from "@/lib/lesson-progress-context";
import { IconCheck, IconX, IconChevronDown } from "@/lib/icons";

interface TableOfContentsProps {
  currentSectionId: string;
  onClose: () => void;
}

// Right-side accordion drawer: only the module containing the current
// section starts expanded, the rest are collapsed (single-open accordion).
export default function TableOfContents({ currentSectionId, onClose }: TableOfContentsProps) {
  const { isCompleted } = useLessonProgress();
  const currentModule = getModuleOfSection(currentSectionId);
  const [openModuleId, setOpenModuleId] = useState<string | null>(currentModule?.id ?? null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="toc-drawer-overlay" onClick={onClose}>
      <aside className="toc-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="toc-drawer-head">
          <h2>Barcha darslar</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Yopish">
            <IconX />
          </button>
        </div>

        {MODULES.map((module, mi) => {
          const open = openModuleId === module.id;
          return (
            <div key={module.id} className="toc-mod">
              <button
                type="button"
                className="toc-mod-head"
                onClick={() => setOpenModuleId(open ? null : module.id)}
              >
                <span className="toc-mod-num">{mi + 1}</span>
                <span className="toc-mod-name">{module.title}</span>
                <span className="toc-mod-count">{module.sections.length} section</span>
                <IconChevronDown className={`toc-mod-chev${open ? " open" : ""}`} />
              </button>

              {open && (
                <div className="toc-mod-sections">
                  {module.sections.map((s) => {
                    const done = isCompleted(s.id);
                    const current = s.id === currentSectionId;
                    return (
                      <Link
                        key={s.id}
                        href={`/learn/${s.id}`}
                        onClick={onClose}
                        className={`toc-sec-row${current ? " current" : ""}`}
                      >
                        <span className={`toc-sec-status${done ? " done" : ""}${current ? " current" : ""}`}>
                          {done && <IconCheck />}
                        </span>
                        <span className="toc-sec-info">
                          <span className={`sec-type-badge sec-type-${s.type}`}>
                            {SECTION_TYPE_LABEL[s.type]}
                          </span>
                          <b>{s.title}</b>
                        </span>
                        {current && <span className="toc-sec-tag">Joriy</span>}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </aside>
    </div>
  );
}
