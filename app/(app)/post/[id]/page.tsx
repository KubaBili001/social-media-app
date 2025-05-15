//actions
import getCurrentUser from "@/actions/users/get-user";

//services
import { getPost } from "@/services/get-post";

//components
import { PostDetails } from "@/components/modals/display-post/PostDetails";

//types
import { CurrentUser, PostWithMeta } from "@/types/types";

export default async function Post({ params }: { params: { id: number } }) {
  const currentUser: CurrentUser = (await getCurrentUser()) as CurrentUser;
  const post: PostWithMeta | null = await getPost(Number(params.id));
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative h-[500px] w-auto border">
        <PostDetails currentUser={currentUser} post={post} />
      </div>
    </div>
  );
}
