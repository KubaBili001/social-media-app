"use client";

import Modal from "../Modal";
import useCreatePostModal from "@/app/hooks/useCreatePostModal";
import { FileUpload } from "../../FileUpload";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { Button } from "../../ui/button";
import { Separator } from "@/components/ui/separator";
import { PostForm } from "./PostForm";

interface CreatePostModalProps {
  currentUser: {
    id: string;
    email: string;
    photo: string;
    name: string;
  };
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  currentUser,
}) => {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  //hooks
  const createPostModal = useCreatePostModal();

  const handleStepChange = (step: number) => {
    if (step === 1) {
      setCroppedImage(null);
    }

    setStep(step);
  };

  const handleClose = () => {
    setStep(1);
    createPostModal.onClose();
  };

  if (!createPostModal.isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-secondary/20 outline-none focus:outline-none">
      <div
        className={`bg-background rounded-md relative md:h-auto w-full ${
          step === 2
            ? "sm:w-[90%] md:w-[calc(50%+350px)] lg:w-[calc(40%+350px)] xl:w-[calc(33%+350px)]"
            : "md:w-3/6 lg:w-2/5 xl:w-2/6"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-center relative p-3">
          <Button
            variant="clean"
            className="absolute left-0 border-0 p-1 cursor-pointer"
            onClick={step === 2 ? () => handleStepChange(1) : handleClose}
          >
            {step === 2 ? <IoArrowBack size={18} /> : <IoMdClose size={18} />}
          </Button>

          {croppedImage && step === 1 && (
            <Button
              variant="clean"
              className="absolute right-0 border-0 p-1 cursor-pointer"
              onClick={() => handleStepChange(2)}
            >
              <IoArrowForwardOutline size={18} />
            </Button>
          )}

          <span>Create new post</span>
        </div>

        <Separator orientation="horizontal" />

        {/* BODY */}

        {step === 1 && (
          <div className="relative bg-secondary flex flex-col gap-2 items-center justify-center aspect-square">
            <FileUpload onCroppedImage={setCroppedImage} />
          </div>
        )}
        {step === 2 && croppedImage && (
          <PostForm imageSrc={croppedImage} currentUser={currentUser} />
        )}
      </div>
    </div>
  );
};
