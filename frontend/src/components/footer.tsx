const FOOTER_COLS = [
  {
    heading: "Video Editor",
    links: [
      "Add Music to Video", "Add Subtitles to Video", "Add Text to Video",
      "Audio to Text", "Auto Subtitle Generator", "Video Caption Generator",
      "Video Compressor", "Video Converter", "Video to Text", "Video Translator",
    ],
  },
  {
    heading: "AI Tools",
    links: [
      "AI Video", "Fabric 1.0 API", "AI Avatars", "AI Image Generator",
      "Video Background Remover", "Remove Background Noise from Video",
      "Remove Background Noise from Audio", "Voice Dubber", "AI Voice Generator",
      "Eye Contact AI", "Text to Speech Video",
    ],
  },
  {
    heading: "AI Playground",
    links: [
      "Fabric 1.0", "Kling O1", "Sora 2", "Sora 2 Pro", "VEO 3.1",
      "VEO 3.1 Fast", "VEO 3", "VEO 3 Fast", "Seedance 1.0", "VEO 2",
      "PixVerse AI", "MiniMax Video 01", "LTX Video", "Kling AI",
    ],
  },
  {
    heading: "Product",
    links: ["Pricing", "Enterprise"],
    subheading: "Resources",
    sublinks: [
      "VEED Blog", "Articles", "Webinars", "Video Guides",
      "VEED Alternatives", "CapCut Alternatives",
      "Kling O1 AI Video Guide", "Science of Great Video Report",
      "The Ultimate Guide to Video Marketing",
    ],
  },
  {
    heading: "Company",
    links: [
      "About VEED", "Jobs", "Privacy", "Terms", "Cookies",
      "Contact Support", "Affiliate Program", "Media Enquiries",
      "Trust Center", "Newsroom",
    ],
    subheading: "Connect",
    sublinks: ["X / Twitter", "YouTube", "Instagram", "TikTok", "Email"],
  },
];

export default function Footer() {
  return (
    <footer data-testid="v3-lite-footer" className="relative z-10 p-4 font-normal text-sm md:p-8 lg:p-6 lg:pt-14">
      <div className="mx-auto max-w-[1200px]">
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

        <p className="mt-8 text-gray-400 text-sm">
          © Copyright 2026 VEED
        </p>
      </div>
    </footer>
  );
}
