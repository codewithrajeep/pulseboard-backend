export type UserRegisteredPayload = {
  userId: string;
  email: string;
  name: string;
};

export type JobCompletedPayload = {
  jobId: string;
  workspaceId: string;
  type: string;
};
