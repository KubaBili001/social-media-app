"use client";
//next
import Image from "next/image";

//components
import { CommentSection } from "./CommentSection";

//types
import { CurrentUser, PostWithMeta, User } from "@/types/types";

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
