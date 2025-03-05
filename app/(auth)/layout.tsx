import { Metadata } from "next";
import Image from "next/image";
import Logo from "@/public/images/next-logo.webp";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the site",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
      <Card className="w-[400px]">{children}</Card>
    </div>
  );
}
