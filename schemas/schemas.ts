import { z } from "zod";

//regex
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "This field has to be filled." }),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email({ message: "Invalid email address" }),
    password: z.string().regex(passwordRegex, {
      message:
        "Password must be at least 8 characters long, with at least one letter, one number, and one special character.",
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "This field has to be filled." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Provided passwords do not match",
    path: ["confirmPassword"],
  });
