"use client";

import Link from "next/link";
import { Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const FEATURES = [
  {
    title: "Auto Language Detection",
    desc: "Detects 30+ languages automatically from your video audio. No manual selection needed.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "AI Transcription",
    desc: "High-accuracy speech-to-text powered by AI. Works with accents, background noise, and fast speech.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    title: "Subtitle Styles",
    desc: "Choose from Clean, Bold, Gradient, Minimal, or Outline styles. Preview in real time before export.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    ),
  },
  {
    title: "Review & Edit",
    desc: "Full subtitle editor with timeline. Fix mistakes, adjust timings, add or remove captions before export.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: "Burned-in Export",
    desc: "Subtitles permanently embedded in your video. Works on Instagram, TikTok, YouTube, and everywhere else.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    title: ".srt Download",
    desc: "Export subtitles as .srt files for platforms that support separate captions like YouTube and Vimeo.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

function FeaturesContent() {
  return (
    <div className="relative">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-4 pt-24 pb-20 md:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#121212] md:text-4xl">
          Everything you need for perfect subtitles
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-[#79716B]">
          From upload to export — SubCaps handles the entire subtitle workflow so you can focus on creating.
        </p>
      </div>

      <motion.div
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {FEATURES.map((f) => (
          <motion.div
            key={f.title}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6FFC8] text-[#121212]">
              {f.icon}
            </div>
            <h3 className="mt-4 font-semibold text-[#121212]">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#79716B]">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 text-center">
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 rounded-full bg-[#96FF1A] px-6 py-3 text-sm font-semibold text-[#121212] transition-all hover:brightness-95"
        >
          Get started free
        </Link>
      </div>
      </main>
      <Footer />
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <Suspense fallback={<FeaturesSkeleton />}>
      <FeaturesContent />
    </Suspense>
  );
}

function FeaturesSkeleton() {
  return (
    <div className="relative">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-4 pt-24 pb-20 md:px-6">
        <div className="text-center animate-pulse">
          <div className="mx-auto h-10 w-72 rounded-xl bg-gray-200" />
          <div className="mx-auto mt-4 h-5 w-96 rounded-xl bg-gray-100" />
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 animate-pulse">
              <div className="h-10 w-10 rounded-xl bg-gray-200" />
              <div className="mt-4 h-5 w-32 rounded bg-gray-200" />
              <div className="mt-2 space-y-2">
                <div className="h-3 w-full rounded bg-gray-100" />
                <div className="h-3 w-3/4 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
