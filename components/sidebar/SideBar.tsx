"use client";

//next
import { useState } from "react";

//types
import { SidebarExtension } from "@/enums/enums";

//components
import Search from "./search/Search";
import Notifications from "./notifications/Notifications";
import SideOptions from "./SideOptions";
import TopOptions from "./TopOptions";
import Messages from "./messages/Messages";

export function AppSidebar() {
  //states
  const [isExtended, setIsExtended] = useState<SidebarExtension | null>(null);

  //methods
  const handleExtension = (state: SidebarExtension) => {
    setIsExtended((prev) => {
      if (prev === null || prev !== state) {
        return state;
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div
        className={`fixed top-0 z-1 flex md:flex-col gap-3 items-center justify-end md:justify-start lg:transition-[width] md:items-start p-3 border-b md:border-b-0 border-border w-full md:w-[var(--sidebar-width-md)] ${
          isExtended
            ? "lg:w-[var(--sidebar-width-md)]"
            : "lg:w-[var(--sidebar-width-lg)] md:border-r"
        } h-[var(--sidebar-height-sm)] md:h-screen bg-background`}
      >
        <SideOptions
          isExtended={isExtended}
          handleExtension={handleExtension}
        />
        <TopOptions />
      </div>

      <div
        className={`hidden absolute md:flex flex-col md:transition-all h-full left-[var(--sidebar-width-md)] md:border-r ${
          isExtended ? "w-[300px] opacity-100 z-2" : "w-0 opacity-0 z-0"
        }`}
      >
        {isExtended === SidebarExtension.SEARCH && <Search />}
        {isExtended === SidebarExtension.NOTIFICATIONS && <Notifications />}
        {isExtended === SidebarExtension.MESSAGES && <Messages />}
      </div>
    </>
  );
}
