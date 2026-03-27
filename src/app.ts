import express, { Express } from "express";
import { errorHandler } from "./middlewares/errorHandler";

const app: Express = express();

app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
app.use(errorHandler);

export default app;
