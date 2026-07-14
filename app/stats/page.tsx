"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useScore } from "@/lib/score-context";
import type { SolvedSubmission } from "@/lib/score-context";
import { useLessonProgress } from "@/lib/lesson-progress-context";
import { CHALLENGES, type Domain } from "@/data/challenges";
import { DOMAIN_LABEL } from "@/components/ChallengeCard";
import { ALL_SECTIONS } from "@/data/lessons";
import { getOverallProgress } from "@/lib/lessons";
import { IconBolt, IconCheck, IconTrendChart, IconStats, IconTrendUp } from "@/lib/icons";

// Client-only: reads the viewer's local date to bucket activity by day —
// must never run during SSR to avoid a hydration mismatch.
const ActivityHeatmap = dynamic(() => import("@/components/ActivityHeatmap"), {
  ssr: false,
});

const DOMAIN_COLOR: Record<Domain, string> = {
  ecommerce: "#A3FF12",
  api: "#22D3EE",
  banking: "#FBBF24",
  forms: "#C084FC",
  web: "#F43F5E",
};

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const WEEK_LABELS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

/** Sums points_earned into 8 rolling weekly buckets, oldest first, this week last. */
function buildWeeklyXp(submissions: SolvedSubmission[]): number[] {
  const buckets = Array<number>(8).fill(0);
  const now = Date.now();
  for (const s of submissions) {
    const diff = Math.max(0, now - new Date(s.solvedAt).getTime());
    const bucketFromEnd = Math.floor(diff / WEEK_MS);
    const idx = 7 - bucketFromEnd;
    if (idx >= 0 && idx < 8) buckets[idx] += s.pointsEarned;
  }
  return buckets;
}

interface DomainSlice {
  label: string;
  value: number;
  color: string;
}

function buildCategoryDistribution(solvedIds: string[]): DomainSlice[] {
  const counts = new Map<Domain, number>();
  for (const id of solvedIds) {
    const domain = CHALLENGES.find((c) => c.id === id)?.domain;
    if (!domain) continue;
    counts.set(domain, (counts.get(domain) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([domain, count]) => ({
    label: DOMAIN_LABEL[domain],
    value: count,
    color: DOMAIN_COLOR[domain],
  }));
}

function XpChart({ data }: { data: number[] }) {
  const max = Math.max(1, ...data);
  const W = 100;
  const gap = 6;
  const bw = (W - gap * (data.length - 1)) / data.length;

  return (
    <div style={{ marginTop: 16 }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: 150 }}>
        <defs>
          <linearGradient id="xp-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#A3FF12" />
            <stop offset="1" stopColor="#A3FF12" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {[25, 50, 75].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,.05)" strokeWidth="0.4" />
        ))}
        {data.map((d, i) => {
          const h = (d / max) * 100;
          const x = i * (bw + gap);
          const y = 100 - h;
          return <rect key={i} x={x} y={y} width={bw} height={h} rx="1.6" fill="url(#xp-gradient)" />;
        })}
      </svg>
      <div
        className="mono"
        style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10.5, color: "var(--dim)" }}
      >
        {WEEK_LABELS.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function Donut({ data, total }: { data: DomainSlice[]; total: number }) {
  const r = 54;
  const C = 2 * Math.PI * r;

  const segments = data.reduce<Array<DomainSlice & { len: number; offset: number }>>((acc, d) => {
    const len = (d.value / total) * C;
    const offset = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].len : 0;
    return [...acc, { ...d, len, offset }];
  }, []);

  return (
    <div className="donut-wrap" style={{ marginTop: 18 }}>
      <div style={{ position: "relative", width: 130, height: 130, flex: "none" }}>
        <svg width="130" height="130" viewBox="0 0 130 130">
          {segments.map((d) => (
            <circle
              key={d.label}
              cx="65"
              cy="65"
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth="14"
              strokeDasharray={`${d.len} ${C - d.len}`}
              strokeDashoffset={-d.offset}
              transform="rotate(-90 65 65)"
              style={{ filter: `drop-shadow(0 0 3px ${d.color}55)` }}
            />
          ))}
        </svg>
        <div className="donut-center">
          <b className="mono">{total}</b>
          <span>challenge</span>
        </div>
      </div>
      <div className="legend" style={{ flexDirection: "column", gap: 10, marginTop: 0 }}>
        {data.map((d) => (
          <span key={d.label}>
            <i style={{ background: d.color }} />
            {d.label} ·{" "}
            <b style={{ color: "var(--text)", fontFamily: "var(--font-jetbrains-mono)" }}>
              {Math.round((d.value / total) * 100)}%
            </b>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function StatsPage() {
  const { points, solvedIds, submissions } = useScore();
  const { completions, isCompleted } = useLessonProgress();

  const totalSections = ALL_SECTIONS.length;
  const { completed: completedSections } = getOverallProgress(isCompleted);
  const sectionsPercent = totalSections === 0 ? 0 : Math.round((completedSections / totalSections) * 100);

  const weekly = useMemo(() => buildWeeklyXp(submissions), [submissions]);
  const category = useMemo(() => buildCategoryDistribution(solvedIds), [solvedIds]);

  const activity = useMemo(() => {
    const map = new Map<string, number>();
    const bump = (iso: string) => {
      const key = iso.slice(0, 10);
      map.set(key, (map.get(key) ?? 0) + 1);
    };
    submissions.forEach((s) => bump(s.solvedAt));
    completions.forEach((c) => bump(c.completedAt));
    return map;
  }, [submissions, completions]);

  return (
    <section>
      <div className="page-head">
        <h1>Statistika</h1>
        <p>Sizning haqiqiy test tarixingiz va faoliyatingiz.</p>
      </div>

      <div className="mini-stats">
        <div className="stat">
          <div className="stat-ic" style={{ background: "var(--lime-soft)", color: "var(--lime)" }}>
            <IconBolt />
          </div>
          <div className="k">{points.toLocaleString()}</div>
          <div className="l">Umumiy ball</div>
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
            <IconTrendChart />
          </div>
          <div className="k">{sectionsPercent}%</div>
          <div className="l">Darslar yakunlandi</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="chart-card">
          <h3>
            <IconStats />
            Haftalik XP
          </h3>
          <div className="sub">Oxirgi 8 hafta davomida olingan tajriba</div>
          <XpChart data={weekly} />
        </div>

        <div className="chart-card">
          <h3>
            <IconTrendUp />
            Kategoriya taqsimoti
          </h3>
          <div className="sub">Qayerga ko&apos;proq e&apos;tibor berganingiz</div>
          {category.length === 0 ? (
            <p style={{ marginTop: 32, color: "var(--dim-text)", fontSize: 13 }}>
              Hali yechilgan challenge yo&apos;q.
            </p>
          ) : (
            <Donut data={category} total={solvedIds.length} />
          )}
        </div>
      </div>

      <ActivityHeatmap activity={activity} />
    </section>
  );
}
