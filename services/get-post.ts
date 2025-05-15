//auth
import { auth } from "@/auth";

//data
import { getPostById } from "@/data/post";

export async function getPost(postId: number) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const post = await getPostById(postId, userId);

  return post ?? null;
}
