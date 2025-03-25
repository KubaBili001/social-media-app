//next
import Link from "next/link";

//icons
import { RiNextjsFill } from "react-icons/ri";
import { MdHome } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";

//types
import { SidebarExtension } from "@/enums/enums";

//components
import SidebarButton from "./SidebarButton";
import SidebarLink from "./SidebarLink";
import CreatePostButton from "./CreatePostButton";

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
        className={
          isExtended === SidebarExtension.SEARCH ? "border-primary" : ""
        }
      />
      <SidebarButton
        isExtended={isExtended}
        onClick={() => handleExtension(SidebarExtension.MESSAGES)}
        label="Messages"
        icon={FiSend}
        labelStyle={labelStyle}
        className={
          isExtended === SidebarExtension.MESSAGES ? "border-primary" : ""
        }
      />
      <SidebarButton
        isExtended={isExtended}
        onClick={() => handleExtension(SidebarExtension.NOTIFICATIONS)}
        label="Notifications"
        icon={FaRegHeart}
        labelStyle={labelStyle}
        className={
          isExtended === SidebarExtension.NOTIFICATIONS ? "border-primary" : ""
        }
      />
      <CreatePostButton labelStyle={labelStyle} />
    </>
  );
};

export default SideOptions;
