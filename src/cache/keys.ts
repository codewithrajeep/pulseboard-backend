export const CacheKeys = {
  notifications: (workspaceId: string, userId: string) => {
    return `notifications:${workspaceId}:${userId}`;
  },
  user: (workspaceId: string, userId: string) => {
    return `user:${workspaceId}:${userId}`;
  },
  workspace: (workspaceId: string) => {
    return `workspace:${workspaceId}`;
  },
  workspaceMembers: (workspaceId: string) => {
    return `workspaceMembers:${workspaceId}`;
  },
};
