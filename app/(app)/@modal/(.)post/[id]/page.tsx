//actions
import getCurrentUser from "@/actions/users/get-user";

//services
import { getPost } from "@/services/get-post";

//components
import { DisplayPostModal } from "@/components/modals/display-post/DisplayPostModal";

//types
import { CurrentUser, PostWithMeta } from "@/types/types";

export default async function Post({ params }: { params: { id: string } }) {
  const currentUser: CurrentUser = (await getCurrentUser()) as CurrentUser;
  const post: PostWithMeta | null = await getPost(Number(params.id));
  return <DisplayPostModal currentUser={currentUser} post={post} />;
}
