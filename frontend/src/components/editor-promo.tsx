export default function EditorPromo() {
  return (
    <section
      id="features"
      className="relative w-full overflow-y-clip bg-white px-[11px] pt-[80px] pb-[80px] md:px-6 md:pt-[100px] md:pb-24 xl:px-4 min-[1440px]:px-0"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8.8' height='8.8'%3E%3Ccircle cx='1' cy='1' r='1' fill='black' fill-opacity='0.1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[700px]"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% 100%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 65%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto flex max-w-[1920px] flex-col items-center xl:max-w-[1408px]">
        <h2 className="mx-auto max-w-[800px] text-pretty text-center font-medium text-[#262525] text-[32px] leading-none tracking-[-1.6px] md:text-[40px] md:tracking-[-2px]">
          Style{" "}
          <span className="font-serif italic font-normal">subtitles</span>{" "}
          that get your
          <br className="hidden md:block" /> feed noticed
        </h2>

        <div className="relative mt-8 w-full max-w-[845px]">
          <video
            src="https://cdn-site-assets.veed.io/editor_promo_video_6febbb1dd3/editor_promo_video_6febbb1dd3.mp4"
            poster="https://cdn-site-assets.veed.io/editor_promo_thumbnail_c0acc9c852/editor_promo_thumbnail_c0acc9c852.webp"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Editor demonstration video"
            className="h-auto w-full rounded-xl shadow-md md:rounded-2xl"
            style={{
              backgroundImage:
                "url(https://cdn-site-assets.veed.io/editor_promo_thumbnail_c0acc9c852/editor_promo_thumbnail_c0acc9c852.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>
    </section>
  );
}
