"use client";

//next
import { useState } from "react";

//components
import useDisplayPostModal from "@/hooks/useDisplayPostModal";

//icons
import { IoMdClose } from "react-icons/io";

//ui
import { Button } from "../../ui/button";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CurrentUser } from "@/types/types";
import Modal from "../Modal";
import { useRouter } from "next/navigation";

interface DisplayPostModalProps {
  currentUser: CurrentUser;
}

export const DisplayPostModal: React.FC<DisplayPostModalProps> = ({
  currentUser,
}) => {
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

        <span>Create new post</span>
      </div>
    );
  };

  const body = () => {
    return (
      <div className="relative aspect-square bg-secondary h-full">
        <div className="flex flex-col md:flex-row h-full">
          <div className="relative aspect-square h-full">{/* img */}</div>
          {/* comments */}
        </div>
      </div>
    );
  };

  return <Modal body={body()} header={header()} isOpen />;
};
