import { Queue } from "bullmq";
import { env } from "../config/env";

const connection = {
  url: env.REDIS_URL,
};

export const exportQueue = new Queue("export", { connection });
export const emailQueue = new Queue("email", { connection });
