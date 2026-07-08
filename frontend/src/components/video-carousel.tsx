"use client";

import { useState, useRef, useCallback } from "react";

const VIDEOS = [
  {
    id: "explainer",
    label: "Explainer",
    poster:
      "https://cdn-site-assets.veed.io/explainer_thumbnail_3768659367/explainer_thumbnail_3768659367.webp",
    webm: "https://cdn-site-assets.veed.io/explainer_f6002e993a_93dbb828aa/explainer_f6002e993a_93dbb828aa.webm",
    mp4: "https://cdn-site-assets.veed.io/explainer_f6002e993a/explainer_f6002e993a.mp4",
  },
  {
    id: "product-demo",
    label: "Product Demo",
    poster:
      "https://cdn-site-assets.veed.io/product_demo_thumbnail_25a699f4f9/product_demo_thumbnail_25a699f4f9.webp",
    webm: "https://cdn-site-assets.veed.io/product_demo_d6abfa2c8f_63c9063ae7/product_demo_d6abfa2c8f_63c9063ae7.webm",
    mp4: "",
  },
  {
    id: "ad",
    label: "Ad",
    poster:
      "https://cdn-site-assets.veed.io/ad_thumbnail_e2d966af2f/ad_thumbnail_e2d966af2f.webp",
    webm: "https://cdn-site-assets.veed.io/ad_19a9e711bc_543babf5be/ad_19a9e711bc_543babf5be.webm",
    mp4: "https://cdn-site-assets.veed.io/ad_19a9e711bc/ad_19a9e711bc.mp4",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    poster:
      "https://cdn-site-assets.veed.io/testimonial_thumbnail_19133c385f/testimonial_thumbnail_19133c385f.webp",
    webm: "https://cdn-site-assets.veed.io/testimonial_0c0ce3bb84_3b7b09718d/testimonial_0c0ce3bb84_3b7b09718d.webm",
    mp4: "",
  },
  {
    id: "thought-leadership",
    label: "Thought Leadership",
    poster:
      "https://cdn-site-assets.veed.io/thought_leadership_thumbnail_32f3086d52/thought_leadership_thumbnail_32f3086d52.webp",
    webm: "https://cdn-site-assets.veed.io/thought_leadership_f9c3270c7c_7c3a3e3298/thought_leadership_f9c3270c7c_7c3a3e3298.webm",
    mp4: "",
  },
];

function VideoCard({
  video,
  isActive,
  pos,
  onClick,
  onHover,
  onLeave,
}: {
  video: (typeof VIDEOS)[number];
  isActive: boolean;
  pos: number;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    onHover();
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    onLeave();
    videoRef.current?.pause();
  };

  return (
    <div
      className="flex-none"
      style={{
        position: isActive ? "relative" : "absolute",
        transform: `translateX(${pos}px)`,
        zIndex: isActive ? 10 : 0,
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`Select ${video.label} example`}
        className={`group relative flex-none cursor-pointer h-[380px] w-[242px] overflow-hidden rounded-2xl bg-neutral-900 transition-all duration-300 md:h-[503px] md:w-[282px] ${
          isActive
            ? "shadow-2xl shadow-black/20 scale-100"
            : "scale-95"
        }`}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          poster={video.poster}
          muted
          playsInline
          preload="metadata"
          loop
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
          <span className="font-medium text-[11px] text-white leading-none tracking-[-0.0275px]">
            {video.label}
          </span>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start px-4 pt-[70px] pb-4 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%)",
          }}
        >
          <button type="button" className="pointer-events-auto flex h-8 cursor-pointer items-center justify-center rounded-[58px] bg-[#96ff1a] px-3 py-2">
            <span className="whitespace-nowrap text-[#262525] text-[13px] leading-[1.4]">Get the prompt</span>
          </button>
        </div>

        <button
          type="button"
          aria-label="Unmute video"
          className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white/90 text-neutral-900 opacity-0 transition-opacity group-hover:opacity-100"
          style={{ boxShadow: "0px 1px 2px -1px rgba(68,68,70,0.15), 0px 2px 5px 0px rgba(68,68,70,0.05)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m7.733 4.505 2.288-1.657c.521-.421 1.312-.062 1.312.597v3.002m0 3.553v2.555c0 .659-.79 1.018-1.312.597L6.533 10.33h-.8c-1.325 0-2.4-1.043-2.4-2.33 0-.996.314-1.47.8-1.942M1.333 4l13.334 8" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function VideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [progressKey, setProgressKey] = useState(0);

  const goTo = (index: number) => {
    setActiveIndex(index);
    setProgressKey((k) => k + 1);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
    setProgressKey((k) => k + 1);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
    setProgressKey((k) => k + 1);
  };

  const getPosition = (i: number) => {
    const diff = i - activeIndex;
    return diff * 290;
  };

  return (
    <section className="relative w-full">
      <div className="flex justify-center overflow-hidden">
        <div className="relative flex h-[420px] items-center justify-center md:h-[540px]">
          {VIDEOS.map((video, i) => (
            <VideoCard
              key={video.id}
              video={video}
              isActive={i === activeIndex}
              pos={getPosition(i)}
              onClick={() => goTo(i)}
              onHover={() => {}}
              onLeave={() => {}}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-[712px] items-center justify-between px-4">
        <button type="button" onClick={goPrev} className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#f2f1f0] text-[#121212] transition hover:bg-gray-200">
          <svg className="size-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,19 8,12 15,5" />
          </svg>
        </button>

        <div className="flex items-center gap-[2px]">
          {VIDEOS.map((_, i) =>
            i === activeIndex ? (
              <div key={`prog-${i}-${progressKey}`} className="h-1 w-10 overflow-hidden rounded-sm bg-[rgba(18,18,18,0.12)]">
                <div className="h-1 animate-carousel-progress rounded-sm bg-[#121212]" />
              </div>
            ) : (
              <div key={`dot-${i}`} className="p-[6px]">
                <div className="size-1 rounded-sm bg-[rgba(18,18,18,0.12)]" />
              </div>
            )
          )}
        </div>

        <button type="button" onClick={goNext} className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#f2f1f0] text-[#121212] transition hover:bg-gray-200">
          <svg className="size-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,5 16,12 9,19" />
          </svg>
        </button>
      </div>
    </section>
  );
}
