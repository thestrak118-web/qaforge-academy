"use client";

import { useEffect, useRef, useState } from "react";
import type { TaskKind, TaskOption } from "@/data/challenges";
import { gradeSubmission } from "@/lib/scoring";
import { burst } from "@/lib/confetti";
import { IconBolt, IconBadges, IconStar, IconLightbulb } from "@/lib/icons";

interface SubmitTaskProps {
  taskPrompt: string;
  taskKind: TaskKind;
  options: TaskOption[];
  points: number;
  groundTruth: string;
  /** Whether this challenge was already solved before this page load. */
  alreadySolved: boolean;
  /** Called on a locally-correct submission; server grades + awards points. */
  onCorrect: (selectedIds: string[]) => Promise<{ pointsAwarded: number; alreadySolved: boolean }>;
}

type Phase = "idle" | "wrong";

export default function SubmitTask({
  taskPrompt,
  taskKind,
  options,
  points,
  groundTruth,
  alreadySolved,
  onCorrect,
}: SubmitTaskProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [awardedThisAttempt, setAwardedThisAttempt] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (solved && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      burst(successRef.current);
    }
  }, [solved]);

  const toggleOption = (id: string) => {
    if (solved) return;
    setPhase("idle");
    setSelectedIds((prev) => {
      if (taskKind === "single") return [id];
      return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  const shake = () => {
    submitBtnRef.current?.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 280 }
    );
  };

  const handleSubmit = async () => {
    if (solved || submitting) return;
    if (selectedIds.length === 0) {
      shake();
      return;
    }
    const isCorrect = gradeSubmission(options, selectedIds);
    if (isCorrect) {
      setSubmitting(true);
      try {
        const result = await onCorrect(selectedIds);
        setSolved(true);
        setAwardedThisAttempt(result.pointsAwarded > 0);
      } finally {
        setSubmitting(false);
      }
    } else {
      setPhase("wrong");
      shake();
      setTimeout(() => setPhase("idle"), 2200);
    }
  };

  return (
    <div className="block">
      <div className="eyebrow">Savol</div>
      <p className="body">{taskPrompt}</p>

      {alreadySolved && !solved && (
        <div className="note">
          <IconStar />
          Siz bu challenge&apos;ni allaqachon yechgansiz. Mashq uchun qayta
          urinishingiz mumkin — ball qayta berilmaydi.
        </div>
      )}

      <div className="opts" id="opts">
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          let stateClass = "";
          if (solved) {
            stateClass = option.correct ? " correct" : "";
          } else if (phase === "wrong") {
            stateClass = option.correct ? " correct" : isSelected ? " wrong" : "";
          } else {
            stateClass = isSelected ? " sel" : "";
          }
          return (
            <button
              key={option.id}
              type="button"
              className={`opt${stateClass}`}
              onClick={() => toggleOption(option.id)}
            >
              <span className="box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m20 6-11 11L4 12" />
                </svg>
              </span>
              <span>
                {option.text}
                {solved && <span className="opt-explain">{option.explain}</span>}
              </span>
            </button>
          );
        })}
      </div>

      {!solved && (
        <button
          ref={submitBtnRef}
          type="button"
          className="btn btn-primary btn-block"
          style={{ marginTop: 22 }}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting
            ? "Yuborilmoqda…"
            : phase === "wrong"
              ? "Unchamas — AI Mentor maslahatlarini ko'ring"
              : "Yuborish"}
        </button>
      )}

      <div ref={successRef} className={`success${solved ? " show" : ""}`}>
        {solved && (
          <>
            <div className="suc-head">
              <div className="suc-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m20 6-11 11L4 12" />
                </svg>
              </div>
              <div>
                <h3>Challenge yakunlandi</h3>
                <p>To&apos;g&apos;ri — siz javobni topdingiz.</p>
              </div>
            </div>
            <div className="suc-rewards">
              <div className="reward">
                <span style={{ color: "var(--lime)" }}>
                  <IconBolt />
                </span>
                <div>
                  <b style={{ color: "var(--lime)" }}>
                    {awardedThisAttempt ? `+${points} XP` : "0 XP"}
                  </b>
                  <small>
                    {awardedThisAttempt ? "Tajriba olindi" : "Ball avval berilgan"}
                  </small>
                </div>
              </div>
              <div className="reward">
                <span style={{ color: "var(--cyan)" }}>
                  <IconBadges />
                </span>
                <div>
                  <b style={{ color: "var(--cyan)" }}>Yechildi</b>
                  <small>Challenge holati</small>
                </div>
              </div>
            </div>
            <div className="explain">
              <h4>
                <IconLightbulb />
                Nega bu to&apos;g&apos;ri
              </h4>
              <p>{groundTruth}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
