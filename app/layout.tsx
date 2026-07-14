import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ScoreProvider } from "@/lib/score-context";
import { LessonProgressProvider } from "@/lib/lesson-progress-context";
import AppShell from "@/components/AppShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "QAForge Academy",
  description: "Gamified, hands-on QA/QC practice platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
        <AuthProvider>
          <ScoreProvider>
            <LessonProgressProvider>
              <AppShell>{children}</AppShell>
            </LessonProgressProvider>
          </ScoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
