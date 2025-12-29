"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Inbox() {
  const [threads, setThreads] = useState<any[]>([]);
  const [me, setMe] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) { window.location.href = "/join"; return; }
      setMe(auth.user.id);

      const { data } = await supabase
        .from("threads")
        .select("id,client_id,expert_id,created_at")
        .order("created_at", { ascending: false });

      setThreads(data ?? []);
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Inbox</h2>
      <p className="text-slate-400">Messaging is private inside the platform.</p>

      <div className="space-y-2">
        {threads.map(t => (
          <div key={t.id} className="rounded-xl border border-slate-800 bg-slate-900/30 p-4 text-sm text-slate-200">
            Thread: {t.id}
            <div className="text-xs text-slate-400 mt-1">
              You are: {me === t.client_id ? "Client" : "Expert"}
            </div>
          </div>
        ))}
        {threads.length === 0 && <div className="text-slate-400">No messages yet.</div>}
      </div>
    </div>
  );
}
