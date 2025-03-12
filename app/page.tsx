import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  console.log(session?.user);

  return <div className="flex flex-col gap-2"> </div>;
}
