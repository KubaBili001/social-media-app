"use server";

import { registerSchema } from "@/schemas/schemas";
import { z } from "zod";

export const register = async (
  data: z.infer<typeof registerSchema>
): Promise<{ error?: string; success?: string } | undefined> => {
  const validatedData = registerSchema.parse(data);

  if (!validatedData) {
    return { error: "Invalid input data" };
  }

  const { email, password, confirmPassword } = validatedData;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  return { success: "Registration successful!" };
};
