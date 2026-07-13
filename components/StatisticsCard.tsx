"use client";

// Real values only, sourced from useScore(). "XP" and "Total Points" are the
// same underlying field in this codebase (points are awarded as XP) — shown
// once here rather than duplicated under two labels.

import { useScore } from "@/lib/score-context";
import { IconBolt, IconCheck, IconTrophy } from "@/lib/icons";

export default function StatisticsCard() {
  const { points, solvedIds, rank } = useScore();

  return (
    <div className="stat-row">
      <div className="stat">
        <div className="stat-ic" style={{ background: "var(--lime-soft)", color: "var(--lime)" }}>
          <IconBolt />
        </div>
        <div className="k">{points.toLocaleString()}</div>
        <div className="l">XP / Umumiy ball</div>
      </div>
      <div className="stat">
        <div className="stat-ic" style={{ background: "var(--emerald-soft)", color: "var(--emerald)" }}>
          <IconCheck />
        </div>
        <div className="k">{solvedIds.length}</div>
        <div className="l">Yechilgan challenge&apos;lar</div>
      </div>
      <div className="stat">
        <div className="stat-ic" style={{ background: "var(--cyan-soft)", color: "var(--cyan)" }}>
          <IconTrophy />
        </div>
        <div className="k" style={{ fontSize: 16 }}>{rank}</div>
        <div className="l">Joriy daraja</div>
      </div>
    </div>
  );
}
