import prisma from "@/lib/prisma";

export const getCommentsByPostId = async (
  postId: number,
  take: number,
  skip: number
) => {
  return await prisma.comment.findMany({
    where: {
      postId,
      respondingTo: null,
    },
    take,
    skip,
    orderBy: {
      postedDate: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
};

export const getRepliesByCommentId = async (
  commentId: number,
  take: number,
  skip: number
) => {
  return await prisma.comment.findMany({
    where: {
      respondingTo: commentId,
    },
    take,
    skip,
    orderBy: {
      postedDate: "asc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
};
