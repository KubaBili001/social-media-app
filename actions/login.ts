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

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "You need to verify your email before loggin in." };
      }
    }
  }

  return { success: "User logged in successfully" };
};

export const github = async () => {
  await signIn("github", {
    redirectTo: "/home",
  });
  return { success: "User logged in successfully" };
};
