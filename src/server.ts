import app from "./app";
import { env } from "./config/env";
import logger from "./utils/logger";
import "./redis/index";
import "./queues/workers/export.worker";
import "./queues/workers/email.worker";
import "./events/listeners/user.listener";
import "./events/listeners/job.listener";
import "./redis/subscriber"

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`Server is running on port: http://localhost:${PORT}`);
});
