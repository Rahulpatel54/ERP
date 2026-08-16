import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "Enter your email or employee ID"),
  password: z.string().min(1, "Enter your password"),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
