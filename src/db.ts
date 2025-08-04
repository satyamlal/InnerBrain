import { mongoose } from "./lib.js";
import { MONGO_URI } from "./config.js";

export default async function connectDB() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables!");
  }

  try {
    await mongoose.connect(MONGO_URI).then(() => {
      console.log("✅ Connected to MongoDB!");
    });
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}
