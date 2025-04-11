import prisma from "@/lib/prisma";

export const addLike = async (data: {
  postId: number;
  currentUserId: string;
}) => {
  try {
    const like = await prisma.like.create({
      data: {
        postId: data.postId,
        userId: data.currentUserId,
      },
    });

    return like;
  } catch (error) {
    return null;
  }
};

export const removeLike = async (data: {
  postId: number;
  currentUserId: string;
}) => {
  try {
    const like = await prisma.like.delete({
      where: {
        postId_userId: {
          postId: data.postId,
          userId: data.currentUserId,
        },
      },
    });

    return like;
  } catch (error) {
    return null;
  }
};
