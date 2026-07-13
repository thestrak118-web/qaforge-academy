"use client";

import { useMemo, useState } from "react";
import { CHALLENGES } from "@/data/challenges";
import type { Difficulty, Domain } from "@/data/challenges";
import ChallengeCard, {
  DIFFICULTY_LABEL,
  DOMAIN_LABEL,
} from "@/components/ChallengeCard";
import { DIFFICULTY_CHIP_CLASS } from "@/lib/challenge-style";
import { useScore } from "@/lib/score-context";

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
const DOMAINS: Domain[] = ["ecommerce", "api", "banking", "forms", "web"];

export default function ChallengesPage() {
  const { isSolved } = useScore();
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [domain, setDomain] = useState<Domain | "all">("all");

  const filtered = useMemo(() => {
    return CHALLENGES.filter((c) => {
      if (difficulty !== "all" && c.difficulty !== difficulty) return false;
      if (domain !== "all" && c.domain !== domain) return false;
      return true;
    });
  }, [difficulty, domain]);

  return (
    <section>
      <div className="page-head">
        <h1>Challenge Hub</h1>
        <p>Real amaliy saytlarda QA ko&apos;nikmalaringizni sinang. Buglarni toping, o&apos;rganing, daraja oshiring.</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <span>Domen</span>
          <button
            type="button"
            className={`chip${domain === "all" ? " active" : ""}`}
            onClick={() => setDomain("all")}
          >
            Barchasi
          </button>
          {DOMAINS.map((d) => (
            <button
              key={d}
              type="button"
              className={`chip${domain === d ? " active" : ""}`}
              onClick={() => setDomain(d)}
            >
              {DOMAIN_LABEL[d]}
            </button>
          ))}
        </div>
        <div className="filter-group">
          <span>Qiyinlik</span>
          <button
            type="button"
            className={`chip${difficulty === "all" ? " active" : ""}`}
            onClick={() => setDifficulty("all")}
          >
            Barchasi
          </button>
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              type="button"
              className={`chip ${DIFFICULTY_CHIP_CLASS[d]}${difficulty === d ? " active" : ""}`}
              onClick={() => setDifficulty(d)}
            >
              {DIFFICULTY_LABEL[d]}
            </button>
          ))}
        </div>
      </div>

      <div className="ch-grid">
        {filtered.map((c) => (
          <ChallengeCard key={c.id} challenge={c} solved={isSolved(c.id)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ marginTop: 48, textAlign: "center", color: "var(--dim-text)" }}>
          Bu filtrlarga mos challenge topilmadi.
        </p>
      )}
    </section>
  );
}
