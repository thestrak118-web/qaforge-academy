"use client";

import Link from "next/link";
import { useLessonProgress } from "@/lib/lesson-progress-context";
import { LEVEL_LABEL } from "@/data/lessons";
import { getCurrentModule, getModuleCompletion } from "@/lib/lessons";

const RING_RADIUS = 26;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function CurrentPathCard() {
  const { isCompleted } = useLessonProgress();
  const currentModule = getCurrentModule(isCompleted);

  if (!currentModule) return null;

  const { percent, currentSection } = getModuleCompletion(currentModule, isCompleted);
  const offset = RING_CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div className="card path-card">
      <div className="path-ic" aria-hidden>
        {currentModule.icon}
      </div>
      <div className="path-info">
        <div className="cap">Joriy yo&apos;nalish</div>
        <h3>{currentModule.title}</h3>
        <div className="sub">{LEVEL_LABEL[currentModule.level]} · {currentSection.title}</div>
      </div>
      {/* Tailwind ships a `ring` box-shadow utility that collides with the shared
          `.ring` layout class (see app/profile/page.tsx) — sidestep it with inline
          positioning instead of reusing that class name here. */}
      <div style={{ position: "relative", width: 64, height: 64, flex: "none" }}>
        <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="32" cy="32" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r={RING_RADIUS}
            fill="none"
            stroke="var(--lime)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ filter: "drop-shadow(0 0 4px var(--lime-line))" }}
          />
        </svg>
        <div className="ring-center">
          <b style={{ fontSize: 14 }}>{percent}%</b>
        </div>
      </div>
      <Link href={`/learn/${currentSection.id}`} className="btn btn-primary">
        Davom etish
      </Link>
    </div>
  );
}
