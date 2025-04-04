import prisma from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const lowerCaseEmail = email.toLowerCase();
    const user = await prisma.user.findUnique({
      where: {
        email: lowerCaseEmail,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const createUser = async (
  email: string,
  password: string,
  salt: string
) => {
  try {
    const lowerCaseEmail = email.toLowerCase();
    const user = await prisma.user.create({
      data: {
        email: lowerCaseEmail,
        password,
        salt,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
