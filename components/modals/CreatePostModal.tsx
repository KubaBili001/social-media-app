"use client";

import Modal from "./Modal";
import useCreatePostModal from "@/app/hooks/useCreatePostModal";
import { FileUpload } from "../FileUpload";

export default function AddPostModal() {
  //hooks
  const createPostModal = useCreatePostModal();

  return (
    <Modal
      title="Create new post"
      onClose={createPostModal.onClose}
      isOpen={createPostModal.isOpen}
    >
      <div className="bg-secondary p-3 flex flex-col gap-2 items-center justify-center h-full md:h-[500px]">
        <FileUpload />
      </div>
    </Modal>
  );
}
