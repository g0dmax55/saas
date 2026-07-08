const FOOTER_COLS = [
  {
    heading: "Subtitle Tools",
    links: [
      "Subtitle Generator", "Auto Captions", "Animated Subtitles",
      "Word Highlight", "Dynamic Styles", "Gradient Subtitles",
      "Emoji Subtitles", "Multi-Language", "Transcript Export", "SRT/VTT Download",
    ],
  },
  {
    heading: "Smart Features",
    links: [
      "Language Detection", "Speech to Text", "Auto Translation",
      "Noise Reduction", "Audio Extraction", "Speaker Detection",
      "Custom Fonts", "Subtitle Positioning", "Timeline Editor",
      "Burn to Video", "Batch Processing",
    ],
  },
  {
    heading: "Styles",
    links: [
      "Clean", "Bold", "Dynamic", "Minimal", "Gradient",
      "Karaoke", "Typewriter", "Neon", "Shadow", "Outline",
      "Custom CSS", "Brand Templates", "Preset Library", "Dark Mode Subtitles",
    ],
  },
  {
    heading: "Product",
    links: ["Pricing", "Enterprise"],
    subheading: "Resources",
    sublinks: [
      "Blog", "Help Center", "API Docs",
      "Video Guides", "Templates", "Changelog",
      "Community", "Affiliate Program",
    ],
  },
  {
    heading: "Company",
    links: [
      "About", "Careers", "Privacy", "Terms", "Cookies",
      "Contact", "Media Kit", "Status",
    ],
    subheading: "Connect",
    sublinks: ["X / Twitter", "YouTube", "Instagram", "TikTok", "Email"],
  },
];

export default function Footer() {
  return (
    <footer data-testid="v3-lite-footer" className="relative z-10 p-4 font-normal text-sm md:p-8 lg:p-6 lg:pt-14">
      <div className="mx-auto max-w-[1200px]">
        <nav aria-label="Footer navigation">
          <div className="grid grid-cols-2 grid-rows-[repeat(3,fit-content(100%))] gap-x-4 gap-y-7 self-stretch px-3 text-sm lg:w-full lg:grid-cols-5 lg:grid-rows-none lg:gap-y-4 lg:px-0">
            {FOOTER_COLS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4 lg:gap-8">
                <p className="font-normal text-gray-500 text-sm">
                  {col.heading}
                </p>
                <div className="flex flex-col gap-4">
                  {col.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-gray-400 text-sm no-underline transition-colors hover:text-gray-600"
                    >
                      {link}
                    </a>
                  ))}
                </div>
                {col.subheading && (
                  <>
                    <p className="font-normal text-gray-500 text-sm">
                      {col.subheading}
                    </p>
                    <div className="flex flex-col gap-4">
                      {col.sublinks?.map((link) => (
                        <a
                          key={link}
                          href="#"
                          className="text-gray-400 text-sm no-underline transition-colors hover:text-gray-600"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </nav>

        <p className="mt-8 text-gray-400 text-sm">
          © Copyright 2026 Subtitle Studio
        </p>
      </div>
    </footer>
  );
}
