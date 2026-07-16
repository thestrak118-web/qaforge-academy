"use client";

// Auth routes (/login, /register) render full-bleed, without the app chrome.
// Lesson pages (/learn/[sectionId]) are "focus mode": no sidebar/topbar
// either — the page renders its own header. The /learn list page keeps
// the normal chrome.
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const CHROMELESS_PATHS = ["/login", "/register"];
const FOCUS_MODE_PREFIXES = ["/learn/"];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isChromeless = CHROMELESS_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  const isFocusMode = FOCUS_MODE_PREFIXES.some((p) => pathname.startsWith(p));

  if (isChromeless || isFocusMode) return <>{children}</>;

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
