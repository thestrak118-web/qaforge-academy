"use client";

import { useState } from "react";
import { IconGrid } from "@/lib/icons";

const HEAT_MONTHS = ["Avg", "Sen", "Okt", "Noy", "Dek", "Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul"];

function generateGrid(): number[][] {
  const weeks = 52;
  const days = 7;
  return Array.from({ length: weeks }, () => Array.from({ length: days }, () => Math.random()));
}

function bgFor(lvl: number) {
  if (lvl > 0.85) return "var(--lime)";
  if (lvl > 0.7) return "rgba(163,255,18,.7)";
  if (lvl > 0.5) return "rgba(163,255,18,.45)";
  if (lvl > 0.32) return "rgba(163,255,18,.22)";
  return "rgba(255,255,255,.05)";
}

// Rendered client-only via next/dynamic(ssr:false) in app/stats/page.tsx, so
// this lazy useState initializer never runs during SSR — no hydration
// mismatch from the random heat levels (ported from the reference's
// renderHeat(), which is likewise pure client-side).
export default function ActivityHeatmap() {
  const [grid] = useState(generateGrid);

  return (
    <div className="heat-card">
      <h3 style={{ fontSize: 14.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 9 }}>
        <IconGrid />
        Faollik
      </h3>
      <div className="sub" style={{ fontSize: 12, color: "var(--dim)", marginTop: 2 }}>
        Namunaviy issiqlik xaritasi — Phase 2&apos;da haqiqiy faoliyatga ulanadi.
      </div>
      <div className="heat-months">
        {HEAT_MONTHS.map((m) => (
          <span key={m} style={{ width: (52 * 16) / 12 }}>
            {m}
          </span>
        ))}
      </div>
      <div className="heat">
        {grid.map((col, wi) => (
          <div key={wi} className="heat-col">
            {col.map((lvl, di) => (
              <div key={di} className="heat-cell" style={{ background: bgFor(lvl) }} />
            ))}
          </div>
        ))}
      </div>
      <div className="heat-legend">
        Kam
        <i style={{ background: "rgba(255,255,255,.05)" }} />
        <i style={{ background: "rgba(163,255,18,.25)" }} />
        <i style={{ background: "rgba(163,255,18,.5)" }} />
        <i style={{ background: "rgba(163,255,18,.75)" }} />
        <i style={{ background: "var(--lime)" }} />
        Ko&apos;p
      </div>
    </div>
  );
}
