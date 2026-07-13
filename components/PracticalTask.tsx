"use client";

import { useState } from "react";
import type { Practical } from "@/data/lessons";
import { IconExternalLink, IconCheck, IconLightbulb } from "@/lib/icons";

interface PracticalTaskProps {
  data: Practical;
  alreadyCompleted: boolean;
  onComplete: () => void;
}

export default function PracticalTask({ data, alreadyCompleted, onComplete }: PracticalTaskProps) {
  const steps = data.steps ?? [];
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>(() => steps.map(() => false));
  const [done, setDone] = useState(alreadyCompleted);

  const toggleStep = (i: number) => {
    if (done) return;
    setCheckedSteps((prev) => prev.map((c, idx) => (idx === i ? !c : c)));
  };

  const allChecked = steps.length === 0 || checkedSteps.every(Boolean);

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  return (
    <div className="block">
      <div className="eyebrow">Amaliy topshiriq</div>
      <p className="body">{data.task}</p>

      <a
        href={data.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost"
        style={{ marginTop: 14 }}
      >
        {data.targetName} ni ochish <IconExternalLink />
      </a>

      {steps.length > 0 && (
        <div className="opts" style={{ marginTop: 18 }}>
          {steps.map((step, i) => (
            <button
              key={i}
              type="button"
              className={`opt${checkedSteps[i] ? " sel" : ""}`}
              onClick={() => toggleStep(i)}
              disabled={done}
            >
              <span className="box">
                <IconCheck />
              </span>
              <span>{step}</span>
            </button>
          ))}
        </div>
      )}

      {!done && (
        <button
          type="button"
          className="btn btn-primary btn-block"
          style={{ marginTop: 22 }}
          disabled={!allChecked}
          onClick={handleComplete}
        >
          Bajardim
        </button>
      )}

      {done && data.debrief && (
        <div className="explain" style={{ marginTop: 20 }}>
          <h4>
            <IconLightbulb /> Xulosa
          </h4>
          <p>{data.debrief}</p>
        </div>
      )}
    </div>
  );
}
