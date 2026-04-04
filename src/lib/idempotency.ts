import redis from "../redis";

export async function getIdempotencyRecord(
  key: string,
): Promise<{ status: number; body: unknown } | null> {
  const redisKey = `idempotency:${key}`;
  const data = await redis.get(redisKey);
  if (!data) return null;
  return JSON.parse(data);
}

export async function saveIdempotencyRecord(
  key: string,
  status: number,
  body: unknown,
  ttlMs: number,
): Promise<void> {
  const redisKey = `idempotency:${key}`;
  const data = JSON.stringify({ status, body });
  await redis.set(redisKey, data, "PX", ttlMs);
}
