import 'server-only';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Service-role client — bypasses RLS. Server-only, and only for the
// customer-facing checkout/webhook routes where there is no authenticated
// Supabase user to attach a booking write to. Never import from a Client
// Component or expose SUPABASE_SERVICE_ROLE_KEY to the browser.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
