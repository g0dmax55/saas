"use client";

import { useState } from "react";
import Image from "next/image";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding");
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
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#323232] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#1a1a1a]"
            >
              {activePlan.cta}
            </button>
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
