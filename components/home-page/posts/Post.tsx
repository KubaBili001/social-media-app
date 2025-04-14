"use client";

//next
import { useState } from "react";
import Image from "next/image";

//types
import { CurrentUser, PostWithMeta } from "@/types/types";

//components
import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";
import Link from "next/link";

interface PostProps {
  post: PostWithMeta;
  currentUser: CurrentUser;
}

export const Post: React.FC<PostProps> = ({ post, currentUser }) => {
  //hooks
  const [numberOfLikes, setNumberOfLikes] = useState(post.likesCount);

  return (
    <div className="w-[500px] flex flex-col items-center">
      {/* HEADER */}
      <div className="flex items-center gap-2 py-3 w-full">
        <Image
          src={post.user.image ?? ""}
          alt="Creator profile picture"
          width={30}
          height={30}
          className="rounded-full"
        />
        <span className="text-sm">{post.user.name}</span>
        <span className="text-xl">&#x2022;</span>
        <span className="text-sm">{post.postedDate.toLocaleDateString()}</span>
      </div>

      {/* BODY */}
      <div className="relative w-full aspect-square">
        <Image src={post.photo} alt="user photo" fill className="rounded-sm" />
      </div>

      {/* FOOTER */}
      <div className="flex flex-col gap-2 w-full py-2">
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
        {post.text && (
          <span className="break-words w-full text-sm">
            <span className="font-bold">{post.user.name}</span> &#x2022;{" "}
            {post.text}
          </span>
        )}
        <Link
          className="text-sm underline text-sidebar-ring cursor-pointer w-fit"
          href={`post/${post.id}`}
        >
          View all comments
        </Link>
      </div>
    </div>
  );
};
