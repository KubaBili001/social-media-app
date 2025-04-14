"use client";

//next
import { useState } from "react";

//components
import useDisplayPostModal from "@/hooks/useDisplayPostModal";

//icons
import { IoMdClose } from "react-icons/io";

//ui
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CurrentUser, PostWithMeta, User } from "@/types/types";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import { PostDetails } from "./PostDetails";
import { CommentSection } from "./CommentSection";

interface DisplayPostModalProps {
  currentUser: CurrentUser;
  post: PostWithMeta | null;
}

export const DisplayPostModal: React.FC<DisplayPostModalProps> = ({
  currentUser,
  post,
}) => {
  //hooks
  const router = useRouter();

  //handlers
  const handleClose = () => {
    router.back();
  };

  //content
  const header = () => {
    return (
      <div className="flex items-center justify-center relative p-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="clean"
              className="absolute left-0 border-0 p-1 cursor-pointer"
              onClick={handleClose}
            >
              <IoMdClose size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>close</TooltipContent>
        </Tooltip>

        <span>{post?.user.name}&apos;s post</span>
      </div>
    );
  };

  const body = () => {
    return (
      <div className="relative bg-secondary h-full">
        <div className="flex h-full">
          <PostDetails currentUser={currentUser} post={post} />
        </div>
      </div>
    );
  };

  return <Modal body={body()} header={header()} isOpen />;
};
