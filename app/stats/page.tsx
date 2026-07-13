"use client";

import dynamic from "next/dynamic";
import { MOCK_WEEKLY_XP, MOCK_CATEGORY_DISTRIBUTION } from "@/data/showcase-mock";
import { IconBolt, IconCheck, IconTrendChart, IconStats, IconTrendUp } from "@/lib/icons";

// Client-only: renders random heat levels (see components/ActivityHeatmap.tsx)
// and must never run during SSR to avoid a hydration mismatch.
const ActivityHeatmap = dynamic(() => import("@/components/ActivityHeatmap"), {
  ssr: false,
});

function XpChart() {
  const data = MOCK_WEEKLY_XP;
  const max = Math.max(...data);
  const W = 100;
  const gap = 6;
  const bw = (W - gap * (data.length - 1)) / data.length;
  const labels = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

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
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function Donut() {
  const data = MOCK_CATEGORY_DISTRIBUTION;
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 54;
  const C = 2 * Math.PI * r;

  const segments = data.reduce<Array<(typeof data)[number] & { len: number; offset: number }>>(
    (acc, d) => {
      const len = (d.value / total) * C;
      const offset = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].len : 0;
      return [...acc, { ...d, len, offset }];
    },
    []
  );

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
          <b className="mono">24</b>
          <span>challenge</span>
        </div>
      </div>
      <div className="legend" style={{ flexDirection: "column", gap: 10, marginTop: 0 }}>
        {data.map((d) => (
          <span key={d.label}>
            <i style={{ background: d.color }} />
            {d.label} ·{" "}
            <b style={{ color: "var(--text)", fontFamily: "var(--font-jetbrains-mono)" }}>{d.value}%</b>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function StatsPage() {
  return (
    <section>
      <div className="page-head">
        <h1>Statistika</h1>
        <p>Namunaviy ko&apos;rinish — Phase 2&apos;da haqiqiy test tarixingizga ulanadi.</p>
      </div>

      <div className="mini-stats">
        <div className="stat">
          <div className="stat-ic" style={{ background: "var(--lime-soft)", color: "var(--lime)" }}>
            <IconBolt />
          </div>
          <div className="k">3,410</div>
          <div className="l">Shu oydagi XP</div>
        </div>
        <div className="stat">
          <div className="stat-ic" style={{ background: "var(--emerald-soft)", color: "var(--emerald)" }}>
            <IconCheck />
          </div>
          <div className="k">24</div>
          <div className="l">Jami yechilgan</div>
        </div>
        <div className="stat">
          <div className="stat-ic" style={{ background: "var(--cyan-soft)", color: "var(--cyan)" }}>
            <IconTrendChart />
          </div>
          <div className="k">92%</div>
          <div className="l">Muvaffaqiyat darajasi</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="chart-card">
          <h3>
            <IconStats />
            Haftalik XP
          </h3>
          <div className="sub">Oxirgi 8 hafta davomida olingan tajriba</div>
          <XpChart />
        </div>

        <div className="chart-card">
          <h3>
            <IconTrendUp />
            Kategoriya taqsimoti
          </h3>
          <div className="sub">Qayerga ko&apos;proq e&apos;tibor berganingiz</div>
          <Donut />
        </div>
      </div>

      <ActivityHeatmap />
    </section>
  );
}
