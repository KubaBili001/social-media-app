"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { newVerification } from "@/actions/auth/token-verification";
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
      console.error(error);
      toast.error("There was an unexpected error.");
    }
  }, [token, router]);

  useEffect(() => {
    onSubmit();
    setTimeout(() => setLoading(false), 1000);
  }, [onSubmit]);

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
