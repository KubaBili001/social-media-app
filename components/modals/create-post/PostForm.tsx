"use client";

//next
import Image from "next/image";
import { useState } from "react";

//actions
import { createPost } from "@/actions/posts/create-post";

//types
import { CurrentUser } from "@/types/types";

//ui
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/custom/Loader";
import { toast } from "sonner";

interface PostFormProps {
  image: string;
  currentUser: CurrentUser;
  onSubmit: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({
  image,
  currentUser,
  onSubmit,
}) => {
  //hooks
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //handlers
  const handleSubmit = async () => {
    setIsLoading(true);

    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    formData.append("image", image);

    const res = await createPost(formData);

    if (res?.error) {
      toast.error(res.error, {
        description: "Please, try again.",
      });
    }

    if (res?.success) {
      toast.success(res.success);

      onSubmit();
    }

    setIsLoading(false);
  };

  return (
    <div className="relative flex flex-col items-end gap-3 h-[250px] w-full md:h-auto md:w-[250px] lg:w-[300px] xl:w-[350px] rounded-br-md p-3">
      <div className="flex gap-3 items-center w-full">
        <Image
          src={currentUser.image}
          alt="Cropped"
          width={30}
          height={25}
          className="rounded-full"
        />
        <span className="text-sm">{currentUser.name}</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={250}
        className="w-full resize-none outline-none text-sm h-full"
      />
      <span className="text-xs text-foreground text-right">{`${text.length}/250`}</span>
      <Button
        className="w-32 md:w-full"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? <Loader dark={false} /> : "Post"}
      </Button>
    </div>
  );
};
