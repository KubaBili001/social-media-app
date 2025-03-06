import { Metadata } from "next";

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
      {children}
    </div>
  );
}
