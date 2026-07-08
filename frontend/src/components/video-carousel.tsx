"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const VIDEOS = [
  {
    id: "clean",
    label: "Clean",
    poster: "https://cdn-site-assets.veed.io/explainer_thumbnail_3768659367/explainer_thumbnail_3768659367.webp",
    webm: "https://cdn-site-assets.veed.io/explainer_f6002e993a_93dbb828aa/explainer_f6002e993a_93dbb828aa.webm",
    mp4: "https://cdn-site-assets.veed.io/explainer_f6002e993a/explainer_f6002e993a.mp4",
  },
  {
    id: "bold",
    label: "Bold",
    poster: "https://cdn-site-assets.veed.io/product_demo_thumbnail_25a699f4f9/product_demo_thumbnail_25a699f4f9.webp",
    webm: "https://cdn-site-assets.veed.io/product_demo_d6abfa2c8f_63c9063ae7/product_demo_d6abfa2c8f_63c9063ae7.webm",
    mp4: "",
  },
  {
    id: "dynamic",
    label: "Dynamic",
    poster: "https://cdn-site-assets.veed.io/ad_thumbnail_e2d966af2f/ad_thumbnail_e2d966af2f.webp",
    webm: "https://cdn-site-assets.veed.io/ad_19a9e711bc_543babf5be/ad_19a9e711bc_543babf5be.webm",
    mp4: "https://cdn-site-assets.veed.io/ad_19a9e711bc/ad_19a9e711bc.mp4",
  },
  {
    id: "minimal",
    label: "Minimal",
    poster: "https://cdn-site-assets.veed.io/testimonial_thumbnail_19133c385f/testimonial_thumbnail_19133c385f.webp",
    webm: "https://cdn-site-assets.veed.io/testimonial_0c0ce3bb84_3b7b09718d/testimonial_0c0ce3bb84_3b7b09718d.webm",
    mp4: "",
  },
  {
    id: "gradient",
    label: "Gradient",
    poster: "https://cdn-site-assets.veed.io/thought_leadership_thumbnail_32f3086d52/thought_leadership_thumbnail_32f3086d52.webp",
    webm: "https://cdn-site-assets.veed.io/thought_leadership_f9c3270c7c_7c3a3e3298/thought_leadership_f9c3270c7c_7c3a3e3298.webm",
    mp4: "",
  },
];

export default function VideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [animKey, setAnimKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videosRef = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    setAnimKey((k) => k + 1);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const video = videosRef.current[activeIndex];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [activeIndex]);

  // Fallback auto-advance in case CSS animationend is unreliable
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      goNext();
    }, 8000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, animKey, isPaused, goNext]);

  const getPosition = (i: number) => (i - activeIndex) * 290;

  return (
    <section className="relative w-full">
      <div
        className="flex touch-pan-y justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-[420px] w-full md:h-[540px]">
          {VIDEOS.map((video, i) => {
            const pos = getPosition(i);
            const isActive = i === activeIndex;

            return (
              <div
                key={video.id}
                className="absolute left-1/2 top-1/2 flex-none transition-transform duration-[500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform"
                style={{
                  transform: `translate(-50%, -50%) translateX(${pos}px)`,
                  zIndex: 10 - Math.abs(i - activeIndex),
                }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${video.label} example`}
                  className="group relative flex-none cursor-pointer h-[380px] w-[242px] overflow-hidden rounded-2xl bg-neutral-900 md:h-[503px] md:w-[282px]"
                  onClick={() => goTo(i)}
                >
                  <video
                    ref={(el) => { videosRef.current[i] = el; }}
                    poster={video.poster}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full rounded-2xl bg-neutral-900 object-cover"
                    style={{
                      backgroundImage: `url(${video.poster})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {video.webm && <source src={video.webm} type="video/webm" />}
                    {video.mp4 && <source src={video.mp4} type="video/mp4" />}
                  </video>

                  <div className="absolute top-4 left-4 z-10 flex h-[30px] items-center justify-center rounded-[4px] border border-white/[0.08] bg-[rgba(12,10,9,0.3)] px-2 backdrop-blur-[4px]">
                    <span className="font-medium text-[11px] text-white leading-none tracking-[-0.0275px]">{video.label}</span>
                  </div>

                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start px-4 pt-[70px] pb-4 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%)" }}
                  >
                    <button type="button" className="pointer-events-auto flex h-8 cursor-pointer items-center justify-center rounded-[58px] bg-[#96ff1a] px-3 py-2">
                      <span className="whitespace-nowrap text-[#262525] text-[13px] leading-[1.4]">Use this style</span>
                    </button>
                  </div>

                  <button type="button" aria-label="Unmute video"
                    className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white/90 text-neutral-900 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ boxShadow: "0px 1px 2px -1px rgba(68,68,70,0.15), 0px 2px 5px 0px rgba(68,68,70,0.05)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m7.733 4.505 2.288-1.657c.521-.421 1.312-.062 1.312.597v3.002m0 3.553v2.555c0 .659-.79 1.018-1.312.597L6.533 10.33h-.8c-1.325 0-2.4-1.043-2.4-2.33 0-.996.314-1.47.8-1.942M1.333 4l13.334 8" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-[1200px]">
        <div className="flex items-center justify-between px-4">
          <div className="w-[68px]" />
          <div className="flex items-center gap-[2px]">
            {VIDEOS.map((_, i) =>
              i === activeIndex ? (
                <div key={`bar-${i}-${animKey}`} className="p-[6px]">
                  <div className="h-1 w-10 overflow-hidden rounded-sm bg-[rgba(18,18,18,0.12)]">
                    <div
                      className="h-1 rounded-sm bg-[#121212]"
                      style={{
                        animation: `carousel-progress 8000ms linear forwards`,
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
                      onAnimationEnd={goNext}
                    />
                  </div>
                </div>
              ) : (
                <div key={`dot-${i}`} className="p-[6px]">
                  <div className="size-1 rounded-sm bg-[rgba(18,18,18,0.12)]" />
                </div>
              )
            )}
          </div>
          <div className="w-[68px]" />
        </div>
      </div>
    </section>
  );
}
