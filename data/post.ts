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
  take: number;
  skip: number;
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
      skip: data.skip,
      take: data.take,
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
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    const postIds = posts.map((post) => post.id);

    const userLikes = await prisma.like.findMany({
      where: {
        userId: data.currentUserId,
        postId: { in: postIds },
      },
      select: {
        postId: true,
      },
    });

    const userComments = await prisma.comment.findMany({
      where: {
        createdBy: data.currentUserId,
        postId: { in: postIds },
      },
      select: {
        postId: true,
      },
      distinct: ["postId"],
    });

    const likedPostIds = new Set(userLikes.map((like) => like.postId));
    const commentedPostIds = new Set(
      userComments.map((comment) => comment.postId)
    );

    const result = posts.map((post) => ({
      ...post,
      hasLiked: likedPostIds.has(post.id),
      hasCommented: commentedPostIds.has(post.id),
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
    }));

    return result;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

export const getPostById = async (postId: number, currentUserId: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
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

    if (!post) return null;

    const [likesCount, commentsCount, hasLiked, hasCommented] =
      await Promise.all([
        prisma.like.count({ where: { postId } }),
        prisma.comment.count({ where: { postId } }),
        prisma.like.findFirst({
          where: {
            postId,
            userId: currentUserId,
          },
          select: { postId: true },
        }),
        prisma.comment.findFirst({
          where: {
            postId,
            createdBy: currentUserId,
          },
          select: { id: true },
        }),
      ]);

    return {
      ...post,
      likesCount,
      commentsCount,
      hasLiked: !!hasLiked,
      hasCommented: !!hasCommented,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
