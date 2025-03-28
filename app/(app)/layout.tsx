import getCurrentUser from "@/actions/user";
import { CreatePostModal } from "@/components/modals/create-post/CreatePostModal";
import { AppSidebar } from "@/components/sidebar/SideBar";
import { currentUser } from "@/types/types";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser: currentUser = (await getCurrentUser()) as currentUser;
  if (!currentUser) return redirect("/sign-in");

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <CreatePostModal currentUser={currentUser} />

      <AppSidebar />

      <main className="md:w-[calc(100%-var(--sidebar-width-md))] lg:w-[calc(100%-var(--sidebar-width-lg))] h-[calc(100%-var(--sidebar-height-sm))] md:h-full">
        {children}
      </main>
    </div>
  );
}
