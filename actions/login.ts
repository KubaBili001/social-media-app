"use server";

import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { loginSchema } from "@/schemas/schemas";

export const login = async (data: z.infer<typeof loginSchema>) => {
  const validatedData = loginSchema.parse(data);

  if (!validatedData) {
    return { error: "Invalid input data" };
  }

  const { email, password } = validatedData;

  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    return { error: "User does not exist" };
  }

  await signIn("credentials", {
    email: user.email,
    password: password,
    redirectTo: "/",
  });

  return { success: "User logged in successfully" };
};
