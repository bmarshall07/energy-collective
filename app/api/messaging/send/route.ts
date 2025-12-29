import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { APP } from "@/lib/config";

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(url, service);

  const body = await req.json().catch(() => null);
  if (!body?.expertId || !body?.body) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  // IMPORTANT: This MVP route is admin-key based and needs auth hardening next.
  // For now it demonstrates the full flow. Next step: cookie-based auth + RLS.
  // We will enforce free-message limits in the next hardening pass.

  return NextResponse.json({ ok: true, note: "Messaging endpoint stub. Next hardening adds auth + limits." });
}
