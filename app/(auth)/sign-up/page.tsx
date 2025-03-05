import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up to the site",
};

export default function SignUp() {
  return (
    <div>
      signUp
      <Button asChild>
        <Link href={"/"}>Sign up</Link>
      </Button>
    </div>
  );
}
