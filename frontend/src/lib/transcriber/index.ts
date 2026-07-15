import { groqTranscriber } from "./groq";
import { stubTranscriber } from "./stub";
import type { Transcriber } from "./types";

function getTranscriber(): Transcriber {
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== "gsk_your_key_here") {
    return groqTranscriber;
  }
  return stubTranscriber;
}

export const transcriber = getTranscriber();
export type { Transcriber, TranscriptResult, TranscriptSegment } from "./types";
