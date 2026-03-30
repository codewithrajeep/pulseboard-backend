import { Worker } from "bullmq";
import { env } from "../../config/env";
import logger from "../../utils/logger";

const connection = {
  url: env.REDIS_URL,
};

new Worker(
  "export",
  async (job) => {
    const { workspaceId, userId } = job.data;
    logger.info({ workspaceId, userId }, "Export job started!");
    await new Promise((res) => setTimeout(res, 5000));
    logger.info({ workspaceId, userId }, "Export job completed!");
  },
  { connection },
);
