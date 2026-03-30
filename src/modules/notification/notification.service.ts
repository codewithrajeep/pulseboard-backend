import prisma from "../../lib/prisma";
import { cache } from "../../cache";
import { Notification } from "../../generated/prisma";
import { CacheKeys } from "../../cache/keys";

export const notificationService = {
  async getNotifications(userId: string, workspaceId: string) {
    const cacheKey = CacheKeys.notifications(workspaceId, userId);
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
  async createNotification(
    userId: string,
    workspaceId: string,
    message: string,
  ) {
    const notification = await prisma.notification.create({
      data: {
        userId: userId,
        workspaceId: workspaceId,
        message: message,
      },
    });
    // Invalidate cache so next read fetches fresh data
    const cacheKey = CacheKeys.notifications(workspaceId, userId);
    await cache.delete(cacheKey);
    return notification;
  },
};
