import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Subtitle } from "@/lib/models/Subtitle";
import { Project } from "@/lib/models/Project";
import { getUserId } from "@/lib/auth";

function cleanText(text: string): string {
  return text
    .replace(/[\\\/]/g, "")
    .replace(/\s+/g, " ")
    .trim();
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

    const cleaned = subtitles
      .map((s) => ({ ...s, text: cleanText(s.text) }))
      .filter((s) => s.text.length > 0);

    return NextResponse.json({ subtitles: cleaned });
  } catch (error) {
    console.error("GET subtitles error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { projectId } = await params;

    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const { subtitles } = await request.json();

    if (!Array.isArray(subtitles)) {
      return NextResponse.json({ error: "Invalid subtitles array" }, { status: 400 });
    }

    await Subtitle.deleteMany({ projectId });

    const docs = subtitles
      .map((s: { start: number; end: number; text: string }, i: number) => ({
        projectId,
        index: i,
        startTime: Math.max(0, Number(s.start) || 0),
        endTime: Math.max(0, Number(s.end) || 0),
        text: cleanText(String(s.text || "")),
      }))
      .filter((s) => s.text.length > 0 && s.endTime > s.startTime);

    if (docs.length > 0) {
      await Subtitle.insertMany(docs);
    }

    return NextResponse.json({ success: true, count: docs.length });
  } catch (error) {
    console.error("PUT subtitles error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
