"use client";

import Link from "next/link";
import { useScore } from "@/lib/score-context";
import RankBadge from "@/components/RankBadge";
import { IconSearch, IconBell, IconProfile } from "@/lib/icons";

export default function TopBar() {
  const { points, rank } = useScore();

  return (
    <header className="topbar">
      <label className="search">
        <IconSearch />
        <input placeholder="Challenge'lar, badge'lar qidirish…" />
        <kbd>⌘K</kbd>
      </label>
      <div className="top-right">
        <RankBadge rank={rank} points={points} />
        <button type="button" className="icon-btn" aria-label="Bildirishnomalar">
          <span className="ping" />
          <IconBell />
        </button>
        <Link href="/profile" className="btn btn-ghost btn-sm">
          <IconProfile />
          Profilga kirish
        </Link>
      </div>
    </header>
  );
}
