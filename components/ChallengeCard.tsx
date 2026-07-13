import Link from "next/link";
import type { Challenge } from "@/data/challenges";
import { DOMAIN_STYLE, DIFFICULTY_CLASS } from "@/lib/challenge-style";
import { IconBolt, IconCheck } from "@/lib/icons";

export const DIFFICULTY_LABEL: Record<Challenge["difficulty"], string> = {
  easy: "Oson",
  medium: "O'rta",
  hard: "Qiyin",
};

export const DOMAIN_LABEL: Record<Challenge["domain"], string> = {
  ecommerce: "E-commerce",
  api: "API",
  banking: "Banking",
  forms: "Formalar",
  web: "Web",
};

interface ChallengeCardProps {
  challenge: Challenge;
  solved: boolean;
}

export default function ChallengeCard({ challenge, solved }: ChallengeCardProps) {
  const style = DOMAIN_STYLE[challenge.domain];

  return (
    <Link href={`/challenges/${challenge.id}`} className="ch-card">
      <div className="ch-top">
        <div className="ch-ic" style={{ background: style.bg, color: style.color }}>
          {style.icon}
        </div>
        <span className={`badge-diff ${DIFFICULTY_CLASS[challenge.difficulty]}`}>
          {DIFFICULTY_LABEL[challenge.difficulty]}
        </span>
      </div>

      <div>
        <h3>{challenge.title}</h3>
        <div className="ch-cat">{DOMAIN_LABEL[challenge.domain]}</div>
      </div>

      <p className="ch-desc">{challenge.mission}</p>

      <div className="ch-meta">
        <span className="xp">
          <IconBolt /> {challenge.points} XP
        </span>
        <span>{challenge.targetName}</span>
      </div>

      <div className="ch-foot">
        {solved ? (
          <span className="done-tag">
            <IconCheck /> Yechildi
          </span>
        ) : (
          <span className="btn btn-primary btn-sm">Boshlash</span>
        )}
        <span className="link">Tafsilotlar ›</span>
      </div>
    </Link>
  );
}
