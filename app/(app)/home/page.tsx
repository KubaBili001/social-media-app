//next
import { Metadata } from "next";

//components
import { Posts } from "@/components/home-page/posts/Posts";

//actions
import getCurrentUser from "@/actions/users/get-user";

//services
import { getPosts } from "@/services/get-posts";

//types
import { CurrentUser } from "@/types/types";

export const metadata: Metadata = {
  title: "Home page",
  description: "Browse recent posts",
};

export default async function Home() {
  const currentUser: CurrentUser = (await getCurrentUser()) as CurrentUser;
  const posts = await getPosts();
  return (
    <div className="w-full h-full flex justify-center py-20 md:py-10">
      <Posts currentUser={currentUser} posts={posts} />
    </div>
  );
}
