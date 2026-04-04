import { Request, Response, NextFunction } from "express";
import { slidingWindowRateLimit } from "../lib/rateLimiter";

export function rateLimitMiddleware(options: {
  limit: number;
  windowMs: number;
  keyPrefix?: string;
}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const prefix = options.keyPrefix ?? "global";
    const key = `${prefix}:${req.ip}`;
    const result = await slidingWindowRateLimit(
      key,
      options.limit,
      options.windowMs,
    );
    res.setHeader("X-RateLimit-Limit", options.limit);
    res.setHeader("X-RateLimit-Remaining", result.remaining);
    if (!result.allowed) {
      res.setHeader("Retry-After", result.retryAfter ?? 1);
      res.status(429).json({
        success: false,
        message: "Too many requests, please try again later",
      });
      return;
    }
    next();
  };
}
