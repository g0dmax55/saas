import fs from "fs";
import Groq from "groq-sdk";
import type { Transcriber, TranscriptResult } from "./types";

let groqClient: Groq | null = null;

function getGroqClient(): Groq {
  if (!groqClient) {
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqClient;
}

export const groqTranscriber: Transcriber = {
  async transcribe(filePath: string): Promise<TranscriptResult> {
    const groq = getGroqClient();
    const file = fs.createReadStream(filePath);

    const transcript = await groq.audio.transcriptions.create({
      model: "whisper-large-v3-turbo",
      file,
      response_format: "verbose_json",
      timestamp_granularities: ["segment"],
    });

    const raw = transcript as unknown as Record<string, unknown>;

    return {
      language: String(raw.language ?? "unknown"),
      duration: Number(raw.duration ?? 0),
      segments: ((raw.segments ?? []) as Array<Record<string, unknown>>).map((s) => ({
        start: Number(s.start ?? 0),
        end: Number(s.end ?? 0),
        text: String(s.text ?? "").trim(),
      })),
    };
  },
};
