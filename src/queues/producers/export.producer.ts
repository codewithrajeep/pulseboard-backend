import { exportQueue } from "..";

export const addExportJob = async (workspaceId: string, userId: string) => {
  const job = await exportQueue.add("export-report", {
    workspaceId,
    userId,
  });
  return job;
};
