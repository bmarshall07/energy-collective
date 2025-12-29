import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export default async function ExpertsPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(url, anon);

  const { data: experts } = await supabase
    .from("profiles")
    .select("id,name,headline,region,timezone,availability,is_founder,tier,problem_tags")
    .eq("status", "Approved")
    .limit(50);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Experts</h2>
        <p className="text-slate-400">Browse approved experts. Proof-of-work tiles arrive in the next upgrade.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {(experts ?? []).map((e:any) => (
          <Link key={e.id} href={`/experts/${e.id}`} className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 hover:bg-slate-900/50">
            <div className="flex items-center justify-between gap-3">
              <div className="font-medium">{e.name ?? "Expert"}</div>
              <div className="text-xs text-slate-300">
                {e.is_founder ? "Founder" : e.tier}
              </div>
            </div>
            <div className="text-sm text-slate-400 mt-1">{e.headline ?? ""}</div>
            <div className="text-xs text-slate-400 mt-3">{e.region ?? ""} Â· {e.timezone ?? ""} Â· {e.availability ?? ""}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(e.problem_tags ?? []).slice(0,4).map((t:string) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full border border-slate-700 text-slate-200">{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
