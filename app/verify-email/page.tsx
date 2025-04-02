import Verification from "@/components/auth/Verification";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Confirming...",
  description: "Confirming email address.",
};

const VerifyPage = async () => {
  return (
    <Suspense>
      <Verification />
    </Suspense>
  );
};

export default VerifyPage;
