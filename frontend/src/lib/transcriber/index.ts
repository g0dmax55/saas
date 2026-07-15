import { openaiTranscriber } from "./openai";
import { stubTranscriber } from "./stub";
import type { Transcriber } from "./types";

function getTranscriber(): Transcriber {
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "sk-your-key-here") {
    return openaiTranscriber;
  }
  return stubTranscriber;
}

export const transcriber = getTranscriber();
export type { Transcriber, TranscriptResult, TranscriptSegment } from "./types";
