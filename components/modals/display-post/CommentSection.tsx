"use client";

import { CommentButton } from "@/components/home-page/posts/CommentButton";
import { LikeButton } from "@/components/home-page/posts/LikeButton";
import { CurrentUser, PostWithMeta, User } from "@/types/types";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";

import { useState } from "react";

interface CommentSectionProps {
  user: User;
  currentUser: CurrentUser;
  post: PostWithMeta;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  user,
  currentUser,
  post,
}) => {
  //hooks
  const [text, setText] = useState<string>("");
  const [numberOfLikes, setNumberOfLikes] = useState(post.likesCount);

  return (
    <div className="relative flex flex-col items-end bg-background md:h-auto w-[250px] lg:w-[300px] xl:w-[350px] rounded-br-md">
      {/* HEADER */}
      <div className="flex gap-3 items-center w-full p-3">
        <Image
          src={user.image}
          alt="Cropped"
          width={30}
          height={25}
          className="rounded-full"
        />
        <span className="text-sm">{user.name}</span>
      </div>

      {/* COMMENTS */}
      <div className="h-full w-full overflow-y-auto p-3 border-y"></div>

      <div className="min-h-32 w-full flex flex-col gap-3 p-3">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex w-full gap-3 items-center">
            <LikeButton
              currentUserId={currentUser.id}
              postId={post.id}
              isLiked={post.hasLiked}
              setNumberOfLikes={setNumberOfLikes}
            />
            <CommentButton hasUserCommented={post.hasCommented} />
          </div>
          <span className="text-sm">
            {numberOfLikes} {numberOfLikes === 1 ? "like" : "likes"}
          </span>
        </div>
        <div className="flex gap-2 items-center justify-between gap-2">
          <div className="flex items-center gap-2 w-full">
            <Image
              src={currentUser.image}
              alt="Cropped"
              width={30}
              height={25}
              className="rounded-full"
            />
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={250}
              className="h-full w-full resize-none outline-none text-sm"
              placeholder="Add a comment."
            />
          </div>
          <SendHorizontal className="h-6 w-6 hover:text-blue-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
