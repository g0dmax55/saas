import mongoose, { Document, Model } from "mongoose";

export interface ISubtitle extends Document {
  _id: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  index: number;
  startTime: number;
  endTime: number;
  text: string;
}

const subtitleSchema = new mongoose.Schema<ISubtitle>({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true, index: true },
  index: { type: Number, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  text: { type: String, required: true },
});

export const Subtitle: Model<ISubtitle> =
  mongoose.models.Subtitle || mongoose.model<ISubtitle>("Subtitle", subtitleSchema);
