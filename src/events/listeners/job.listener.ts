import logger from "../../utils/logger";
import type { JobCompletedPayload } from "../events.types";
import eventBus from "../index";

eventBus.on("job.completed", async (payload: JobCompletedPayload) => {
  logger.info(
    { jobId: payload.jobId, workspaceId: payload.workspaceId },
    "Job completed",
  );
});
