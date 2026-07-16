"use client";

import { useState } from "react";
import Link from "next/link";
import { useScore } from "@/lib/score-context";
import { useLessonProgress } from "@/lib/lesson-progress-context";
import { useAuth } from "@/lib/auth-context";
import { ALL_SECTIONS, getSection } from "@/data/lessons";
import { CHALLENGES } from "@/data/challenges";
import { getRankProgress } from "@/lib/scoring";
import EditProfileModal from "@/components/EditProfileModal";
import { IconShield, IconGrid, IconArrowRight, IconBolt, IconCheck } from "@/lib/icons";

const SECTION_RING_RADIUS = 42;
const SECTION_RING_CIRCUMFERENCE = 2 * Math.PI * SECTION_RING_RADIUS;
const CHALLENGE_RING_RADIUS = 42;
const CHALLENGE_RING_CIRCUMFERENCE = 2 * Math.PI * CHALLENGE_RING_RADIUS;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function timeAgoUz(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "hozirgina";
  if (min < 60) return `${min} daqiqa oldin`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} soat oldin`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} kun oldin`;
  return new Date(iso).toLocaleDateString("uz-UZ");
}

interface ActivityItem {
  key: string;
  type: "challenge" | "lesson";
  title: string;
  subtitle: string;
  xpLabel: string;
  date: string;
}

export default function ProfilePage() {
  const { points, solvedIds, submissions } = useScore();
  const { completedIds, completions } = useLessonProgress();
  const { user, displayName, loading } = useAuth();
  const [editing, setEditing] = useState(false);

  const rankProgress = getRankProgress(points);

  const totalSections = ALL_SECTIONS.length;
  const completedSections = completedIds.length;
  const sectionPercent =
    totalSections === 0 ? 0 : Math.round((completedSections / totalSections) * 100);
  const sectionOffset = SECTION_RING_CIRCUMFERENCE * (1 - sectionPercent / 100);

  const totalChallenges = CHALLENGES.length;
  const solvedCount = solvedIds.length;
  const challengePercent =
    totalChallenges === 0 ? 0 : Math.round((solvedCount / totalChallenges) * 100);
  const challengeOffset = CHALLENGE_RING_CIRCUMFERENCE * (1 - challengePercent / 100);

  const activity: ActivityItem[] = [
    ...submissions.map((s) => ({
      key: `c-${s.challengeId}`,
      type: "challenge" as const,
      title: CHALLENGES.find((c) => c.id === s.challengeId)?.title ?? s.challengeId,
      subtitle: timeAgoUz(s.solvedAt),
      xpLabel: `+${s.pointsEarned} XP`,
      date: s.solvedAt,
    })),
    ...completions.map((c) => ({
      key: `l-${c.sectionId}`,
      type: "lesson" as const,
      title: getSection(c.sectionId)?.title ?? c.sectionId,
      subtitle: timeAgoUz(c.completedAt),
      xpLabel: "Bajarildi",
      date: c.completedAt,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <section>
      <div className="profile-stack">
        <div className="card profile-header">
          <div className="profile-header-left">
            <div className="profile-avatar" aria-hidden>
              <svg viewBox="0 0 100 100">
                <polygon
                  points="50 5, 90 27.5, 90 72.5, 50 95, 10 72.5, 10 27.5"
                  fill="var(--lime-soft)"
                  stroke="var(--lime)"
                  strokeWidth="2"
                />
              </svg>
              {!loading && <span>{initials(displayName)}</span>}
            </div>
            <div>
              {loading ? (
                <span className="skeleton" style={{ width: 160, height: 24, display: "block" }} />
              ) : (
                <h1 className="profile-name">{displayName}</h1>
              )}
              <p className="profile-email">{user?.email ?? ""}</p>
            </div>
          </div>
          <button type="button" className="btn-outline" onClick={() => setEditing(true)}>
            Profilni tahrirlash
          </button>
        </div>

        <div className="card profile-rank-card">
          <div className="profile-rank-left">
            <div className="profile-rank-icon">
              <IconShield />
            </div>
            <div>
              <span className="profile-rank-label">Daraja</span>
              <h2 className="profile-rank-name">{rankProgress.rank}</h2>
            </div>
          </div>
          <div className="profile-rank-right">
            <div className="profile-xp-top">
              {rankProgress.isMaxRank
                ? `${rankProgress.points.toLocaleString()} ball`
                : `${rankProgress.points} / ${rankProgress.pointsForNext}`}
            </div>
            <div className="bar">
              <i style={{ width: `${rankProgress.percent}%` }} />
            </div>
            <div className="profile-next-rank">
              {rankProgress.isMaxRank
                ? "Eng yuqori darajadasiz"
                : `Keyingi daraja: ${rankProgress.nextRank}`}
            </div>
          </div>
        </div>

        <div className="profile-columns">
          <div className="grid">
            <div className="card">
              <h3 className="panel-title">Statistika</h3>
              <div className="profile-stat-grid">
                <div className="profile-stat-card">
                  <span className="profile-stat-val">{points.toLocaleString()}</span>
                  <span className="profile-stat-label">Umumiy ball</span>
                </div>
                <div className="profile-stat-card">
                  <span className="profile-stat-val">{solvedCount}</span>
                  <span className="profile-stat-label">Yechilgan challenge</span>
                </div>
                <div className="profile-stat-card">
                  <span className="profile-stat-val">{completedSections}</span>
                  <span className="profile-stat-label">Bajarilgan darslar</span>
                </div>
                <div className="profile-stat-card">
                  <span className="profile-stat-val">{totalSections}</span>
                  <span className="profile-stat-label">Jami darslar</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="panel-title">Faoliyat</h3>
              {activity.length === 0 ? (
                <div className="profile-empty">
                  <div className="profile-empty-icon">
                    <IconGrid />
                  </div>
                  <p>Hali faoliyat yo&apos;q. Birinchi darsni boshlang.</p>
                  <Link href="/learn" className="btn-link">
                    Darslarni ko&apos;rish <IconArrowRight />
                  </Link>
                </div>
              ) : (
                <ul className="activity">
                  {activity.map((item) => (
                    <li key={item.key}>
                      <div
                        className="act-ic"
                        style={
                          item.type === "challenge"
                            ? { background: "var(--lime-soft)", color: "var(--lime)" }
                            : { background: "var(--cyan-soft)", color: "var(--cyan)" }
                        }
                      >
                        {item.type === "challenge" ? <IconBolt /> : <IconCheck />}
                      </div>
                      <div className="act-main">
                        <b>{item.title}</b>
                        <span>{item.subtitle}</span>
                      </div>
                      <div
                        className="act-xp"
                        style={item.type === "lesson" ? { color: "var(--cyan)" } : undefined}
                      >
                        {item.xpLabel}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="grid">
            <div className="card">
              <h3 className="panel-title">O&apos;quv progressi</h3>
              <div className="profile-ring-wrap">
                <div style={{ position: "relative", width: 104, height: 104 }}>
                  <svg width="104" height="104" viewBox="0 0 104 104" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="52" cy="52" r={SECTION_RING_RADIUS} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="7" />
                    <circle
                      cx="52"
                      cy="52"
                      r={SECTION_RING_RADIUS}
                      fill="none"
                      stroke="var(--lime)"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={SECTION_RING_CIRCUMFERENCE}
                      strokeDashoffset={sectionOffset}
                      style={{ filter: "drop-shadow(0 0 6px var(--lime-line))" }}
                    />
                  </svg>
                  <div className="ring-center">
                    <b style={{ fontSize: 22 }}>{sectionPercent}%</b>
                    <p className="profile-ring-caption">
                      {completedSections} / {totalSections} section bajarildi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="panel-title">Challenge progressi</h3>
              <div className="profile-ring-wrap">
                <div style={{ position: "relative", width: 104, height: 104 }}>
                  <svg width="104" height="104" viewBox="0 0 104 104" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="52" cy="52" r={CHALLENGE_RING_RADIUS} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="7" />
                    <circle
                      cx="52"
                      cy="52"
                      r={CHALLENGE_RING_RADIUS}
                      fill="none"
                      stroke="var(--cyan)"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={CHALLENGE_RING_CIRCUMFERENCE}
                      strokeDashoffset={challengeOffset}
                      style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,.35))" }}
                    />
                  </svg>
                  <div className="ring-center">
                    <b style={{ fontSize: 22, color: "var(--cyan)" }}>{challengePercent}%</b>
                    <p className="profile-ring-caption">
                      {solvedCount} / {totalChallenges} challenge yechildi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {editing && <EditProfileModal onClose={() => setEditing(false)} />}
    </section>
  );
}
