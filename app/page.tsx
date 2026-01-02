import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold">Find verified subsurface experts — fast.</h1>
        <p className="text-slate-400 max-w-2xl">
          Energy Collective is a curated network of subsurface specialists.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/join"
          className="px-4 py-2 rounded-lg bg-sky-400 text-black font-medium"
        >
          Join as Expert
        </Link>

        <Link
          href="/experts"
          className="px-4 py-2 rounded-lg border border-slate-700 text-slate-100"
        >
          Browse Experts
        </Link>
      </div>
    </div>
  );
}
