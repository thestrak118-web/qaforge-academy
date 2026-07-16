"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CHALLENGES } from "@/data/challenges";
import {
  BrandIcon,
  IconDashboard,
  IconChallenges,
  IconLearn,
  IconLeaderboard,
  IconBadges,
  IconStats,
  IconMentor,
  IconSettings,
} from "@/lib/icons";

const firstChallengeId = CHALLENGES[0]?.id ?? "";

interface NavLinkDef {
  href: string;
  label: string;
  icon: ReactNode;
  isActive: (pathname: string) => boolean;
  badge?: string;
}

const NAV_LINKS: NavLinkDef[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <IconDashboard />,
    isActive: (p) => p === "/dashboard",
  },
  {
    href: "/challenges",
    label: "Challenge'lar",
    icon: <IconChallenges />,
    isActive: (p) => p === "/challenges",
  },
  {
    href: "/learn",
    label: "Darslar",
    icon: <IconLearn />,
    isActive: (p) => p.startsWith("/learn"),
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
    icon: <IconLeaderboard />,
    isActive: (p) => p === "/leaderboard",
  },
  {
    href: "/badges",
    label: "Badges",
    icon: <IconBadges />,
    isActive: (p) => p === "/badges",
  },
  {
    href: "/stats",
    label: "Statistics",
    icon: <IconStats />,
    isActive: (p) => p === "/stats",
  },
  {
    href: firstChallengeId ? `/challenges/${firstChallengeId}` : "/challenges",
    label: "AI Mentor",
    icon: <IconMentor />,
    isActive: (p) => p.startsWith("/challenges/"),
    badge: "Beta",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: <IconSettings />,
    isActive: (p) => p === "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/dashboard" className="brand">
        <div className="brand-mark">
          <BrandIcon />
        </div>
        <div className="brand-txt">
          <strong>QAForge</strong>
          <span>Academy</span>
        </div>
      </Link>

      <div className="nav-label">Menu</div>
      {NAV_LINKS.map((item) => {
        const active = item.isActive(pathname);
        return (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={`nav-item${active ? " active" : ""}`}
          >
            {item.icon}
            {item.label}
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </Link>
        );
      })}

      <div className="sidebar-foot">
        <div className="theme-row">
          <div className="switch" />
          <span>Dark theme</span>
        </div>
      </div>
    </aside>
  );
}
