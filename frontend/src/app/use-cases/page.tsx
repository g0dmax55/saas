import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const USES = [
  {
    title: "Content Creators",
    desc: "Make your reels and shorts accessible and engaging. Subtitled videos get 40% more watch time and higher retention.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /><polygon points="10 9 15 12 10 15" />
      </svg>
    ),
  },
  {
    title: "Marketers",
    desc: "Boost ad performance with captioned videos. Most social ads are watched on mute — subtitles keep your message visible.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Educators",
    desc: "Make lessons clearer with synced captions. Students retain information better when they can read along with audio.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "Podcasters",
    desc: "Turn audio episodes into shareable video clips with animated captions. Grow your audience on visual platforms.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    title: "E-commerce",
    desc: "Add captions to product demos and reviews. Descriptions stay visible even when videos autoplay silently in feeds.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    title: "Agencies",
    desc: "Batch process client videos with consistent subtitle styles. Save hours of manual work and deliver faster.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export default function UseCasesPage() {
  return (
    <div className="relative">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-4 pt-24 pb-20 md:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#121212] md:text-4xl">
          Who uses SubCaps?
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-[#79716B]">
          Anyone creating short-form video benefits from subtitles. Here's how different people use SubCaps.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {USES.map((u) => (
          <div key={u.title} className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6FFC8] text-[#121212]">
              {u.icon}
            </div>
            <h3 className="mt-4 font-semibold text-[#121212]">{u.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#79716B]">{u.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 rounded-full bg-[#96FF1A] px-6 py-3 text-sm font-semibold text-[#121212] transition-all hover:brightness-95"
        >
          Start subtitling for free
        </Link>
      </div>
      </main>
      <Footer />
    </div>
  );
}
