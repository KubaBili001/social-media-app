//next
import React from "react";

//ui
import { Button } from "../ui/button";

//icons
import { MdAddCircleOutline } from "react-icons/md";
import useAddPostModal from "@/app/hooks/useCreatePostModal";

interface CreatePostButtonProps {
  labelStyle: string;
}

const CreatePostButton: React.FC<CreatePostButtonProps> = ({ labelStyle }) => {
  const addPostModal = useAddPostModal();
  return (
    <Button
      className="hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in hover:cursor-pointer relative"
      variant={"clean"}
      size={"clean"}
      onClick={addPostModal.onOpen}
    >
      <MdAddCircleOutline className="w-6 h-6 fill-white" />
      <span className={labelStyle}>Create a post</span>
    </Button>
  );
};

export default CreatePostButton;
