import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

const globalCache = globalThis as unknown as {
  mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!globalCache.mongoose) {
  globalCache.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (globalCache.mongoose.conn) return globalCache.mongoose.conn;

  if (!globalCache.mongoose.promise) {
    globalCache.mongoose.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  globalCache.mongoose.conn = await globalCache.mongoose.promise;
  return globalCache.mongoose.conn;
}
