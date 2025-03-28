"use client";

//hooks
import { useState } from "react";

//ui
import { Separator } from "@/components/ui/separator";

//icons
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import Loader from "../ui/custom/Loader";
import { github } from "@/actions/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function OAuthForm({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (arg0: boolean) => void;
}) {
  //state
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const router = useRouter();

  //methods
  const signIn = async () => {
    setLoading(true);
    try {
      const res = await github();

      if (res?.success) {
        toast.success(res.success);

        router.push("/");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
      console.error("OAuth error:", error);
    } finally {
      setLoading(false);
    }
  };

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
        onMouseEnter={() => setIsHovering((prev) => !prev)}
        onMouseLeave={() => setIsHovering((prev) => !prev)}
        onClick={() => signIn()}
        disabled={loading}
      >
        <div className="flex items-center justify-center w-full">
          {loading ? (
            <Loader dark />
          ) : (
            <>
              <FaGithub
                fill="white"
                className={`transition-all duration-300 ease-in-out transform ${
                  isHovering ? "-translate-x-[80px]" : "translate-x-0"
                }`}
                size={18}
              />
              <span
                className={`text-white absolute left-1/2 transform -translate-y-1/2 top-1/2 transition-all duration-300 ease-in-out ${
                  isHovering
                    ? "opacity-100 translate-x-[-60px]"
                    : "opacity-0 translate-x-[20px]"
                }`}
              >
                Continue with GitHub
              </span>
            </>
          )}
        </div>
      </Button>
    </>
  );
}
