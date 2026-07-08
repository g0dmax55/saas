"use client";

import { useState, useRef, useEffect } from "react";

const PRESETS = [
  { label: "Clean", prompt: "Clean minimal subtitles for professional videos..." },
  { label: "Bold", prompt: "Bold eye-catching captions for short-form content..." },
  { label: "Dynamic", prompt: "Animated word-by-word subtitle effects..." },
  { label: "Gradient", prompt: "Colorful gradient subtitle styles for reels..." },
];

export default function PromptInput() {
  const [value, setValue] = useState("");
  const [showPresets, setShowPresets] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const presetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPresets) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (presetRef.current && !presetRef.current.contains(e.target as Node)) {
        setShowPresets(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [showPresets]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePresetClick = (preset: { label: string; prompt: string }) => {
    setValue(preset.prompt);
    setShowPresets(false);
    textareaRef.current?.focus();
  };

  return (
    <section className="flex flex-col items-center justify-center px-4 w-full mt-4 mb-10">
      <div className="w-[712px] max-w-full">
        <form
          onSubmit={handleSubmit}
          className="group flex w-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#c0f86c] shadow-sm shadow-[#96FF1A]/5"
        >
          <textarea
            ref={textareaRef}
            className="resize-none border-none bg-transparent pt-5 pr-6 pb-2 pl-6 text-[#121212] text-[15px] leading-relaxed ring-0 outline-none placeholder:text-gray-400"
            placeholder="Describe or edit a thought leadership video..."
            aria-label="Describe or edit a thought leadership video"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={2}
          />
          <div className="flex flex-row items-center justify-between px-3 pt-1.5 pb-3">
            <div className="flex flex-row gap-2">
              <div className="relative" ref={presetRef}>
                <button
                  type="button"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white transition hover:bg-gray-50"
                  onClick={() => setShowPresets(!showPresets)}
                  title="Upload video"
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4 text-gray-500"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
                {showPresets && (
                  <div className="absolute bottom-full left-0 mb-2 min-w-[220px] rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                        onClick={() => handlePresetClick(preset)}
                      >
                        <span className="font-medium">{preset.label}</span>
                        <br />
                        <span className="text-xs text-gray-400">
                          {preset.prompt}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-100 bg-white px-3.5 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <svg
                  className="h-4 w-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Character
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-gray-400"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-row gap-2">
              <button
                type="submit"
                aria-label="Submit"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#96FF1A] text-[#121212] transition hover:bg-[#96FF1A]/90"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
