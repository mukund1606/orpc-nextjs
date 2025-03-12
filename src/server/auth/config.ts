import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { env } from "~/env";
import { InvalidLoginError } from "~/server/auth/errors";

// TODO: Implement DB Session
// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { and, desc, eq, inArray } from "drizzle-orm";
// import type { Adapter } from "next-auth/adapters";
// import { comparePassword, generateSessionToken } from "~/lib/auth";
// import { db } from "~/server/db";

// // @ts-expect-error - Not using accounts and verificationTokens tables
// const adapter = DrizzleAdapter(db, {
//   usersTable,
//   sessionsTable,
// }) as Adapter;

export const LoginFormSchema = z.object({
  username: z.string().length(12, {
    message: "Username must be exactly 12 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  otp: z.string().length(6, {
    message: "OTP must be exactly 6 characters.",
  }),
});

export const authConfig: NextAuthConfig = {
  secret: env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/sign-out",
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        const data = LoginFormSchema.safeParse(credentials);
        if (!data.success) {
          throw new InvalidLoginError();
        }
        const { username } = data.data;

        return {
          username,
          email: "email@email.com",
          name: "name",
          id: "1",
        };
      },
    }),
  ],
  // TODO: Implement DB Session
  // adapter,
  // callbacks: {
  // session: async ({ session }) => {
  //   return session;
  // },
  // jwt: async ({ token, user, account }) => {
  //   if (account?.provider === "credentials") {
  //     const sessionToken = generateSessionToken();
  //     const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  //     const session = await adapter.createSession!({
  //       userId: user.id!,
  //       sessionToken,
  //       expires,
  //     });
  //     token.sessionToken = session.sessionToken;
  //     token.sessionExpiryTime = session.expires;
  //   }
  //   return token;
  // },
  // },
  // jwt: {
  //   async encode({ token }) {
  //     return token?.sessionToken ?? "";
  //   },
  // },
};
