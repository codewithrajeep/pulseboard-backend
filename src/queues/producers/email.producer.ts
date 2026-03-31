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
  });
  return job;
};
