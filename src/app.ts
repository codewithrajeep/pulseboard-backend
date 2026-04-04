import express, { Express } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { rateLimitMiddleware } from "./middlewares/rateLimit.middleware";

const app: Express = express();

app.use(express.json());
app.use(rateLimitMiddleware({ limit: 100, windowMs: 60 * 1000 }));
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
app.use(errorHandler);

export default app;
