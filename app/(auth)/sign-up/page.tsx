//next
import Link from "next/link";
import { Metadata } from "next";

//components
import RegisterForm from "@/components/auth/RegisterForm";

//ui
import CustomCard from "@/components/ui/custom/CustomCard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up to the site",
};

export default async function SignUp() {
  const session = await auth();

  if (session) return redirect("/");

  return (
    <CustomCard
      width={400}
      title="Register to the app"
      description="and explore its various functionalities."
      content={<RegisterForm />}
      footer={
        <>
          <span>Already have an account?</span>
          <Link href={"sign-in"} className="underline cursor-link">
            Sign in
          </Link>
        </>
      }
    />
  );
}
