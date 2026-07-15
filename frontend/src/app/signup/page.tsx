"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const PREVIEW_VIDEOS = [
  {
    id: "left",
    poster: "/assets/images/dynamic_thumbnail.webp",
    src: "/assets/videos/ad.webm",
    rotation: -8,
    xOffset: -120,
    zIndex: 10,
    scale: 0.9,
  },
  {
    id: "center",
    poster: "/assets/images/clean_thumbnail.webp",
    src: "/assets/videos/explainer.webm",
    rotation: 0,
    xOffset: 0,
    zIndex: 20,
    scale: 1,
  },
  {
    id: "right",
    poster: "/assets/images/minimal_thumbnail.webp",
    src: "/assets/videos/minimal.webm",
    rotation: 8,
    xOffset: 120,
    zIndex: 10,
    scale: 0.9,
  },
];

const PLANS = [
  {
    id: "free",
    name: "Free Plan",
    price: "$0",
    desc: "5 videos/mo, basic styles",
    highlight: false,
    cta: "Get Started for Free",
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: "$11",
    desc: "Unlimited videos, all 20+ styles",
    highlight: true,
    cta: "Start 7-Day Free Trial",
  },
  {
    id: "business",
    name: "Business Plan",
    price: "$31",
    desc: "Everything in Pro + 5 team seats",
    highlight: false,
    cta: "Start Business Trial",
  },
];

export default function SignupPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const activePlan = PLANS.find((p) => p.id === selectedPlan) || PLANS[1];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      router.push("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden bg-white lg:grid-cols-2">
      {/* Left Column: Form */}
      <div 
        className="relative flex flex-col justify-between px-6 py-8 md:px-12 lg:px-16 xl:px-24 bg-white"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8.8' height='8.8'%3E%3Ccircle cx='1' cy='1' r='1' fill='black' fill-opacity='0.1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      >
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-[#121212]">
            SubCaps
          </Link>
          <span className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#121212] hover:underline">
              Log in
            </Link>
          </span>
        </div>

        {/* Form Container */}
        <div className="relative z-10 mx-auto my-auto w-full max-w-[440px] py-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-[#121212]">
              Create your account
            </h1>
            <p className="text-[15px] text-[#79716B]">
              Choose a plan and start burning subtitles in seconds
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            {/* Plan Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-[#121212]">
                Select your plan
              </span>
              <div className="flex flex-col gap-2">
                {PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${
                      selectedPlan === plan.id
                        ? "border-[#121212] bg-gray-50/50 ring-1 ring-[#121212]"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          selectedPlan === plan.id
                            ? "border-[#121212] bg-[#121212]"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedPlan === plan.id && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#121212] flex items-center gap-1.5">
                          {plan.name}
                          {plan.highlight && (
                            <span className="rounded bg-[#E6FFC8] px-1.5 py-0.5 text-[9px] font-bold text-[#121212] tracking-wide uppercase">
                              Popular
                            </span>
                          )}
                        </span>
                        <span className="text-[11px] text-gray-500 leading-tight mt-0.5">{plan.desc}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-[#121212]">{plan.price}</span>
                      <span className="text-[9px] text-gray-400 block uppercase font-medium">/mo</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-semibold text-[#121212]">
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#121212] placeholder-gray-400 outline-none transition-all focus:border-[#121212] focus:ring-1 focus:ring-[#121212]"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-[#121212]">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#121212] placeholder-gray-400 outline-none transition-all focus:border-[#121212] focus:ring-1 focus:ring-[#121212]"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-[#121212]">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#121212] placeholder-gray-400 outline-none transition-all focus:border-[#121212] focus:ring-1 focus:ring-[#121212]"
              />
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2 mt-1">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 text-[#121212] focus:ring-[#121212]"
              />
              <label htmlFor="terms" className="select-none text-xs text-gray-500 cursor-pointer leading-tight">
                I agree to the{" "}
                <Link href="/terms" className="font-medium text-[#121212] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-medium text-[#121212] hover:underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Submit Button */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-[#323232] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#1a1a1a] disabled:opacity-60"
            >
              {loading ? "Creating account..." : activePlan.cta}
            </button>

            {/* Divider */}
            <div className="relative my-2 flex items-center justify-center">
              <div className="absolute w-full border-t border-gray-100" />
              <span className="relative bg-white px-3 text-xs text-gray-400 uppercase">
                Or continue with
              </span>
            </div>

            {/* Social Signups */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-gray-400">
          <span>&copy; {new Date().getFullYear()} SubCaps Inc.</span>
          <div className="flex gap-3">
            <Link href="/privacy" className="hover:text-[#121212]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#121212]">Terms</Link>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Video Card Preview Panel */}
      <div className="relative hidden items-center justify-center bg-[#121212] lg:flex">
        {/* Subtle grid background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='20' height='20' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Ambient glow effect in background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-[#96FF1A]/10 blur-[120px]"
        />

        {/* Card Stack Area */}
        <div className="relative flex h-[500px] w-[600px] items-center justify-center">
          {PREVIEW_VIDEOS.map((video) => (
            <motion.div
              key={video.id}
              className="absolute"
              style={{
                zIndex: video.zIndex,
              }}
              animate={{
                rotate: video.rotation,
                x: video.xOffset,
                scale: video.scale,
              }}
              whileHover={{
                scale: video.scale + 0.05,
                y: -10,
                zIndex: 30,
                transition: { duration: 0.2 },
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 18,
              }}
            >
              <div
                className="relative h-[360px] w-[202px] overflow-hidden rounded-[24px] border border-white/10 bg-neutral-900 shadow-2xl transition-all duration-300 md:h-[400px] md:w-[225px]"
                style={{
                  boxShadow:
                    video.id === "center"
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(150, 255, 26, 0.08)"
                      : "0 20px 35px -10px rgba(0, 0, 0, 0.6)",
                }}
              >
                <video
                  src={video.src}
                  poster={video.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
                
                {/* Subtle sheen highlight border */}
                <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
