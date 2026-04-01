import eventBus from "../index";
import { addEmailJob } from "../../queues/producers/email.producer";
import type { UserRegisteredPayload } from "../events.types";
import logger from "../../utils/logger";

eventBus.on("user.registered", async (payload: UserRegisteredPayload) => {
  logger.info(
    { userId: payload.userId },
    "User registered, sending welcome email...",
  );
  await addEmailJob(
    payload.email,
    "Welcome to our platform!",
    `Hello ${payload.name}, welcome!\n
            Thanks for joining our community.\n
        `,
  );
});
