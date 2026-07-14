"use client";

import { IconProfile, IconTrophy } from "@/lib/icons";
import { useScore } from "@/lib/score-context";
import { useLessonProgress } from "@/lib/lesson-progress-context";
import { useAuth } from "@/lib/auth-context";
import { ALL_SECTIONS } from "@/data/lessons";
import { getOverallProgress } from "@/lib/lessons";
import { getRankProgress } from "@/lib/scoring";

const SECTION_RING_RADIUS = 50;
const SECTION_RING_CIRCUMFERENCE = 2 * Math.PI * SECTION_RING_RADIUS;

export default function ProfilePage() {
  const { points, solvedIds } = useScore();
  const { isCompleted } = useLessonProgress();
  const { user, profile } = useAuth();

  const rankProgress = getRankProgress(points);

  const totalSections = ALL_SECTIONS.length;
  const { completed: completedSections, percent: sectionPercent } = getOverallProgress(isCompleted);
  const sectionOffset = SECTION_RING_CIRCUMFERENCE * (1 - sectionPercent / 100);

  return (
    <section>
      <div className="page-head">
        <h1>Profile</h1>
      </div>

      <div className="profile-grid">
        <div className="pcard">
          <div className="avatar">
            <IconProfile />
          </div>
          <h2>{profile?.display_name ?? "…"}</h2>
          <div className="email">{user?.email ?? ""}</div>
          <div className="role-badge">
            <IconTrophy /> {rankProgress.rank}
          </div>
          <div className="pstats">
            <div className="pstat lime">
              <div className="k">{points.toLocaleString()}</div>
              <div className="l">Ball</div>
            </div>
            <div className="pstat cyan">
              <div className="k">{solvedIds.length}</div>
              <div className="l">Yechilgan</div>
            </div>
          </div>
        </div>

        <div>
          {totalSections > 0 && (
            <div className="ring-card">
              {/* Tailwind's built-in `ring` box-shadow utility collides with this
                  class name, so the ring wrapper is positioned inline instead. */}
              <div style={{ position: "relative", width: 118, height: 118, flex: "none" }}>
                <svg width="118" height="118" viewBox="0 0 118 118" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="59" cy="59" r={SECTION_RING_RADIUS} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="11" />
                  <circle
                    cx="59"
                    cy="59"
                    r={SECTION_RING_RADIUS}
                    fill="none"
                    stroke="var(--lime)"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeDasharray={SECTION_RING_CIRCUMFERENCE}
                    strokeDashoffset={sectionOffset}
                    style={{ filter: "drop-shadow(0 0 6px var(--lime-line))" }}
                  />
                </svg>
                <div className="ring-center">
                  <b>{sectionPercent}%</b>
                  <span>section&apos;lar</span>
                </div>
              </div>
              <div className="ring-info">
                <h3>Darslar progressi</h3>
                <p>
                  {totalSections} ta section&apos;dan {completedSections} tasini yakunladingiz.
                </p>
              </div>
            </div>
          )}

          <div className="lvl-card">
            <div className="lvl-top">
              <div className="now">
                <span className="lvl-chip">{rankProgress.rank}</span>
              </div>
              {rankProgress.nextRank && (
                <div className="lvl-next">Keyingi: {rankProgress.nextRank}</div>
              )}
            </div>
            <div className="bar">
              <i style={{ width: `${rankProgress.percent}%` }} />
            </div>
            <div className="lvl-xp">
              {rankProgress.isMaxRank
                ? "Eng yuqori darajadasiz"
                : `${rankProgress.points} / ${rankProgress.pointsForNext} ball keyingi darajagacha`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
