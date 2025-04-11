"use server";

//auth
import { auth } from "@/auth";

//actions
import { getPosts as get } from "@/data/post";

export async function getPosts(page: number = 1) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return [];
  }

  const numberOfPosts = 2;
  const offset = (page - 1) * numberOfPosts;

  const posts = await get({
    currentUserId: userId,
    numberOfPosts,
    offset,
  });

  if (!posts) return [];

  return posts;
}
