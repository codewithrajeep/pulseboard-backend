import Redis from "ioredis";
import { env } from "../config/env";
import logger from "../utils/logger";

const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    if (times > 3) {
      logger.error("Redis: max retries reached, giving up");
      return null;
    }
    return Math.min(times * 200, 2000);
  },
});

redis.on("connect", () => {
  logger.info("Redis: connected successfully");
});

redis.on("error", (err) => {
  logger.error({ err }, "Redis: connection error");
});

export default redis;
