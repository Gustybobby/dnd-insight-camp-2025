import type {
  AuthSession,
  ISessionService,
} from "@/server/applications/interfaces/services/infrastructure";
import type { DefaultSession } from "next-auth";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { takeOneOrThrow } from "@/db/util";
import { eq } from "drizzle-orm";

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, session.user.email))
        .then(takeOneOrThrow);
      return { ...session, user };
    },
  },
  trustHost: true,
});

export class SessionService implements ISessionService {
  getSession(): Promise<AuthSession | null> {
    return auth();
  }
}
