import { CurrentUser, PostWithMeta } from "@/types/types";
import Image from "next/image";

interface PostProps {
  post: PostWithMeta;
  currentUser: CurrentUser;
}

export const Post: React.FC<PostProps> = ({ post, currentUser }) => {
  return (
    <div className="w-[600px] flex flex-col items-center border rounded-md">
      {/* HEADER */}
      <div className="flex items-center gap-2 p-3 w-full">
        <Image
          src={post.user.image ?? ""}
          alt="Creator profile picture"
          width={30}
          height={25}
          className="rounded-full"
        />
        <span className="text-sm">{post.user.name}</span>
        <span className="text-xl">&#x2022;</span>
        <span className="text-sm">{post.postedDate.toLocaleDateString()}</span>
      </div>
      {/* BODY */}
      <div className="relative w-full aspect-square">
        <Image src={post.photo} alt="user photo" fill />
      </div>
      {/* FOOTER */}
      {post.text && (
        <span className="w-full h-fit max-h-[100px] p-3 break-words text-sm">
          {post.text}
        </span>
      )}
      <div></div>
    </div>
  );
};
