import mongoose from "mongoose";
import { config } from "../config/env";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI, {});

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
