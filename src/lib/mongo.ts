import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

type MongooseGlobal = {
  mongoose?: {
    conn: typeof mongoose | null,
    promise: Promise<typeof mongoose> | null
  }
};

const globalWithMongoose = global as typeof global & MongooseGlobal;

const cached = globalWithMongoose.mongoose || { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "ai-dashboard", // ✅ This must match your MongoDB Compass
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
