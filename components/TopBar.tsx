"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useScore } from "@/lib/score-context";
import { useAuth } from "@/lib/auth-context";
import RankBadge from "@/components/RankBadge";
import { IconSearch, IconBell, IconProfile, IconLogout } from "@/lib/icons";

export default function TopBar() {
  const { points, rank } = useScore();
  const { displayName, loading, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="topbar">
      <label className="search">
        <IconSearch />
        <input placeholder="Challenge'lar, badge'lar qidirish…" />
        <kbd>⌘K</kbd>
      </label>
      <div className="top-right">
        {loading ? (
          <span className="skeleton" style={{ width: 90, height: 14 }} />
        ) : (
          displayName && (
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--dim-text)" }}>
              {displayName}
            </span>
          )
        )}
        <RankBadge rank={rank} points={points} />
        <button type="button" className="icon-btn" aria-label="Bildirishnomalar">
          <span className="ping" />
          <IconBell />
        </button>
        <Link href="/profile" className="btn btn-ghost btn-sm">
          <IconProfile />
          Profil
        </Link>
        <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
          <IconLogout />
          Chiqish
        </button>
      </div>
    </header>
  );
}
