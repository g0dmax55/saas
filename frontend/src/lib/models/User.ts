import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  plan: "free" | "pro";
  usageVideosThisMonth: number;
  usageMinutesTranscribed: number;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  plan: { type: String, enum: ["free", "pro"], default: "free" },
  usageVideosThisMonth: { type: Number, default: 0 },
  usageMinutesTranscribed: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
