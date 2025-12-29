"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function signUp() {
    setMsg(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setMsg(error ? error.message : "Account created. You can now sign in.");
  }

  async function signIn() {
    setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMsg(error ? error.message : "Signed in. Redirecting...");
    if (!error) window.location.href = "/onboarding";
  }

  return (
    <div className="max-w-md space-y-4">
      <h2 className="text-2xl font-semibold">Join Energy Collective</h2>
      <p className="text-slate-400">Create an account to message experts or build your expert profile.</p>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 space-y-3">
        <input className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2"
          placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2"
          placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="flex gap-3">
          <button onClick={signUp} className="px-4 py-2 rounded-lg border border-slate-700">Sign up</button>
          <button onClick={signIn} className="px-4 py-2 rounded-lg bg-sky-400 text-black font-medium">Sign in</button>
        </div>
        {msg && <div className="text-sm text-slate-300">{msg}</div>}
      </div>
    </div>
  );
}
