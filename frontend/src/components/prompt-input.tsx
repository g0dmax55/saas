"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

const PRESETS = [
  { label: "Explainer", prompt: "Create an animated explainer video about..." },
  { label: "Product Demo", prompt: "Showcase a product feature that..." },
  { label: "Ad", prompt: "Create a short ad for..." },
  { label: "Tutorial", prompt: "Record a step-by-step tutorial on..." },
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
            <g>
              <path
                d="M10.6954 8.59015L8.68075 9.89049C8.66489 9.89049 8.66489 9.90831 8.64902 9.90831L6.63435 11.2086C6.53917 11.2799 6.41226 11.3333 6.28535 11.3333C5.95221 11.3333 5.66667 11.0305 5.66667 10.6386V5.34821C5.66667 5.22352 5.69839 5.11665 5.74599 5.00977C5.92048 4.68914 6.28535 4.56445 6.58676 4.76039L8.63316 6.07854L10.6637 7.39669C10.7589 7.45013 10.8382 7.5392 10.9017 7.64607C11.092 7.98452 10.9968 8.41203 10.6954 8.59015Z"
                stroke={activeTab === "create" ? "#083300" : "currentColor"}
                strokeLinecap="round"
              />
              <path
                d="M1 4C1 2.34315 2.34315 1 4 1H12C13.6569 1 15 2.34315 15 4V12C15 13.6569 13.6569 15 12 15H4C2.34315 15 1 13.6569 1 12V4Z"
                stroke={activeTab === "create" ? "#083300" : "currentColor"}
                strokeLinecap="round"
              />
            </g>
          </svg>
          <span>Create AI video</span>
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
          <span>AI Edit</span>
        </button>
      </div>

      <div className="relative z-20 flex justify-center" style={{ height: 134 }}>
        <div className="absolute top-0 flex w-[712px] max-w-full flex-col items-center justify-center gap-4">
          <div className="flex w-full px-4">
            <motion.form
              onSubmit={handleSubmit}
              className="group mx-auto flex w-full flex-col overflow-hidden rounded-4xl bg-white/90 ring-1 ring-[#B6FF60] backdrop-blur-[6px]"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(25, 25, 25, 0.03), 0 10px 20px -18px rgba(25, 25, 25, 0.05)",
              }}
              whileFocus={{ boxShadow: "0 0 0 2px rgba(150, 255, 26, 0.3)" }}
            >
              <textarea
                ref={textareaRef}
                className="resize-none overflow-y-auto border-none bg-transparent pt-5 pr-3 pb-1.5 pl-6 text-[#121212] ring-0 outline-none placeholder:text-gray-400"
                placeholder={
                  activeTab === "create"
                    ? "Describe the video you want to create..."
                    : "Paste a video link or describe what to edit..."
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
                        d="M11.2222 13.5V12.2222C11.2222 11.5444 10.953 10.8944 10.4737 10.4152C9.99446 9.93591 9.34444 9.66667 8.66667 9.66667H3.55556C2.87778 9.66667 2.22776 9.93591 1.7485 10.4152C1.26925 10.8944 1 11.5444 1 12.2222V13.5M13.6073 2.63889C14.5346 3.4862 15.0556 4.63524 15.0556 5.83333C15.0556 7.03143 14.5346 8.18047 13.6073 9.02778M11.5417 4.23611C12.0053 4.65977 12.2658 5.23429 12.2658 5.83333C12.2658 6.43238 12.0053 7.0069 11.5417 7.43056M8.66667 4.55556C8.66667 5.96695 7.52251 7.11111 6.11111 7.11111C4.69972 7.11111 3.55556 5.96695 3.55556 4.55556C3.55556 3.14416 4.69972 2 6.11111 2C7.52251 2 8.66667 3.14416 8.66667 4.55556Z"
                        stroke="#444446"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Character
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
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
