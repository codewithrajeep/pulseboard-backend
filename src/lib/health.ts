import redis from "../redis";
import prisma from "./prisma";

export async function checkHealth(): Promise<{
  status: "ok" | "degraded";
  services: {
    database: "ok" | "unreachable";
    redis: "ok" | "unreachable";
  };
  uptime: number;
  timestamp: string;
}> {
  let database: "ok" | "unreachable" = "unreachable";
  let redisStatus: "ok" | "unreachable" = "unreachable";
  try {
    await prisma.$queryRaw`SELECT 1`;
    database = "ok";
  } catch {
    database = "unreachable";
  }
  try {
    await redis.ping();
    redisStatus = "ok";
  } catch {
    redisStatus = "unreachable";
  }
  const status = database === "ok" && redisStatus === "ok" ? "ok" : "degraded";
  return {
    status,
    services: {
      database,
      redis: redisStatus,
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
}
