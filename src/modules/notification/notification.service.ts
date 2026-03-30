import prisma from "../../lib/prisma";
import { cache } from "../../cache";
import { Notification } from "../../generated/prisma";

const getCacheKey = (userId: string, workspaceId: string) => {
  return `notification:${userId}:${workspaceId}`;
};

export const notificationService = {
  async getNotifications(userId: string, workspaceId: string) {
    const cacheKey = getCacheKey(userId, workspaceId);
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
    const cacheKey = getCacheKey(userId, workspaceId);
    await cache.delete(cacheKey);
    return notification;
  },
};
