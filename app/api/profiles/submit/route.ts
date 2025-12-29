import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabaseAdmin = createClient(url, service);

  // We cannot reliably read auth session here without cookies setup;
  // In this MVP, the client uses supabase-js to update profile; submit is best-effort.
  // We'll require the client to send their user id in a later hardening step.
  return NextResponse.json({ ok: true });
}
