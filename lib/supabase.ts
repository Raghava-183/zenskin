import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * SERVER ONLY. This uses the service-role key, which bypasses every
 * row-level-security rule. It must never be imported into a component
 * that runs in the browser — only from route handlers and server actions.
 *
 * Returns null when the environment variables are not set, so the site
 * still builds and sells on a fresh clone with no database attached.
 */

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cached;
}

export type OrderRow = {
  id: string;
  reference: string;
  qty: number;
  unit_price: number;
  total: number;
  customer_name: string | null;
  delivery_area: string | null;
  phone: string | null;
  status: "new" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
  source: string;
  created_at: string;
};
