"use client";

import Link from "next/link";
import { Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const TEMPLATES = [
  {
    id: "clean",
    name: "Clean",
    style: "text-white font-bold text-lg [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]",
    desc: "Clean white text with bold font. Professional and never distracting.",
    best: "Tutorials, vlogs, educational content",
  },
];

function TemplatesContent() {
  return (
    <div className="relative">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-4 pt-24 pb-20 md:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#121212] md:text-4xl">
          Subtitle style templates
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-[#79716B]">
          Pick a polished style. Preview and choose what fits your content best.
        </p>
      </div>

      <motion.div
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {TEMPLATES.map((t) => (
          <motion.div
            key={t.id}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex h-24 items-center justify-center rounded-xl bg-[#121212]">
              <span className={t.style}>Sample caption</span>
            </div>
            <h3 className="mt-4 font-semibold text-[#121212]">{t.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#79716B]">{t.desc}</p>
            <div className="mt-3 rounded-lg bg-[#E6FFC8]/50 px-3 py-2">
              <span className="text-[10px] font-medium text-[#121212]">Best for:</span>{" "}
              <span className="text-[11px] text-[#79716B]">{t.best}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 text-center">
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 rounded-full bg-[#96FF1A] px-6 py-3 text-sm font-semibold text-[#121212] transition-all hover:brightness-95"
        >
          Try all styles free
        </Link>
      </div>
      </main>
      <Footer />
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<TemplatesSkeleton />}>
      <TemplatesContent />
    </Suspense>
  );
}

function TemplatesSkeleton() {
  return (
    <div className="relative">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-4 pt-24 pb-20 md:px-6">
        <div className="text-center animate-pulse">
          <div className="mx-auto h-10 w-72 rounded-xl bg-gray-200" />
          <div className="mx-auto mt-4 h-5 w-80 rounded-xl bg-gray-100" />
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 animate-pulse">
              <div className="h-24 rounded-xl bg-gray-200" />
              <div className="mt-4 h-5 w-20 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-full rounded bg-gray-100" />
              <div className="mt-3 h-8 rounded-lg bg-gray-100" />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
