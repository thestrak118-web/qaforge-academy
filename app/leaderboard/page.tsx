import { MOCK_LEADERS } from "@/data/showcase-mock";
import { IconTrendUp, IconTrendDown, IconTrendFlat } from "@/lib/icons";

const TREND_ICON = {
  1: <IconTrendUp />,
  0: <IconTrendFlat />,
  "-1": <IconTrendDown />,
} as const;

const TREND_CLASS = {
  1: "up",
  0: "flat",
  "-1": "down",
} as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((x) => x[0])
    .join("");
}

export default function LeaderboardPage() {
  const podiumOrder = [MOCK_LEADERS[1], MOCK_LEADERS[0], MOCK_LEADERS[2]];
  const podiumClass = ["p2", "p1", "p3"];
  const podiumRank = [2, 1, 3];

  return (
    <section>
      <div className="page-head">
        <h1>Leaderboard</h1>
        <p>Global reyting · namunaviy ma&apos;lumot — Phase 2&apos;da jonli reytingga ulanadi.</p>
      </div>

      <div className="podium">
        {podiumOrder.map((l, i) => (
          <div key={l.name} className={`pod ${podiumClass[i]}`}>
            {podiumClass[i] === "p1" && <div className="pod-crown">👑</div>}
            <div className="pod-medal">#{podiumRank[i]}</div>
            <div className="avatar">{initials(l.name)}</div>
            <div className="pod-name">
              {l.name} <span className="flag">{l.flag}</span>
            </div>
            <div className="pod-role">{l.role}</div>
            <div className="pod-pts mono">{l.points.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="lb-table">
        <div className="lb-th">
          <span>Rank</span>
          <span>Testchi</span>
          <span>Yechilgan</span>
          <span>Streak</span>
          <span>Ball</span>
        </div>
        {MOCK_LEADERS.map((l, i) => (
          <div key={l.name} className={`lb-tr${l.me ? " me" : ""}`}>
            <span className="rk">{i + 1}</span>
            <div className="lb-user">
              <div className="avatar sm">{initials(l.name)}</div>
              <div>
                <b>
                  {l.name} <span className="flag">{l.flag}</span>
                </b>
                <small>{l.role}</small>
              </div>
            </div>
            <span className="lb-cell">{l.solved} yechildi</span>
            <span className="lb-cell">🔥 {l.streak}k</span>
            <span className="lb-cell pts">
              {l.points.toLocaleString()}
              <span className={`trend ${TREND_CLASS[l.trend]}`}>{TREND_ICON[l.trend]}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
