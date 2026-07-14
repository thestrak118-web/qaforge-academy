"use client";

// Auth routes (/login, /register) render full-bleed, without the app chrome.
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const CHROMELESS_PATHS = ["/login", "/register"];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isChromeless = CHROMELESS_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (isChromeless) return <>{children}</>;

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <TopBar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
