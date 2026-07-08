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

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center md:mt-14 md:gap-8">
          {[
            { num: "1", title: "Upload", desc: "Drop your short video" },
            { num: "2", title: "Transcribe", desc: "Auto-detects & captions it" },
            { num: "3", title: "Style", desc: "Pick a caption design" },
            { num: "4", title: "Export", desc: "Burn & share anywhere" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-3 rounded-xl bg-[#f9fafb] px-5 py-4 sm:flex-col sm:items-center sm:text-center sm:w-[180px] md:w-[220px] md:px-6 md:py-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#96FF1A] text-sm font-bold text-[#121212]">
                {s.num}
              </span>
              <div>
                <h3 className="font-semibold text-[#121212]">{s.title}</h3>
                <p className="text-xs text-[#79716B]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
