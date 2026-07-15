"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

function formatRelative(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "1d ago";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return date.toLocaleDateString();
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

type ProjectCard = {
  id: string;
  title: string;
  lang: string;
  style: string;
  status: string;
  date: string;
  duration: string;
  gradient: string;
  bg: string;
  icon: string;
};

const GRADIENTS = [
  { gradient: "from-indigo-500 to-purple-600", bg: "bg-indigo-100", icon: "text-indigo-600" },
  { gradient: "from-orange-400 to-red-500", bg: "bg-orange-100", icon: "text-orange-600" },
  { gradient: "from-cyan-400 to-blue-500", bg: "bg-cyan-100", icon: "text-cyan-600" },
  { gradient: "from-rose-400 to-pink-500", bg: "bg-rose-100", icon: "text-rose-600" },
  { gradient: "from-emerald-400 to-teal-500", bg: "bg-emerald-100", icon: "text-emerald-600" },
];

export default function ProjectsPage() {
  const [ready, setReady] = useState(false);
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data.projects) {
          const mapped = data.projects.map((p: Record<string, unknown>, i: number) => ({
            id: String(p._id),
            title: String(p.title || ""),
            lang: String(p.language || "Detecting..."),
            style: String(p.style || "Bold"),
            status: String(p.status === "ready" ? "Done" : p.status === "processing" ? "Processing" : "Draft"),
            date: formatRelative(String(p.createdAt)),
            duration: p.duration ? formatDuration(Number(p.duration)) : "0:00",
            gradient: GRADIENTS[i % GRADIENTS.length].gradient,
            bg: GRADIENTS[i % GRADIENTS.length].bg,
            icon: GRADIENTS[i % GRADIENTS.length].icon,
          }));
          setProjects(mapped);
        }
      } catch {
        setProjects([]);
      } finally {
        setReady(true);
      }
    }
    load();
  }, []);

  const handleDelete = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setOpenMenu(null);
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
    } catch {
      // silent fail — already removed from UI
    }
  };

  if (!ready) {
    return (
      <div className="p-5 md:p-8 animate-in fade-in duration-300">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <div className="h-7 w-24 rounded-lg bg-gray-200 animate-pulse" />
            <div className="mt-1 h-4 w-36 rounded-lg bg-gray-100 animate-pulse" />
          </div>
          <div className="h-9 w-32 rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 animate-pulse">
              <div className="h-8 w-8 rounded-lg bg-gray-200" />
              <div className="mt-2 h-5 w-16 rounded bg-gray-200" />
            </div>
          ))}
        </div>
        <div className="mt-8">
          <div className="h-4 w-28 rounded bg-gray-200 animate-pulse mb-4" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 animate-pulse">
                <div className="h-40 rounded-lg bg-gray-200" />
                <div className="mt-3 h-4 w-32 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-48 rounded bg-gray-100" />
                <div className="mt-3 flex gap-2">
                  <div className="h-8 flex-1 rounded-lg bg-gray-200" />
                  <div className="h-8 flex-1 rounded-lg bg-gray-200" />
                </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#121212] md:text-2xl">Projects</h1>
          <p className="mt-1 text-sm text-[#79716B]">Your subtitle videos</p>
        </div>
        <Link
          href="/dashboard/upload"
          className="inline-flex items-center gap-2 rounded-full bg-[#96FF1A] px-4 py-2 text-sm font-semibold text-[#121212] transition-all hover:brightness-95 active:scale-[0.98]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {([
          {
            label: "Total videos",
            value: "27",
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /><polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none" />
              </svg>
            ),
            circleBg: "bg-[#E6FFC8]",
            iconColor: "text-[#121212]",
          },
          {
            label: "Captions",
            value: "483",
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            ),
            circleBg: "bg-blue-100",
            iconColor: "text-blue-600",
          },
          {
            label: "This month",
            value: "12",
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            ),
            circleBg: "bg-purple-100",
            iconColor: "text-purple-600",
          },
          {
            label: "Storage",
            value: "12%",
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            ),
            circleBg: "bg-amber-100",
            iconColor: "text-amber-600",
          },
        ] as const).map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.circleBg} ${s.iconColor}`}>
                {s.icon}
              </div>
              <span className="text-[11px] font-medium text-[#79716B]">{s.label}</span>
            </div>
            <p className="mt-2 text-xl font-bold text-[#121212] tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Projects grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#121212]">Recent projects</h2>
          <button className="text-xs font-medium text-[#79716B] hover:text-[#121212] transition-colors">
            View all
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
          {projects.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md"
            >
              {/* Thumbnail */}
              <div className={`relative mb-3 flex h-40 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${p.gradient}`}>
                {/* Three-dot menu */}
                <div className="absolute top-2 right-2 z-10">
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); setOpenMenu(openMenu === p.id ? null : p.id); }}
                    className="flex h-6 w-6 items-center justify-center rounded-md bg-black/30 text-white/80 hover:bg-black/50 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
                    </svg>
                  </button>
                  {openMenu === p.id && (
                    <div className="absolute right-0 top-full mt-1 w-32 rounded-lg border border-gray-200 bg-white shadow-lg py-0.5">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <svg className="h-10 w-10 text-white/40" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="8,5 19,12 8,19" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <polygon points="8,5 19,12 8,19" />
                    </svg>
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 rounded-md bg-black/50 px-2 py-0.5 font-mono text-[10px] font-medium text-white backdrop-blur-sm">
                  {p.duration}
                </span>
                {p.status === "Draft" && (
                  <span className="absolute top-2 left-2 rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-semibold text-[#121212]">
                    Draft
                  </span>
                )}
              </div>

              <h3 className="text-sm font-semibold text-[#121212] truncate">{p.title}</h3>
              <div className="mt-1.5 flex items-center gap-2 text-[11px] text-[#79716B]">
                <span>{p.lang}</span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span>{p.style}</span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span>{p.date}</span>
              </div>

              <div className="mt-3 flex gap-2">
                <Link
                   href={`/dashboard/editor?id=${p.id}`}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-xs font-medium text-[#121212] transition-colors hover:bg-gray-50 hover:border-gray-300"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  Edit
                </Link>
                <Link
                  href={`/dashboard/export?id=${p.id}`}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#96FF1A] py-2 text-xs font-semibold text-[#121212] transition-colors hover:brightness-95"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Export
                </Link>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-gray-300 bg-white py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E6FFC8]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-[#121212]">No projects yet</h3>
            <p className="mt-1.5 max-w-xs text-center text-sm text-[#79716B]">
              Upload your first short video and SubCaps will auto-generate subtitles in seconds.
            </p>
            <Link
              href="/dashboard/upload"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#96FF1A] px-5 py-2.5 text-sm font-semibold text-[#121212] transition-all hover:brightness-95 active:scale-[0.98]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create your first subtitled video
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
