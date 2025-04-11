import getCurrentUser from "@/actions/users/user";
import { DisplayPostModal } from "@/components/modals/display-post/DisplayPostModal";
import { CurrentUser } from "@/types/types";

export default async function Page() {
  const currentUser: CurrentUser = (await getCurrentUser()) as CurrentUser;
  return <DisplayPostModal currentUser={currentUser} />;
}
