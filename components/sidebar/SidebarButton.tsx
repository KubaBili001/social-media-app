//next
import React from "react";

//ui
import { Button } from "../ui/button";

//icons
import { IconType } from "react-icons";

//types
import { SidebarExtension } from "@/enums/enums";

interface SidebarButtonProps {
  isExtended: SidebarExtension | null;
  onClick: () => void;
  label: string;
  icon?: IconType;
  labelStyle: string;
  className?: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  onClick,
  label,
  icon: Icon,
  labelStyle,
  className,
}) => {
  return (
    <Button
      className={`hidden md:flex items-center gap-3 md:w-full p-3 hover:bg-secondary rounded-md transition-colors ease-in hover:cursor-pointer relative ${className}`}
      variant={"clean"}
      size={"clean"}
      onClick={onClick}
    >
      {Icon && <Icon className="w-6 h-6 fill-white" />}
      <span className={labelStyle}>{label}</span>
    </Button>
  );
};

export default SidebarButton;
