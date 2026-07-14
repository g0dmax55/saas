"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function SettingsTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlTab = searchParams.get("tab") === "billing" ? "billing" : "profile";
  const [tab, setTab] = useState<"profile" | "billing">(urlTab);

  const updateTab = useCallback((next: "profile" | "billing") => {
    setTab(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next === "profile") params.delete("tab");
    else params.set("tab", next);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  useEffect(() => {
    setTab(urlTab);
  }, [urlTab]);

  return (
    <>
      {/* Tabs */}
      <div className="mt-6 flex gap-1 rounded-xl bg-gray-100 p-1">
        {(["profile", "billing"] as const).map((t) => (
          <button
            key={t}
            onClick={() => updateTab(t)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-white text-[#121212] shadow-sm" : "text-[#79716B] hover:text-[#121212]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#121212]">Full name</label>
              <input type="text" defaultValue="John Doe" className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#121212] focus:border-[#96FF1A] focus:outline-none focus:ring-1 focus:ring-[#96FF1A]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#121212]">Email</label>
              <input type="email" defaultValue="john@example.com" className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#121212] focus:border-[#96FF1A] focus:outline-none focus:ring-1 focus:ring-[#96FF1A]" />
            </div>
            <button className="w-full rounded-full bg-[#96FF1A] py-2.5 text-sm font-semibold text-[#121212] hover:brightness-95">Save changes</button>
          </div>

          <hr className="border-gray-100" />

          <div className="rounded-xl border border-red-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-red-600">Danger zone</h2>
            <p className="mt-1 text-xs text-[#79716B]">Permanently delete your account and all subtitle projects.</p>
            <button className="mt-3 rounded-full border border-red-300 px-4 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">Delete account</button>
          </div>
        </div>
      )}

      {tab === "billing" && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="rounded-full bg-[#96FF1A] px-2.5 py-0.5 text-[10px] font-semibold text-[#121212] uppercase">Active</span>
                <h2 className="mt-2 text-lg font-semibold text-[#121212]">Pro Plan</h2>
                <p className="text-sm text-[#79716B]">$14/month — Unlimited subtitle videos</p>
              </div>
              <a href="/pricing" className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-medium text-[#121212] hover:bg-gray-50">Change</a>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
              {[
                { label: "Videos this month", value: "12 / Unlimited" },
                { label: "Minutes transcribed", value: "24 min" },
                { label: "Export quality", value: "Up to 1080p" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-lg font-bold text-[#121212]">{s.value}</p>
                  <p className="text-[11px] text-[#79716B]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-[#121212]">Payment method</h2>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-gray-100">
                <svg width="20" height="14" viewBox="0 0 40 28" fill="none"><rect width="40" height="28" rx="4" fill="#1A1A1A" /><circle cx="16" cy="14" r="5" fill="#EB001B" /><circle cx="24" cy="14" r="5" fill="#F79E1B" fillOpacity="0.8" /></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#121212]">•••• 4242</p>
                <p className="text-xs text-[#79716B]">Expires 12/26</p>
              </div>
            </div>
            <button className="mt-4 text-xs font-medium text-[#79716B] hover:text-[#121212]">+ Add payment method</button>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-[#121212]">Billing history</h2>
            <div className="mt-3 divide-y divide-gray-100">
              {[
                { date: "Jul 1, 2026", amount: "$14.00", status: "Paid" },
                { date: "Jun 1, 2026", amount: "$14.00", status: "Paid" },
                { date: "May 1, 2026", amount: "$14.00", status: "Paid" },
              ].map((inv, i) => (
                <div key={i} className="flex items-center justify-between py-2.5">
                  <p className="text-sm text-[#121212]">{inv.date}</p>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium text-[#121212]">{inv.amount}</p>
                    <span className="rounded-full bg-[#E6FFC8] px-2 py-0.5 text-[10px] font-semibold text-[#121212]">{inv.status}</span>
                    <button className="text-xs text-[#79716B] hover:text-[#121212] hover:underline">Invoice</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-red-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-red-600">Cancel subscription</h2>
            <p className="mt-1 text-xs text-[#79716B]">You&apos;ll lose access to premium features at the end of your billing period.</p>
            <button className="mt-3 rounded-full border border-red-300 px-4 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">Cancel subscription</button>
          </div>
        </div>
      )}
    </>
  );
}

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[640px] p-5 md:p-8">
      <h1 className="text-xl font-semibold text-[#121212] md:text-2xl">Settings</h1>
      <Suspense fallback={<div className="mt-6 h-40 rounded-xl bg-gray-100 animate-pulse" />}>
        <SettingsTabs />
      </Suspense>
    </div>
  );
}
