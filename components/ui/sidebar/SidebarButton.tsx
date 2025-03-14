import Link from "next/link";
import { Button } from "../button";
import { ReactNode } from "react";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
}

export default function SidebarButton({ href, children }: LinkButtonProps) {
  return (
    <Button asChild className="bg-transparent p-0">
      <Link href={href}>{children}</Link>
    </Button>
  );
}
