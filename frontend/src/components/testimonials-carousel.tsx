"use client";

import { useRef, useState } from "react";

const TESTIMONIALS = [
  {
    quote: "With VEED I didn't need 15 tutorials - I jumped straight in and started editing.",
    name: "Gwenne Wilcox",
    role: "Founder",
    company: "Brand Brainery",
    image: "https://cdn-site-assets.veed.io/gwenne_ad07f1d917/gwenne_ad07f1d917.webp",
  },
  {
    quote: "You can go beyond choppping things. VEED actually makes my videos look great.",
    name: "Michael Glover",
    role: "Demand Gen Manager",
    company: "ConvertFlow",
    image: "https://cdn-site-assets.veed.io/michael_1c6818c062/michael_1c6818c062.webp",
  },
  {
    quote: "The first four videos i created with VEED got over 40,000 impressions on LinkedIn.",
    name: "Travis Tyler",
    role: "Senior Content Producer",
    company: "PandaDoc",
    image: "https://cdn-site-assets.veed.io/travis_fbfd5a61b7/travis_fbfd5a61b7.webp",
  },
  {
    quote: "I found VEED at the right time: if you're making UGC ads and not using Eye Contact Correction and Noise Reduction on VEED you're missing out on ROI.",
    name: "Sebastian Schurgers",
    role: "Head of Growth Marketing",
    company: "Gronda",
    image: "https://cdn-site-assets.veed.io/sebastian_b4732a00ff/sebastian_b4732a00ff.webp",
  },
];

export default function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
    setScrollStart(scrollRef.current?.scrollLeft ?? 0);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollStart - walk;
  };

  const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="w-full py-10 md:py-[100px]">
      <div className="mx-auto max-w-[1200px] px-6 xl:px-0">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex snap-x snap-mandatory flex-row overflow-x-auto select-none"
          style={{ cursor: isDragging ? "grabbing" : "grab", scrollSnapType: "x mandatory", gap: 8, paddingLeft: 8, paddingRight: 8 }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {allTestimonials.map((t, i) => (
            <div key={`${t.name}-${i}`} className="flex h-[440px] w-[294px] flex-none snap-start flex-col justify-between rounded-2xl bg-[#d6ffa6] p-6">
              <div className="flex flex-col">
                <p className="font-serif italic text-[#0c0a09] text-[40px] leading-[0.96] tracking-[-1.2px]">&ldquo;</p>
                <p className="mt-1 font-medium text-[#0c0a09] text-base leading-[1.36] tracking-[-0.08px]">{t.quote}</p>
              </div>
              <div className="relative h-[236px] w-full overflow-hidden rounded-[10px]">
                <img src={t.image} alt={t.name} className="h-full w-full object-cover object-top" />
                <div className="absolute bottom-0 left-0 flex flex-col gap-2 rounded-[10px] bg-white p-4">
                  <p className="font-medium text-[#121212] text-[13px] leading-[1.36]">{t.name}</p>
                  <p className="text-[#797676] text-[13px] leading-[1.36] tracking-[0.13px]">
                    {t.role}
                    <br />
                    {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
