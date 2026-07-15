import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Project } from "@/lib/models/Project";
import { Subtitle } from "@/lib/models/Subtitle";
import { getUserId } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const project = await Project.findOne({ _id: id, userId }).lean();
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ project });
  } catch (error) {
    console.error("GET project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = await params;
    await Project.deleteOne({ _id: id, userId });
    await Subtitle.deleteMany({ projectId: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
