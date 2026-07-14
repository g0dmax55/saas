"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  {
    label: "Welcome",
    title: "Subtitle your first short in 60 seconds",
    desc: "Upload a reel, TikTok, or short video and SubCaps will handle the rest — language detection, transcription, styling, and export.",
  },
  {
    label: "Upload",
    title: "Upload your short video",
    desc: "Pick a video file or paste a link. We'll detect the language and start transcribing.",
  },
  {
    label: "Style",
    title: "Pick a subtitle style",
    desc: "Choose how you want your captions to look. Clean, bold, gradient, or karaoke.",
  },
  {
    label: "Export",
    title: "Burn & share",
    desc: "Your subtitled video is ready. Download it or share directly to social platforms.",
  },
];

const STYLE_OPTIONS = [
  { id: "clean", label: "Clean", color: "bg-white/10 text-white" },
  { id: "bold", label: "Bold", color: "bg-[#96FF1A] text-[#121212]" },
  { id: "gradient", label: "Gradient", color: "bg-gradient-to-r from-[#96FF1A] to-[#00c6ff] text-transparent bg-clip-text font-bold" },
  { id: "minimal", label: "Minimal", color: "bg-white/20 text-white/70" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f9fafb] px-6">
      <div className="w-full max-w-[480px]">
        {/* Progress bar */}
        <div className="mb-8 flex gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-[#96FF1A]" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[#121212]">
            {STEPS[step].title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#79716B]">
            {STEPS[step].desc}
          </p>
        </div>

        {/* Step content */}
        <div className="mt-8">
          {step === 0 && (
            <div className="flex flex-col items-center">
              <svg className="h-16 w-16 text-[#96FF1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
          )}

          {step === 1 && (
            <div className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-10 transition-colors hover:border-[#96FF1A]">
              <svg className="h-10 w-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className="mt-3 text-sm font-medium text-[#121212]">Click to upload or drop a file</p>
              <p className="mt-1 text-xs text-[#79716B]">Reels, TikTok, Shorts — up to 3 min</p>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {STYLE_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedStyle(s.id)}
                  className={`flex h-24 items-center justify-center rounded-xl border-2 transition-all ${
                    selectedStyle === s.id
                      ? "border-[#96FF1A] bg-[#E6FFC8]/20"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className={`rounded-lg bg-[#121212] px-4 py-2`}>
                    <span className={`rounded-lg px-2 py-0.5 text-sm font-semibold ${s.color}`}>
                      {s.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center">
              <div className="flex h-24 w-full items-center justify-center rounded-xl bg-[#121212]">
                <span className="rounded-lg bg-[#96FF1A] px-3 py-1 text-sm font-semibold text-[#121212]">
                  Your subtitled video is ready
                </span>
              </div>
              <p className="mt-4 text-center text-sm text-[#79716B]">
                Your video has been processed with {selectedStyle ?? "Clean"} subtitles.
                <br />
                Download or share it anywhere.
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={prev}
              className="flex-1 rounded-full border border-gray-300 py-2.5 text-sm font-semibold text-[#121212] hover:bg-gray-50"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={next}
            className="flex-1 rounded-full bg-[#96FF1A] py-2.5 text-sm font-semibold text-[#121212] hover:brightness-95"
          >
            {step === STEPS.length - 1 ? "Go to Dashboard" : "Continue"}
          </button>
        </div>

        {step === 0 && (
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="mt-4 w-full text-center text-xs text-[#79716B] hover:text-[#121212]"
          >
            Skip onboarding
          </button>
        )}
      </div>
    </div>
  );
}
