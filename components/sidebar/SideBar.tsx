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

export function AppSidebar() {
  const [isExtended, setIsExtended] = useState<boolean>(false);

  const labelStyle = `absolute left-13 opacity-0 ${
    isExtended ? "" : "lg:opacity-100"
  } transition-all`;

  return (
    <div
      className={`flex md:flex-col gap-3 items-center transition-[width] md:items-start p-3 border-b md:border-r md:border-b-0 border-border w-full md:w-[var(--sidebar-width-md)] lg:w-[var(--sidebar-width-${
        isExtended ? "md" : "lg"
      })] h-[var(--sidebar-height-sm)] md:h-full`}
    >
      <Link
        href={"/home"}
        className="flex items-center gap-3 md:w-full p-3 md:my-4 hover:bg-secondary rounded-md transition-colors ease-in relative"
      >
        <RiNextjsFill className="fill-white w-7 h-7" />
        <span className={labelStyle}>Social media app</span>
      </Link>
      <Link
        href={"/home"}
        className="hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in relative"
      >
        <MdHome className="w-7 h-7" />
        <span className={labelStyle}>Home</span>
      </Link>
      <Button
        className="hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in hover:cursor-pointer relative"
        variant={"clean"}
        size={"clean"}
        onClick={() => setIsExtended((prev) => !prev)}
      >
        <IoSearch className="w-7 h-7 fill-white" />
        <span className={labelStyle}>Search</span>
      </Button>
      <Link
        href={"/messages"}
        className="hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in relative"
      >
        <FiSend className="w-7 h-7" />
        <span className={labelStyle}>Messages</span>
      </Link>
      <Button
        className="hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in hover:cursor-pointer relative"
        variant={"clean"}
        size={"clean"}
      >
        <FaRegHeart className="w-7 h-7 fill-white" />
        <span className={labelStyle}>Notifications</span>
      </Button>
      <Button
        className="hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in hover:cursor-pointer relative"
        variant={"clean"}
        size={"clean"}
      >
        <MdAddCircleOutline className="w-7 h-7 fill-white" />
        <span className={labelStyle}>Create a post</span>
      </Button>
      <div className="flex gap-3">
        {/* move input to separate component to handle search logic */}
      </div>
    </div>
  );
}
