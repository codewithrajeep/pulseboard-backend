import redis from "../redis";

export async function acquireLock(
  resource: string,
  ttlMs: number,
): Promise<string | null> {
  const lockId = crypto.randomUUID();
  const lockKey = `lock:${resource}`;
  const result = await redis.set(lockKey, lockId, "PX", ttlMs, "NX");
  return result === "OK" ? lockId : null;
}

export async function releaseLock(
  resource: string,
  lockId: string,
): Promise<boolean> {
  const lockKey = `lock:${resource}`;
  const luaScript = `
        if redis.call("GET", KEYS[1]) == ARGV[1] then
            return redis.call("DEL", KEYS[1])
        else 
            return 0
        end
    `;
  const result = await redis.eval(luaScript, 1, lockKey, lockId);
  return result === 1;
}
