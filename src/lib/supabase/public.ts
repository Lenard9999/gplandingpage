import 'server-only';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Anonymous, cookie-free client for public-facing reads (package catalog,
// package detail, checkout). Unlike lib/supabase/server.ts this never calls
// cookies(), so pages using it can stay statically generated / ISR'd instead
// of being forced into per-request dynamic rendering.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
