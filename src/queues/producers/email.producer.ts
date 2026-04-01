import { emailQueue } from "..";

export const addEmailJob = async (
  to: string,
  subject: string,
  body: string,
) => {
  const job = await emailQueue.add("send-email", {
    to,
    subject,
    body,
  }, {
    attempts: 3,
    backoff: {type: "exponential", delay: 1000},
    priority: 1,
  });
  return job;
};
