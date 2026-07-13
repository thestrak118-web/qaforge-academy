// Static placeholder content for views that aren't wired to a backend yet
// (Dashboard, Leaderboard, Profile, Badges, Statistics). Ported ~verbatim
// from docs/qaforge-academy.html's demo arrays so the shell looks and reads
// like the reference design. Phase 2 (Supabase + real submissions/profiles)
// replaces this with live data — see CLAUDE.md.

export interface MockActivityItem {
  name: string;
  xp: number;
  t: string;
}

export const MOCK_ACTIVITY: MockActivityItem[] = [
  { name: "SauceDemo Login", xp: 50, t: "2 daqiqa oldin" },
  { name: "ReqRes API Basics", xp: 50, t: "25 daqiqa oldin" },
  { name: "DemoQA Forms", xp: 50, t: "1 soat oldin" },
  { name: "k6 Load Baseline", xp: 100, t: "Kecha" },
  { name: "OWASP Juice Shop", xp: 150, t: "2 kun oldin" },
];

export interface MockLeader {
  name: string;
  role: string;
  points: number;
  solved: number;
  streak: number;
  flag: string;
  me?: boolean;
  trend: 1 | 0 | -1;
}

export const MOCK_LEADERS: MockLeader[] = [
  { name: "Ali Akbarov", role: "Senior QA", points: 2350, solved: 47, streak: 21, flag: "🇺🇿", trend: 1 },
  { name: "Sarvar Tolipov", role: "Junior QA", points: 2200, solved: 24, streak: 7, flag: "🇺🇿", me: true, trend: 1 },
  { name: "Aziza Karimova", role: "QA Engineer", points: 2050, solved: 41, streak: 12, flag: "🇰🇿", trend: -1 },
  { name: "Bekzod Ahmedov", role: "QA Engineer", points: 1980, solved: 38, streak: 5, flag: "🇺🇿", trend: 1 },
  { name: "Diyor Mirzayev", role: "Junior QA", points: 1750, solved: 29, streak: 3, flag: "🇹🇯", trend: 0 },
  { name: "Nilufar Yusupova", role: "QA Lead", points: 1690, solved: 35, streak: 9, flag: "🇺🇿", trend: 1 },
  { name: "Timur Rashidov", role: "Automation QA", points: 1540, solved: 31, streak: 2, flag: "🇰🇬", trend: -1 },
  { name: "Kamila Sharipova", role: "QA Engineer", points: 1420, solved: 27, streak: 6, flag: "🇰🇿", trend: 0 },
];

export type MockBadgeIcon =
  | "bug"
  | "ui"
  | "api"
  | "streak"
  | "hunt"
  | "clock"
  | "solver"
  | "security"
  | "automation"
  | "perfect"
  | "load"
  | "grandmaster";

export interface MockBadge {
  name: string;
  desc: string;
  icon: MockBadgeIcon;
  color: string;
  earned: boolean;
  progress?: number;
  goal?: number;
}

export const MOCK_BADGES: MockBadge[] = [
  { name: "First Bug", desc: "Birinchi challenge'ni yeching", icon: "bug", color: "var(--lime)", earned: true },
  { name: "UI Explorer", desc: "5 ta UI challenge yeching", icon: "ui", color: "var(--cyan)", earned: true },
  { name: "API Rookie", desc: "5 ta API challenge yeching", icon: "api", color: "#a855f7", earned: true },
  { name: "7-Day Streak", desc: "7 kun faol bo'ling", icon: "streak", color: "var(--yellow)", earned: true },
  { name: "Bug Hunter", desc: "10 ta bug toping", icon: "hunt", color: "var(--emerald)", earned: true },
  { name: "Speed Tester", desc: "3 tasini vaqtida yeching", icon: "clock", color: "var(--red)", earned: true },
  { name: "Problem Solver", desc: "20 ta challenge yeching", icon: "solver", color: "#a855f7", earned: false, progress: 24, goal: 20 },
  { name: "Security Hunter", desc: "5 ta xavfsizlik labini yeching", icon: "security", color: "var(--red)", earned: false, progress: 2, goal: 5 },
  { name: "Automator", desc: "5 ta test suite yarating", icon: "automation", color: "var(--cyan)", earned: false, progress: 1, goal: 5 },
  { name: "Perfectionist", desc: "10 ta labda 100%", icon: "perfect", color: "var(--lime)", earned: false, progress: 6, goal: 10 },
  { name: "Load Master", desc: "5 ta perf test topshiring", icon: "load", color: "var(--yellow)", earned: false, progress: 1, goal: 5 },
  { name: "Grandmaster", desc: "10-darajaga yeting", icon: "grandmaster", color: "var(--lime)", earned: false, progress: 2, goal: 10 },
];

/** Weekly XP totals for the bar chart — last 8 weeks. */
export const MOCK_WEEKLY_XP = [280, 420, 360, 510, 340, 480, 560, 610];

export interface MockDonutSlice {
  label: string;
  value: number;
  color: string;
}

export const MOCK_CATEGORY_DISTRIBUTION: MockDonutSlice[] = [
  { label: "UI Testing", value: 38, color: "#A3FF12" },
  { label: "API Testing", value: 29, color: "#22D3EE" },
  { label: "Security", value: 18, color: "#F43F5E" },
  { label: "Performance", value: 15, color: "#FBBF24" },
];
