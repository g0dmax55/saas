"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CleanTemplate } from "@/components/templates/CleanTemplate";
import { KaraokeTemplate } from "@/components/templates/KaraokeTemplate";

type Sub = { id: string; start: number; end: number; text: string };

const STYLES = [
  { id: "clean", label: "Clean", preview: "text-white font-bold text-sm [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]" },
  { id: "karaoke", label: "Karaoke (Red Box)", preview: "font-extrabold text-[11px] text-white bg-red-600 px-2 py-0.5" },
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

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const [subs, setSubs] = useState<Sub[]>([]);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("clean");
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(2);
  const [projectName, setProjectName] = useState("");
  const [duration, setDuration] = useState(24.0);
  const [saved, setSaved] = useState(false);
  const [videoPath, setVideoPath] = useState("");
  const [shadowIntensity, setShadowIntensity] = useState(1);
  const [subtitlePosition, setSubtitlePosition] = useState<number>(85);
  const [subtitleSize, setSubtitleSize] = useState<number>(16);
  const [videoError, setVideoError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number>(9 / 16);
  const [previewWidth, setPreviewWidth] = useState<number>(337.5);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const previewChildRef = useRef<HTMLDivElement>(null);

  const active = subs.find((s) => s.id === activeSub);

  const stepTime = useCallback(
    (dir: number, big = false) => {
      const step = big ? FRAME * 10 : FRAME;
      setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + dir * step)));
    },
    [duration],
  );

  const jumpToActive = useCallback(() => {
    if (active) setCurrentTime(active.start);
  }, [active]);

  // Load subtitles from API
  useEffect(() => {
    if (!projectId) return;

    // Reset editor state immediately when switching to a different project
    setSubs([]);
    setActiveSub(null);
    setCurrentTime(0);
    setIsPlaying(false);
    setProjectName("");
    setVideoPath("");
    setVideoError(false);

    let cancelled = false;
    async function load() {
      try {
        const [subsRes, projRes] = await Promise.allSettled([
          fetch(`/api/subtitles/${projectId}`),
          fetch(`/api/projects/${projectId}`),
        ]);

        if (cancelled) return;

        // Load subtitles (may not exist yet for new projects)
        if (subsRes.status === "fulfilled" && subsRes.value.ok) {
          const subsData = await subsRes.value.json();
          if (subsData.subtitles) {
            const mapped: Sub[] = subsData.subtitles.map((s: Record<string, unknown>, i: number) => ({
              id: String(i + 1),
              start: Number(s.startTime ?? 0),
              end: Number(s.endTime ?? 0),
              text: String(s.text ?? ""),
            }));
            setSubs(mapped);
            if (mapped.length > 0) {
              setActiveSub(mapped[0].id);
              setDuration(mapped[mapped.length - 1].end + 1);
            }
          }
        }

        // Load project (always needed for video)
        if (projRes.status === "fulfilled" && projRes.value.ok) {
          const projData = await projRes.value.json();
          if (projData.project) {
            setProjectName(projData.project.fileName || "");
            setVideoPath(projData.project.videoPath || "");
            setSelectedStyle(projData.project.style || "clean");
            setShadowIntensity(projData.project.shadowIntensity ?? 3);
            setSubtitleSize(projData.project.subtitleSize ?? 16);
            const rawPos = projData.project.subtitlePosition;
            if (rawPos === "top") setSubtitlePosition(15);
            else if (rawPos === "middle") setSubtitlePosition(50);
            else if (rawPos === "bottom") setSubtitlePosition(85);
            else setSubtitlePosition(typeof rawPos === "number" ? rawPos : 85);
          }
        }
      } catch {
        // subs stay empty
      }
    }
    load();
    return () => { cancelled = true; };
  }, [projectId]);

  // Reset video error state when the video path changes
  useEffect(() => {
    if (videoPath) {
      const timer = setTimeout(() => setVideoError(false), 0);
      return () => clearTimeout(timer);
    }
  }, [videoPath]);

  // Save subtitles to API
  const saveSubtitles = async () => {
    if (!projectId) return;
    try {
      const payload = subs.map((s) => ({ start: s.start, end: s.end, text: s.text }));
      await fetch(`/api/subtitles/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subtitles: payload }),
      });
      await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shadowIntensity, subtitlePosition, subtitleSize }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // silent
    }
  };

  const updateShadowIntensity = async (value: number) => {
    setShadowIntensity(value);
    if (!projectId) return;
    try {
      await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shadowIntensity: value }),
      });
    } catch (err) {
      console.error("Failed to save shadow intensity:", err);
    }
  };

  const updateSubtitlePosition = async (value: number) => {
    setSubtitlePosition(value);
    if (!projectId) return;
    try {
      await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subtitlePosition: value }),
      });
    } catch (err) {
      console.error("Failed to save subtitle position:", err);
    }
  };

  const updateSubtitleSize = async (value: number) => {
    setSubtitleSize(value);
    if (!projectId) return;
    try {
      await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subtitleSize: value }),
      });
    } catch (err) {
      console.error("Failed to save subtitle size:", err);
    }
  };

  const updateStyle = async (value: string) => {
    setSelectedStyle(value);
    if (!projectId) return;
    try {
      await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ style: value }),
      });
    } catch (err) {
      console.error("Failed to save style:", err);
    }
  };

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

    // Only use interval-based playback when there is no video (fallback gradient mode)
    let playTimer: ReturnType<typeof setInterval> | null = null;
    if (isPlaying && !videoRef.current) {
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

  // Sync video play/pause via ref and update time smoothly at 60fps
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number;
    const updateSmoothTime = () => {
      setCurrentTime(video.currentTime);
      frameId = requestAnimationFrame(updateSmoothTime);
    };

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video play blocked:", err.message);
          setIsPlaying(false);
        });
      }
      frameId = requestAnimationFrame(updateSmoothTime);
    } else {
      video.pause();
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isPlaying]);

  // Seek video when currentTime changes while paused (e.g. clicking timeline, arrow keys)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isPlaying) return;
    // Only seek if the difference is significant to avoid micro-seek loops
    if (Math.abs(video.currentTime - currentTime) > 0.05) {
      video.currentTime = currentTime;
    }
  }, [currentTime, isPlaying]);

  // Fullscreen state listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // ResizeObserver to track exact preview width for pixel-perfect subtitle scaling
  useEffect(() => {
    const child = previewChildRef.current;
    if (!child) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          setPreviewWidth(width);
        }
      }
    });

    observer.observe(child);
    return () => observer.disconnect();
  }, []);

  const toggleFullscreen = () => {
    const container = previewContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error(`Error entering fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

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
          <span className="text-xs text-[#79716B]">— {projectName || "No project loaded"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#E6FFC8] px-2.5 py-0.5 text-[10px] font-semibold text-[#121212]">
            Lang: English • {subs.length} captions
          </span>
          <button
            onClick={saveSubtitles}
            className="rounded-full border border-gray-200 px-4 py-1.5 text-xs font-semibold text-[#121212] hover:bg-gray-50 transition-colors"
          >
            {saved ? "✓ Saved" : "Save Changes"}
          </button>
          <button
            onClick={() => router.push(`/dashboard/export?id=${projectId}`)}
            className="rounded-full bg-[#96FF1A] px-4 py-1.5 text-xs font-semibold text-[#121212] hover:brightness-95"
          >
            Export
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Subtitle list */}
        <aside className={`h-full border-r border-gray-200 bg-white flex flex-col transition-all duration-300 overflow-y-auto shrink-0 ${isLeftSidebarCollapsed ? "w-0 border-r-0 p-0 overflow-hidden" : "w-72 p-3"}`}>
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
        <div className="relative flex flex-1 items-center justify-center bg-[#f0f0f0] p-4">
          {/* Floating Collapse/Expand Left Sidebar Button */}
          <button
            onClick={() => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all hover:scale-105 active:scale-95"
            title={isLeftSidebarCollapsed ? "Expand Subtitle Panel" : "Collapse Subtitle Panel"}
          >
            {isLeftSidebarCollapsed ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            )}
          </button>

          <div
            ref={previewContainerRef}
            className={`flex items-center justify-center ${
              isFullscreen ? "w-full h-full bg-black" : "h-full w-full bg-transparent"
            }`}
          >
            <div
              ref={previewChildRef}
              className={`relative overflow-hidden bg-black shadow-2xl flex-none max-w-full max-h-full w-auto ${
                isFullscreen
                  ? "h-full mx-auto"
                  : "h-full max-h-[600px] rounded-2xl"
              }`}
              style={{ aspectRatio: aspectRatio }}
            >
            {videoPath && !videoError ? (
              <video
                ref={videoRef}
                key={videoPath}
                src={videoPath.startsWith("/uploads/") ? `/api/videos/${videoPath.replace("/uploads/", "")}` : videoPath}
                className="absolute inset-0 h-full w-full object-cover"
                playsInline
                preload="auto"
                onLoadedMetadata={(e) => {
                  const vid = e.currentTarget;
                  if (vid.duration && isFinite(vid.duration)) {
                    setDuration(vid.duration);
                  }
                  if (vid.videoWidth && vid.videoHeight) {
                    setAspectRatio(vid.videoWidth / vid.videoHeight);
                  }
                }}
                onTimeUpdate={(e) => {
                  if (isPlaying) {
                    setCurrentTime(e.currentTarget.currentTime);
                  }
                }}
                onEnded={() => {
                  setIsPlaying(false);
                  setCurrentTime(0);
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => {
                  if (isPlaying) setIsPlaying(false);
                }}
                onError={() => {
                  console.error("Video failed to load:", videoPath);
                  setVideoError(true);
                }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
                {videoError ? (
                  <div className="text-center">
                    <p className="text-sm font-medium text-white/70 mb-2">Video failed to load</p>
                    <button
                      onClick={() => setVideoError(false)}
                      className="rounded-full bg-[#96FF1A] px-4 py-1.5 text-xs font-semibold text-[#121212] hover:brightness-95"
                    >
                      Retry
                    </button>
                  </div>
                ) : !videoPath ? (
                  <p className="text-xs text-white/40">No video loaded</p>
                ) : null}
              </div>
            )}

            <div
              className="absolute inset-x-0 flex justify-center px-4 pointer-events-none"
              style={{
                top: `${subtitlePosition}%`,
                transform: "translateY(-50%)",
              }}
            >
              {(() => {
                const hit = subs.find((s) => currentTime >= s.start && currentTime <= s.end);
                return hit ? (
                  selectedStyle === "karaoke" ? (
                    <KaraokeTemplate
                      text={hit.text}
                      currentTime={currentTime}
                      start={hit.start}
                      end={hit.end}
                      subtitleSize={subtitleSize}
                      previewWidth={previewWidth}
                    />
                  ) : (
                    <CleanTemplate
                      text={hit.text}
                      shadowIntensity={shadowIntensity}
                      subtitleSize={subtitleSize}
                      previewWidth={previewWidth}
                    />
                  )
                ) : (
                  <span className="text-xs text-white/50">No caption at {formatTime(currentTime)}</span>
                );
              })()}
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white/60 backdrop-blur-sm z-10">
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                className="ml-1 rounded p-0.5 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h6v6m0-6L4 20m16-6h-6v6m0-6l6 6M4 10h6V4m0 6L4 4m16 6h-6V4m0 6l6-6" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                )}
              </button>
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
        
        {/* Floating Collapse/Expand Sidebar Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all hover:scale-105 active:scale-95"
          title={isSidebarCollapsed ? "Expand Edit Panel" : "Collapse Edit Panel"}
        >
          {isSidebarCollapsed ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

      {/* Right: Edit panel */}
      <aside className={`h-full border-l border-gray-200 bg-white flex flex-col justify-between shrink-0 transition-all duration-300 overflow-y-auto ${isSidebarCollapsed ? "w-0 border-l-0 p-0 overflow-hidden" : "w-64 p-4"}`}>
          <div className="space-y-4">
            {activeSub ? (
              <>
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
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-200 p-4 text-center">
                <p className="text-xs text-[#79716B]">Select a subtitle segment on the left to edit text or timings.</p>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-gray-100 pt-4 space-y-4">
            <div>
              <label className="block text-[11px] font-medium text-[#79716B] mb-2">Style</label>
              <div className="space-y-1.5">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => updateStyle(s.id)}
                    className={`w-full overflow-hidden rounded-lg transition-all ${selectedStyle === s.id ? "ring-2 ring-[#96FF1A]" : "ring-1 ring-gray-200 hover:ring-gray-300"}`}
                  >
                    <div className="relative flex h-16 items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
                      <span className={`text-center text-sm ${s.preview}`}>Sample caption</span>
                    </div>
                    <div className="bg-white px-3 py-1 text-left text-[10px] font-medium text-[#79716B]">
                      {s.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Subtitle Position control */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold text-[#121212]">Vertical Position</label>
                <span className="rounded-full bg-[#E6FFC8] px-2 py-0.5 text-[10px] font-bold text-[#121212]">{subtitlePosition}%</span>
              </div>
              
              {/* Custom styled range slider for position */}
              <div className="relative mb-3">
                <input
                  type="range"
                  min={5}
                  max={95}
                  step={1}
                  value={subtitlePosition}
                  onChange={(e) => setSubtitlePosition(Number(e.target.value))}
                  onMouseUp={(e) => updateSubtitlePosition(Number((e.target as HTMLInputElement).value))}
                  onTouchEnd={(e) => updateSubtitlePosition(Number((e.target as HTMLInputElement).value))}
                  className="glow-slider w-full"
                  style={{ "--val": ((subtitlePosition - 5) / 90) * 100 } as React.CSSProperties}
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: "Top", val: 15 },
                  { label: "Middle", val: 50 },
                  { label: "Bottom", val: 85 }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => updateSubtitlePosition(preset.val)}
                    className={`rounded-lg border py-1.5 text-[10px] font-semibold transition-all ${
                      subtitlePosition === preset.val
                        ? "border-[#96FF1A] bg-[#E6FFC8]/20 text-[#121212]"
                        : "border-gray-200 text-[#79716B] hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Shadow / Glow control */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold text-[#121212]">Outer glow</label>
                <span className="rounded-full bg-[#E6FFC8] px-2 py-0.5 text-[10px] font-bold text-[#121212]">{shadowIntensity}px</span>
              </div>

              {/* Live glow preview swatch */}
              <div className="mb-3 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-3">
                <span
                  className="text-sm font-bold text-white"
                  style={{
                    textShadow: shadowIntensity > 0
                      ? [
                          `0 0 ${shadowIntensity * 0.5}px rgba(0,0,0,0.9)`,
                          `0 0 ${shadowIntensity * 1}px rgba(0,0,0,0.7)`,
                          `0 0 ${shadowIntensity * 2}px rgba(0,0,0,0.5)`,
                          `0 0 ${shadowIntensity * 3}px rgba(0,0,0,0.3)`,
                          `0 1px 2px rgba(0,0,0,0.9)`,
                        ].join(", ")
                      : "none",
                  }}
                >
                  Glow preview
                </span>
              </div>

              {/* Custom styled range slider */}
              <div className="relative">
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={shadowIntensity}
                  onChange={(e) => setShadowIntensity(Number(e.target.value))}
                  onMouseUp={(e) => updateShadowIntensity(Number((e.target as HTMLInputElement).value))}
                  onTouchEnd={(e) => updateShadowIntensity(Number((e.target as HTMLInputElement).value))}
                  className="glow-slider w-full"
                  style={{ "--val": shadowIntensity * 10 } as React.CSSProperties}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[9px] font-medium text-[#79716B]">
                <span>None</span>
                <span>Subtle</span>
                <span>Strong</span>
              </div>
            </div>

            {/* Subtitle Size control */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold text-[#121212]">Font Size</label>
                <span className="rounded-full bg-[#E6FFC8] px-2 py-0.5 text-[10px] font-bold text-[#121212]">{subtitleSize}px</span>
              </div>

              {/* Custom styled range slider */}
              <div className="relative">
                <input
                  type="range"
                  min={10}
                  max={40}
                  step={1}
                  value={subtitleSize}
                  onChange={(e) => setSubtitleSize(Number(e.target.value))}
                  onMouseUp={(e) => updateSubtitleSize(Number((e.target as HTMLInputElement).value))}
                  onTouchEnd={(e) => updateSubtitleSize(Number((e.target as HTMLInputElement).value))}
                  className="glow-slider w-full"
                  style={{ "--val": ((subtitleSize - 10) / 30) * 100 } as React.CSSProperties}
                />
              </div>
              <div className="mt-1.5 flex justify-between text-[9px] font-medium text-[#79716B]">
                <span>Small (10px)</span>
                <span>Medium (25px)</span>
                <span>Large (40px)</span>
              </div>
            </div>
          </div>
        </aside>
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

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-4">
          <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
          <div className="ml-auto h-8 w-20 rounded-full bg-gray-200 animate-pulse" />
        </header>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-[#79716B]">Loading subtitles...</p>
        </div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
