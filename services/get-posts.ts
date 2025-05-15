//auth
import { auth } from "@/auth";

//data
import { getPosts as get } from "@/data/post";

//utils
import { getPaginationConfig } from "@/utils/pagination";

export async function getPosts(page: number = 1) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return [];
  }

  const { take, skip } = getPaginationConfig(page);

  const posts = await get(userId, take, skip);

  return posts ?? [];
}
