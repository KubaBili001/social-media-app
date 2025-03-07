import { config } from "@/config";
import { Resend } from "resend";

const resend = new Resend(config.env.resend.api);

const domain = "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${domain}/verify-email?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`,
  });
};
