"use server";

import { createUser, getUserByEmail } from "@/data/user";
import { generateSalt, hashPassword } from "@/lib/hasher";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { registerSchema } from "@/schemas/schemas";
import * as z from "zod";
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

export const register = async (
  data: z.infer<typeof registerSchema>
): Promise<{ error?: string; success?: string } | undefined> => {
  try {
    const validatedData = registerSchema.parse(data);

    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    const { email, password, passwordConfirmation } = validatedData;

    if (password !== passwordConfirmation) {
      return { error: "Passwords do not match" };
    }

    const user = await getUserByEmail(email);

    if (user != null) {
      return { error: "User with this email already exists" };
    }

    const salt = generateSalt();

    const hashedPassword = hashPassword(password, salt);

    const createdUser = await createUser(email, hashedPassword, salt);

    if (createdUser === null) {
      return { error: "There was a problem while creating a user" };
    }

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(email, verificationToken.token);

    return { success: "Registration successful!" };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred." };
  }
};
