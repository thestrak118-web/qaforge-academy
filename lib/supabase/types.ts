// lib/supabase/types.ts
// Hand-written types matching the live Supabase schema (see docs/schema.sql).
// Narrow on purpose: only the columns this app actually reads/writes.

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          points: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string;
          points?: number;
        };
        Update: {
          display_name?: string;
        };
        Relationships: [];
      };
      lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          section_id: string;
          completed_at: string;
        };
        Insert: {
          user_id: string;
          section_id: string;
        };
        Update: {
          user_id?: string;
          section_id?: string;
        };
        Relationships: [];
      };
      challenge_submissions: {
        Row: {
          id: string;
          user_id: string;
          challenge_id: string;
          points_earned: number;
          solved_at: string;
        };
        Insert: {
          user_id: string;
          challenge_id: string;
          points_earned: number;
        };
        Update: {
          user_id?: string;
          challenge_id?: string;
          points_earned?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      leaderboard: {
        Row: {
          rank: number;
          id: string;
          display_name: string;
          points: number;
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
  };
}
