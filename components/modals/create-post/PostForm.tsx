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
  console.log(currentUser);

  return (
    <div className="flex flex-col-reverse md:flex-row w-full">
      <div className="relative flex flex-col gap-2 items-center justify-center aspect-square md:min-w-[calc(100%-250px)] lg:min-w-[calc(100%-300px)] xl:min-w-[calc(100%-350px)]">
        <Image src={imageSrc} alt="Cropped" fill className="rounded-bl-md" />
      </div>
      <div className="relative bg-secondary h-[100px] w-full md:h-auto md:w-[250px] lg:w-[300px] xl:w-[350px] rounded-br-md p-3">
        <div className="flex gap-3 items-center">
          <Image
            src={currentUser.image}
            alt="Cropped"
            width={30}
            height={25}
            className="rounded-full"
          />
          <span className="text-sm">{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};
