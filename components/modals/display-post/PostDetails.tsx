"use client";

import { CurrentUser, PostWithMeta, User } from "@/types/types";
import Image from "next/image";
import { PostForm } from "../create-post/PostForm";
import { CommentSection } from "./CommentSection";

interface PostDetailsProps {
  currentUser: CurrentUser;
  post: PostWithMeta | null;
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  currentUser,
  post,
}) => {
  if (!post) {
    // skeleton
    return null;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row h-full">
        <div className="relative aspect-square h-full">
          <Image src={post.photo} alt="cropped image" fill />
        </div>
        <CommentSection
          user={post.user as User}
          currentUser={currentUser}
          post={post}
        />
      </div>
    </>
  );
};
