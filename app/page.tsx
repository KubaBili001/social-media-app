import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) return redirect("/sign-in");

  return <div className="flex flex-col gap-2"> </div>;
}
