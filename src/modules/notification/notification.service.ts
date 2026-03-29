import prisma from "../../lib/prisma";
import { cache } from "../../cache";
import { Notification } from "../../generated/prisma";

export const notificationService = {
  async getNotifications(userId: string, workspaceId: string) {
    const cacheKey = `notification:${userId}:${workspaceId}`;
    const cached = await cache.get<Notification[]>(cacheKey);
    if (cached) return cached;

    const notifications = await prisma.notification.findMany({
      where: {
        userId: userId,
        workspaceId: workspaceId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    await cache.set(cacheKey, notifications, 60); // store in cache with 60 seconds TTL
    return notifications;
  },
};
