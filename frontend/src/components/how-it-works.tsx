"use client";

const STEPS = [
  {
    number: 1,
    title: "Upload Your Short",
    description: "Drop your reel, TikTok, or YouTube Short — any video up to 3 minutes.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Auto-Detect & Transcribe",
    description: "AI detects the language and generates accurate subtitles in seconds.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Style the Captions",
    description: "Choose from bold, minimal, gradient, or animated word-by-word styles.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    number: 4,
    title: "Export & Post",
    description: "Burn subtitles into the video and share directly to social platforms.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="mb-18 md:mb-[120px] mt-12 md:mt-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-[#121212] sm:text-3xl md:text-4xl">
          How it works
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-relaxed text-[#79716B] md:text-base">
          Add professional subtitles to your short videos in under a minute.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="group relative flex flex-col items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-shadow hover:shadow-md md:p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6FFC8] text-[#262525]">
                {step.icon}
              </div>
              <div>
                <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-[#96FF1A]">
                  Step {step.number}
                </span>
                <h3 className="text-base font-semibold text-[#121212] md:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#79716B]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
