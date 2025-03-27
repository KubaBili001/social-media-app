import { currentUser } from "@/types/types";
import Image from "next/image";

interface PostFormProps {
  imageSrc: string;
  currentUser: currentUser;
}

export const PostForm: React.FC<PostFormProps> = ({
  imageSrc,
  currentUser,
}) => {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full">
      <div className="relative flex flex-col gap-2 items-center justify-center aspect-square min-w-[calc(100%-350px)]">
        <Image src={imageSrc} alt="Cropped" fill className="rounded-bl-md" />
      </div>
      <div className="bg-secondary h-[100px] w-full md:h-auto md:w-[350px] rounded-br-md p-3">
        {currentUser.name}
      </div>
    </div>
  );
};
