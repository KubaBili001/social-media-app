"use client";

//next
import { ReactElement } from "react";

//icons
import { IoMdClose } from "react-icons/io";

//ui
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface ModalProps {
  onClose: () => void;
  title?: string;
  isOpen?: boolean;
  children: ReactElement;
}

export default function Modal({
  onClose,
  title,
  isOpen,
  children,
}: ModalProps): ReactElement | null {
  // Handlers
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-secondary/20 outline-none focus:outline-none">
        <div className="bg-background rounded-md relative mx-auto my-6 w-full md:h-auto md:w-3/6 lg:h-auto lg:w-2/5 xl:w-2/6">
          {/* HEADER */}
          <div className="flex items-center justify-center relative p-3">
            <Button
              variant="clean"
              className="absolute right-3 border-0 p-1 cursor-pointer"
              onClick={handleClose}
            >
              <IoMdClose size={18} />
            </Button>

            <div>{title}</div>
          </div>

          <Separator orientation="horizontal" />

          {children}
        </div>
      </div>
    </>
  );
}
