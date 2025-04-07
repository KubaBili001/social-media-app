"use server";

import { auth } from "@/auth";
import { addLike, removeLike } from "@/data/like";
import { error } from "console";

export async function changeLike(data: {
  currentUserId: string;
  postId: number;
  isLiked: boolean;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized." };
  }

  const { currentUserId, postId, isLiked } = data;

  let like;

  if (isLiked) {
    like = removeLike({
      postId,
      currentUserId,
    });
  } else {
    like = await addLike({
      postId,
      currentUserId,
    });
  }

  if (!like) {
    return { error: "There was an unexpected error." };
  }

  return { success: "Success" };
}
