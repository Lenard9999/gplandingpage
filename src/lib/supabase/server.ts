import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Server Component / Server Action / Route Handler client — carries the
// signed-in admin's session and respects RLS. Never use this for
// customer-facing checkout/webhook writes; use lib/supabase/admin.ts there.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
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
            // Called from a Server Component with no request/response to
            // write to — safe to ignore since middleware refreshes the
            // session on every navigation anyway.
          }
        },
      },
    }
  );
}
