import Link from "next/link";

const PROJECTS = [
  { id: "1", title: "Product launch reel", lang: "English", style: "Bold", status: "Done", date: "2d ago" },
  { id: "2", title: "TikTok cooking tutorial", lang: "Spanish", style: "Clean", status: "Done", date: "5d ago" },
  { id: "3", title: "Instagram story ad", lang: "English", style: "Gradient", status: "Done", date: "1w ago" },
  { id: "4", title: "Vlog day 12", lang: "French", style: "Minimal", status: "Draft", date: "1w ago" },
  { id: "5", title: "Fitness reel", lang: "English", style: "Bold", status: "Done", date: "2w ago" },
];

export default function ProjectsPage() {
  return (
    <div className="p-5 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#121212] md:text-2xl">Projects</h1>
          <p className="mt-1 text-sm text-[#79716B]">Your subtitle videos</p>
        </div>
        <Link
          href="/dashboard/upload"
          className="inline-flex items-center gap-2 rounded-full bg-[#96FF1A] px-4 py-2 text-sm font-semibold text-[#121212] transition-all hover:brightness-95"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Project
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {([
          { label: "Processed", value: "27", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /><polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none" /></svg> },
          { label: "Captions Generated", value: "483", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg> },
          { label: "This Month", value: "12", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
          { label: "Plan", value: "Unlimited", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg> },
        ] as const).map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2 text-[#79716B]">
              {s.icon}
              <span className="text-[11px] font-medium">{s.label}</span>
            </div>
            <p className="mt-1.5 text-xl font-bold text-[#121212]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((p) => (
          <div key={p.id} className="rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
            <div className="mb-3 flex h-36 items-center justify-center rounded-lg bg-[#f3f4f6]">
              <svg className="h-8 w-8 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="8 5 19 12 8 19" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#121212]">{p.title}</h3>
            <div className="mt-1.5 flex items-center gap-2 text-[11px] text-[#79716B]">
              <span>{p.lang}</span>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span>{p.style}</span>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span>{p.date}</span>
            </div>
            <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${p.status === "Done" ? "bg-[#E6FFC8] text-[#121212]" : "bg-gray-100 text-[#79716B]"}`}>
              {p.status}
            </span>
            <div className="mt-3 flex gap-2">
              <Link
                href="/dashboard/editor"
                className="flex-1 rounded-lg border border-gray-200 py-1.5 text-center text-xs font-medium text-[#121212] transition-colors hover:bg-gray-50"
              >
                Review
              </Link>
              <Link
                href="/dashboard/export"
                className="flex-1 rounded-lg bg-[#96FF1A] py-1.5 text-center text-xs font-semibold text-[#121212] transition-colors hover:brightness-95"
              >
                Export
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
