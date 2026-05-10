import express, { Express } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { rateLimitMiddleware } from "./middlewares/rateLimit.middleware";
import healthRouter from "./routes/health.route";

const app: Express = express();

app.use(express.json());
app.use(rateLimitMiddleware({ limit: 100, windowMs: 60 * 1000 }));
app.use("/api/v1", healthRouter);
app.use(errorHandler);

export default app;
