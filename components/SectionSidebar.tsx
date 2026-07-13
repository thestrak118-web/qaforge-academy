"use client";

import { useState } from "react";
import Link from "next/link";
import { getModuleOfSection, SECTION_TYPE_LABEL } from "@/data/lessons";
import { useLessonProgress } from "@/lib/lesson-progress-context";
import { getModuleCompletion } from "@/lib/lessons";
import { IconCheck } from "@/lib/icons";
import TableOfContents from "@/components/TableOfContents";

interface SectionSidebarProps {
  currentSectionId: string;
}

const RING_RADIUS = 34;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function SectionSidebar({ currentSectionId }: SectionSidebarProps) {
  const { isCompleted } = useLessonProgress();
  const [tocOpen, setTocOpen] = useState(false);
  const currentModule = getModuleOfSection(currentSectionId);

  if (!currentModule) return null;

  const { completed, total, percent } = getModuleCompletion(currentModule, isCompleted);
  const offset = RING_CIRCUMFERENCE * (1 - percent / 100);

  return (
    <>
      <aside className="section-sidebar">
        <div className="card section-nav-card">
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--dim)",
              fontWeight: 700,
            }}
          >
            O&apos;quv yo&apos;nalishi
          </div>
          <h3 style={{ marginTop: 4, fontSize: 15, fontWeight: 800 }}>{currentModule.title}</h3>

          <div className="xp-mini-top" style={{ marginTop: 12 }}>
            <span>Progress</span>
            <b className="mono">{percent}%</b>
          </div>
          <div className="bar">
            <i style={{ width: `${percent}%` }} />
          </div>

          <div className="section-list">
            {currentModule.sections.map((s, i) => {
              const done = isCompleted(s.id);
              const current = s.id === currentSectionId;
              return (
                <Link
                  key={s.id}
                  href={`/learn/${s.id}`}
                  className={`section-row${current ? " current" : ""}${done ? " done" : ""}`}
                >
                  <span className="section-num">{done ? <IconCheck /> : i + 1}</span>
                  <span className="section-row-info">
                    <b>{s.title}</b>
                    <span className="section-row-meta">
                      <span className={`sec-type-badge sec-type-${s.type}`}>
                        {SECTION_TYPE_LABEL[s.type]}
                      </span>
                      {s.minutes} daq
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="card module-progress-card">
          <div style={{ position: "relative", width: 76, height: 76 }}>
            <svg width="76" height="76" viewBox="0 0 76 76" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="38" cy="38" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="7" />
              <circle
                cx="38"
                cy="38"
                r={RING_RADIUS}
                fill="none"
                stroke="var(--lime)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={offset}
                style={{ filter: "drop-shadow(0 0 4px var(--lime-line))" }}
              />
            </svg>
            <div className="ring-center">
              <b style={{ fontSize: 15 }}>{percent}%</b>
            </div>
          </div>
          <p style={{ marginTop: 10, fontSize: 12.5, color: "var(--dim-text)", textAlign: "center" }}>
            {completed} / {total} section bajarildi
          </p>
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-block"
            style={{ marginTop: 12 }}
            onClick={() => setTocOpen(true)}
          >
            Barcha darslar
          </button>
        </div>
      </aside>

      {tocOpen && <TableOfContents currentSectionId={currentSectionId} onClose={() => setTocOpen(false)} />}
    </>
  );
}
