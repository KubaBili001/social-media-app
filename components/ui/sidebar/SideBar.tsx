//icons
import { House } from "lucide-react";
import { RiNextjsFill } from "react-icons/ri";
import { MdHome } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

import SidebarButton from "./SidebarButton";
import { Button } from "../button";
import Link from "next/link";

export function AppSidebar() {
  return (
    <div className="flex md:flex-col gap-2 items-center p-3 border-b md:border-r md:border-b-0 border-border w-full md:w-[var(--sidebar-width-md)] lg:w-[var(--sidebar-width-lg)] h-[var(--sidebar-height-sm)] md:h-full">
      <Link
        href={"/home"}
        className="p-3 my-4 hover:bg-secondary rounded-md transition-all ease-in"
      >
        <RiNextjsFill className="fill-white w-7 h-7" />
      </Link>
      <Link
        href={"/home"}
        className="p-3 hover:bg-secondary rounded-md transition-all ease-in"
      >
        <MdHome className="w-7 h-7" />
      </Link>
    </div>
  );
}
