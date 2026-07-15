"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STEPS = [
  { label: "Welcome", title: "Subtitle your first short in 60 seconds", desc: "Upload a reel, TikTok, or short video and SubCaps will handle the rest — language detection, transcription, styling, and export." },
  { label: "Upload", title: "Upload your short video", desc: "Pick a video file. We'll detect the language and start transcribing automatically." },
  { label: "Style", title: "Pick a subtitle style", desc: "Choose how your captions should look. You can always change this later." },
  { label: "Done", title: "You're all set", desc: "Your preferences are saved. Start subtitling your first video now." },
];

const STYLE_OPTIONS = [
  { id: "clean", label: "Clean", preview: "text-white font-bold text-lg [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState<string | null>("clean");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("video/")) setFile(f);
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else router.push("/dashboard");
  };

  const prev = () => step > 0 && setStep(step - 1);

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8.8' height='8.8'%3E%3Ccircle cx='1' cy='1' r='1' fill='black' fill-opacity='0.1'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundColor: "#f9fafb",
      }}
    >
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5">
        <Link href="/" className="text-lg font-bold tracking-tight text-[#121212]">
          SubCaps
        </Link>
        {step === 0 && (
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="text-sm text-[#79716B] hover:text-[#121212]"
          >
            Skip
          </button>
        )}
        {step > 0 && (
          <span className="text-xs text-[#79716B]">
            Step {step + 1} of {STEPS.length}
          </span>
        )}
      </header>

      <div className="flex flex-1 items-center justify-center px-6 py-8">
        <div className="w-full max-w-[480px]">
          {/* Progress dots */}
          <div className="mb-10 flex items-center justify-center gap-2">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    i < step
                      ? "bg-[#96FF1A] text-[#121212]"
                      : i === step
                        ? "bg-[#121212] text-white"
                        : "bg-gray-200 text-[#79716B]"
                  }`}
                >
                  {i < step ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`text-xs font-medium ${i <= step ? "text-[#121212]" : "text-[#79716B]"}`}>
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`mx-1 h-px w-6 transition-colors ${i < step ? "bg-[#96FF1A]" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-[#121212] md:text-2xl">
              {STEPS[step].title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#79716B]">
              {STEPS[step].desc}
            </p>
          </div>

          {/* Step content */}
          <div className="mt-8">
            {/* Welcome */}
            {step === 0 && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6FFC8]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#121212]">1. Upload</h3>
                      <p className="mt-0.5 text-xs text-[#79716B]">Drop your reel, TikTok, or short video. We support most formats up to 3 minutes.</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6FFC8]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#121212]">2. Transcribe</h3>
                      <p className="mt-0.5 text-xs text-[#79716B]">AI detects the language and transcribes every word with high accuracy.</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6FFC8]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#121212]">3. Export</h3>
                      <p className="mt-0.5 text-xs text-[#79716B]">Review, choose a style, and download with burned-in subtitles or as .srt.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upload */}
            {step === 1 && (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
                  dragOver ? "border-[#96FF1A] bg-[#E6FFC8]/20" : "border-gray-300 bg-white hover:border-gray-400"
                } ${file ? "border-[#96FF1A] bg-[#E6FFC8]/10" : ""}`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) setFile(f); }}
                />
                {file ? (
                  <div>
                    <svg className="mx-auto h-10 w-10 text-[#96FF1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <p className="mt-3 text-sm font-medium text-[#121212]">{file.name}</p>
                    <p className="mt-1 text-xs text-[#79716B]">{(file.size / (1024 * 1024)).toFixed(1)} MB — Ready</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="mt-2 text-xs text-[#79716B] hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <svg className="mx-auto h-10 w-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p className="mt-3 text-sm font-medium text-[#121212]">Drop your video here or click to browse</p>
                    <p className="mt-1 text-xs text-[#79716B]">Reels, TikTok, Shorts — up to 3 min, 500 MB</p>
                  </>
                )}
              </div>
            )}

            {/* Style */}
            {step === 2 && (
              <div className="grid grid-cols-2 gap-3">
                {STYLE_OPTIONS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedStyle(s.id)}
                    className={`flex h-28 flex-col items-center justify-center rounded-xl border-2 transition-all ${
                      selectedStyle === s.id
                        ? "border-[#96FF1A] bg-[#E6FFC8]/20"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="rounded-lg bg-[#121212] px-4 py-2">
                      <span className={`${s.preview}`}>{s.label}</span>
                    </div>
                    <span className={`mt-2 text-xs font-medium ${selectedStyle === s.id ? "text-[#121212]" : "text-[#79716B]"}`}>
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Done */}
            {step === 3 && (
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E6FFC8]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="mt-5 w-full rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#79716B]">Video</span>
                    <span className="font-medium text-[#121212]">{file?.name ?? "No file selected"}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-[#79716B]">Style</span>
                    <span className="font-medium capitalize text-[#121212]">{selectedStyle}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-[#79716B]">Language</span>
                    <span className="font-medium text-[#121212]">Auto-detect</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-[#79716B]">Output</span>
                    <span className="font-medium text-[#121212]">Burned-in subtitles + .srt</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={prev}
                className="flex-1 rounded-full border border-gray-300 py-2.5 text-sm font-semibold text-[#121212] transition-colors hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={next}
              disabled={step === 1 && !file}
              className="flex-1 rounded-full bg-[#96FF1A] py-2.5 text-sm font-semibold text-[#121212] transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === 0 && "Get Started"}
              {step === 1 && (file ? "Continue" : "Upload a file to continue")}
              {step === 2 && "Continue"}
              {step === 3 && "Go to Dashboard"}
            </button>
          </div>

          {step > 0 && (
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="mt-4 w-full text-center text-xs text-[#79716B] hover:text-[#121212]"
            >
              Skip to dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
