"use server";

//auth
import { auth } from "@/auth";

//actions
import { getPostById } from "@/data/post";

export async function getPost(postId: number) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const post = await getPostById(postId, userId);

  if (!post) return null;

  return post;
}
