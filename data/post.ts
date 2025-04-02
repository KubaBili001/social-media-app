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
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { createdBy: data.currentUserId },
          {
            createdBy: {
              in: await prisma.follow
                .findMany({
                  where: {
                    followerId: data.currentUserId,
                  },
                  select: { userId: true },
                })
                .then((followers) => followers.map((f) => f.userId)),
            },
          },
        ],
      },
      skip: data.offset,
      take: data.numberOfPosts,
      orderBy: {
        postedDate: "desc",
      },
    });

    return posts;
  } catch (error) {
    return null;
  }
};
