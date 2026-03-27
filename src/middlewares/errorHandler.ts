import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { ZodError } from "zod";
import { env } from "../config/env";
import logger from "../utils/logger";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    logger.warn(
      { statusCode: err.statusCode, message: err.message },
      "AppError",
    );
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  if (err instanceof ZodError) {
    logger.warn({ errors: err.issues }, "ZodError: validation failed");
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.issues,
    });
  }
  logger.error({ err }, "Unhandled error");
  return res.status(500).json({
    success: false,
    message:
      env.NODE_ENV === "development"
        ? (err as Error).message
        : "Internal server error.",
  });
};
