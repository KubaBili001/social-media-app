import prisma from "@/lib/prisma";

export const addLike = async (postId: number, currentUserId: string) => {
  try {
    const like = await prisma.like.create({
      data: {
        postId: postId,
        userId: currentUserId,
      },
    });

    return like;
  } catch (error) {
    return null;
  }
};

export const removeLike = async (postId: number, currentUserId: string) => {
  try {
    const like = await prisma.like.delete({
      where: {
        postId_userId: {
          postId: postId,
          userId: currentUserId,
        },
      },
    });

    return like;
  } catch (error) {
    return null;
  }
};
