// test-db.js
const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost:27017/", { dbName: "AI-dashboard" })
  .then(() => {
    console.log("✅ MongoDB connected successfully")
    process.exit(0)
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err)
    process.exit(1)
  })
