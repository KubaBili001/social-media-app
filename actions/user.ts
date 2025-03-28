import { auth } from "@/auth";

export default async function getCurrentUser() {
  try {
    const session = await auth();

    if (!session) {
      return null;
    }

    return {
      ...session.user,
    };
  } catch (error: any) {
    return null;
  }
}
