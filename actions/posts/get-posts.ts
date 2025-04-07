"use server";

import { auth } from "@/auth";
import { getPosts as get } from "@/data/post";

export async function getPosts(data: {
  currentUserId: string;
  numberOfPosts: number;
  offset: number;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const posts = await get(data);

  return posts;
}
