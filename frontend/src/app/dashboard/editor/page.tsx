"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type Sub = { id: string; start: number; end: number; text: string };

const AUTO_GENERATED: Sub[] = [
  { id: "1", start: 0, end: 2.1, text: "Welcome to my channel everyone" },
  { id: "2", start: 2.1, end: 4.3, text: "today I'm going to show you" },
  { id: "3", start: 4.3, end: 6.8, text: "how to make the perfect" },
  { id: "4", start: 6.8, end: 9.2, text: "homemade pasta from scratch" },
  { id: "5", start: 9.2, end: 11.5, text: "it's actually super easy" },
  { id: "6", start: 11.5, end: 13.8, text: "let's get started right away" },
  { id: "7", start: 13.8, end: 16.2, text: "first you need some flour" },
  { id: "8", start: 16.2, end: 18.5, text: "and two fresh eggs" },
  { id: "9", start: 18.5, end: 21.0, text: "mix them together well" },
  { id: "10", start: 21.0, end: 24.0, text: "knead the dough for ten minutes" },
];

const STYLES = [
  { id: "clean", label: "Clean", preview: "bg-black/60 text-white rounded-lg px-3 py-1" },
  { id: "bold", label: "Bold", preview: "bg-[#96FF1A] text-[#121212] font-extrabold rounded-lg px-3 py-1" },
  { id: "gradient", label: "Gradient", preview: "bg-gradient-to-r from-[#96FF1A] to-[#00c6ff] text-white font-bold rounded-lg px-3 py-1" },
  { id: "minimal", label: "Minimal", preview: "bg-transparent text-white/90 text-sm" },
  { id: "outline", label: "Outline", preview: "bg-transparent text-[#96FF1A] [text-shadow:0_0_10px_rgba(150,255,26,0.5)] text-lg font-bold" },
];

const FPS = 30;
const FRAME = 1 / FPS;

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  const frames = Math.round(sec * FPS) % FPS;
  const whole = Math.floor(sec);
  return `${m}:${String(whole).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
}

function formatSeconds(s: number): string {
  const m = Math.floor(s / 60);
  const sec = (s % 60).toFixed(1);
  return `${m}:${sec.padStart(4, "0")}`;
}

export default function EditorPage() {
  const router = useRouter();
  const [subs, setSubs] = useState<Sub[]>(AUTO_GENERATED);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("bold");
  const [currentTime, setCurrentTime] = useState(4.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(2);
  const duration = 24.0;

  const active = subs.find((s) => s.id === activeSub);
  const style = STYLES.find((s) => s.id === selectedStyle)!;

  const stepTime = useCallback(
    (dir: number, big = false) => {
      const step = big ? FRAME * 10 : FRAME;
      setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + dir * step)));
    },
    [duration],
  );

  const jumpToActive = useCallback(() => {
    if (active) {
      setCurrentTime(active.start);
    }
  }, [active]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          stepTime(-1, e.shiftKey);
          break;
        case "ArrowRight":
          e.preventDefault();
          stepTime(1, e.shiftKey);
          break;
        case " ":
          e.preventDefault();
          setIsPlaying((p) => !p);
          break;
        case "+":
        case "=":
          e.preventDefault();
          setZoom((z) => Math.min(8, z + 1));
          break;
        case "-":
          e.preventDefault();
          setZoom((z) => Math.max(1, z - 1));
          break;
        case "0":
          e.preventDefault();
          setZoom(1);
          break;
        case "s":
          if (activeSub) jumpToActive();
          break;
      }
    }

    let playTimer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      playTimer = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + FRAME;
          if (next >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 1000 / FPS);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (playTimer) clearInterval(playTimer);
    };
  }, [isPlaying, duration, stepTime, activeSub, jumpToActive]);

  const updateSub = (id: string, field: keyof Sub, value: string | number) => {
    setSubs((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const addSub = () => {
    const last = subs[subs.length - 1];
    const start = last ? last.end : 0;
    const end = Math.min(start + 2, duration);
    const id = String(Date.now());
    setSubs((prev) => [...prev, { id, start, end, text: "New subtitle" }]);
    setActiveSub(id);
  };

  const removeSub = (id: string) => {
    setSubs((prev) => prev.filter((s) => s.id !== id));
    if (activeSub === id) setActiveSub(null);
  };

  const splitSub = () => {
    if (!active) return;
    const mid = (active.start + active.end) / 2;
    const first: Sub = { ...active, id: String(Date.now()), end: mid };
    const second: Sub = { ...active, id: String(Date.now() + 1), start: mid };
    setSubs((prev) =>
      prev
        .filter((s) => s.id !== active.id)
        .concat([first, second])
        .sort((a, b) => a.start - b.start),
    );
    setActiveSub(first.id);
  };

  const setActiveStart = () => {
    if (!activeSub || !active) return;
    updateSub(activeSub, "start", currentTime);
  };

  const setActiveEnd = () => {
    if (!activeSub || !active) return;
    updateSub(activeSub, "end", currentTime);
  };

  const tickCount = 7 * zoom;
  const tickStep = duration / tickCount;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-[#121212]">Review Subtitles</span>
          <span className="text-xs text-[#79716B]">— pasta_tutorial.mp4</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#E6FFC8] px-2.5 py-0.5 text-[10px] font-semibold text-[#121212]">
            Lang: English · {subs.length} captions · {FPS}fps
          </span>
          <button
            onClick={() => router.push("/dashboard/export")}
            className="rounded-full bg-[#96FF1A] px-4 py-1.5 text-xs font-semibold text-[#121212] hover:brightness-95"
          >
            Export
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Subtitle list */}
        <aside className="w-72 shrink-0 overflow-y-auto border-r border-gray-200 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#79716B]">
              Captions ({subs.length})
            </p>
            <button onClick={addSub} className="text-xs font-medium text-[#96FF1A] hover:underline">+ Add</button>
          </div>
          {subs.map((sub) => (
            <div
              key={sub.id}
              onClick={() => { setActiveSub(sub.id); setCurrentTime(sub.start); }}
              className={`mb-1 cursor-pointer rounded-lg border p-2.5 transition-colors ${
                activeSub === sub.id ? "border-[#96FF1A] bg-[#E6FFC8]/10" : "border-transparent hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#79716B]">
                  {formatTime(sub.start)} - {formatTime(sub.end)}
                </span>
                <button onClick={(e) => { e.stopPropagation(); removeSub(sub.id); }} className="text-[10px] text-red-400 hover:text-red-600">✕</button>
              </div>
              <p className="mt-0.5 text-xs text-[#121212] leading-snug">{sub.text}</p>
            </div>
          ))}
        </aside>

        {/* Center: Preview */}
        <div className="flex flex-1 items-center justify-center bg-[#f0f0f0] p-4">
          <div className="relative aspect-[9/16] h-full max-h-[460px] overflow-hidden rounded-2xl bg-black shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />

            <div className="absolute inset-x-0 bottom-16 flex justify-center px-4">
              {(() => {
                const hit = subs.find((s) => currentTime >= s.start && currentTime <= s.end);
                return hit ? (
                  <span className={`text-center text-sm font-semibold ${style.preview}`}>{hit.text}</span>
                ) : (
                  <span className="text-xs text-white/50">No caption at {formatTime(currentTime)}</span>
                );
              })()}
            </div>

            <div className="absolute top-3 right-3 rounded-md bg-black/60 px-2 py-0.5 font-mono text-[11px] text-white/60 backdrop-blur-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <button onClick={() => setIsPlaying(!isPlaying)} className="absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-transform hover:scale-110">
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="8,5 19,12 8,19" /></svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Right: Edit panel */}
        {activeSub && (
          <aside className="w-64 shrink-0 overflow-y-auto border-l border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#79716B]">Correct Caption</p>
              <span className="font-mono text-[10px] text-[#79716B]">#{active?.id}</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-medium text-[#79716B] mb-1">Found a mistake?</label>
                <textarea
                  value={active?.text ?? ""}
                  onChange={(e) => activeSub && updateSub(activeSub, "text", e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-[#121212] outline-none focus:border-[#96FF1A] focus:ring-1 focus:ring-[#96FF1A]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#79716B] mb-1">Start (s)</label>
                  <input type="number" value={active?.start ?? 0} onChange={(e) => activeSub && updateSub(activeSub, "start", parseFloat(e.target.value) || 0)} step="0.001" min="0" max={duration} className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#96FF1A]" />
                  <span className="mt-0.5 block text-[10px] text-[#79716B] font-mono">{formatTime(active?.start ?? 0)}</span>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#79716B] mb-1">End (s)</label>
                  <input type="number" value={active?.end ?? 0} onChange={(e) => activeSub && updateSub(activeSub, "end", parseFloat(e.target.value) || 0)} step="0.001" min="0" max={duration} className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#96FF1A]" />
                  <span className="mt-0.5 block text-[10px] text-[#79716B] font-mono">{formatTime(active?.end ?? 0)}</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={setActiveStart}
                  title="Set start at playhead (S)"
                  className="flex-1 rounded-lg border border-gray-200 py-1.5 text-[10px] font-medium text-[#121212] hover:bg-gray-50"
                >
                  Set start
                </button>
                <button
                  onClick={setActiveEnd}
                  title="Set end at playhead (E)"
                  className="flex-1 rounded-lg border border-gray-200 py-1.5 text-[10px] font-medium text-[#121212] hover:bg-gray-50"
                >
                  Set end
                </button>
              </div>
              <button
                onClick={splitSub}
                className="w-full rounded-lg border border-gray-200 py-1.5 text-[10px] font-medium text-[#121212] hover:bg-gray-50"
                title="Split caption at playhead"
              >
                Split at playhead
              </button>
              <div>
                <label className="block text-[11px] font-medium text-[#79716B] mb-2">Style</label>
                <div className="space-y-1 rounded-lg bg-[#121212] p-1.5">
                  {STYLES.map((s) => (
                    <button key={s.id} onClick={() => setSelectedStyle(s.id)} className={`w-full rounded-lg px-3 py-1.5 text-left text-xs font-semibold transition-all ${selectedStyle === s.id ? "ring-1 ring-[#96FF1A]" : "hover:ring-1 hover:ring-gray-200"} ${s.preview}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Zoom bar */}
      <div className="shrink-0 border-t border-gray-200 bg-white px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.max(1, z - 1))}
            className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-[#79716B] hover:bg-gray-100"
          >
            −
          </button>
          <input
            type="range"
            min={1}
            max={8}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="h-1 flex-1 cursor-pointer accent-[#96FF1A]"
          />
          <button
            onClick={() => setZoom((z) => Math.min(8, z + 1))}
            className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-[#79716B] hover:bg-gray-100"
          >
            +
          </button>
          <span className="w-10 text-center text-[10px] font-medium text-[#79716B]">{zoom}x</span>
          {zoom > 1 && (
            <button
              onClick={() => setZoom(1)}
              className="rounded px-1.5 py-0.5 text-[10px] text-[#96FF1A] hover:bg-[#E6FFC8]/20"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="shrink-0 border-t border-gray-200 bg-white px-4 py-3">
        <div className="mb-1" style={{ display: "grid", gridTemplateColumns: `repeat(${tickCount + 1}, 1fr)` }}>
          {Array.from({ length: tickCount + 1 }).map((_, i) => (
            <span key={i} className="font-mono text-[9px] text-[#79716B] leading-none">
              {i % (zoom >= 4 ? 4 : zoom >= 2 ? 2 : 1) === 0 ? formatTime(i * tickStep) : ""}
            </span>
          ))}
        </div>
        <div
          className="relative h-12 cursor-pointer rounded-md bg-gray-100"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setCurrentTime(Math.max(0, Math.min(duration, (e.clientX - rect.left) / rect.width * duration)));
          }}
        >
          {/* Subtitle blocks */}
          {subs.map((sub) => {
            const left = (sub.start / duration) * 100;
            const width = ((sub.end - sub.start) / duration) * 100;
            return (
              <div
                key={sub.id}
                onClick={(e) => { e.stopPropagation(); setActiveSub(sub.id); setCurrentTime(sub.start); }}
                className={`absolute top-1 bottom-1 rounded-md border transition-colors ${
                  activeSub === sub.id
                    ? "bg-[#96FF1A]/20 border-[#96FF1A]/40 z-10"
                    : "bg-[#96FF1A]/10 border-transparent hover:bg-[#96FF1A]/30"
                }`}
                style={{ left: `${left}%`, width: `${Math.max(width, 0.3)}%` }}
                title={`${formatTime(sub.start)} → ${formatTime(sub.end)}: ${sub.text}`}
              >
                <span className="block truncate px-1.5 text-[9px] leading-8 text-[#121212]">{sub.text}</span>
              </div>
            );
          })}

          {/* Playhead */}
          <div className="absolute inset-y-0 z-20 w-0.5 bg-[#96FF1A]" style={{ left: `${(currentTime / duration) * 100}%` }}>
            <div className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#96FF1A]" />
            <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-[#96FF1A]" />
          </div>
        </div>

        {/* Playback controls */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => stepTime(-1, true)}
            title="Step back 10 frames (Shift+←)"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-[#79716B] hover:bg-gray-300"
          >
            |◀
          </button>
          <button
            onClick={() => stepTime(-1)}
            title="Step back 1 frame (←)"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-[#79716B] hover:bg-gray-300"
          >
            ◀
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            {isPlaying ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="8,5 19,12 8,19" /></svg>
            )}
          </button>
          <button
            onClick={() => stepTime(1)}
            title="Step forward 1 frame (→)"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-[#79716B] hover:bg-gray-300"
          >
            ▶
          </button>
          <button
            onClick={() => stepTime(1, true)}
            title="Step forward 10 frames (Shift+→)"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-[#79716B] hover:bg-gray-300"
          >
            ▶|
          </button>
          <span className="ml-2 font-mono text-xs text-[#121212] font-semibold">{formatTime(currentTime)}</span>
          <span className="text-[10px] text-[#79716B]">({formatSeconds(currentTime)})</span>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
          {[
            ["←→", "Frame step"],
            ["Shift+←→", "10-frame step"],
            ["Space", "Play/Pause"],
            ["+/−", "Zoom"],
            ["0", "Reset zoom"],
            ["S", "Jump to start"],
          ].map(([key, label]) => (
            <span key={key} className="text-[10px] text-[#79716B]">
              <kbd className="rounded border border-gray-200 bg-gray-50 px-1 font-mono text-[9px]">{key}</kbd> {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
