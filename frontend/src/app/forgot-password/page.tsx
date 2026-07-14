"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-[400px]">
        <Link href="/" className="text-xl font-bold tracking-tight text-[#121212]">
          SubCaps
        </Link>

        {sent ? (
          <div className="mt-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6FFC8]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h1 className="mt-5 text-2xl font-semibold text-[#121212]">Check your email</h1>
            <p className="mt-2 text-sm text-[#79716B]">
              If an account exists for {email}, we&apos;ve sent a reset link.
            </p>
            <Link href="/login" className="mt-6 inline-block text-sm font-medium text-[#121212] hover:underline">
              Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mt-8 text-2xl font-semibold tracking-tight text-[#121212]">
              Reset your password
            </h1>
            <p className="mt-2 text-sm text-[#79716B]">
              Enter your email and we&apos;ll send you a reset link.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#121212]">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#121212] placeholder:text-gray-400 focus:border-[#96FF1A] focus:outline-none focus:ring-1 focus:ring-[#96FF1A]"
                />
              </div>
              <button type="submit" className="w-full rounded-full bg-[#96FF1A] px-4 py-2.5 text-sm font-semibold text-[#121212] transition-all hover:brightness-95">
                Send reset link
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-[#79716B]">
              <Link href="/login" className="font-medium text-[#121212] hover:underline">Back to sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
