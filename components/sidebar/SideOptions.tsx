//next
import Link from "next/link";

//icons
import { RiNextjsFill } from "react-icons/ri";
import { MdHome } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";

//ui
import { Button } from "../ui/button";

//types
import { SidebarExtension } from "@/enums/enums";

//components
import SidebarButton from "./SidebarButton";
import SidebarLink from "./SidebarLink";

interface SideOptionsProps {
  isExtended: SidebarExtension | null;
  handleExtension: (state: SidebarExtension) => void;
}

const SideOptions: React.FC<SideOptionsProps> = ({
  isExtended,
  handleExtension,
}) => {
  //styles
  const labelStyle = `absolute left-13 opacity-0 ${
    isExtended ? "" : "lg:opacity-100"
  } transition-all truncate`;

  return (
    <>
      <Link
        href={"/home"}
        className="flex items-center gap-3 md:w-full p-3 md:my-4 hover:bg-secondary rounded-md transition-colors ease-in absolute left-1 md:left-0 md:relative"
      >
        <RiNextjsFill className="fill-white md:w-6 md:h-6 w-8 h-8" />
        <span className={labelStyle}>Social media app</span>
      </Link>
      <SidebarLink
        href={"/home"}
        label={"Home"}
        icon={MdHome}
        labelStyle={labelStyle}
      />
      <SidebarButton
        isExtended={isExtended}
        onClick={() => handleExtension(SidebarExtension.SEARCH)}
        label="Search"
        icon={IoSearch}
        labelStyle={labelStyle}
      />
      <SidebarLink
        href={"/messages"}
        label={"Messages"}
        icon={FiSend}
        labelStyle={labelStyle}
      />
      <SidebarButton
        isExtended={isExtended}
        onClick={() => handleExtension(SidebarExtension.NOTIFICATIONS)}
        label="Notifications"
        icon={FaRegHeart}
        labelStyle={labelStyle}
      />
      <Button
        className="hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in hover:cursor-pointer relative"
        variant={"clean"}
        size={"clean"}
      >
        <MdAddCircleOutline className="w-6 h-6 fill-white" />
        <span className={labelStyle}>Create a post</span>
      </Button>
    </>
  );
};

export default SideOptions;
