"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

function SettingsTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlTab = searchParams.get("tab") === "billing" ? "billing" : "profile";
  const tab = urlTab;
  const [saved, setSaved] = useState(false);

  const updateTab = useCallback((next: "profile" | "billing") => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "profile") params.delete("tab");
    else params.set("tab", next);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      {/* Tabs */}
      <div className="mt-6 flex gap-1 rounded-xl bg-gray-100 p-1">
        {([
          {
            id: "profile" as const,
            label: "Profile",
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            ),
          },
          {
            id: "billing" as const,
            label: "Billing",
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            ),
          },
        ]).map((t) => (
          <button
            key={t.id}
            onClick={() => updateTab(t.id)}
            className={`flex flex-1 basis-0 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all ${
              tab === t.id ? "bg-white text-[#121212] shadow-sm" : "text-[#79716B] hover:text-[#121212]"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
      {tab === "profile" && (
        <motion.div
          key="profile"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.15 }}
          className="mt-6 space-y-5"
        >
          {/* Avatar */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-[#121212]">Photo</h2>
            <p className="mt-1 text-xs text-[#79716B]">This appears in the sidebar and on project exports.</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#E6FFC8] text-lg font-bold text-[#121212] ring-2 ring-[#E6FFC8]/50">
                JD
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-[#121212] hover:bg-gray-50 transition-colors">
                  Upload photo
                </button>
                <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#79716B] hover:text-red-600 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Personal info */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-[#121212] mb-4">Personal information</h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-[#79716B] mb-1">First name</label>
                  <input type="text" defaultValue="John" className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[#121212] focus:border-[#96FF1A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#96FF1A] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#79716B] mb-1">Last name</label>
                  <input type="text" defaultValue="Doe" className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[#121212] focus:border-[#96FF1A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#96FF1A] transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#79716B] mb-1">Email address</label>
                <input type="email" defaultValue="john@example.com" className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[#121212] focus:border-[#96FF1A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#96FF1A] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#79716B] mb-1">Default export language</label>
                <select className="block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[#121212] focus:border-[#96FF1A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#96FF1A] transition-colors">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Auto-detect</option>
                </select>
              </div>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-full bg-[#96FF1A] px-5 py-2.5 text-sm font-semibold text-[#121212] transition-all hover:brightness-95 active:scale-[0.98]"
              >
                {saved ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    Saved
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </div>

          {/* Danger zone */}
          <div className="rounded-xl border border-red-100 bg-red-50/30 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-red-700">Delete account</h2>
                <p className="mt-1 text-xs text-[#79716B]">Permanently delete your account and all subtitle projects. This action cannot be undone.</p>
                <button className="mt-3 rounded-lg border border-red-300 bg-white px-4 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50">
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {tab === "billing" && (
        <motion.div
          key="billing"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.15 }}
          className="mt-6 space-y-5"
        >
          {/* Current plan */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E6FFC8] px-2.5 py-0.5 text-[10px] font-semibold text-[#121212] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#121212]" />
                  Active
                </span>
                <h2 className="mt-2.5 text-lg font-semibold text-[#121212]">Pro Plan</h2>
                <p className="text-sm text-[#79716B]">$14/month — Unlimited subtitle videos</p>
              </div>
              <a href="/pricing" className="rounded-full border border-gray-200 px-4 py-1.5 text-xs font-medium text-[#121212] hover:bg-gray-50 hover:border-gray-300 transition-all">
                Change plan
              </a>
            </div>

            {/* Usage meters */}
            <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
              {[
                { label: "Videos", used: 12, limit: "Unlimited", pct: 12, color: "bg-[#96FF1A]" },
                { label: "Minutes transcribed", used: 24, limit: "Unlimited", pct: 8, color: "bg-blue-400" },
                { label: "Storage", used: 1.2, limit: "10 GB", pct: 12, color: "bg-purple-400" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#121212]">{m.label}</span>
                    <span className="text-[#79716B]">{m.used} / {m.limit}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className={`h-full rounded-full ${m.color} transition-all`} style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment method */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#121212]">Payment method</h2>
              <button className="text-xs font-medium text-[#79716B] hover:text-[#121212] transition-colors">Edit</button>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
              <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-white shadow-sm">
                <svg width="22" height="16" viewBox="0 0 40 28" fill="none"><rect width="40" height="28" rx="4" fill="#1A1A1A" /><circle cx="16" cy="14" r="5" fill="#EB001B" /><circle cx="24" cy="14" r="5" fill="#F79E1B" fillOpacity="0.8" /></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#121212]">Mastercard •••• 4242</p>
                <p className="text-xs text-[#79716B]">Expires 12/2026</p>
              </div>
            </div>
            <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#79716B] hover:text-[#121212] transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add payment method
            </button>
          </div>

          {/* Billing history */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-[#121212] mb-1">Billing history</h2>
            <div className="mt-3 divide-y divide-gray-100">
              {[
                { date: "Jul 1, 2026", amount: "$14.00", status: "Paid", invoice: "INV-007" },
                { date: "Jun 1, 2026", amount: "$14.00", status: "Paid", invoice: "INV-006" },
                { date: "May 1, 2026", amount: "$14.00", status: "Paid", invoice: "INV-005" },
              ].map((inv, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-[#121212]">{inv.date}</p>
                    <p className="text-[11px] text-[#79716B]">{inv.invoice}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-semibold text-[#121212]">{inv.amount}</p>
                    <span className="rounded-full bg-[#E6FFC8] px-2 py-0.5 text-[10px] font-semibold text-[#121212]">{inv.status}</span>
                    <button className="text-xs font-medium text-[#79716B] hover:text-[#121212] hover:underline transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cancel */}
          <div className="rounded-xl border border-red-100 bg-red-50/30 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-red-700">Cancel subscription</h2>
                <p className="mt-1 text-xs text-[#79716B]">You&apos;ll lose access to premium features at the end of your billing period on Aug 1, 2026.</p>
                <button className="mt-3 rounded-lg border border-red-300 bg-white px-4 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50">
                  Cancel subscription
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[640px] p-5 md:p-8 h-full overflow-y-auto">
      <h1 className="text-xl font-semibold text-[#121212] md:text-2xl">Settings</h1>
      <Suspense fallback={
        <div className="mt-6 animate-pulse space-y-5">
          <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
            <div className="h-9 flex-1 rounded-lg bg-gray-200" />
            <div className="h-9 flex-1 rounded-lg bg-gray-200" />
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-9 w-full rounded-lg bg-gray-100" />
            <div className="h-9 w-full rounded-lg bg-gray-100" />
            <div className="h-9 w-full rounded-lg bg-gray-100" />
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-3">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-9 w-full rounded-lg bg-gray-100" />
          </div>
        </div>
      }>
        <SettingsTabs />
      </Suspense>
    </div>
  );
}
