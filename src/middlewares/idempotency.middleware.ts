import { Request, Response, NextFunction } from "express";
import {
  getIdempotencyRecord,
  saveIdempotencyRecord,
} from "../lib/idempotency";

const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000;
export async function idempotencyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const idempotencyKey = req.headers["idempotency-key"];
  if (!idempotencyKey || typeof idempotencyKey !== "string") {
    next();
    return;
  }
  const existing = await getIdempotencyRecord(idempotencyKey);
  if (existing) {
    res.status(existing.status).json(existing.body);
    return;
  }
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    saveIdempotencyRecord(
      idempotencyKey,
      res.statusCode,
      body,
      IDEMPOTENCY_TTL_MS,
    );
    return originalJson(body);
  };
  next();
}
