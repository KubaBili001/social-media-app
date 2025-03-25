import { auth } from "@/auth";
import CreatePostModal from "@/components/modals/CreatePostModal";
import { AppSidebar } from "@/components/sidebar/SideBar";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) return redirect("/sign-in");

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <CreatePostModal />

      <AppSidebar />

      <main className="md:w-[calc(100%-var(--sidebar-width-md))] lg:w-[calc(100%-var(--sidebar-width-lg))] h-[calc(100%-var(--sidebar-height-sm))] md:h-full">
        {children}
      </main>
    </div>
  );
}
