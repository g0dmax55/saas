import mongoose, { Document, Model } from "mongoose";

export interface IProject extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  fileName: string;
  videoPath: string;
  language: string;
  status: "processing" | "ready" | "error";
  duration: number;
  style: string;
  wordCount: number;
  createdAt: Date;
}

const projectSchema = new mongoose.Schema<IProject>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  title: { type: String, required: true },
  fileName: { type: String, required: true },
  videoPath: { type: String, required: true },
  language: { type: String, default: "" },
  status: { type: String, enum: ["processing", "ready", "error"], default: "processing" },
  duration: { type: Number, default: 0 },
  style: { type: String, default: "clean" },
  wordCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
