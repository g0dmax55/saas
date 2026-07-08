"use client";

import { useState, useRef } from "react";

const PRESETS = [
  { label: "Clean", prompt: "Clean minimal subtitles for professional videos..." },
  { label: "Bold", prompt: "Bold eye-catching captions for short-form content..." },
  { label: "Dynamic", prompt: "Animated word-by-word subtitle effects..." },
  { label: "Gradient", prompt: "Colorful gradient subtitle styles for reels..." },
];

export default function PromptInput() {
  const [value, setValue] = useState("");
  const [showPresets, setShowPresets] = useState(false);
  const [activeTab, setActiveTab] = useState<"create" | "edit">("create");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePresetClick = (preset: { label: string; prompt: string }) => {
    setValue(preset.prompt);
    setShowPresets(false);
    textareaRef.current?.focus();
  };

  return (
    <section className="mb-18 flex flex-col items-stretch justify-center gap-4 mt-8">
      <div className="mx-auto flex flex-row gap-2 px-4 md:gap-3">
        <button
          type="button"
          onClick={() => setActiveTab("create")}
          className={`flex h-9 cursor-pointer flex-row items-center justify-between gap-2 rounded-full px-4 text-[14px] leading-[140%] transition md:px-6 ${
            activeTab === "create"
              ? "bg-[#96FF1A] text-[#083300]"
              : "bg-[#E6FFC8] text-black/70 hover:bg-[#96FF1A]/75"
          }`}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4C2 3.44772 2.44772 3 3 3H8L9.5 5H13C13.5523 5 14 5.44772 14 6V12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12V4Z"
              stroke={activeTab === "create" ? "#083300" : "currentColor"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 8.5L7.5 10L10 7"
              stroke={activeTab === "create" ? "#083300" : "currentColor"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Add Subtitles</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("edit")}
          className={`flex h-9 cursor-pointer flex-row items-center justify-between gap-2 rounded-full px-4 text-[14px] leading-[140%] transition md:px-6 ${
            activeTab === "edit"
              ? "bg-[#96FF1A] text-[#083300]"
              : "bg-[#E6FFC8] text-black/70 hover:bg-[#96FF1A]/75"
          }`}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.72197 5.67276C4.52671 5.4775 4.21013 5.4775 4.01486 5.67276C3.8196 5.86802 3.8196 6.1846 4.01486 6.37987L4.36842 6.02631L4.72197 5.67276ZM6.5675 8.9325C6.76276 9.12776 7.07934 9.12776 7.2746 8.9325C7.46987 8.73724 7.46987 8.42065 7.2746 8.22539L6.92105 8.57894L6.5675 8.9325ZM8.89927 9.85664C8.70383 9.66156 8.38725 9.66184 8.19216 9.85728C7.99708 10.0527 7.99736 10.3693 8.1928 10.5644L8.54603 10.2105L8.89927 9.85664ZM11.831 14.196C12.0264 14.3911 12.343 14.3908 12.5381 14.1953C12.7331 13.9999 12.7329 13.6833 12.5374 13.4882L12.1842 13.8421L11.831 14.196Z"
              fill={activeTab === "edit" ? "#083300" : "rgba(0,0,0,0.7)"}
            />
          </svg>
          <span>Style &amp; Burn</span>
        </button>
      </div>

      <div className="relative z-20 flex justify-center" style={{ height: 134 }}>
        <div className="absolute top-0 flex w-[712px] max-w-full flex-col items-center justify-center gap-4">
          <div className="flex w-full px-4">
            <form
              onSubmit={handleSubmit}
              className="group mx-auto flex w-full flex-col overflow-hidden rounded-4xl bg-white/90 ring-1 ring-[#B6FF60] backdrop-blur-[6px]"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(25, 25, 25, 0.03), 0 10px 20px -18px rgba(25, 25, 25, 0.05)",
              }}
            >
              <textarea
                ref={textareaRef}
                className="resize-none overflow-y-auto border-none bg-transparent pt-5 pr-3 pb-1.5 pl-6 text-[#121212] ring-0 outline-none placeholder:text-gray-400"
                placeholder={
                  activeTab === "create"
                    ? "Paste a video link or upload a short video..."
                    : "Choose a subtitle style and customize..."
                }
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={2}
              />
              <div className="flex flex-row items-center justify-between px-3 pt-1.5 pb-3 text-[14px] leading-[140%] text-gray-800">
                <div className="flex flex-row gap-2">
                  <div className="relative">
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
                        className="h-4 w-4"
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
                    className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-3 text-center transition hover:bg-gray-50"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 4C2 2.89543 2.89543 2 4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4Z"
                        stroke="#444446"
                        strokeLinecap="round"
                      />
                      <path d="M6 8L8 10L10 6" stroke="#444446" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Choose Style
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-row gap-2">
                  <button
                    type="submit"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#96FF1A] bg-[#96FF1A] text-[#262525] transition hover:bg-[#96FF1A]/75"
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
        </div>
      </div>
    </section>
  );
}
