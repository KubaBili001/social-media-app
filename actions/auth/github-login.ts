"use server";

import { signIn } from "@/auth";

export const github = async () => {
  await signIn("github", {
    redirectTo: "/home",
  });
  return { success: "User logged in successfully" };
};
