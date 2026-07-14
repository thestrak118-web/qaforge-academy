// Server-side Supabase client — used by Route Handlers and Server Components.
// Runs as the signed-in user (cookie-based session), so RLS still applies;
// this is NOT a service-role client.

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component render — session refresh is
            // handled by middleware.ts, so writes here can be ignored.
          }
        },
      },
    }
  );
}
