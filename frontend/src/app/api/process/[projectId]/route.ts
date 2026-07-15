import { NextResponse } from "next/server";
import path from "path";
import { connectDB } from "@/lib/db";
import { Project } from "@/lib/models/Project";
import { Subtitle } from "@/lib/models/Subtitle";
import { User } from "@/lib/models/User";
import { getUserId } from "@/lib/auth";
import { transcriber } from "@/lib/transcriber";

function cleanSubtitleText(text: string): string {
  return text
    .replace(/[\\\/]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { projectId } = await params;

    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    if (project.status !== "processing") {
      return NextResponse.json({ error: "Project already processed" }, { status: 400 });
    }

    const absolutePath = path.join(process.cwd(), "public", project.videoPath);

    const result = await transcriber.transcribe(absolutePath);

    const subtitleDocs = result.segments.map((s, i) => ({
      projectId: project._id,
      index: i,
      startTime: s.start,
      endTime: s.end,
      text: cleanSubtitleText(s.text),
    }));

    await Subtitle.insertMany(subtitleDocs);

    project.language = result.language;
    project.duration = result.duration;
    project.wordCount = result.segments.reduce((sum, s) => sum + s.text.split(/\s+/).length, 0);
    project.status = "ready";
    await project.save();

    await User.updateOne(
      { _id: userId },
      { $inc: { usageVideosThisMonth: 1, usageMinutesTranscribed: Math.ceil(result.duration / 60) } }
    );

    return NextResponse.json({
      success: true,
      language: result.language,
      duration: result.duration,
      wordCount: project.wordCount,
      subtitleCount: subtitleDocs.length,
    });
  } catch (error) {
    console.error("Process error:", error);

    await connectDB();
    const { projectId } = await params;
    await Project.updateOne({ _id: projectId }, { status: "error" });

    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
