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

  const take = 2;
  const skip = (page - 1) * take;

  const posts = await get({
    currentUserId: userId,
    take,
    skip,
  });

  if (!posts) return [];

  return posts;
}
