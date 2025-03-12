import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas/schemas";
import { getUserByEmail, getUserById } from "./data/user";
import { comparePasswords } from "./lib/hasher";
import { config } from "./config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  debug: process.env.NODE_ENV === "development",
  secret: config.env.auth.secret,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = loginSchema.safeParse(credentials);

        if (!validatedCredentials.success) {
          return null;
        }

        const { email, password } = validatedCredentials.data;

        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = comparePasswords(
          password,
          user.salt,
          user.password
        );

        if (passwordsMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
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
