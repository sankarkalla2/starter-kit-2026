import z from "zod";

export const loginFormSchema = z.object({
  email: z.email().min(1, "Email is required"),
});
