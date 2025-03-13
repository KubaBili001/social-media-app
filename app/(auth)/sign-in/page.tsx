//next
import Link from "next/link";
import { Metadata } from "next";

//components
import LoginForm from "@/components/auth/LoginForm";

//ui
import CustomCard from "@/components/ui/custom/CustomCard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the site",
};

export default async function SignIn() {
  const session = await auth();

  if (session) return redirect("/home");

  return (
    <CustomCard
      width={400}
      title="Log in to the app"
      content={<LoginForm />}
      footer={
        <>
          <span>Don't have an account?</span>
          <Link href={"sign-up"} className="underline cursor-link">
            Sign up
          </Link>
        </>
      }
    />
  );
}
