"use client";

import Modal from "./Modal";
import useCreatePostModal from "@/app/hooks/useCreatePostModal";
import { FileUpload } from "../FileUpload";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Image from "next/image";

export default function AddPostModal() {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  //hooks
  const createPostModal = useCreatePostModal();

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
        className={`bg-background rounded-md relative mx-auto my-6 md:h-auto w-full transition-[width] ${
          step === 2
            ? "sm:w-[80%] md:w-[calc(50%+350px)] lg:w-[calc(40%+350px)] xl:w-[calc(33%+350px)]"
            : " md:w-3/6 lg:w-2/5 xl:w-2/6"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-center relative p-3">
          <Button
            variant="clean"
            className="absolute right-3 border-0 p-1 cursor-pointer"
            onClick={handleClose}
          >
            <IoMdClose size={18} />
          </Button>

          <span>Create new post</span>
        </div>

        <Separator orientation="horizontal" />

        {/* BODY */}

        {step === 1 && (
          <>
            <div className="relative bg-secondary flex flex-col gap-2 items-center justify-center aspect-square min-w-4/5">
              <FileUpload onCroppedImage={setCroppedImage} />
            </div>
            <button
              className="absolute w-20 h-20 bg-red-500"
              onClick={() => setStep(2)}
            ></button>
          </>
        )}
        {step === 2 && croppedImage && (
          <div className="flex flex-col md:flex-row w-full h-full">
            <div className="relative bg-secondary flex flex-col gap-2 items-center justify-center aspect-square min-w-[calc(100%-350px)]">
              <Image src={croppedImage} alt="Cropped" fill />
            </div>
            <Separator orientation="vertical" />
            <div className="h-[100px] w-full md:h-full md:w-[350px] bg-background">
              asdasdasdasd
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
