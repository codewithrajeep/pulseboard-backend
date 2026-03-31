import { exportQueue } from "..";

export const addExportJob = async (workspaceId: string, userId: string) => {
  const job = await exportQueue.add(
    "export-report",
    {
      workspaceId,
      userId,
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    },
  );
  return job;
};
