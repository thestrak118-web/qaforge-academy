"use client";

import Link from "next/link";
import { CHALLENGES } from "@/data/challenges";
import { IconChallenges, IconLearn, IconMentor, IconArrowRight } from "@/lib/icons";

const firstChallengeId = CHALLENGES[0]?.id ?? "";

const ACTIONS = [
  {
    href: "/challenges",
    label: "Challenge'lar",
    sub: "Amaliy vazifalarni yeching",
    icon: <IconChallenges />,
    bg: "var(--lime-soft)",
    color: "var(--lime)",
  },
  {
    href: "/learn",
    label: "Darslar",
    sub: "Nazariyani o'rganing",
    icon: <IconLearn />,
    bg: "var(--cyan-soft)",
    color: "var(--cyan)",
  },
  {
    href: firstChallengeId ? `/challenges/${firstChallengeId}` : "/challenges",
    label: "AI Mentor",
    sub: "Maslahat oling",
    icon: <IconMentor />,
    bg: "rgba(251,191,36,.14)",
    color: "var(--yellow)",
  },
];

export default function QuickActions() {
  return (
    <div className="card" style={{ padding: "22px 24px" }}>
      <div className="sec-head">
        <h2>Tezkor amallar</h2>
      </div>
      <div className="qa-grid">
        {ACTIONS.map((action) => (
          <Link key={action.href + action.label} href={action.href} className="qa-item">
            <div className="qa-ic" style={{ background: action.bg, color: action.color }}>
              {action.icon}
            </div>
            <div className="qa-main">
              <b>{action.label}</b>
              <span>{action.sub}</span>
            </div>
            <div className="qa-go">
              <IconArrowRight />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
