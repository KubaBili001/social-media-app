import { getPost } from "@/actions/posts/get-post";
import getCurrentUser from "@/actions/users/user";
import { DisplayPostModal } from "@/components/modals/display-post/DisplayPostModal";
import { PostDetails } from "@/components/modals/display-post/PostDetails";
import { CurrentUser, PostWithMeta } from "@/types/types";

export default async function Post({ params }: { params: { id: string } }) {
  const currentUser: CurrentUser = (await getCurrentUser()) as CurrentUser;
  const post: PostWithMeta | null = await getPost(Number(params.id));
  return <DisplayPostModal currentUser={currentUser} post={post} />;
}
