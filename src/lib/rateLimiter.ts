import redis from "../redis";

export async function slidingWindowRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<{ allowed: boolean; remaining: number; retryAfter?: number }> {
  const now = Date.now();
  const cutoff = now - windowMs;
  const redisKey = `rate_limit:${key}`;
  // remove entries outside the window
  await redis.zremrangebyscore(redisKey, 0, cutoff);
  // count how many requests are in the current window
  const count = await redis.zcard(redisKey);
  if (count >= limit) {
    const oldest = await redis.zrange(redisKey, 0, 0, "WITHSCORES");
    const retryAfter = oldest[1]
      ? Math.ceil((Number(oldest[1]) + windowMs - now) / 1000)
      : 1;
    return { allowed: false, remaining: 0, retryAfter };
  }
  await redis.zadd(redisKey, now, String(now));
  await redis.expire(redisKey, Math.ceil(windowMs / 1000));
  return { allowed: true, remaining: limit - (count + 1) };
}
