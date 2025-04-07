"use client";

import { changeLike } from "@/actions/posts/like";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";

interface LikeButtonProps {
  postId: number;
  currentUserId: string;
  isLiked: boolean;
  setNumberOfLikes: React.Dispatch<React.SetStateAction<number>>;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  currentUserId,
  isLiked,
  setNumberOfLikes,
}) => {
  const [liked, setLiked] = useState(isLiked);

  const handleClick = async () => {
    setLiked((prev) => !prev);
    setNumberOfLikes((prev) => (liked ? prev - 1 : prev + 1));

    const res = await changeLike({
      currentUserId,
      postId,
      isLiked: liked,
    });

    if (res?.error) {
      setLiked((prev) => !prev);
      setNumberOfLikes((prev) => (liked ? prev + 1 : prev - 1));
      toast.error(res.error, {
        description: "Please, try again.",
      });
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {liked ? (
        <FaHeart className="fill-red-500 w-6 h-6" />
      ) : (
        <FaRegHeart className="w-6 h-6" />
      )}
    </div>
  );
};
