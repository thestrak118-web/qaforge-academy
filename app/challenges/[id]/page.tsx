"use client";

import { use } from "react";
import Link from "next/link";
import { CHALLENGES } from "@/data/challenges";
import { DIFFICULTY_LABEL, DOMAIN_LABEL } from "@/components/ChallengeCard";
import { DOMAIN_STYLE, DIFFICULTY_CLASS } from "@/lib/challenge-style";
import MissionPanel from "@/components/MissionPanel";
import SubmitTask from "@/components/SubmitTask";
import MentorPanel from "@/components/MentorPanel";
import { useScore } from "@/lib/score-context";
import { IconArrowLeft, IconBolt, IconExternalLink } from "@/lib/icons";

export default function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const challenge = CHALLENGES.find((c) => c.id === id);
  const { isSolved, recordSolve } = useScore();

  if (!challenge) {
    return (
      <section style={{ textAlign: "center", padding: "64px 0" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Challenge topilmadi</h1>
        <Link href="/challenges" className="link" style={{ marginTop: 16, display: "inline-flex" }}>
          <IconArrowLeft /> Challenge Hub&apos;ga qaytish
        </Link>
      </section>
    );
  }

  const style = DOMAIN_STYLE[challenge.domain];

  return (
    <section>
      <Link href="/challenges" className="back">
        <IconArrowLeft />
        Challenge Hub
      </Link>

      <div className="detail-grid">
        <div>
          <div className="detail-hero">
            <div className="dh-top">
              <div className="dh-title">
                <div className="ch-ic" style={{ background: style.bg, color: style.color }}>
                  {style.icon}
                </div>
                <div>
                  <h1>
                    {challenge.title}{" "}
                    <span className={`badge-diff ${DIFFICULTY_CLASS[challenge.difficulty]}`}>
                      {DIFFICULTY_LABEL[challenge.difficulty]}
                    </span>
                  </h1>
                  <div className="dh-meta">
                    <span>
                      {style.icon} {DOMAIN_LABEL[challenge.domain]}
                    </span>
                    <span className="xp">
                      <IconBolt /> {challenge.points} XP
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={challenge.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                {challenge.targetName} ni ochish
                <IconExternalLink />
              </a>
            </div>

            <MissionPanel mission={challenge.mission} />

            <SubmitTask
              taskPrompt={challenge.taskPrompt}
              taskKind={challenge.taskKind}
              options={challenge.options}
              points={challenge.points}
              groundTruth={challenge.groundTruth}
              alreadySolved={isSolved(challenge.id)}
              onCorrect={() => recordSolve(challenge.id, challenge.points)}
            />
          </div>
        </div>

        <MentorPanel hints={challenge.mentorHints} />
      </div>
    </section>
  );
}
