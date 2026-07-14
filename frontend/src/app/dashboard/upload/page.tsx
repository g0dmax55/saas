"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const AUTO_SUBS = [
  { text: "Welcome to my channel everyone" },
  { text: "today I'm going to show you" },
  { text: "how to make the perfect" },
  { text: "homemade pasta from scratch" },
  { text: "it's actually super easy" },
  { text: "let's get started right away" },
];

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [step, setStep] = useState<"upload" | "processing" | "done">("upload");
  const [detectedLang, setDetectedLang] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("video/")) setFile(f);
  };

  const handleProcess = () => {
    if (!file) return;
    setStep("processing");
    // Simulate AI processing
    setTimeout(() => {
      setDetectedLang("English");
      setWordCount(47);
      setStep("done");
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-[640px] p-5 md:p-8">
      <h1 className="text-xl font-semibold text-[#121212] md:text-2xl">New Project</h1>
      <p className="mt-1 text-sm text-[#79716B]">
        Upload a video — we&apos;ll auto-detect language, transcribe, and burn subtitles.
      </p>

      <AnimatePresence mode="wait">
      {step === "upload" && (
        <motion.div
          key="upload"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-8 space-y-6"
        >
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-colors ${
              dragOver ? "border-[#96FF1A] bg-[#E6FFC8]/20" : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            <input ref={inputRef} type="file" accept="video/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setFile(f); }} />
            {file ? (
              <div className="text-center">
                <svg className="mx-auto h-10 w-10 text-[#96FF1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <p className="mt-3 font-medium text-[#121212]">{file.name}</p>
                <p className="mt-1 text-xs text-[#79716B]">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="mt-3 text-xs text-[#79716B] hover:text-red-500">Remove</button>
              </div>
            ) : (
              <>
                <svg className="h-10 w-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                <p className="mt-3 text-sm font-medium text-[#121212]">Drop your video here or click to browse</p>
                <p className="mt-1 text-xs text-[#79716B]">Reels, TikTok, Shorts — up to 3 min, 500 MB</p>
              </>
            )}
          </div>

          <button
            onClick={handleProcess}
            disabled={!file}
            className="w-full rounded-full bg-[#96FF1A] py-3 text-sm font-semibold text-[#121212] transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {file ? `Process Video (${(file.size / (1024 * 1024)).toFixed(1)} MB)` : "Upload a video to continue"}
          </button>

          {/* Supported formats */}
          <div className="flex items-center justify-center gap-4 text-[10px] text-[#79716B]">
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="8 5 19 12 8 19" fill="currentColor" /></svg>
              MP4
            </span>
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="8 5 19 12 8 19" fill="currentColor" /></svg>
              MOV
            </span>
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="8 5 19 12 8 19" fill="currentColor" /></svg>
              WebM
            </span>
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="8 5 19 12 8 19" fill="currentColor" /></svg>
              AVI
            </span>
          </div>
        </motion.div>
      )}

      {step === "processing" && (
        <motion.div
          key="processing"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-16 flex flex-col items-center"
        >
          <div className="flex h-20 w-20 items-center justify-center">
            <svg className="h-14 w-14 animate-spin text-[#96FF1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.15" />
              <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="mt-6 text-lg font-semibold text-[#121212]">Processing your video</h2>
          <p className="mt-1 text-sm text-[#79716B]">{file?.name}</p>
          <div className="mt-6 w-full max-w-xs space-y-4">
            {/* Step 1: Language Detection */}
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E6FFC8]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#121212]">Detecting language</span>
                  <span className="text-xs font-medium text-[#96FF1A]">Done</span>
                </div>
              </div>
            </div>
            {/* Step 2: Transcription */}
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#96FF1A] animate-pulse">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#121212]">Transcribing audio</span>
                  <span className="text-xs font-medium text-[#96FF1A]">Processing...</span>
                </div>
                <div className="mt-1 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-1 w-2/3 rounded-full bg-[#96FF1A] animate-pulse" />
                </div>
              </div>
            </div>
            {/* Step 3: Burn subtitles */}
            <div className="flex items-center gap-3 opacity-50">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#79716B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#79716B]">Burning subtitles</span>
                  <span className="text-xs text-[#79716B]">Waiting</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {step === "done" && (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-8 space-y-6"
        >
          {/* Result card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6FFC8]">
                <svg className="h-6 w-6 text-[#121212]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#121212]">{file?.name}</h3>
                <p className="text-xs text-[#79716B]">Processed successfully</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-3 text-center">
                <p className="text-lg font-bold text-[#121212]">{detectedLang}</p>
                <p className="text-[11px] text-[#79716B]">Detected Language</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3 text-center">
                <p className="text-lg font-bold text-[#121212]">{wordCount}</p>
                <p className="text-[11px] text-[#79716B]">Words Transcribed</p>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <p className="text-xs font-medium text-[#79716B]">Auto-generated captions preview</p>
              {AUTO_SUBS.slice(0, 4).map((s, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-[#121212]">
                  <span className="text-[10px] text-[#79716B] font-mono">{i + 1}</span>
                  <span>{s.text}</span>
                </div>
              ))}
              {AUTO_SUBS.length > 4 && (
                <p className="text-[10px] text-[#79716B] text-center">+{AUTO_SUBS.length - 4} more captions</p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/dashboard/editor")}
              className="flex-1 rounded-full bg-[#96FF1A] py-3 text-sm font-semibold text-[#121212] hover:brightness-95"
            >
              Review &amp; Edit Subtitles
            </button>
            <button
              onClick={() => router.push("/dashboard/export")}
              className="flex-1 rounded-full border border-gray-300 py-3 text-sm font-semibold text-[#121212] hover:bg-gray-50"
            >
              Export Now
            </button>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
