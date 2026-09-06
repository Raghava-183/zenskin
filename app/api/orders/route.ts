import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Saves an order and hands back its reference number.
 *
 * The guiding rule here: NEVER block a sale. If the database is missing,
 * misconfigured or down, we still answer 200 with reference:null so the
 * browser opens WhatsApp anyway. A lost order number is an inconvenience;
 * a lost customer is not.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request" }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  const qty = clampQty(raw.qty);
  const name = clean(raw.name, 120);
  const area = clean(raw.area, 160);
  const phone = String(raw.phone ?? "").replace(/[^\d+]/g, "").slice(0, 16);
  const total = qty * SITE.price;

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    // No database attached yet — that is a valid way to run this site.
    return NextResponse.json({ ok: true, saved: false, reference: null, qty, total });
  }

  const { data, error } = await supabase
    .from("orders")
    .insert({
      qty,
      unit_price: SITE.price,
      total,
      customer_name: name || null,
      delivery_area: area || null,
      phone: phone || null,
      status: "new",
      source: "web",
    })
    .select("reference")
    .single();

  if (error) {
    console.error("[orders] insert failed:", error.message);
    return NextResponse.json({ ok: true, saved: false, reference: null, qty, total });
  }

  return NextResponse.json({
    ok: true,
    saved: true,
    reference: data.reference as string,
    qty,
    total,
  });
}

function clampQty(v: unknown): number {
  const n = Math.floor(Number(v));
  if (!Number.isFinite(n)) return 1;
  return Math.min(99, Math.max(1, n));
}

function clean(v: unknown, max: number): string {
  return String(v ?? "")
    // strip control characters; keep spaces, hyphens and Indian-language text
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}
