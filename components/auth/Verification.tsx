"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { newVerification } from "@/actions/token-verification";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const VerifyEmailForm = () => {
  //state
  const [loading, setLoading] = useState<boolean>(true);

  //hooks
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    try {
      if (!token) {
        toast.error("No token provided");
        return;
      }

      const res = await newVerification(token);

      if (res?.error) {
        toast.error(res.error);
      }

      if (res?.success) {
        toast.success("Email verified successfuly");

        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an unexpected error.");
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <span>
        {loading
          ? "Confirming your email address..."
          : "Confirmation completed. Redirecting..."}
      </span>
    </div>
  );
};

export default VerifyEmailForm;
