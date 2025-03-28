import prisma from "@/lib/prisma";

export const createPost = async (data: {
  text: string;
  photo: string;
  createdBy: string;
}) => {
  try {
    const post = await prisma.post.create({
      data: {
        text: data.text,
        photo: data.photo,
        createdBy: data.createdBy,
      },
    });

    return post;
  } catch (error) {
    return null;
  }
};
