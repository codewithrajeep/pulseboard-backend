import redis from "../redis";
import logger from "../utils/logger";

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (err) {
      logger.error({ err }, "Cache get error");
      return null;
    }
  },
  async set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    try {
      await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
    } catch (err) {
      logger.error({ err }, "Cache set error");
    }
  },
  async delete(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (err) {
      logger.error({ err }, "Cache delete error");
    }
  },
};
