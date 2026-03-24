import express, { Express } from "express";

const app: Express = express();

app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

export default app;
