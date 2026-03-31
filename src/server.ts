import app from "./app";
import { env } from "./config/env";
import logger from "./utils/logger";
import "./redis/index";
import "./queues/workers/export.worker";
import "./queues/workers/email.worker";

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`Server is running on port: http://localhost:${PORT}`);
});
