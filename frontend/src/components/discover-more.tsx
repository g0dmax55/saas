const TOOLS_DESKTOP = [
  "AI Video Generator",
  "Text to Video AI",
  "Image to Video AI",
  "AI Video Models",
  "AI Avatar",
  "Dubbing AI",
  "AI Text to Speech",
  "AI Clip Generator",
  "Fabric 1.0",
  "Sora 2",
  "Veo 3.1",
  "Kling AI",
  "AI Reel Generator",
  "AI Voice Generator",
  "AI Video Editor",
  "Video Editor",
  "Automatic Subtitle Generator",
  "Remove Background Noise From Audio",
  "Remove Background Noise From Video",
  "Teleprompter",
  "Eye Contact AI",
  "Video Caption Generator",
  "Add Subtitles to Video",
  "Video Translator",
  "Video Compressor",
  "MP4 Compressor",
  "Dynamic Subtitles",
  "Screen Recorder",
  "Video Background Remover",
  "Add Text to Video",
];

const TOOLS_MOBILE = [
  "AI Video Generator",
  "Text to Video AI",
  "Image to Video AI",
  "AI Avatar",
  "Dubbing AI",
  "AI Text to Speech",
  "Fabric 1.0",
  "Sora 2",
  "Veo 3.1",
  "Kling AI",
  "AI Reel Generator",
  "AI Voice Generator",
  "Video Editor",
  "Automatic Subtitle Generator",
  "Remove Background Noise From Video",
  "Video Translator",
];

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8h10m0 0L9 4m4 4-4 4"
      />
    </svg>
  );
}

function ChipLink({ children }: { children: string }) {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-1.5 rounded-[12px] bg-[#f2f1f0] p-2 text-[#4D4D51] text-[14px] leading-[1.2] tracking-[-0.42px] no-underline transition-colors hover:bg-[#e8e7e6] md:gap-[9px] md:p-3.5 md:text-[16px] md:leading-none md:tracking-[-0.08px]"
    >
      {children}
      <ArrowIcon className="size-3.5 text-[#4D4D51] md:size-5" />
    </a>
  );
}

export default function DiscoverMore() {
  return (
    <section id="discover-more-section" className="mt-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 px-6 md:px-10 xl:px-0">
        <div className="flex flex-col items-center gap-4">
          <p className="font-semibold text-[#121212] text-xs uppercase leading-[21.6px]">
            TOOLS
          </p>
          <h2 className="text-center font-medium text-[#121212] text-[32px] leading-[0.9] tracking-[-1.28px] md:text-[44px] md:tracking-[-1.76px]">
            Discover{" "}
            <span className="font-serif italic font-normal">more</span>:
          </h2>
        </div>

        <div className="hidden flex-wrap justify-center gap-x-3 gap-y-4 md:flex">
          {TOOLS_DESKTOP.map((tool) => (
            <ChipLink key={tool}>{tool}</ChipLink>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-4 md:hidden">
          {TOOLS_MOBILE.map((tool) => (
            <ChipLink key={tool}>{tool}</ChipLink>
          ))}
        </div>
      </div>
    </section>
  );
}
