import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const TEMPLATES = [
  {
    id: "clean",
    name: "Clean",
    style: "bg-black/60 text-white rounded-lg px-4 py-1.5 text-sm",
    desc: "Minimal white text on a semi-transparent dark background. Professional and never distracting.",
    best: "Tutorials, vlogs, educational content",
  },
  {
    id: "bold",
    name: "Bold",
    style: "bg-[#96FF1A] text-[#121212] font-extrabold rounded-lg px-4 py-1.5 text-sm",
    desc: "High-contrast neon green with bold text. Demands attention and stops the scroll.",
    best: "Reels, TikTok, viral content",
  },
  {
    id: "gradient",
    name: "Gradient",
    style: "bg-gradient-to-r from-[#96FF1A] to-[#00c6ff] text-white font-bold rounded-lg px-4 py-1.5 text-sm",
    desc: "Colorful gradient fill from green to blue. Eye-catching and modern.",
    best: "Lifestyle, travel, fashion",
  },
  {
    id: "minimal",
    name: "Minimal",
    style: "bg-transparent text-white text-sm",
    desc: "Small, subtle text with no background. Clean and non-intrusive.",
    best: "Cinematic edits, aesthetic content",
  },
  {
    id: "outline",
    name: "Outline",
    style: "bg-transparent text-[#96FF1A] font-bold text-sm [text-shadow:0_0_10px_rgba(150,255,26,0.5)]",
    desc: "Neon green text with a soft glow. Edgy, modern, and instantly recognizable.",
    best: "Gaming, tech, music videos",
  },
  {
    id: "karaoke",
    name: "Karaoke",
    style: "text-white font-semibold text-sm",
    desc: "Word-by-word highlight animation syncs with the speaker. Perfect for sing-alongs and tutorials.",
    best: "Singing, speeches, presentations",
  },
];

export default function TemplatesPage() {
  return (
    <div className="relative">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-4 pt-24 pb-20 md:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#121212] md:text-4xl">
          Subtitle style templates
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-[#79716B]">
          Pick from six polished styles. Preview each one and choose what fits your content best.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t) => (
          <div key={t.id} className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="flex h-24 items-center justify-center rounded-xl bg-[#121212]">
              <span className={t.style}>Sample caption</span>
            </div>
            <h3 className="mt-4 font-semibold text-[#121212]">{t.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#79716B]">{t.desc}</p>
            <div className="mt-3 rounded-lg bg-[#E6FFC8]/50 px-3 py-2">
              <span className="text-[10px] font-medium text-[#121212]">Best for:</span>{" "}
              <span className="text-[11px] text-[#79716B]">{t.best}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 rounded-full bg-[#96FF1A] px-6 py-3 text-sm font-semibold text-[#121212] transition-all hover:brightness-95"
        >
          Try all styles free
        </Link>
      </div>
      </main>
      <Footer />
    </div>
  );
}
