import app from "./app";
import { env } from "./config/env";
import logger from "./utils/logger";
import "./redis/index"

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`Server is running on port: http://localhost:${PORT}`);
});
