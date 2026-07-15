import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import os from "os";
import OpenAI from "openai";
import type { Transcriber, TranscriptResult } from "./types";

const execAsync = promisify(exec);

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

async function extractAudio(videoPath: string): Promise<string> {
  const tmpDir = os.tmpdir();
  const audioPath = path.join(tmpDir, `audio_${Date.now()}.mp3`);

  // Extract audio at 16kHz mono — small file, optimal for Whisper
  await execAsync(
    `ffmpeg -y -i "${videoPath}" -vn -acodec libmp3lame -ar 16000 -ac 1 -b:a 32k "${audioPath}"`,
    { timeout: 120000 }
  );

  return audioPath;
}

async function splitAudio(audioPath: string): Promise<string[]> {
  const stat = fs.statSync(audioPath);
  const sizeMB = stat.size / (1024 * 1024);

  // If under 24MB, no need to split
  if (sizeMB < 24) return [audioPath];

  const tmpDir = os.tmpdir();
  const baseName = path.basename(audioPath, path.extname(audioPath));

  // Get duration
  const { stdout } = await execAsync(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`,
    { timeout: 10000 }
  );
  const totalDuration = parseFloat(stdout.trim());
  const chunkDuration = Math.floor(totalDuration / Math.ceil(sizeMB / 20));

  const chunks: string[] = [];
  let offset = 0;
  let i = 0;

  while (offset < totalDuration) {
    const chunkPath = path.join(tmpDir, `${baseName}_part${i}.mp3`);
    await execAsync(
      `ffmpeg -y -i "${audioPath}" -ss ${offset} -t ${chunkDuration} -acodec copy "${chunkPath}"`,
      { timeout: 60000 }
    );
    chunks.push(chunkPath);
    offset += chunkDuration;
    i++;
  }

  return chunks;
}

export const openaiTranscriber: Transcriber = {
  async transcribe(filePath: string): Promise<TranscriptResult> {
    const openai = getOpenAIClient();

    // Step 1: Extract audio (video files are too large for OpenAI's 25MB limit)
    const fileSize = fs.statSync(filePath).size / (1024 * 1024);
    let audioPath = filePath;

    const lowerPath = filePath.toLowerCase();
    if (lowerPath.endsWith(".mp4") || lowerPath.endsWith(".mov") || lowerPath.endsWith(".webm") || lowerPath.endsWith(".avi") || fileSize > 24) {
      audioPath = await extractAudio(filePath);
    }

    // Step 2: Split if still too large
    const chunks = await splitAudio(audioPath);
    const audioFile = chunks[0];

    // Step 3: Transcribe
    const file = fs.createReadStream(audioFile);
    const transcript = await openai.audio.transcriptions.create({
      model: "gpt-4o-transcribe",
      file,
      response_format: "verbose_json",
      timestamp_granularities: ["segment"],
    });

    const raw = transcript as unknown as Record<string, unknown>;

    let segments = ((raw.segments ?? []) as Array<Record<string, unknown>>).map((s) => ({
      start: Number(s.start ?? 0),
      end: Number(s.end ?? 0),
      text: String(s.text ?? "").trim(),
    }));

    let timeOffset = Number(raw.duration ?? 0);

    // Step 4: If multiple chunks, transcribe each and merge with offset
    if (chunks.length > 1) {
      // Clean up first chunk
      fs.unlink(chunks[0], () => {});

      for (let i = 1; i < chunks.length; i++) {
        const chunkFile = fs.createReadStream(chunks[i]);
        const chunkTranscript = await openai.audio.transcriptions.create({
          model: "gpt-4o-transcribe",
          file: chunkFile,
          response_format: "verbose_json",
          timestamp_granularities: ["segment"],
        });

        const chunkRaw = chunkTranscript as unknown as Record<string, unknown>;
        const chunkSegments = ((chunkRaw.segments ?? []) as Array<Record<string, unknown>>).map((s) => ({
          start: Number(s.start ?? 0) + timeOffset,
          end: Number(s.end ?? 0) + timeOffset,
          text: String(s.text ?? "").trim(),
        }));

        segments = segments.concat(chunkSegments);
        timeOffset += Number(chunkRaw.duration ?? 0);

        fs.unlink(chunks[i], () => {});
      }
    }

    // Clean up extracted audio if different from original
    if (audioPath !== filePath) {
      fs.unlink(audioPath, () => {});
    }

    return {
      language: String(raw.language ?? "unknown"),
      duration: timeOffset,
      segments,
    };
  },
};
