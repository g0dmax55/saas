"use client";

import { useState } from "react";

function generateSRT() {
  return `1
00:00:00,000 --> 00:00:02,100
Welcome to my channel everyone

2
00:00:02,100 --> 00:00:04,300
today I'm going to show you

3
00:00:04,300 --> 00:00:06,800
how to make the perfect

4
00:00:06,800 --> 00:00:09,200
homemade pasta from scratch

5
00:00:09,200 --> 00:00:11,500
it's actually super easy

6
00:00:11,500 --> 00:00:13,800
let's get started right away

7
00:00:13,800 --> 00:00:16,200
first you need some flour

8
00:00:16,200 --> 00:00:18,500
and two fresh eggs

9
00:00:18,500 --> 00:00:21,000
mix them together well

10
00:00:21,000 --> 00:00:24,000
knead the dough for ten minutes
`;
}

export default function ExportPage() {
  const [format, setFormat] = useState("mp4");
  const [quality, setQuality] = useState("1080p");
  const [burnSubtitles, setBurnSubtitles] = useState(true);
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 3000);
  };

  const handleDownloadSRT = () => {
    const blob = new Blob([generateSRT()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pasta_tutorial_subtitles.srt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-[640px] p-5 md:p-8">
      <h1 className="text-xl font-semibold text-[#121212] md:text-2xl">Export</h1>
      <p className="mt-1 text-sm text-[#79716B]">Download your video with subtitles, or grab the .srt file.</p>

      <div className="mt-8 space-y-6">
        {/* Video preview */}
        <div className="flex h-48 items-center justify-center rounded-xl bg-[#121212]">
          <div className="text-center">
            <svg className="mx-auto h-10 w-10 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="8 5 19 12 8 19" />
            </svg>
            <p className="mt-2 text-sm text-white/50">pasta_tutorial.mp4</p>
            <p className="text-xs text-white/30">10 captions • 24.0s • English</p>
          </div>
        </div>

        {/* Video export settings */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#121212] mb-4">Video Export</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#79716B] mb-1">Format</label>
              <div className="flex gap-2">
                {["mp4", "mov", "webm"].map((f) => (
                  <button key={f} onClick={() => setFormat(f)} className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase transition-all ${format === f ? "bg-[#96FF1A] text-[#121212]" : "bg-gray-100 text-[#79716B] hover:bg-gray-200"}`}>{f}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#79716B] mb-1">Quality</label>
              <div className="flex gap-2">
                {["720p", "1080p", "4K"].map((q) => (
                  <button key={q} onClick={() => setQuality(q)} className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${quality === q ? "bg-[#96FF1A] text-[#121212]" : "bg-gray-100 text-[#79716B] hover:bg-gray-200"}`}>{q}</button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={burnSubtitles} onChange={(e) => setBurnSubtitles(e.target.checked)} className="h-4 w-4 rounded accent-[#96FF1A]" />
              <div>
                <p className="text-sm font-medium text-[#121212]">Burn subtitles into video</p>
                <p className="text-xs text-[#79716B]">Subtitles permanently embedded — visible on any platform</p>
              </div>
            </label>
          </div>
        </div>

        {/* SRT download */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#121212] mb-2">Subtitle File (.srt)</h2>
          <p className="text-xs text-[#79716B] mb-3">
            Download the raw subtitle file. Upload it to YouTube, Vimeo, or any video platform that supports .srt captions.
          </p>
          <button
            onClick={handleDownloadSRT}
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-[#121212] transition-all hover:bg-gray-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download .srt file
          </button>
          <details className="mt-3">
            <summary className="cursor-pointer text-[10px] text-[#79716B] hover:text-[#121212]">Preview .srt content</summary>
            <pre className="mt-2 max-h-40 overflow-y-auto rounded-lg bg-gray-50 p-3 font-mono text-[10px] text-[#79716B] leading-relaxed select-all">
{generateSRT()}
            </pre>
          </details>
        </div>

        {/* File info */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#121212] mb-3">File Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-[#79716B]">Format</span><span className="font-medium text-[#121212] uppercase">{format}</span></div>
            <div className="flex justify-between"><span className="text-[#79716B]">Resolution</span><span className="font-medium text-[#121212]">{quality}</span></div>
            <div className="flex justify-between"><span className="text-[#79716B]">Subtitles</span><span className="font-medium text-[#121212]">{burnSubtitles ? "Burned in" : "Separate .srt"}</span></div>
            <div className="flex justify-between"><span className="text-[#79716B]">Language</span><span className="font-medium text-[#121212]">English</span></div>
            <div className="flex justify-between"><span className="text-[#79716B]">Est. size</span><span className="font-medium text-[#121212]">~8.2 MB</span></div>
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="w-full rounded-full bg-[#96FF1A] py-3 text-sm font-semibold text-[#121212] transition-all hover:brightness-95 disabled:opacity-60"
        >
          {exporting ? "Exporting..." : "Export Video"}
        </button>
        {exporting && (
          <div className="flex items-center justify-center gap-2 text-xs text-[#79716B]">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-[#96FF1A] border-t-transparent" />
            Processing your video...
          </div>
        )}
      </div>
    </div>
  );
}
