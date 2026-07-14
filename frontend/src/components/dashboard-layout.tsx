"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Projects", href: "/dashboard" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-gray-200 bg-white transition-transform lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/dashboard" className="flex h-14 items-center px-5 text-lg font-bold tracking-tight text-[#121212]">
          SubCaps
        </Link>

        <nav className="flex-1 px-3 pt-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-[#E6FFC8] text-[#121212]"
                  : "text-[#79716B] hover:bg-gray-100 hover:text-[#121212]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom user info + actions */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E6FFC8] text-xs font-bold text-[#121212]">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-[#121212] truncate">John Doe</p>
              <p className="text-xs text-[#79716B] truncate">john@example.com</p>
            </div>
          </div>

          <div className="mt-3 space-y-0.5">
            <Link
              href="/dashboard/settings"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[#79716B] transition-colors hover:bg-gray-100 hover:text-[#121212]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Settings
            </Link>
            <Link
              href="/login"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </Link>
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
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#79716B] hover:bg-gray-100 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="text-sm font-semibold text-[#121212] lg:hidden">
            {pathname === "/dashboard" ? "Projects" : pathname.split("/").pop()}
          </div>

          <div className="hidden lg:block" />
        </header>

        <main className="flex flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
