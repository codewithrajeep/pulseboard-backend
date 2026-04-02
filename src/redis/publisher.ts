import redis from "./index";
import logger from "../utils/logger";

export const publish = async (channel: string, data: unknown) => {
  try {
    await redis.publish(channel, JSON.stringify(data));
  } catch (err) {
    logger.error({ err }, "Failed to publish message");
  }
};
