"use server";

import { auth } from "@/auth";
import { commentSchema } from "@/schemas/schemas";
import { createComment as create } from "@/data/comment";

export async function createComment(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized." };
  }

  const parsed = commentSchema.safeParse({
    text: formData.get("text"),
    postId: Number(formData.get("postId")),
    respondingTo: formData.get("respondingTo")
      ? Number(formData.get("respondingTo"))
      : null,
  });

  if (!parsed.success) {
    return { error: "Invalid comment data." };
  }

  const { text, postId, respondingTo } = parsed.data;

  const comment = await create({
    text,
    postId,
    createdBy: userId,
    respondingTo,
  });

  if (!comment) {
    return { error: "There was an error while creating your comment." };
  }

  return { success: "Comment successfully created." };
}
