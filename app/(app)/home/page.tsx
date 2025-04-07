import getCurrentUser from "@/actions/user";
import { Posts } from "@/components/home-page/Posts";
import { CurrentUser } from "@/types/types";

export default async function Home() {
  const currentUser: CurrentUser = (await getCurrentUser()) as CurrentUser;
  return (
    <div className="w-full h-full flex justify-center p-20">
      <Posts currentUser={currentUser} />
    </div>
  );
}
