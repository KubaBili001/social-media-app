"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import cloudinary from "@/lib/cloudinary";
import { createPost as create, getPosts as get } from "@/data/post";

const schema = z.object({
  text: z.string().max(250).optional(),
  image: z.string(),
});

export async function createPost(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized." };
  }

  const parsed = schema.safeParse({
    text: formData.get("text"),
    image: formData.get("image"),
  });

  if (!parsed.success) {
    return { error: "Invalid post data." };
  }

  const { text, image } = parsed.data;

  const uploadResult = await cloudinary.uploader.upload(image, {
    folder: "user-posts",
    resource_type: "image",
  });

  if (
    !uploadResult ||
    typeof uploadResult !== "object" ||
    !("secure_url" in uploadResult)
  ) {
    return { error: "Image upload failed." };
  }

  const imageURL = uploadResult.secure_url;

  const post = await create({
    text: text ?? "",
    photo: imageURL as string,
    createdBy: userId,
  });

  if (!post) {
    return { error: "There was an error while creating your post." };
  }

  revalidatePath("/home");

  return { success: "Post successfully created." };
}

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
