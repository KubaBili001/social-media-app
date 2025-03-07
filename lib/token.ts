import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import prisma from "./prisma";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date().getTime() + 1000 * 60 * 60 * 2; // 2 hours

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires: new Date(expires),
    },
  });

  return verificationToken;
};
