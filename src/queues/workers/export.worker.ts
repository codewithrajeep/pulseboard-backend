import { Worker } from "bullmq";
import { env } from "../../config/env";
import logger from "../../utils/logger";
import eventBus from "../../events";

const connection = {
  url: env.REDIS_URL,
};

const worker = new Worker(
  "export",
  async (job) => {
    const { workspaceId, userId } = job.data;
    logger.info({ workspaceId, userId }, "Export job started!");
    await new Promise((res) => setTimeout(res, 5000));
    logger.info({ workspaceId, userId }, "Export job completed!");
    eventBus.emit("job.completed", {
      jobId: job.id,
      workspaceId: job.data.workspaceId,
      type: job.name,
    });
  },
  { connection, concurrency: 2 },
);

worker.on("failed", (job, err) => {
  logger.error(
    { jobId: job?.id ?? "unknown", err },
    "Export job failed after all retries",
  );
});
