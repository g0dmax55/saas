
export default function HeroSection() {
  return (
    <section id="hero-section" className="relative">
      <div className="mx-auto max-w-[1920px] px-4 pt-24 pb-14 md:px-6 md:pb-24 lg:pt-28 xl:max-w-[1408px] xl:px-4 min-[1440px]:px-0">
        <div className="mx-auto flex flex-col items-center">
          <div className="flex w-full flex-col items-center">
            <div className="flex flex-row items-center justify-center gap-2.5 text-sm text-black/50">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                role="img"
                aria-label="G2 Rating"
                viewBox="0 0 24 24"
                className="h-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm.122 5.143c.45 0 .9.044 1.342.132l-1.342 2.806C9.962 8.08 8.203 9.84 8.203 12s1.76 3.92 3.92 3.92c.937 0 1.844-.338 2.553-.951l1.483 2.572A6.856 6.856 0 0 1 5.266 12a6.856 6.856 0 0 1 6.856-6.856Zm3.498.49a1.262 1.262 0 0 1 .026 0c.427 0 .792.113 1.101.34.31.229.466.546.466.946 0 .639-.36 1.03-1.035 1.376l-.377.191c-.403.204-.602.385-.657.706h2.05v.85h-3.101v-.144c0-.526.103-.96.314-1.306.211-.345.576-.65 1.102-.917l.242-.117c.427-.216.538-.401.538-.625 0-.266-.228-.458-.6-.458-.44 0-.773.228-1.004.694l-.592-.595c.13-.279.338-.502.619-.675a1.7 1.7 0 0 1 .908-.266Zm-2.094 5.388h3.394l1.697 2.937-1.697 2.94-1.697-2.94H11.83l1.696-2.937Z" />
              </svg>
              <span className="font-bold tabular-nums">1500+</span>
              <span>5 star reviews</span>
            </div>
            <h1 className="mt-3 w-full max-w-[20rem] text-pretty text-center font-medium text-[#121212] text-[40px] leading-[88%] tracking-[-2px] md:max-w-none md:text-[44px] md:tracking-[-1.76px]">
              Instant Subtitles, made for social
            </h1>
            <p className="mt-6 text-pretty text-center font-normal text-[#79716B] text-[16px] leading-none tracking-[-0.08px]">
              Upload. Detect. Transcribe. Burn. Professional subtitles worth
              posting, in minutes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#96FF1A] px-5 font-sans text-[15px] font-medium text-[#121212] tracking-tight transition-all duration-200 hover:brightness-95 hover:scale-[1.01] active:scale-[0.99]">
                <svg
                  className="h-[18px] w-[18px] text-[#121212]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <polygon points="10 8 16 12 10 16" />
                </svg>
                <span>Create AI video</span>
              </button>
              <button className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#E6FFC8] px-5 font-sans text-[15px] font-medium text-[#121212] tracking-tight transition-all duration-200 hover:brightness-95 hover:scale-[1.01] active:scale-[0.99]">
                <svg
                  className="h-[18px] w-[18px] text-[#121212]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="6" cy="17" r="2.5" />
                  <circle cx="10" cy="18" r="2.5" />
                  <path d="M8 15L17 6M12 16L18 10" />
                  <circle cx="11.5" cy="11.5" r="0.75" fill="currentColor" />
                  <path d="M18 5.5h3.5M19.75 3.75v3.5" strokeWidth="1.2" />
                  <path d="M21 9h2M22 8v2" strokeWidth="1" />
                </svg>
                <span>AI Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
