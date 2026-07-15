import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Project } from "@/lib/models/Project";
import { getUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const projects = await Project.find({ userId }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { title, fileName, videoPath } = await request.json();

    if (!title || !fileName || !videoPath) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();
    const project = await Project.create({
      userId,
      title,
      fileName,
      videoPath,
      status: "processing",
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("POST projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
