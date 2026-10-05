import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Browser Supabase client (anon key only).
 *
 * Env vars (Vercel Project Settings -> Environment Variables):
 *   NEXT_PUBLIC_SUPABASE_URL      https://<project-ref>.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY public anon key (safe for the client, guarded by RLS)
 *
 * The client is created lazily and memoised so we never re-instantiate it on
 * every render. If the env vars are missing we return `null` and the UI falls
 * back to a local "offline scratchpad" mode instead of crashing -- this keeps
 * `next build` green before the database is provisioned.
 */
let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    cached = null;
    return null;
  }

  cached = createClient(url, anonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
    global: { headers: { 'x-client-info': 'ch3noff-lab@1.0.0' } },
  });

  return cached;
}

export const isSupabaseConfigured = (): boolean => getSupabase() !== null;
