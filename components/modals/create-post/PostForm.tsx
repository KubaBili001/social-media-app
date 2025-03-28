"use client";

import { createPost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface PostFormProps {
  image: string;
  currentUser: currentUser;
  onSubmit: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({
  image,
  currentUser,
  onSubmit,
}) => {
  console.log(image);

  //states
  const [text, setText] = useState("");

  //handlers
  const handleSubmit = async () => {
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
  };

  return (
    <div className="flex flex-col-reverse md:flex-row w-full">
      <div className="relative flex flex-col gap-2 items-center justify-center aspect-square md:min-w-[calc(100%-250px)] lg:min-w-[calc(100%-300px)] xl:min-w-[calc(100%-350px)]">
        <Image src={image} alt="Cropped" fill className="rounded-bl-md" />
      </div>
      <div className="relative flex flex-col items-end gap-3 bg-secondary h-[250px] w-full md:h-auto md:w-[250px] lg:w-[300px] xl:w-[350px] rounded-br-md p-3">
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
        <Button className="w-32 md:w-full" onClick={handleSubmit}>
          Post
        </Button>
      </div>
    </div>
  );
};
