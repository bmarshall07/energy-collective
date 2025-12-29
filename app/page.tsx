import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold">Find verified subsurface experts â€” fast.</h1>
        <p className="text-slate-400 max-w-2xl">
          Search by real subsurface problems. Review proof-of-work. Message experts directly inside the platform.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <div className="text-sm text-slate-300">Quick start</div>
        <div className="flex flex-wrap gap-3">
          <Link href="/experts" className="px-4 py-2 rounded-lg bg-sky-400 text-black font-medium">Generate shortlist</Link>
          <Link href="/join" className="px-4 py-2 rounded-lg border border-slate-700 text-slate-100">Join as an expert</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          ["Model QA / Fit-for-purpose", "Find reviewers who can sanity-check models and assumptions."],
          ["Uncertainty & ensembles", "Design practical uncertainty plans and case strategies."],
          ["History match & surveillance", "Get confidence in calibration and surveillance logic."],
          ["Development & reserves", "Support planning, scenarios, and decision packs."],
          ["Production forecasting", "Constraints, decline sanity-checks, deliverable review."],
          ["Energy transition subsurface", "CCUS, geothermal, storage â€” specialist support."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
            <div className="font-medium">{t}</div>
            <div className="text-sm text-slate-400 mt-2">{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
