const TOOLS_DESKTOP = [
  "Subtitle Generator",
  "Auto Captions",
  "Animated Subtitles",
  "Word-by-Word Highlight",
  "Language Detection",
  "Transcript Export",
  "SRT/VTT Download",
  "Burn to Video",
  "Dynamic Styles",
  "Gradient Subtitles",
  "Emoji Subtitles",
  "Multi-Language Support",
  "Custom Font Upload",
  "Subtitle Positioning",
  "Timeline Editor",
  "Video Compressor",
  "Video Trimmer",
  "Audio Extraction",
  "Noise Reduction",
  "Export in 4K",
  "Batch Processing",
  "Brand Kit",
  "Template Library",
  "API Access",
  "Webhook Integration",
  "Team Workspace",
  "Cloud Storage",
  "Analytics Dashboard",
  "Preview Player",
  "One-Click Share",
];

const TOOLS_MOBILE = [
  "Subtitle Generator",
  "Auto Captions",
  "Animated Subtitles",
  "Word-by-Word Highlight",
  "Language Detection",
  "Transcript Export",
  "Burn to Video",
  "Dynamic Styles",
  "Gradient Subtitles",
  "Multi-Language",
  "Custom Fonts",
  "Subtitle Positioning",
  "Video Compressor",
  "Video Trimmer",
  "Export in 4K",
  "API Access",
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4-4 4" />
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
    <section id="discover-more-section" className="mt-24 pb-20 md:pb-28">
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
