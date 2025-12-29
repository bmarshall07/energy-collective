"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function ExpertProfile({ params }: { params: { id: string } }) {
  const [expert, setExpert] = useState<any>(null);
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("profiles").select("*").eq("id", params.id).single()
      .then(({ data }) => setExpert(data));
  }, [params.id]);

  async function sendMessage() {
    setMsg(null);
    const res = await fetch("/api/messaging/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expertId: params.id, body }),
    });
    const j = await res.json().catch(() => ({}));
    if (res.ok) setMsg("Message sent. Check your inbox.");
    else setMsg(j?.error ?? "Could not send message.");
  }

  if (!expert) return <div className="text-slate-400">Loading</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold">{expert.name ?? "Expert"}</div>
            <div className="text-slate-400 mt-1">{expert.headline ?? ""}</div>
          </div>
          <div className="text-xs text-slate-300">{expert.is_founder ? "Founder" : expert.tier}</div>
        </div>
        <div className="text-sm text-slate-400 mt-3">{expert.region ?? ""}  {expert.timezone ?? ""}  {expert.availability ?? ""}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {(expert.problem_tags ?? []).map((t:string) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full border border-slate-700 text-slate-200">{t}</span>
          ))}
        </div>
        {expert.bio && <div className="text-slate-200 mt-4 whitespace-pre-wrap">{expert.bio}</div>}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 space-y-3">
        <div className="font-medium">Message this expert</div>
        <textarea className="w-full min-h-[110px] rounded-lg bg-slate-950 border border-slate-800 px-3 py-2"
          placeholder="Write a short message (1 free message total for clients at launch)"
          value={body} onChange={e => setBody(e.target.value)} />
        <button onClick={sendMessage} className="px-4 py-2 rounded-lg bg-sky-400 text-black font-medium">Send message</button>
        {msg && <div className="text-sm text-slate-200">{msg}</div>}
      </div>
    </div>
  );
}
