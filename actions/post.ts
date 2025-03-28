"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Readable } from "stream";
import cloudinary from "@/lib/cloudinary";
import { createPost as create } from "@/data/post";

const schema = z.object({
  text: z.string().max(250).optional(),
  image: z.instanceof(File),
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

  console.log(formData);

  if (!parsed.success) {
    return { error: "Invalid post data." };
  }

  const { text, image } = parsed.data;

  // Convert File to Buffer
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "your_folder_name" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
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
