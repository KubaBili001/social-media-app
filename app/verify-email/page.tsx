import Verification from "@/components/auth/Verification";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirming...",
  description: "Confirming email address.",
};

const VerifyPage = async () => {
  return <Verification />;
};

export default VerifyPage;
