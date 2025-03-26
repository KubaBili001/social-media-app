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
      <div className="relative bg-secondary flex flex-col gap-2 items-center justify-center aspect-square">
        <FileUpload />
      </div>
    </Modal>
  );
}
