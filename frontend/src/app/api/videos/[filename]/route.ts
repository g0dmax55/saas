import { NextResponse } from "next/server";
import { stat, createReadStream } from "fs";
import { promisify } from "util";
import path from "path";
import { getUserId } from "@/lib/auth";

const statAsync = promisify(stat);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { filename } = await params;
    // Prevent directory traversal
    const safeFilename = path.basename(filename);
    const filePath = path.join(process.cwd(), "public", "uploads", safeFilename);

    const fileStat = await statAsync(filePath);
    const fileSize = fileStat.size;
    const range = request.headers.get("range");

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;

      const fileStream = createReadStream(filePath, { start, end });

      // Convert Node.js readable stream to Web ReadableStream
      const webStream = new ReadableStream({
        start(controller) {
          fileStream.on("data", (chunk) => controller.enqueue(chunk));
          fileStream.on("end", () => controller.close());
          fileStream.on("error", (err) => controller.error(err));
        },
        cancel() {
          fileStream.destroy();
        }
      });

      return new NextResponse(webStream, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": String(chunksize),
          "Content-Type": "video/mp4",
        },
      });
    } else {
      const fileStream = createReadStream(filePath);
      const webStream = new ReadableStream({
        start(controller) {
          fileStream.on("data", (chunk) => controller.enqueue(chunk));
          fileStream.on("end", () => controller.close());
          fileStream.on("error", (err) => controller.error(err));
        },
        cancel() {
          fileStream.destroy();
        }
      });

      return new NextResponse(webStream, {
        status: 200,
        headers: {
          "Content-Length": String(fileSize),
          "Content-Type": "video/mp4",
        },
      });
    }
  } catch (err) {
    console.error("Video stream error:", err);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
