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
    const boxPadding = Math.round(1.5 * scale);
    return `Style: ${styleName},Poppins,${fs},&H44FFFFFF,&H00FFFFFF,&HFF000000,&H000000FF,1,0,0,0,100,100,0,0,3,${boxPadding},0,${alignment},10,10,${marginV},1`;
  }

  // Bold=1, Font=Inter, Outline/Back alpha=&H33 (80% opacity black matching rgba(0,0,0,0.8))
  return `Style: ${styleName},Inter,${fs},&H00FFFFFF,&H000000FF,&H33000000,&H33000000,1,0,0,0,100,100,0,0,1,${ol},${sh},${alignment},10,10,${marginV},1`;
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if (!word) continue;
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length > maxChars) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        lines.push(word);
        currentLine = "";
      }
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

function splitTextIntoLines(text: string, maxChars = 30): string[] {
  const rawLines = text.split(/\r?\n/);
  const finalLines: string[] = [];
  for (const line of rawLines) {
    finalLines.push(...wrapText(line, maxChars));
  }
  return finalLines;
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
  const cleanStyleDef = getStyleDef("clean", scale, height, shadowIntensity, subtitlePosition, subtitleSize);
  const karaokeStyleDef = getStyleDef("karaoke", scale, height, shadowIntensity, subtitlePosition, subtitleSize);
  const styleDef = style === "karaoke" ? `${cleanStyleDef}\n${karaokeStyleDef}` : cleanStyleDef;

  // Determine alignment and vertical base position
  let posPct = 85;
  if (typeof subtitlePosition === "number") {
    posPct = subtitlePosition;
  } else if (subtitlePosition === "top") {
    posPct = 15;
  } else if (subtitlePosition === "middle") {
    posPct = 50;
  }

  let alignment = 2;
  let yBase = height * 0.85; // Default bottom-center
  if (posPct < 45) {
    alignment = 8; // top-center
    yBase = height * (posPct / 100);
  } else if (posPct > 55) {
    alignment = 2; // bottom-center
    yBase = height * (posPct / 100);
  } else {
    alignment = 5; // middle-center
    yBase = height * 0.5;
  }

  const baseSize = style === "karaoke" ? (subtitleSize || 14) * 0.857 : (subtitleSize || 16) * 0.9375;
  const fs = Math.round(baseSize * scale);
  const dy = Math.round(fs * 1.5); // Line spacing factor
  const x = Math.round(width / 2);

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
    
    // Split the subtitle text into wrapped lines
    const rawText = cleanText(s.text);
    const lines = splitTextIntoLines(rawText, 30);
    const N = lines.length;
    if (N === 0) continue;

    const blurTag = shadowIntensity > 0 ? `{\\blur${Math.round(shadowIntensity * scale / 2)}}` : "";

    // Calculate Y coordinate for each line index
    const getY = (lineIdx: number): number => {
      if (alignment === 8) {
        return Math.round(yBase + lineIdx * dy);
      } else if (alignment === 2) {
        return Math.round(yBase - (N - 1 - lineIdx) * dy);
      } else {
        return Math.round(yBase - ((N - 1) / 2 - lineIdx) * dy);
      }
    };

    if (style === "karaoke") {
      // 1. Output the Base Layer (Clean white text) for all lines of this subtitle block
      for (let i = 0; i < N; i++) {
        const y_i = getY(i);
        ass += `Dialogue: 0,${start},${end},Clean,,0,0,0,,{\\pos(${x},${y_i})}${blurTag}${lines[i]}\n`;
      }

      // 2. Output the Highlight Layers (Layer 1) for each word
      type WordInfo = {
        text: string;
        lineIndex: number;
        start: number;
        end: number;
      };

      const wordsWithLine: WordInfo[] = [];
      const totalChars = lines.join(" ").length || 1;
      const segmentDuration = s.endTime - s.startTime;
      let charAccumulator = 0;

      for (let lineIdx = 0; lineIdx < N; lineIdx++) {
        const lineText = lines[lineIdx];
        const lineWords = lineText.split(" ");

        for (let wIdx = 0; wIdx < lineWords.length; wIdx++) {
          const wordText = lineWords[wIdx] + (wIdx < lineWords.length - 1 ? " " : "");
          const wordChars = wordText.length;

          const wordStartVal = s.startTime + (charAccumulator / totalChars) * segmentDuration;
          charAccumulator += wordChars;
          const wordEndVal = s.startTime + (charAccumulator / totalChars) * segmentDuration;

          wordsWithLine.push({
            text: wordText,
            lineIndex: lineIdx,
            start: wordStartVal,
            end: wordEndVal,
          });
        }
      }

      // Track accumulators per line to construct correct inline word highlights
      for (let i = 0; i < wordsWithLine.length; i++) {
        const activeWord = wordsWithLine[i];
        const lineIdx = activeWord.lineIndex;
        const y_active = getY(lineIdx);

        const wordStart = formatAssTime(activeWord.start);
        const wordEnd = formatAssTime(activeWord.end);

        // Reconstruct only the active line's words, hiding inactive words on this line
        const lineWords = lines[lineIdx].split(" ");
        
        // Find which word index in this line matches the active word `i`
        const wordsBeforeOnLine = wordsWithLine
          .slice(0, i)
          .filter((w) => w.lineIndex === lineIdx).length;

        let lineText = `{\\pos(${x},${y_active})}`;
        for (let j = 0; j < lineWords.length; j++) {
          const currentWord = lineWords[j] + (j < lineWords.length - 1 ? " " : "");
          if (j === wordsBeforeOnLine) {
            // Active word: render normally (white text + red box outline)
            const wordDurCs = Math.max(1, Math.round((activeWord.end - activeWord.start) * 100));
            lineText += `{\\1a&H00&\\3a&H00&\\4a&H00&\\kf${wordDurCs}}${currentWord}`;
          } else {
            // Inactive word on the active line: fully transparent
            lineText += `{\\1a&HFF&\\3a&HFF&\\4a&HFF&}${currentWord}`;
          }
        }

        ass += `Dialogue: 1,${wordStart},${wordEnd},Karaoke,,0,0,0,,${lineText}\n`;
      }
    } else {
      // Clean style: output each line stacked at its computed Y position
      for (let i = 0; i < N; i++) {
        const y_i = getY(i);
        ass += `Dialogue: 0,${start},${end},Clean,,0,0,0,,{\\pos(${x},${y_i})}${blurTag}${lines[i]}\n`;
      }
    }
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
