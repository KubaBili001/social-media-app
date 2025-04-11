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

export const getPosts = async (data: {
  currentUserId: string;
  numberOfPosts: number;
  offset: number;
}) => {
  try {
    const followedUserIds = await prisma.follow.findMany({
      where: {
        followerId: data.currentUserId,
      },
      select: {
        userId: true,
      },
    });

    const followedIds = followedUserIds.map((f) => f.userId);

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { createdBy: data.currentUserId },
          { createdBy: { in: followedIds } },
        ],
      },
      skip: data.offset,
      take: data.numberOfPosts,
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
        likes: {
          where: {
            userId: data.currentUserId,
          },
          select: {
            userId: true,
          },
        },
        comments: {
          where: {
            createdBy: data.currentUserId,
          },
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    const result = posts.map((post) => ({
      ...post,
      likedByCurrentUser: post.likes.length > 0,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
      commentedByCurrentUser: post.comments.length > 0,
    }));

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
