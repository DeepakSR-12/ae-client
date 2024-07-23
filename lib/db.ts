import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Cache only in local environment
const isLocal = process.env.NODE_ENV === "development";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (isLocal && cached.conn) {
    return cached.conn;
  }

  if (isLocal && !cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
      return mongoose;
    });
  } else if (!isLocal) {
    // In production, create a new connection instance
    cached.conn = await mongoose.connect(MONGODB_URI!);
    return cached.conn;
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
