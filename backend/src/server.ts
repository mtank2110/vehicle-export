import app from "./app";
import { config } from "./config/env";
import { connectDB } from "./db/connection";
import logger from "./utils/logger";

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start server
    const server = app.listen(config.PORT, () => {
      logger.info(
        `Server running on port ${config.PORT} in ${config.NODE_ENV} mode`,
      );
      console.log(`Server running on http://localhost:${config.PORT}`);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err: Error) => {
      logger.error("UNHANDLED REJECTION! Shutting down...");
      logger.error(err);
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle SIGTERM
    process.on("SIGTERM", () => {
      logger.info("👋 SIGTERM RECEIVED. Shutting down gracefully");
      server.close(() => {
        logger.info("Process terminated!");
      });
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
