import { Worker } from "bullmq";
import { env } from "../../config/env";
import logger from "../../utils/logger";

const connection = {
  url: env.REDIS_URL,
};

new Worker(
  "email",
  async (job) => {
    const { to, subject, body } = job.data;
    logger.info({ to, subject }, "Email job started!");
    await new Promise((res) => setTimeout(res, 2000));
    logger.info({ to, subject }, "Email job completed!");
  },
  { connection },
);
