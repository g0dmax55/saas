import { NextResponse } from "next/server";
import { writeFile, unlink, readFile } from "fs/promises";
import { spawn } from "child_process";
import path from "path";
import os from "os";
import { connectDB } from "@/lib/db";
import { Project } from "@/lib/models/Project";
import { Subtitle } from "@/lib/models/Subtitle";
import { getUserId } from "@/lib/auth";

function cleanText(text: string): string {
  return text
    .replace(/[\\\/]/g, "")
    .replace(/[^\x20-\x7E\p{L}\p{N}]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatAssTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const cs = Math.floor((seconds % 1) * 100);
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}

// ASS style definitions with Outline + Shadow (BorderStyle=1) for glow effect
function getStyleDef(
  style: string,
  scale: number,
  height: number,
  shadowIntensity: number,
  subtitlePosition: string | number,
  subtitleSize: number
): string {
  const baseSize = style === "karaoke" ? (subtitleSize || 14) * 0.857 : (subtitleSize || 16) * 0.9375;
  const fs = Math.round(baseSize * scale);
  const ol = shadowIntensity > 0 ? Math.round(1 * scale) : 0; // No outline if glow is 0
  const sh = shadowIntensity > 0 ? Math.round(1.5 * scale) : 0; // No shadow if glow is 0
  const styleName = style.charAt(0).toUpperCase() + style.slice(1);

  // If it's a legacy string, map it first
  let posPct = 85;
  if (typeof subtitlePosition === "number") {
    posPct = subtitlePosition;
  } else if (subtitlePosition === "top") {
    posPct = 15;
  } else if (subtitlePosition === "middle") {
    posPct = 50;
  }

  // ASS Alignment: 2=bottom-center, 5=middle-center, 8=top-center
  let alignment = 2;
  let marginV = Math.round(height * 0.12);

  if (posPct < 45) {
    alignment = 8; // top-center
    marginV = Math.round(height * (posPct / 100));
  } else if (posPct > 55) {
    alignment = 2; // bottom-center
    marginV = Math.round(height * ((100 - posPct) / 100));
  } else {
    alignment = 5; // middle-center
    marginV = 0;
  }

  if (style === "karaoke") {
    // BorderStyle=3 (Opaque box), Outline=boxPadding (size of box padding), Shadow=0 (no shadow)
    // PrimaryColour=&H44FFFFFF (dimmed white text), SecondaryColour=&H00FFFFFF (bright white highlight text)
    // OutlineColour=&HFF000000 (transparent border), BackColour=&H000000FF (solid red background box)
    const boxPadding = Math.round(3.5 * scale);
    return `Style: ${styleName},Poppins,${fs},&H44FFFFFF,&H00FFFFFF,&HFF000000,&H000000FF,1,0,0,0,100,100,0,0,3,${boxPadding},0,${alignment},10,10,${marginV},1`;
  }

  // Bold=1, Font=Inter, Outline/Back alpha=&H33 (80% opacity black matching rgba(0,0,0,0.8))
  return `Style: ${styleName},Inter,${fs},&H00FFFFFF,&H000000FF,&H33000000,&H33000000,1,0,0,0,100,100,0,0,1,${ol},${sh},${alignment},10,10,${marginV},1`;
}

function buildAss(
  subtitles: { startTime: number; endTime: number; text: string }[],
  style: string,
  width: number,
  height: number,
  shadowIntensity: number,
  subtitlePosition: string | number,
  subtitleSize: number
): string {
  const scale = width / 360;
  const styleDef = getStyleDef(style, scale, height, shadowIntensity, subtitlePosition, subtitleSize);
  const styleName = style.charAt(0).toUpperCase() + style.slice(1);

  let ass = `[Script Info]
Title: SubCaps Export
ScriptType: v4.00+
WrapStyle: 0
PlayResX: ${width}
PlayResY: ${height}

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
${styleDef}

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

  for (const s of subtitles) {
    const start = formatAssTime(s.startTime);
    const end = formatAssTime(s.endTime);
    const cleaned = cleanText(s.text).replace(/\n\r/g, "\\N");
    // Prepend Gaussian blur tag to emulate CSS text-shadow blur
    const blurTag = shadowIntensity > 0 ? `{\\blur${Math.round(shadowIntensity * scale / 2)}}` : "";
    
    let text = cleaned;
    if (style === "karaoke") {
      const words = cleaned.split(" ");
      const totalChars = cleaned.length || 1;
      const segmentDuration = s.endTime - s.startTime;
      let wordAss = "";
      
      // Track remaining duration to avoid roundoff drift
      let remainingDurationCs = Math.round(segmentDuration * 100);
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i] + (i < words.length - 1 ? " " : "");
        const wordChars = word.length;
        
        let wordDurCs = 0;
        if (i === words.length - 1) {
          wordDurCs = remainingDurationCs;
        } else {
          wordDurCs = Math.round((wordChars / totalChars) * segmentDuration * 100);
          remainingDurationCs -= wordDurCs;
        }
        // Ensure duration is at least 1 centisecond
        wordDurCs = Math.max(1, wordDurCs);
        
        if (i === 0) {
          wordAss += `{\\4a&H00&\\kf${wordDurCs}}${word}`;
        } else {
          wordAss += `{\\4a&HFF&\\kf${wordDurCs}}{\\4a&H00&}${word}`;
        }
      }
      text = `{\\4a&HFF&}${blurTag}${wordAss}`;
    } else {
      text = `${blurTag}${cleaned}`;
    }
    
    ass += `Dialogue: 0,${start},${end},${styleName},,0,0,0,,${text}\n`;
  }

  return ass;
}

function runFfmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn("ffmpeg", args, { timeout: 300000 });
    let stderr = "";
    proc.stderr.on("data", (d) => { stderr += d.toString(); });
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exit ${code}: ${stderr.slice(-300)}`));
    });
    proc.on("error", reject);
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { projectId } = await params;

    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const subtitles = await Subtitle.find({ projectId }).sort({ index: 1 }).lean();
    if (!subtitles.length) return NextResponse.json({ error: "No subtitles" }, { status: 400 });

    const videoPath = path.join(process.cwd(), "public", project.videoPath);
    const tmpDir = os.tmpdir();
    const assPath = path.join(tmpDir, `${projectId}.ass`);
    const outPath = path.join(tmpDir, `${projectId}_subtitled.mp4`);
    const styleName = project.style || "clean";

    let width = 720;
    let height = 1280;
    try {
      const { execFile } = await import("child_process");
      const { promisify } = await import("util");
      const execFileAsync = promisify(execFile);
      const { stdout } = await execFileAsync("ffprobe", [
        "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=width,height",
        "-of", "csv=p=0", videoPath,
      ], { timeout: 10000 });
      const [w, h] = stdout.trim().split(",").map(Number);
      if (w && h) { width = w; height = h; }
    } catch { /* defaults */ }

    const assContent = buildAss(subtitles, styleName, width, height, project.shadowIntensity ?? 3, project.subtitlePosition || "bottom", project.subtitleSize || 16);
    await writeFile(assPath, assContent, "utf-8");

    await runFfmpeg([
      "-y",
      "-i", videoPath,
      "-vf", `ass=${assPath}`,
      "-c:v", "libx264", "-crf", "12", "-preset", "medium",
      "-c:a", "copy",
      "-movflags", "+faststart",
      outPath,
    ]);

    await unlink(assPath).catch(() => {});

    const videoBuffer = await readFile(outPath);
    await unlink(outPath).catch(() => {});

    const safeName = project.fileName.replace(/\.[^.]+$/, "") + "_subtitled.mp4";

    return new NextResponse(videoBuffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Content-Length": String(videoBuffer.length),
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
