import { createClient } from "@/lib/supabase/server";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((x) => x[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("leaderboard")
    .select("rank, id, display_name, points")
    .order("rank", { ascending: true })
    .limit(100);

  const leaders = data ?? [];
  const top3 = leaders.slice(0, 3);
  const podiumOrder = [top3[1], top3[0], top3[2]];
  const podiumClass = ["p2", "p1", "p3"];

  return (
    <section>
      <div className="page-head">
        <h1>Leaderboard</h1>
        <p>Global reyting — ball bo&apos;yicha.</p>
      </div>

      {leaders.length === 0 ? (
        <p style={{ marginTop: 48, textAlign: "center", color: "var(--dim-text)" }}>
          Hali hech kim challenge yechmagan. Birinchi bo&apos;ling!
        </p>
      ) : (
        <>
          {top3.length > 0 && (
            <div className="podium">
              {podiumOrder.map((l, i) =>
                l ? (
                  <div key={l.id} className={`pod ${podiumClass[i]}`}>
                    {podiumClass[i] === "p1" && <div className="pod-crown">👑</div>}
                    <div className="pod-medal">#{l.rank}</div>
                    <div className="avatar">{initials(l.display_name)}</div>
                    <div className="pod-name">{l.display_name}</div>
                    <div className="pod-pts mono">{l.points.toLocaleString()}</div>
                  </div>
                ) : (
                  <div key={podiumClass[i]} className={`pod ${podiumClass[i]}`} />
                )
              )}
            </div>
          )}

          <div className="lb-table">
            <div className="lb-th">
              <span>Rank</span>
              <span>Testchi</span>
              <span>Ball</span>
            </div>
            {leaders.map((l) => (
              <div key={l.id} className={`lb-tr${l.id === user?.id ? " me" : ""}`}>
                <span className="rk">{l.rank}</span>
                <div className="lb-user">
                  <div className="avatar sm">{initials(l.display_name)}</div>
                  <div>
                    <b>{l.display_name}</b>
                  </div>
                </div>
                <span className="lb-cell pts">{l.points.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
