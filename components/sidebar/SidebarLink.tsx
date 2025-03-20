//next
import React from "react";
import Link from "next/link";

//icons
import { IconType } from "react-icons";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon?: IconType;
  labelStyle: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  label,
  icon: Icon,
  labelStyle,
}) => {
  return (
    <Link
      href={href}
      className={`hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in relative`}
    >
      {Icon && <Icon className="w-6 h-6 fill-white" />}
      <span className={labelStyle}>{label}</span>
    </Link>
  );
};

export default SidebarLink;
