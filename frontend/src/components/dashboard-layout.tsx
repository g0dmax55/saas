"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const NAV = [
  {
    label: "Projects",
    href: "/dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /><polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageTitle = pathname === "/dashboard" ? "Projects"
    : pathname === "/dashboard/upload" ? "New Project"
    : pathname === "/dashboard/editor" ? "Review Subtitles"
    : pathname === "/dashboard/export" ? "Export"
    : pathname === "/dashboard/settings" ? "Settings"
    : "";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-56 flex-col overflow-hidden border-r border-gray-100 bg-white transition-transform lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          href="/dashboard"
          className="flex h-16 items-center gap-2.5 px-5 text-lg font-bold tracking-tight text-[#121212]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#96FF1A]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </span>
          SubCaps
        </Link>

        <div className="px-3 pt-1">
          <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#79716B]">Workspace</p>
        </div>

        <nav className="flex-1 px-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
                pathname === item.href
                  ? "bg-[#E6FFC8] text-[#121212] shadow-sm"
                  : "text-[#79716B] hover:bg-gray-50 hover:text-[#121212]"
              }`}
            >
              <span className={pathname === item.href ? "text-[#121212]" : "text-[#79716B]"}>{item.icon}</span>
              {item.label}
              {pathname === item.href && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#121212]" />
              )}
            </Link>
          ))}

          {/* Recent projects list */}
          <div className="mt-3 border-t border-gray-100 pt-2">
            <p className="px-3 py-1 text-[9px] font-semibold uppercase tracking-widest text-[#79716B]">Recent</p>
            {[
              { id: "1", title: "Product launch reel", href: "/dashboard/editor" },
              { id: "2", title: "TikTok cooking", href: "/dashboard/editor" },
              { id: "3", title: "Instagram story ad", href: "/dashboard/editor" },
            ].map((p) => (
              <Link
                key={p.id}
                href={p.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] text-[#79716B] transition-colors hover:bg-gray-50 hover:text-[#121212] truncate"
              >
                <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-[#E6FFC8] text-[7px] font-bold text-[#121212]">
                  {p.id}
                </span>
                {p.title}
              </Link>
            ))}
          </div>
        </nav>

        {/* Usage bar */}
        <div className="border-t border-gray-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-[#79716B]">Usage</span>
            <span className="text-[10px] font-semibold text-[#121212]">12 / 100</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-[12%] rounded-full bg-[#96FF1A] transition-all" />
          </div>
          <p className="mt-1 text-[10px] text-[#79716B]">12 videos this month</p>
        </div>

        {/* Bottom user info + actions */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E6FFC8] text-xs font-bold text-[#121212] ring-2 ring-[#E6FFC8]/50">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-[#121212] truncate">John Doe</p>
              <p className="text-xs text-[#79716B] truncate">Pro plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Content Area */}
      <div
        className="flex flex-1 flex-col"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8.8' height='8.8'%3E%3Ccircle cx='1' cy='1' r='1' fill='black' fill-opacity='0.1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundColor: "#f9fafb",
        }}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md px-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#79716B] hover:bg-gray-100 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Breadcrumb */}
            <div className="hidden items-center gap-1.5 text-sm lg:flex">
              <Link href="/dashboard" className="font-medium text-[#79716B] hover:text-[#121212] transition-colors">Dashboard</Link>
              {pageTitle && pageTitle !== "Projects" && (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-300">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span className="font-semibold text-[#121212]">{pageTitle}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#79716B] hover:bg-gray-100 hover:text-[#121212] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">3</span>
            </button>
            <Link
              href="/dashboard/settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#79716B] hover:bg-gray-100 hover:text-[#121212] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </Link>
            <span className="rounded-full bg-[#E6FFC8] px-2.5 py-0.5 text-[10px] font-semibold text-[#121212] hidden sm:block">
              Pro plan
            </span>

            <div className="relative" ref={userRef}>
              <button
                type="button"
                onClick={() => setUserOpen(!userOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6FFC8] text-xs font-bold text-[#121212] ring-2 ring-transparent transition-all hover:ring-[#96FF1A]/50"
              >
                JD
              </button>
              <AnimatePresence>
              {userOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-gray-200 bg-white shadow-lg z-50"
                >
                  <div className="px-3 py-2.5">
                    <p className="text-sm font-semibold text-[#121212]">John Doe</p>
                    <p className="text-[11px] text-[#79716B]">john@example.com</p>
                  </div>
                  <hr className="border-gray-100" />
                  <Link
                    href="/login"
                    onClick={() => setUserOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 rounded-b-xl"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                  </Link>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-1 flex-col overflow-hidden"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
