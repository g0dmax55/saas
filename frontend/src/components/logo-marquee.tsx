"use client";

const LOGOS = [
  {
    src: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=256,quality=100,format=auto/Amazon_c72e6b68ae/Amazon_c72e6b68ae.png",
    alt: "Amazon logo",
    w: 84.375,
    h: 54,
  },
  {
    src: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=128,quality=100,format=auto/Visa_824fad0f68/Visa_824fad0f68.png",
    alt: "Visa logo",
    w: 61.594,
    h: 54,
  },
  {
    src: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=360,quality=100,format=auto/NBC_Universal_53e51a3a25/NBC_Universal_53e51a3a25.png",
    alt: "NBCUniversal logo",
    w: 129.938,
    h: 54,
  },
  {
    src: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=256,quality=100,format=auto/Google_191e6eaa4b/Google_191e6eaa4b.png",
    alt: "Google logo",
    w: 87.75,
    h: 54,
  },
  {
    src: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=256,quality=100,format=auto/Merck_f31b3e1af8/Merck_f31b3e1af8.png",
    alt: "Merck logo",
    w: 102.938,
    h: 54,
  },
  {
    src: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=256,quality=100,format=auto/UBS_cb5db0129c/UBS_cb5db0129c.png",
    alt: "UBS logo",
    w: 82.688,
    h: 54,
  },
  {
    src: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=256,quality=100,format=auto/Netflix_b3b097a6dd/Netflix_b3b097a6dd.png",
    alt: "Netflix logo",
    w: 88.594,
    h: 54,
  },
  {
    src: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=256,quality=100,format=auto/Pentax_361ebf32f7/Pentax_361ebf32f7.png",
    alt: "Pentax logo",
    w: 88.594,
    h: 54,
  },
  {
    src: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=360,quality=100,format=auto/Venture_Foods_26965b4b3b/Venture_Foods_26965b4b3b.png",
    alt: "Venture Foods logo",
    w: 129.938,
    h: 54,
  },
  {
    src: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=128,quality=100,format=auto/P_and_G_e0add370a9/P_and_G_e0add370a9.png",
    alt: "P&G logo",
    w: 51.469,
    h: 54,
  },
  {
    src: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=256,quality=100,format=auto/BBC_bc7cf3467c/BBC_bc7cf3467c.png",
    alt: "BBC logo",
    w: 74.25,
    h: 54,
  },
  {
    src: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=256,quality=100,format=auto/Target_a82015d452/Target_a82015d452.png",
    alt: "Target logo",
    w: 95.344,
    h: 54,
  },
  {
    src: "https://cdn-site-assets.veed.io/cdn-cgi/image/width=256,quality=100,format=auto/Meta_e47b5e487a/Meta_e47b5e487a.png",
    alt: "Meta logo",
    w: 97.031,
    h: 54,
  },
];

export default function LogoMarquee() {
  return (
    <section
      id="logos-section"
      className="relative mx-auto w-full max-w-7xl py-10 md:py-[100px]"
    >
      <p className="mx-auto mb-6 max-w-[302px] text-center font-serif italic font-normal text-[#262525] text-[32px] leading-none tracking-[-0.96px] md:mb-8 md:max-w-none md:text-[40px] md:tracking-[-1.2px]">
        <span className="font-medium not-italic font-sans tracking-[-0.64px] md:tracking-[-0.64px]">
          Powering millions of
        </span>{" "}
        <span className="tracking-[-0.32px] md:tracking-[-1.2px]">
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
              style={
                {
                  "--logo-width": `${logo.w}px`,
                  "--logo-height": `${logo.h}px`,
                } as React.CSSProperties
              }
            >
              <img
                alt={logo.alt}
                loading="lazy"
                width={logo.w}
                height={logo.h}
                decoding="async"
                className="brightness-0"
                src={logo.src}
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
