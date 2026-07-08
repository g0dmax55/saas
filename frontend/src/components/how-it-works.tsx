"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Upload Your Short",
    description:
      "Drop your reel, TikTok, or YouTube Short — any video up to 3 minutes.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Auto-Detect & Transcribe",
    description:
      "AI detects the language and generates accurate subtitles in seconds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Style the Captions",
    description:
      "Choose from bold, minimal, gradient, or animated word-by-word styles.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Export & Post",
    description:
      "Burn subtitles into the video and share directly to social platforms.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
];

const headingVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stepVariant = (i: number) => ({
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: 0.15 + i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
});

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section className="mb-18 md:mb-[120px] mt-12 md:mt-20" ref={containerRef}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headingVariant}
        >
          <h2 className="text-center text-2xl font-semibold tracking-tight text-[#121212] sm:text-3xl md:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-relaxed text-[#79716B] md:text-base">
            Add professional subtitles to your short videos in under a minute.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={stepVariant(i)}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 md:p-6"
            >
              {/* Hover gradient */}
              <div className="pointer-events-none absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-[#E6FFC8]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6FFC8] text-[#323232]">
                {step.icon}
              </div>

              <div className="relative z-10">
                <span className="mb-1 block font-mono text-xs font-semibold tracking-widest text-[#96FF1A]">
                  {step.number}
                </span>
                <h3 className="text-base font-semibold text-[#121212] md:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#79716B]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connecting progress line (desktop only) */}
        <div className="mx-auto mt-8 hidden h-px max-w-3xl bg-gradient-to-r from-transparent via-[#E6FFC8] to-transparent lg:block" />
      </div>
    </section>
  );
}
