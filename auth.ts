import NextAuth from "next-auth";
import { createUser, getUserByEmail, getUserById } from "./data/user";
import { config } from "./config";
import authConfig from "./auth.config";
import prisma from "./lib/prisma";

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
      if (!account) return false;

      if (account.provider !== "credentials") {
        const linkedAccount = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId!,
            },
          },
        });

        if (!linkedAccount) {
          let existingUser = await getUserByEmail(user.email ?? "");

          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                email: user.email ?? "",
                name: user.name ?? null,
                image: user.image ?? null,
                password: null,
                salt: null,
                emailVerified: new Date(),
              },
            });
            existingUser = newUser;
          }

          if (!user.id) {
            throw new Error("User ID is required to link OAuth account.");
          }

          await prisma.account.create({
            data: {
              userId: existingUser?.id ?? "",
              type: account.type!,
              provider: account.provider,
              providerAccountId: account.providerAccountId!,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              id_token: account.id_token,
              session_state:
                typeof account.session_state === "string"
                  ? account.session_state
                  : undefined,
              scope: account.scope,
            },
          });

          user.id = existingUser?.id;
        } else {
          user.id = linkedAccount.userId;
        }
      }

      const existingUser = await getUserById(user.id ?? "");
      if (!existingUser?.emailVerified && account.provider === "credentials") {
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
