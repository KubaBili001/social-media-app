//auth
import { auth } from "@/auth";

//data
import { getCommentsByPostId as get } from "@/data/comment";

//utils
import { getPaginationConfig } from "@/utils/pagination";

export async function getComments(postId: number, page: number = 1) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return [];
  }

  const { take, skip } = getPaginationConfig(page);

  const comments = await get(postId, take, skip);

  return comments ?? [];
}
