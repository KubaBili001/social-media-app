"use client";

import { changeLike } from "@/actions/posts/like";
import { Heart } from "lucide-react";
import { useState } from "react";
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
        <Heart className="fill-red-500 text-red-500 w-6 h-6" />
      ) : (
        <Heart className="w-6 h-6" />
      )}
    </div>
  );
};
