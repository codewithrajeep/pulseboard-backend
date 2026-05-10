import { Router, type Router as ExpressRouter } from "express";
import { checkHealth } from "../lib/health";

const router: ExpressRouter = Router();

router.get("/health", async (_req, res) => {
  try {
    const health = await checkHealth();
    res.json(health);
  } catch (error) {
    res.status(500).json({ error: "Failed to check health" });
  }
});

export default router;