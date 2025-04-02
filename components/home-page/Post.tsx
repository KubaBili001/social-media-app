import { CurrentUser, Post as PostType } from "@/types/types";

interface PostProps {
  post: PostType;
  currentUser: CurrentUser;
}

export const Post: React.FC<PostProps> = ({ post, currentUser }) => {
  return (
    <div>
      <span>{post.id}</span>
    </div>
  );
};
