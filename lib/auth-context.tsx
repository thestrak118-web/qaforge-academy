"use client";

// Session + profile (display_name, points) for the signed-in user.
// ScoreProvider reads `profile.points` and bumps it locally after a server
// grades+awards a submission, instead of refetching the whole profile.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export interface Profile {
  id: string;
  display_name: string;
  points: number;
}

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  /**
   * Resolved display name: profiles.display_name if set, else the part of
   * the email before "@", else "". Never the raw possibly-empty column —
   * use this instead of `profile?.display_name` everywhere it's shown.
   */
  displayName: string;
  signOut: () => Promise<void>;
  bumpPoints: (amount: number) => void;
  /** Updates profiles.display_name and reflects it locally on success. */
  updateDisplayName: (displayName: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    async function loadProfile(userId: string) {
      const { data } = await supabase
        .from("profiles")
        .select("id, display_name, points")
        .eq("id", userId)
        .single();
      if (!cancelled) setProfile(data ?? null);
    }

    supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      setUser(data.user);
      if (data.user) loadProfile(data.user.id);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  }, []);

  const bumpPoints = useCallback((amount: number) => {
    setProfile((prev) => (prev ? { ...prev, points: prev.points + amount } : prev));
  }, []);

  const updateDisplayName = useCallback(
    async (displayName: string): Promise<{ error: string | null }> => {
      if (!user) return { error: "Tizimga kirilmagan" };
      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update({ display_name: displayName })
        .eq("id", user.id);
      if (error) return { error: error.message };
      setProfile((prev) => (prev ? { ...prev, display_name: displayName } : prev));
      return { error: null };
    },
    [user]
  );

  const displayName = useMemo(() => {
    const fromProfile = profile?.display_name?.trim();
    if (fromProfile) return fromProfile;
    const emailLocalPart = user?.email?.split("@")[0]?.trim();
    return emailLocalPart ?? "";
  }, [profile, user]);

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, displayName, signOut, bumpPoints, updateDisplayName }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
