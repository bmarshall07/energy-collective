"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Onboarding() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>({});
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) { window.location.href = "/join"; return; }

      const { data } = await supabase.from("profiles").select("*").eq("id", auth.user.id).single();
      setProfile(data ?? {});
      setLoading(false);
    })();
  }, []);

  async function save() {
    setMsg(null);
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    const payload = {
      name: profile.name ?? "",
      headline: profile.headline ?? "",
      region: profile.region ?? "",
      timezone: profile.timezone ?? "",
      availability: profile.availability ?? "Limited",
      bio: profile.bio ?? "",
      problem_tags: profile.problem_tags ?? []
    };

    const { error } = await supabase.from("profiles").update(payload).eq("id", auth.user.id);
    setMsg(error ? error.message : "Saved.");
  }

  async function submit() {
    setMsg(null);
    const res = await fetch("/api/profiles/submit", { method: "POST" });
    if (res.ok) setMsg("Submitted. If your profile is complete and has proof-of-work, it will auto-approve.");
    else setMsg("Could not submit. Please try again.");
  }

  if (loading) return <div className="text-slate-400">Loadingâ€¦</div>;

  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-2xl font-semibold">Expert profile</h2>
      <p className="text-slate-400">Fill the basics now. Proof-of-work upload comes next in the next upgrade.</p>

      <div className="grid md:grid-cols-2 gap-3">
        <input className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-2"
          placeholder="Full name" value={profile.name ?? ""} onChange={e => setProfile({ ...profile, name: e.target.value })} />
        <input className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-2"
          placeholder="Headline (e.g. Reservoir uncertainty specialist)" value={profile.headline ?? ""} onChange={e => setProfile({ ...profile, headline: e.target.value })} />
        <input className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-2"
          placeholder="Region (e.g. UK/EU)" value={profile.region ?? ""} onChange={e => setProfile({ ...profile, region: e.target.value })} />
        <input className="rounded-lg bg-slate-950 border border-slate-800 px-3 py-2"
          placeholder="Timezone (e.g. GMT)" value={profile.timezone ?? ""} onChange={e => setProfile({ ...profile, timezone: e.target.value })} />
      </div>

      <textarea className="w-full min-h-[120px] rounded-lg bg-slate-950 border border-slate-800 px-3 py-2"
        placeholder="Short bio (sanitized)" value={profile.bio ?? ""} onChange={e => setProfile({ ...profile, bio: e.target.value })} />

      <div className="text-sm text-slate-400">
        Problem tags (comma separated): model-qa, uncertainty, history-match, dev-planning, prod-forecast, transition
      </div>
      <input className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2"
        placeholder="problem tags" value={(profile.problem_tags ?? []).join(",")} onChange={e => setProfile({ ...profile, problem_tags: e.target.value.split(",").map(x => x.trim()).filter(Boolean) })} />

      <div className="flex gap-3">
        <button onClick={save} className="px-4 py-2 rounded-lg border border-slate-700">Save</button>
        <button onClick={submit} className="px-4 py-2 rounded-lg bg-sky-400 text-black font-medium">Submit for approval</button>
      </div>

      {msg && <div className="text-sm text-slate-200">{msg}</div>}
    </div>
  );
}
