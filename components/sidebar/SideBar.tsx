"use client";

//icons
import { RiNextjsFill } from "react-icons/ri";
import { MdHome } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";

import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "@radix-ui/react-separator";
import { SidebarExtension } from "@/enums/enums";

export function AppSidebar() {
  const [isExtended, setIsExtended] = useState<SidebarExtension | null>(null);

  const labelStyle = `absolute left-13 opacity-0 ${
    isExtended ? "" : "lg:opacity-100"
  } transition-all truncate`;

  return (
    <>
      <div
        className={`relative z-1 flex md:flex-col gap-3 items-center justify-end md:justify-start lg:transition-[width] md:items-start p-3 border-b md:border-b-0 border-border w-full md:w-[var(--sidebar-width-md)] ${
          isExtended
            ? "lg:w-[var(--sidebar-width-md)]"
            : "lg:w-[var(--sidebar-width-lg)] md:border-r"
        } h-[var(--sidebar-height-sm)] md:h-full`}
      >
        <Link
          href={"/home"}
          className="flex items-center gap-3 md:w-full p-3 md:my-4 hover:bg-secondary rounded-md transition-colors ease-in absolute left-1 md:left-0 md:relative"
        >
          <RiNextjsFill className="fill-white md:w-6 md:h-6 w-8 h-8" />
          <span className={labelStyle}>Social media app</span>
        </Link>
        <Link
          href={"/home"}
          className="hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in relative"
        >
          <MdHome className="w-6 h-6" />
          <span className={labelStyle}>Home</span>
        </Link>
        <Button
          className="hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in hover:cursor-pointer relative"
          variant={"clean"}
          size={"clean"}
          onClick={() =>
            setIsExtended((prev) => {
              if (prev === null) {
                return SidebarExtension.SEARCH;
              } else {
                return null;
              }
            })
          }
        >
          <IoSearch className="w-6 h-6 fill-white" />
          <span className={labelStyle}>Search</span>
        </Button>
        <Link
          href={"/messages"}
          className="hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in relative"
        >
          <FiSend className="w-6 h-6" />
          <span className={labelStyle}>Messages</span>
        </Link>
        <Button
          className="hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in hover:cursor-pointer relative"
          variant={"clean"}
          size={"clean"}
        >
          <FaRegHeart className="w-6 h-6 fill-white" />
          <span className={labelStyle}>Notifications</span>
        </Button>
        <Button
          className="hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in hover:cursor-pointer relative"
          variant={"clean"}
          size={"clean"}
        >
          <MdAddCircleOutline className="w-6 h-6 fill-white" />
          <span className={labelStyle}>Create a post</span>
        </Button>
        <div className="flex gap-3 items-center">
          {/* move input to separate component to handle search logic */}
          <Input className="md:hidden" placeholder="Search" />
          <Button
            className="flex md:hidden items-center gap-3 md:w-full p-3 rounded-md hover:cursor-pointer"
            variant={"clean"}
            size={"clean"}
          >
            <FaRegHeart className="w-6 h-6 fill-white" />
          </Button>
        </div>
      </div>
      <div
        className={`absolute flex flex-col md:transition-all h-full left-[var(--sidebar-width-md)] md:border-r ${
          isExtended ? "w-[300px] opacity-100 z-2" : "w-0 opacity-0 z-0"
        }`}
      >
        <div className="p-3 flex flex-col gap-3">
          <Skeleton className="w-[100px] h-[40px]" />
          <Skeleton className="w-[250px] h-[40px]" />
        </div>
        <Separator orientation="horizontal" className="h-[1px] bg-border" />
        <div className="p-3 flex flex-col gap-3 overflow-y-auto">
          <Skeleton className="w-full min-h-[40px]" />
          <Skeleton className="w-full min-h-[40px]" />
          <Skeleton className="w-full min-h-[40px]" />
          <Skeleton className="w-full min-h-[40px]" />
        </div>
      </div>
    </>
  );
}
