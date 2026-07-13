import { MOCK_BADGES } from "@/data/showcase-mock";
import { BADGE_ICON } from "@/lib/badge-icons";
import { IconCheck } from "@/lib/icons";

export default function BadgesPage() {
  const earnedCount = MOCK_BADGES.filter((b) => b.earned).length;

  return (
    <section>
      <div className="page-head">
        <h1>Yutuqlar</h1>
        <p>
          {earnedCount} / {MOCK_BADGES.length} badge ochilgan · namunaviy ko&apos;rinish — Phase
          2&apos;da haqiqiy progressga ulanadi.
        </p>
      </div>

      <div className="badge-grid">
        {MOCK_BADGES.map((b) => (
          <div key={b.name} className={`bcard${b.earned ? "" : " locked"}`}>
            {b.earned && (
              <div className="b-earned">
                <IconCheck /> Olindi
              </div>
            )}
            <div className="hex">
              <div
                className="hex-shape"
                style={
                  b.earned
                    ? {
                        background: `linear-gradient(140deg, ${b.color}22, ${b.color}0a)`,
                        boxShadow: `0 0 0 1px ${b.color}55, 0 8px 22px -10px ${b.color}`,
                      }
                    : undefined
                }
              />
              <div style={{ color: b.earned ? b.color : undefined, width: 30, height: 30 }}>
                {BADGE_ICON[b.icon]}
              </div>
            </div>
            <h4>{b.name}</h4>
            <p>{b.desc}</p>
            {!b.earned && b.goal && (
              <div className="b-prog">
                {Math.min(b.progress ?? 0, b.goal)}/{b.goal}
                <div className="bar">
                  <i style={{ width: `${Math.min(100, ((b.progress ?? 0) / b.goal) * 100)}%` }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
