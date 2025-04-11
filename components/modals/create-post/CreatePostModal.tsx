"use client";

//next
import { useState } from "react";

//components
import useCreatePostModal from "@/app/hooks/useCreatePostModal";
import { PostForm } from "./PostForm";

//icons
import { IoMdClose } from "react-icons/io";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { X } from "lucide-react";
import { TiDelete } from "react-icons/ti";

//ui
import { Button } from "../../ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ImageUpload } from "@/components/modals/images/ImageUpload";
import { ImageCropper } from "@/components/modals/images/ImageCropper";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CurrentUser } from "@/types/types";

interface CreatePostModalProps {
  currentUser: CurrentUser;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  currentUser,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  //hooks
  const createPostModal = useCreatePostModal();

  //handlers
  const handleStepChange = (step: number) => {
    if (step === 1) {
      setImage(null);
      setCroppedImage(null);
    }

    setStep(step);
  };

  const handleClose = () => {
    setStep(1);
    setImage(null);
    setCroppedImage(null);
    createPostModal.onClose();
  };

  if (!createPostModal.isOpen) {
    return null;
  }

  const header = () => {
    return (
      <div className="flex items-center justify-center relative p-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="clean"
              className="absolute left-0 border-0 p-1 cursor-pointer"
              onClick={step === 2 ? () => handleStepChange(1) : handleClose}
            >
              {step === 2 ? <IoArrowBack size={18} /> : <IoMdClose size={18} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>back</TooltipContent>
        </Tooltip>

        {croppedImage && step === 1 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="clean"
                className="absolute right-0 border-0 p-1 cursor-pointer"
                onClick={() => handleStepChange(2)}
              >
                <IoArrowForwardOutline size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>next</TooltipContent>
          </Tooltip>
        )}

        <span>Create new post</span>
      </div>
    );
  };

  const body = () => {
    return (
      <div className="relative aspect-square bg-secondary h-full">
        {step === 1 && (
          <>
            {!image ? (
              <ImageUpload setImage={setImage} />
            ) : (
              <>
                <ImageCropper image={image} onCroppedImage={setCroppedImage} />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="absolute rounded-full bottom-2 right-2 cursor-pointer bg-background p-1"
                      onClick={() => {
                        setImage(null);
                        setCroppedImage(null);
                      }}
                    >
                      <X size={18} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>remove image</TooltipContent>
                </Tooltip>
              </>
            )}
          </>
        )}
        {croppedImage && step === 2 && (
          <>
            <div className="flex flex-col md:flex-row h-full">
              <div className="relative aspect-square h-full">
                <Image src={croppedImage} alt="cropped image" fill />
              </div>
              <PostForm
                image={croppedImage}
                currentUser={currentUser}
                onSubmit={handleClose}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-secondary/20 outline-none focus:outline-none">
      <div
        className={`bg-background rounded-md relative w-full h-auto md:h-[500px] md:w-auto transition-[width]`}
      >
        {/* HEADER */}

        {header()}

        <Separator orientation="horizontal" />

        {/* BODY */}

        {body()}
      </div>
    </div>
  );
};
