"use client";

import { useState } from "react";

const GENERATE_POSTER =
  "/assets/images/generate_poster.webp";

const GENERATE_VIDEO =
  "/assets/videos/subtitles_bento.mp4";

const GENERATE_VIDEO_MOBILE =
  "/assets/videos/brand_bento.mp4";

const SUBTITLES_IMAGE =
  "/assets/images/bento_subtitles.webp";

const BRAND_IMAGE =
  "/assets/images/bento_brand.webp";

const MOBILE_POSTER =
  "/assets/images/generate_poster_mobile.webp";

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 text-[#121212]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4-4 4" />
    </svg>
  );
}

function GreenIcon() {
  return (
    <div className="flex size-8 items-center justify-center rounded-lg bg-[#96ff1a]">
      <ArrowIcon />
    </div>
  );
}

function CardContent({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 p-6 pt-20" style={{ background: "linear-gradient(transparent 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,1) 100%)" }}>
      <div className="relative z-10 flex flex-col items-start gap-2.5">
        <GreenIcon />
        <p className="text-[14px] leading-[1.3] text-white md:text-[16px]">
          <span className="font-medium">{title}</span>{" "}
          <span className="text-white/70">{subtitle}</span>
        </p>
      </div>
    </div>
  );
}

export default function BrandUseCases() {
  const [muted, setMuted] = useState(true);

  return (
    <section id="use-cases" className="bg-[#121212] px-4 py-20 sm:px-8 md:px-[120px] md:py-[100px]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 md:gap-12">
        <h2 className="max-w-[320px] text-balance text-center font-normal text-white text-[34px] leading-[88%] tracking-[-1.7px] sm:max-w-[580px] sm:text-[54px] sm:tracking-[-2.7px]">
          Subtitles that make your videos&nbsp;
          <span className="font-serif italic font-normal">unskippable</span>
        </h2>

        <div className="hidden w-full md:grid grid-cols-2 gap-6">
          <a href="#" className="group relative row-span-2 flex min-h-[800px] cursor-pointer flex-col items-start justify-end overflow-hidden rounded-2xl bg-[#1a1a1a] transition-transform hover:scale-[1.01]">
            <video src={GENERATE_VIDEO} poster={GENERATE_POSTER} autoPlay loop muted={muted} playsInline className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute top-4 left-4 z-10 rounded-[4px] bg-black/40 px-2 py-2 font-medium text-[12px] text-white leading-none backdrop-blur-[12px]">Upload</div>
            <button type="button" onClick={() => setMuted((prev) => !prev)} className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-lg bg-white/90 text-neutral-900 shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
              {muted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m7.733 4.505 2.288-1.657c.521-.421 1.312-.062 1.312.597v3.002m0 3.553v2.555c0 .659-.79 1.018-1.312.597L6.533 10.33h-.8c-1.325 0-2.4-1.043-2.4-2.33 0-.996.314-1.47.8-1.942M1.333 4l13.334 8" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m7.733 4.505 2.288-1.657c.521-.421 1.312-.062 1.312.597v8.11c0 .659-.79 1.018-1.312.597L6.533 10.33h-.8c-1.325 0-2.4-1.043-2.4-2.33s1.075-2.33 2.4-2.33h.8l3.488-2.823" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12.333 6s1 .667 1 2-.999 2-.999 2" /></svg>
              )}
            </button>
            <CardContent title="Drop your reel, short, or TikTok video." subtitle="Supports all major short-form video formats. Drag, drop, done." />
          </a>

          <a href="#" className="group relative flex min-h-[380px] cursor-pointer flex-col items-start justify-end overflow-hidden rounded-2xl bg-[#1a1a1a] transition-transform hover:scale-[1.01]">
            <img src={SUBTITLES_IMAGE} alt="Auto-detected language transcription with word-level precision" className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute top-4 left-4 z-10 rounded-[4px] bg-black/40 px-2 py-2 font-medium text-[12px] text-white leading-none backdrop-blur-[12px]">Detect &amp; Transcribe</div>
            <CardContent title="Auto-detect language, generate accurate transcript." subtitle="40+ languages supported. Word-level precision with 99% accuracy." />
          </a>

          <a href="#" className="group relative flex min-h-[380px] cursor-pointer flex-col items-start justify-end overflow-hidden rounded-2xl bg-[#1a1a1a] transition-transform hover:scale-[1.01]">
            <img src={BRAND_IMAGE} alt="Subtitle style preview with dynamic and gradient designs" className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute top-4 left-4 z-10 rounded-[4px] bg-black/40 px-2 py-2 font-medium text-[12px] text-white leading-none backdrop-blur-[12px]">Style &amp; Burn</div>
            <CardContent title="Choose from dozens of designs, burn into video." subtitle="Dynamic, animated, gradient, and custom styles. Export in one click." />
          </a>
        </div>

        <div className="flex flex-col gap-6 md:hidden w-full">
          {[
            { id: "upload", label: "Upload", image: MOBILE_POSTER, isVideo: true, title: "Drop your reel, short, or TikTok video.", subtitle: "Supports all major short-form video formats. Drag, drop, done." },
            { id: "detect", label: "Detect & Transcribe", image: SUBTITLES_IMAGE, isVideo: false, title: "Auto-detect language, generate accurate transcript.", subtitle: "40+ languages supported. Word-level precision with 99% accuracy." },
            { id: "burn", label: "Style & Burn", image: BRAND_IMAGE, isVideo: false, title: "Choose from dozens of designs, burn into video.", subtitle: "Dynamic, animated, gradient, and custom styles. Export in one click." },
          ].map((card) => (
            <a key={card.id} href="#" className="group relative flex aspect-[9/16] max-h-[648px] cursor-pointer flex-col items-start justify-end overflow-hidden rounded-2xl bg-[#1a1a1a]">
              {card.isVideo ? (
                <video src={GENERATE_VIDEO_MOBILE} poster={card.image} autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover object-top" />
              ) : (
                <img src={card.image} alt={card.id === "detect" ? "Auto-detected language transcription with word-level precision" : "Subtitle style preview with dynamic and gradient designs"} className="absolute inset-0 h-full w-full object-cover object-top" />
              )}
              <div className="absolute top-4 left-4 z-10 rounded-[4px] bg-black/40 px-2 py-2 font-medium text-[12px] text-white leading-none backdrop-blur-[12px]">{card.label}</div>
              <CardContent title={card.title} subtitle={card.subtitle} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
