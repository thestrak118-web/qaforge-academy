"use client";

import { useState } from "react";
import { IconMentor, IconLock, IconChevronRight } from "@/lib/icons";

interface MentorPanelProps {
  hints: [string, string, string];
}

const HINT_TITLES = [
  "Qayerdan boshlash",
  "Doirani toraytiring",
  "Deyarli tayyor",
];

// Static hint ladder for Phase 1. Phase 3 swaps the internals for a real
// /api/mentor call — the reveal-one-at-a-time contract stays the same.
// Accordion behavior (one hint open at a time, opening one unlocks the
// next, "revealed" state persists after collapsing) ported from the
// reference's revealHint().
export default function MentorPanel({ hints }: MentorPanelProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [everOpened, setEverOpened] = useState<number[]>([]);

  const toggleHint = (i: number) => {
    if (i >= unlockedCount) return;
    if (openIndex === i) {
      setOpenIndex(null);
      return;
    }
    setOpenIndex(i);
    setEverOpened((prev) => (prev.includes(i) ? prev : [...prev, i]));
    setUnlockedCount((prev) => Math.min(hints.length, Math.max(prev, i + 2)));
  };

  return (
    <div className="mentor">
      <div className="card" style={{ padding: 20 }}>
        <div className="mentor-head">
          <div className="mentor-ic">
            <IconMentor />
          </div>
          <div>
            <b>AI Mentor</b>
            <br />
            <small>Bosqichma-bosqich maslahatlar</small>
          </div>
        </div>
        <p className="mentor-sub">
          Qiynalsangiz, bittadan maslahat oching. Har bir maslahat sizni javobga
          yaqinlashtiradi — iloji boricha kamroq maslahat bilan yechishga harakat qiling.
        </p>

        {hints.map((hint, i) => {
          const locked = i >= unlockedCount;
          const open = openIndex === i;
          const revealed = everOpened.includes(i);
          return (
            <div
              key={i}
              className={`hint${locked ? " locked" : ""}${open ? " open" : ""}${
                revealed ? " revealed" : ""
              }`}
            >
              <button type="button" className="hint-head" onClick={() => toggleHint(i)}>
                <span className="hint-num">{i + 1}</span>
                <b>{HINT_TITLES[i] ?? `Maslahat ${i + 1}`}</b>
                {locked ? <IconLock className="lock" /> : <IconChevronRight className="chev" />}
              </button>
              <div className="hint-body" style={{ maxHeight: open ? 200 : 0 }}>
                <p>{hint}</p>
              </div>
            </div>
          );
        })}

        <p className="mentor-note">
          Bir vaqtda faqat <b>bitta maslahat</b> ochiq bo&apos;lishi mumkin.
        </p>
      </div>
    </div>
  );
}
