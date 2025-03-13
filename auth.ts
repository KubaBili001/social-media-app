import NextAuth from "next-auth";
import { getUserById } from "./data/user";
import { config } from "./config";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },

  debug: process.env.NODE_ENV === "development",
  secret: config.env.auth.secret,

  ...authConfig,

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id ?? "");

      if (!existingUser?.emailVerified) {
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isOAuth: token.isOauth,
        },
      };
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.email = existingUser.email;

      return token;
    },
  },
});
