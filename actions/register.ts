"use server";

import { createUser, getUserByEmail } from "@/data/user";
import { generateSalt, hashPassword } from "@/lib/hasher";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { registerSchema } from "@/schemas/schemas";
import { z } from "zod";

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

    const hashedPassword = await hashPassword(password, salt);

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
