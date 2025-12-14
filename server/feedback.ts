"use server";

import db from "@/lib/db";
import { UserFeedbackSchema } from "@/schemas/user-feeback-schema";
import z from "zod";

export const storeUserFeedBack = async ({
  email,
  message,
}: z.infer<typeof UserFeedbackSchema>) => {
  try {
    await db.feedback.create({
      data: {
        email,
        message,
      },
    });

    const webhookUrl = process.env.SLACK_WEBHOOK_URL!;

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `📢 *New Feedback Received*  
                💬 Message: ${message}  
                👤 User: ${email || "Anonymous"}  `,
      }),
    });

    return { status: 200, message: "Feedback submitted successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Failed to submit feedback" };
  }
};
