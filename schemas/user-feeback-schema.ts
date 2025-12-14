import z from "zod";

export const UserFeedbackSchema = z.object({
  message: z
    .string()
    .min(1, "Feedback is required")
    .max(200, "Feedback cannot exceed 200 characters"),
  email: z.email().optional(),
});
