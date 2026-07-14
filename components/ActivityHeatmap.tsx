"use client";

// Real activity heatmap: `activity` maps "YYYY-MM-DD" -> event count, built
// from the user's actual challenge_submissions + lesson_progress timestamps
// (see app/stats/page.tsx). Rendered client-only via next/dynamic(ssr:false)
// so "today" is always the viewer's local date.

import { IconGrid } from "@/lib/icons";

const HEAT_MONTHS = ["Avg", "Sen", "Okt", "Noy", "Dek", "Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul"];
const WEEKS = 52;
const DAYS = 7;

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function levelFor(count: number) {
  if (count <= 0) return 0;
  if (count === 1) return 0.4;
  if (count === 2) return 0.6;
  if (count === 3) return 0.8;
  return 1;
}

function bgFor(lvl: number) {
  if (lvl > 0.85) return "var(--lime)";
  if (lvl > 0.7) return "rgba(163,255,18,.7)";
  if (lvl > 0.5) return "rgba(163,255,18,.45)";
  if (lvl > 0.32) return "rgba(163,255,18,.22)";
  return "rgba(255,255,255,.05)";
}

function buildGrid(activity: Map<string, number>): number[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const grid: number[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const col: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      const offsetDays = (WEEKS - 1 - w) * 7 + (DAYS - 1 - d);
      const date = new Date(today);
      date.setDate(date.getDate() - offsetDays);
      col.push(levelFor(activity.get(dateKey(date)) ?? 0));
    }
    grid.push(col);
  }
  return grid;
}

interface ActivityHeatmapProps {
  activity: Map<string, number>;
}

export default function ActivityHeatmap({ activity }: ActivityHeatmapProps) {
  const grid = buildGrid(activity);
  const hasActivity = activity.size > 0;

  return (
    <div className="heat-card">
      <h3 style={{ fontSize: 14.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 9 }}>
        <IconGrid />
        Faollik
      </h3>
      <div className="sub" style={{ fontSize: 12, color: "var(--dim)", marginTop: 2 }}>
        {hasActivity
          ? "Oxirgi 12 oydagi haqiqiy faoliyatingiz."
          : "Hali faoliyat yo'q — challenge yeching yoki dars yakunlang."}
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
