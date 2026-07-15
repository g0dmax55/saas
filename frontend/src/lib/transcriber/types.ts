export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

export interface TranscriptResult {
  language: string;
  duration: number;
  segments: TranscriptSegment[];
}

export interface Transcriber {
  transcribe(filePath: string): Promise<TranscriptResult>;
}
