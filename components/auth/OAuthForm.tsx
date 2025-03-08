//hooks
import { useState } from "react";

//ui
import { Separator } from "@/components/ui/separator";

//icons
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

export default function OAuthForm() {
  //state
  const [isHoveringGoogle, setIsHoveringGoogle] = useState<boolean>(false);
  const [isHoveringGitHub, setIsHoveringGitHub] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="w-2/5">
          <Separator />
        </span>
        OR
        <span className="w-2/5">
          <Separator />
        </span>
      </div>
      <Button
        className="dark:bg-secondary dark:hover:bg-secondary/70 relative"
        onMouseEnter={() => setIsHoveringGitHub((prev) => !prev)}
        onMouseLeave={() => setIsHoveringGitHub((prev) => !prev)}
      >
        <div className="flex items-center justify-center w-full">
          <FaGithub
            fill="white"
            className={`transition-all duration-300 ease-in-out transform ${
              isHoveringGitHub ? "-translate-x-[80px]" : "translate-x-0"
            }`}
            size={18}
          />
          <span
            className={`text-white absolute left-1/2 transform -translate-y-1/2 top-1/2 transition-all duration-300 ease-in-out ${
              isHoveringGitHub
                ? "opacity-100 translate-x-[-60px]"
                : "opacity-0 translate-x-[20px]"
            }`}
          >
            Continue with GitHub
          </span>
        </div>
      </Button>
      <Button
        className="bg-blue-500 hover:bg-blue-500/70 relative"
        onMouseEnter={() => setIsHoveringGoogle((prev) => !prev)}
        onMouseLeave={() => setIsHoveringGoogle((prev) => !prev)}
      >
        <div className="flex items-center justify-center w-full">
          <FaGoogle
            fill="white"
            className={`transition-all duration-300 ease-in-out transform ${
              isHoveringGoogle ? "-translate-x-[80px]" : "translate-x-0"
            }`}
            size={18}
          />
          <span
            className={`text-white absolute left-1/2 transform -translate-y-1/2 top-1/2 transition-all duration-300 ease-in-out ${
              isHoveringGoogle
                ? "opacity-100 translate-x-[-60px]"
                : "opacity-0 translate-x-[20px]"
            }`}
          >
            Continue with Google
          </span>
        </div>
      </Button>
    </>
  );
}
