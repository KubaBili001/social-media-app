"use server";

import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { loginSchema } from "@/schemas/schemas";
import { AuthError } from "next-auth";

export const login = async (data: z.infer<typeof loginSchema>) => {
  const validatedData = loginSchema.parse(data);

  if (!validatedData) {
    return { error: "Invalid input data" };
  }

  const { email, password } = validatedData;

  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    return { error: "Invalid credentials" };
  }

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    switch (result.error) {
      case "CredentialsSignin":
        return { error: "Invalid credentials" };
      default:
        return { error: "An unexpected error occurred" };
    }
  }

  return { success: "User logged in successfully" };
};

export const github = async () => {
  const result = await signIn("github", {
    redirect: false,
  });

  if (result?.error) {
    return { error: "An unexpected OAuth error occurred" };
  }

  return { success: "User logged in successfully" };
};
