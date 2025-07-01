import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

let cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectToDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "AI-dashboard", // ✅ This must match your MongoDB Compass
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
