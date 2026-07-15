import type { Transcriber, TranscriptResult } from "./types";

export const stubTranscriber: Transcriber = {
  async transcribe(_filePath: string): Promise<TranscriptResult> {
    void _filePath;
    await new Promise((r) => setTimeout(r, 2000));
    return {
      language: "english",
      duration: 24.0,
      segments: [
        { start: 0, end: 2.1, text: "Welcome to my channel everyone" },
        { start: 2.1, end: 4.3, text: "today I'm going to show you" },
        { start: 4.3, end: 6.8, text: "how to make the perfect" },
        { start: 6.8, end: 9.2, text: "homemade pasta from scratch" },
        { start: 9.2, end: 11.5, text: "it's actually super easy" },
        { start: 11.5, end: 13.8, text: "let's get started right away" },
        { start: 13.8, end: 16.2, text: "first you need some flour" },
        { start: 16.2, end: 18.5, text: "and two fresh eggs" },
        { start: 18.5, end: 21.0, text: "mix them together well" },
        { start: 21.0, end: 24.0, text: "knead the dough for ten minutes" },
      ],
    };
  },
};
