import Redis from "ioredis";
import { env } from "../config/env";
import logger from "../utils/logger";

const subscriber = new Redis(env.REDIS_URL);

subscriber.subscribe("notification", (err) => {
  if (err) logger.error({ err }, "Failed to subscribe to notification channel");
  else logger.info("Subscribed to notification channel");
});

subscriber.on("message", (channel, message) => {
  try {
    const data = JSON.parse(message);
    logger.info({ channel, data }, "Message received");
  } catch (err) {
    logger.error({ err }, "Failed to parse message");
  }
});
export default subscriber;
