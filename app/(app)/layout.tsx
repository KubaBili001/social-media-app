import getCurrentUser from "@/actions/users/user";
import { CreatePostModal } from "@/components/modals/create-post/CreatePostModal";
import { AppSidebar } from "@/components/sidebar/SideBar";
import { CurrentUser } from "@/types/types";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser: CurrentUser = (await getCurrentUser()) as CurrentUser;
  if (!currentUser) return redirect("/sign-in");

  return (
    <div className="flex flex-col md:flex-row md:justify-between w-full h-full">
      <CreatePostModal currentUser={currentUser} />

      <AppSidebar />

      <main className="w-full">{children}</main>
    </div>
  );
}
