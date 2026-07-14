"use client";

import Image from "next/image";

const LOGOS = [
  {
    src: "/assets/images/Amazon.png",
    alt: "Amazon logo",
    w: 84.375,
    h: 54,
  },
  {
    src: "/assets/images/Visa.png",
    alt: "Visa logo",
    w: 61.594,
    h: 54,
  },
  {
    src: "/assets/images/NBC_Universal.png",
    alt: "NBCUniversal logo",
    w: 129.938,
    h: 54,
  },
  {
    src: "/assets/images/Google.png",
    alt: "Google logo",
    w: 87.75,
    h: 54,
  },
  {
    src: "/assets/images/Merck.png",
    alt: "Merck logo",
    w: 102.938,
    h: 54,
  },
  {
    src: "/assets/images/UBS.png",
    alt: "UBS logo",
    w: 82.688,
    h: 54,
  },
  {
    src: "/assets/images/Netflix.png",
    alt: "Netflix logo",
    w: 88.594,
    h: 54,
  },
  {
    src: "/assets/images/Pentax.png",
    alt: "Pentax logo",
    w: 88.594,
    h: 54,
  },
  {
    src: "/assets/images/Venture_Foods.png",
    alt: "Venture Foods logo",
    w: 129.938,
    h: 54,
  },
  {
    src: "/assets/images/P_and_G.png",
    alt: "P&G logo",
    w: 51.469,
    h: 54,
  },
  {
    src: "/assets/images/BBC.png",
    alt: "BBC logo",
    w: 74.25,
    h: 54,
  },
  {
    src: "/assets/images/Target.png",
    alt: "Target logo",
    w: 95.344,
    h: 54,
  },
  {
    src: "/assets/images/Meta.png",
    alt: "Meta logo",
    w: 97.031,
    h: 54,
  },
  {
    src: "/axinor-tech.png?v=4",
    alt: "Axinor Technologies logo",
    w: 150.5,
    h: 25,
  },
  {
    src: "/axinor.png?v=2",
    alt: "Axinor Security logo",
    w: 150.5,
    h: 25,
  },
];

export default function LogoMarquee() {
  return (
    <section
      id="logos-section"
      className="relative mx-auto w-full max-w-7xl py-10 md:py-[100px]"
    >
      <p className="mx-auto mb-6 max-w-[302px] text-center font-serif italic font-normal text-[#79716B] text-[36px] leading-none tracking-[-1.08px] md:mb-8 md:max-w-none md:text-[44px] md:tracking-[-1.32px]">
        <span className="font-bold not-italic font-sans text-[#121212] tracking-[-0.72px] md:tracking-[-0.88px]">
          Powering millions of
        </span>{" "}
        <span className="tracking-[-0.36px] md:tracking-[-1.32px]">
          teams globally
        </span>
      </p>

      <div className="relative overflow-hidden">
        <div
          className="flex w-max animate-marquee items-center gap-16 sm:gap-24"
          style={{ animationDuration: "39s" } as React.CSSProperties}
        >
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={`logo-${i}`}
              className="shrink-0"
            >
              <Image
                alt={logo.alt}
                width={Math.round(logo.w)}
                height={Math.round(logo.h)}
                className="brightness-0"
                src={logo.src}
                unoptimized
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-[100px] bg-gradient-to-r from-white to-transparent md:w-[177px]" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-[100px] bg-gradient-to-l from-white to-transparent md:w-[177px]" />
      </div>
    </section>
  );
}
