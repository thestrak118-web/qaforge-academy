"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/data/lessons";
import { IconCheck } from "@/lib/icons";

interface SectionQuizProps {
  questions: QuizQuestion[];
  alreadyCompleted: boolean;
  onAllCorrect: () => void;
}

export default function SectionQuiz({ questions, alreadyCompleted, onAllCorrect }: SectionQuizProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [checked, setChecked] = useState(false);

  const allCorrect =
    alreadyCompleted || (checked && questions.every((q, i) => answers[i] === q.answer));

  const select = (qi: number, oi: number) => {
    if (allCorrect) return;
    setChecked(false);
    setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)));
  };

  const handleCheck = () => {
    if (answers.some((a) => a === null)) return;
    setChecked(true);
    if (questions.every((q, i) => answers[i] === q.answer)) {
      onAllCorrect();
    }
  };

  return (
    <div className="block">
      <div className="eyebrow">Test</div>

      {questions.map((q, qi) => (
        <div key={q.id} className="quiz-question">
          <p className="body" style={{ fontWeight: 600 }}>
            {qi + 1}. {q.q}
          </p>
          <div className="opts">
            {q.options.map((opt, oi) => {
              const isSelected = answers[qi] === oi;
              let stateClass = "";
              if (allCorrect) {
                stateClass = oi === q.answer ? " correct" : "";
              } else if (checked) {
                stateClass = oi === q.answer ? " correct" : isSelected ? " wrong" : "";
              } else if (isSelected) {
                stateClass = " sel";
              }
              return (
                <button
                  key={oi}
                  type="button"
                  className={`opt${stateClass}`}
                  onClick={() => select(qi, oi)}
                  disabled={allCorrect}
                >
                  <span className="box">
                    <IconCheck />
                  </span>
                  <span>
                    {opt}
                    {(checked || allCorrect) && oi === q.answer && (
                      <span className="opt-explain">{q.explain}</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!allCorrect && (
        <button
          type="button"
          className="btn btn-primary btn-block"
          style={{ marginTop: 8 }}
          onClick={handleCheck}
          disabled={answers.some((a) => a === null)}
        >
          Tekshirish
        </button>
      )}

      {checked && !allCorrect && (
        <div className="note" style={{ marginTop: 4 }}>
          Ba&apos;zi javoblar noto&apos;g&apos;ri — qayta urinib ko&apos;ring.
        </div>
      )}

      {allCorrect && (
        <div className="note note-success" style={{ marginTop: 4 }}>
          ✓ Barcha savollarga to&apos;g&apos;ri javob berdingiz — bo&apos;lim bajarildi.
        </div>
      )}
    </div>
  );
}
